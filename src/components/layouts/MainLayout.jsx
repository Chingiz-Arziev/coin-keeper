import {useContext} from "react"
import {CryptoContext} from "../../context/crypto-context.jsx"

import {Layout, Spin} from 'antd'

import AppHeader from "./AppHeader.jsx"
import AppSideMenuBar from "./AppSideMenuBar.jsx"
import AppContent from "./AppContent.jsx"

const MainLayout = () => {
  const {loading} = useContext(CryptoContext)

  if(loading) {
    return <Spin fullscreen />
  }

  return (
    <div>
      <Layout>
        <AppHeader />
        <Layout>
          <AppSideMenuBar />
          <AppContent />
        </Layout>
      </Layout>
    </div>
  )
}

export default MainLayout;