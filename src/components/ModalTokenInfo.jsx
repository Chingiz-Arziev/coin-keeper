import {Flex, Tag, Typography, Divider} from "antd"

const ModalTokenInfo = ({ selectedToken }) => {

  return (
  <>
    <Flex align="center">
      <img src={selectedToken.icon} alt={selectedToken.name} style={{width: 40, marginRight: 10}}/>
      <Typography.Title level={2} style={{margin: 0}}>
        ({selectedToken.symbol}) {selectedToken.name}
      </Typography.Title>
    </Flex>

    <Divider />

    <Typography.Paragraph>
      <Typography.Text strong>1 hour: </Typography.Text>
      <Tag color={selectedToken.priceChange1h > 0 ? 'green' : 'red'}>{selectedToken.priceChange1h}%</Tag>
    </Typography.Paragraph>

    <Typography.Paragraph>
      <Typography.Text strong>1 day: </Typography.Text>
      <Tag color={selectedToken.priceChange1d > 0 ? 'green' : 'red'}>{selectedToken.priceChange1d}%</Tag>
    </Typography.Paragraph>

    <Typography.Paragraph>
      <Typography.Text strong>1 week: </Typography.Text>
      <Tag color={selectedToken.priceChange1w > 0 ? 'green' : 'red'}>{selectedToken.priceChange1w}%</Tag>
    </Typography.Paragraph>

    <Divider />

    <Typography.Paragraph>
      <Typography.Text strong>Price: </Typography.Text>
      {selectedToken.price.toFixed(2)}$
    </Typography.Paragraph>

    <Typography.Paragraph>
      <Typography.Text strong>Market Cap: </Typography.Text>
      {selectedToken.marketCap}$
    </Typography.Paragraph>
  </>
  )
}

export default ModalTokenInfo