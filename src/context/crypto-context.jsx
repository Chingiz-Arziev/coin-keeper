import { createContext, useEffect, useState} from "react"

import {fetchCoinAssets, fetchCoinData} from "../services/fetchCoinData.js";
import {percentDifference} from "../utils/percentDifference.js";

export const CryptoContext = createContext({
  tokens: [],
  assets: [],
  loading: false
})

export const CryptoContextProvider = ({ children }) => {
  const [tokens, setTokens] = useState([])
  const [assets, setAssets] = useState([])

  const [loading, setLoading] = useState(false)

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
  }, [])

  return (
    <CryptoContext.Provider value={{ loading, tokens, assets }}>
      {children}
    </CryptoContext.Provider>
  )
}
