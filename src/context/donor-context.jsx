import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const DonorContext = createContext({
  data: [],
  loading: true,
});

export function DonorContextProvider({ children }) {
  const [deptPage, setDeptPage] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/parse", {
          params: {
            url: "https://yadonor.ru/donorstvo/gde-sdat/where/", // Укажите нужный URL
          },
        });

        setDeptPage(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /*
  function fetchDepartmentData(link) {

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/parse", {
          params: {
            url: "https://yadonor.ru" + link,
          },
        });

        setDept(response.data);
        //console.log(dept);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
      
  }

  function fetchDepartmentsData(link) {
    
    console.log(link);
    
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/parse", {
          params: {
            url: "https://yadonor.ru" + link[1],
          },
        });

        setDept(response.data);
        //console.log(dept);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
      
  }
*/

  const parseMultipleUrls = async (urls) => {
    setLoading(true);
    setProgress(0);

    try {
      const response = await axios.get(
        "http://localhost:3001/api/parse-multiple",
        {
          params: { urls: JSON.stringify(urls) },
        }
      );

      setData(response.data.results);
      return response.data.results;
    } catch (error) {
      console.error("Parse error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Добавляем функцию для последовательного парсинга с прогрессом
  const parseSequentially = async (urls) => {
    setLoading(true);
    setProgress(0);

    const results = [];
    for (let i = 0; i < urls.length; i++) {
      try {
        const response = await axios.get("http://localhost:3001/api/parse", {
          params: { url: urls[i] },
        });
        results.push(response.data);
      } catch (error) {
        results.push({ error: error.message, url: urls[i] });
      }
      setProgress(Math.round(((i + 1) / urls.length) * 100));
    }

    setData(results);
    setLoading(false);
    return results;
  };

  if (loading) return <div className="loading">Загрузка данных...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <DonorContext.Provider
      value={{
        loading,
        data,
        deptPage,
        progress,
        parseMultipleUrls,
        parseSequentially,
      }}
    >
      {children}
    </DonorContext.Provider>
  );
}

export default DonorContext;

export function useDonor() {
  return useContext(DonorContext);
}
