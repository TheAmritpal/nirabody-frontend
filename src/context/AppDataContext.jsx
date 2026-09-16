// context/AppDataContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { apiUrl } from '../backend/pages/https'

const AppDataContext = createContext()

export const useAppData = () => {
  const context = useContext(AppDataContext)
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider')
  }
  return context
}

export const AppDataProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [settings, setSettings] = useState({})
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Loading...')

  const isAllDataLoaded = () => {
    return products.length > 0 && Object.keys(settings).length > 0
  }

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setProgress(5)
        setLoadingText('Loading your ritual journey...')

        // Fetch Products
        setProgress(20)
        setLoadingText('Curating sacred products...')
        const productsRes = await axios.get(`${apiUrl}/products`)
        if (productsRes.data.status) {
          setProducts(productsRes.data.data || [])
        }
        setProgress(50)

        // Fetch Categories
        setLoadingText('Discovering wellness categories...')
        const categoriesRes = await axios.get(`${apiUrl}/categories/active`)
        if (categoriesRes.data.status) {
          setCategories(categoriesRes.data.data || [])
        }
        setProgress(70)

        // Fetch Settings
        setLoadingText('Preparing your experience...')
        const settingsRes = await axios.get(`${apiUrl}/settings`)
        if (settingsRes.data.status) {
          setSettings(settingsRes.data.data || {})
        }
        setProgress(90)

        setLoadingText('Almost ready...')
        
        await new Promise(resolve => setTimeout(resolve, 500))
        
        setProgress(100)
        setLoadingText('Welcome to NIRA BODY!')
        
        setTimeout(() => {
          setIsLoadingComplete(true)
        }, 300)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoadingComplete(true)
      }
    }

    fetchAllData()
  }, [])

  return (
    <AppDataContext.Provider
      value={{
        products,
        categories,
        settings,
        isLoadingComplete,
        isAllDataLoaded,
        progress,
        loadingText
      }}
    >
      {children}
    </AppDataContext.Provider>
  )
}