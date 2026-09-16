// hooks/useCache.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../backend/pages/https';
import { cacheService } from '../services/cacheService';

export const useCache = (key, url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Check cache first
      const cachedData = cacheService.get(key);
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }

      // Fetch from API
      try {
        const response = await axios.get(`${apiUrl}${url}`);
        const result = response.data.data || response.data;
        cacheService.set(key, result);
        setData(result);
      } catch (error) {
        console.error(`Error fetching ${key}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key, url]);

  return { data, loading };
};