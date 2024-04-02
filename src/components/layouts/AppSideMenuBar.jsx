import { useEffect, useState } from "react"

import {Layout, Card, Statistic, List, Typography, Spin, Tag} from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

import {fetchCoinData, fetchCoinAssets} from "../../services/fetchCoinData.js";
import {percentDifference} from "../../utils/percentDifference.js";

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
          totalProfit: asset.amount * coin.price - asset.amount * asset.price,
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
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: 'Total Profit', value: asset.totalProfit, withTag: true },
              { title: 'Asset Amount', value: asset.amount, isPlain: true },
              { title: 'Difference', value: asset.percentageGrowth },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                {item.withTag && (
                  <Tag color={asset.growth ? 'green' : 'red'}>
                    {asset.percentageGrowth}%
                  </Tag>
                )}
                <span>
                  {item.isPlain && item.value.toFixed(2)}
                  {!item.isPlain && <Typography.Text type={asset.growth ? 'success' : 'danger'}>
                    {item.value.toFixed(2)}$
                  </Typography.Text>}
                </span>
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