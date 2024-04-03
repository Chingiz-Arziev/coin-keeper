import {useContext, useState} from "react"

import {Select, Space} from "antd"

import {CryptoContext} from "../context/crypto-context.jsx";

const AssetsForm = () => {
  const {tokens} = useContext(CryptoContext)
  const [token, setToken] = useState(null)

  const tokenOptions = tokens.map(token => ({
    label: token.name,
    value: token.id,
    icon: token.icon
  }))

  if(!token) {
    return (
      <>
        <Select
          style={{width: "100%"}}
          placeholder="select token"
          onSelect={(value) => setToken(tokens.find(token => token.id === value))}
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
      </>
    )
  }
}

export default AssetsForm