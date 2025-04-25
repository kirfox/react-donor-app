import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const DonorContext = createContext({
    data: [],
    loading: true,
  });


export function DonorContextProvider({children}) {
  const [data, setData] = useState(null);
  const [dept, setDept] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/parse", {
          params: {
            url: "https://yadonor.ru/donorstvo/gde-sdat/where/", // Укажите нужный URL
          },
        });

        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  function test(link) {

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/parse", {
          params: {
            url: "https://yadonor.ru" + link,
          },
        });

        setDept(response.data);
        console.log(dept);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
      
  }

  if (loading) return <div className="loading">Загрузка данных...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <DonorContext.Provider value={{ loading, data, test, dept  }}>
      {children}
    </DonorContext.Provider>
  ); 
}

export default DonorContext;

export function useDonor() {
  return useContext(DonorContext);
}