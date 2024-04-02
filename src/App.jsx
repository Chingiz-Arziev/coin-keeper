import {CryptoContextProvider} from "./context/crypto-context.jsx"

import MainLayout from "./components/layouts/MainLayout.jsx";

const App = () => {
  return (
    <CryptoContextProvider>
      <MainLayout />
    </CryptoContextProvider>
  )
}

export default App
