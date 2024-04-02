import {useContext} from "react";
import { CryptoContext } from "../../context/crypto-context.jsx"

import {Layout, Card, Statistic, List, Typography, Spin, Tag} from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

const AppSideMenuBar = () => {
  const { assets } = useContext(CryptoContext)

  return (
    <Layout.Sider width="25%">
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