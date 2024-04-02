import axios from "axios"
import {cryptoAssets} from "../mockData.js";
export const fetchCoinData = async () => {
  const API_KEY = import.meta.env.VITE_COINGECKO_API

  const options = {
    method: 'GET',
    url: 'https://openapiv1.coinstats.app/coins',
    params: {limit: '500'},
    headers: {
      accept: 'application/json',
      'X-API-KEY': API_KEY
    }
  }

  try {
    const response = await axios.get('https://openapiv1.coinstats.app/coins', options)
    return response.data

  } catch (error) {
    console.error(error)
  }
}


export const fetchCoinAssets = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets)
    }, 2000)
  })
}
