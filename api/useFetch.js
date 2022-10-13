import { useEffect, useState } from "react";
import { API } from "./API"
export const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const getData = async (endpoint) => {
    try {
      const { data } = await API.get(endpoint);
      setData(data); //está mas o menos mal adrede...      
    } catch (error) {
      setError(prev => prev = true)
    } finally {
      setLoading(prev => prev = false)
    }
  };

  useEffect(() => {
    getData(endpoint)
  }, [endpoint])
  return [data, error, loading]
}