import { Layout } from 'antd'

import AppHeader from "./components/layouts/AppHeader.jsx"
import AppSideMenuBar from "./components/layouts/AppSideMenuBar.jsx"
import AppContent from "./components/layouts/AppContent.jsx"

const App = () => {
  return (
    <>
      <Layout>
        <AppHeader />
        <Layout>
          <AppContent />
          <AppSideMenuBar />
        </Layout>
      </Layout>
    </>
  )
}

export default App
