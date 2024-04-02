import { useEffect, useState } from "react"

import { Layout, Card, Statistic, List, Typography, Spin } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

import {fetchCoinData} from "../../services/fetchCoinData.js";

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
      const tokenData = await fetchCoinData()

      setTokens(tokenData)

      setLoading(false)
    }

    getCoinsPrice()
  }, []);

  if(loading) {
    return <Spin fullscreen />
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      <Card style={{marginBottom: '1rem'}}>
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{
            color: '#3f8600',
          }}
          prefix={<ArrowUpOutlined />}
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

      <Card>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{
            color: '#cf1322',
          }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Layout.Sider>
  )
}

export default AppSideMenuBar