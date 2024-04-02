import { useEffect, useState } from "react"

import { Layout, Card, Statistic, List, Typography, Spin } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

import {fetchCoinData, fetchCoinAssets} from "../../services/fetchCoinData.js";
import {percentDifference} from "../../utils/percentDifference.js";

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]

const siderStyle = {
  padding: '1rem'
}

const AppSideMenuBar = () => {
  const [loading, setLoading] = useState(false)
  const [tokens, setTokens] = useState([])
  const [assets, setAssets] = useState([])


  useEffect(() => {
    const getCoinsPrice = async () => {
      setLoading(true)
      const { result } = await fetchCoinData()
      const assets = await fetchCoinAssets()


      setAssets(assets.map((asset) => {
        const coin = result.find((c => c.id === asset.id))
        return {
          growth: asset.price < coin.price,
          percentageGrowth: percentDifference(coin.price, asset.price),
          totalAmount: asset.amount * coin.price,
          profitAmount: asset.amount * coin.price - asset.amount * asset.price,
          ...asset
        }
      }))

      setTokens(result)

      setLoading(false)
    }

    getCoinsPrice().then()
  }, []);

  if(loading) {
    return <Spin fullscreen />
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map(asset => (
        <Card key={asset.id} style={{marginBottom: '1rem'}}>
          <Statistic
            title={asset.id}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{color: asset.growth ? '#3f8600' : '#cf1322'}}
            prefix={asset.growth ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="%"
          />
          <List
            size="small"
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark>[ITEM]</Typography.Text> {item}
              </List.Item>
            )}
          />
        </Card>
      ))
      }
    </Layout.Sider>
  )
}

export default AppSideMenuBar