import { Layout, Select, Space, Button, Modal, Drawer } from "antd"

import {useState, useContext} from "react"
import {CryptoContext} from "../../context/crypto-context.jsx"

import ModalTokenInfo from "../ModalTokenInfo.jsx"
import AssetsForm from "../AssetsForm.jsx";

const headerStyle = {
  height: 60,
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const AppHeader = () => {
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [selectedToken, setSelectedToken] = useState(null)

  const { tokens} = useContext(CryptoContext)

  const tokenOptions = tokens.map(token => ({
    label: token.name,
    value: token.id,
    icon: token.icon
  }))

  const handleSelect = (value) => {
    setSelectedToken(tokens.find(token => token.id === value))
    setModal(true)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{width: 250,}}
        onSelect={handleSelect}
        options={tokenOptions}
        optionRender={(option) => (
          <Space>
            <img
              style={{width: 20}}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />

      <Button
        type="primary"
        onClick={() => setDrawer(true)}
      >Add Asset
      </Button>

      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <ModalTokenInfo selectedToken={selectedToken}/>
      </Modal>

      <Drawer
        width="600"
        onClose={() => setDrawer(false)}
        open={drawer}
      >
        <AssetsForm />
      </Drawer>
    </Layout.Header>
  )
}

export default AppHeader