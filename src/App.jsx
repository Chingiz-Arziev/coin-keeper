import {CryptoContextProvider} from "./context/crypto-context.jsx"

import { Layout } from 'antd'

import AppHeader from "./components/layouts/AppHeader.jsx"
import AppSideMenuBar from "./components/layouts/AppSideMenuBar.jsx"
import AppContent from "./components/layouts/AppContent.jsx"

const App = () => {
  return (
    <CryptoContextProvider>
      <Layout>
        <AppHeader />
        <Layout>
          <AppSideMenuBar />
          <AppContent />
        </Layout>
      </Layout>
    </CryptoContextProvider>
  )
}

export default App
