import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const DonorContext = createContext({
  data: [],
});

export function DonorContextProvider({ children }) {
  const [deptPage, setDeptPage] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/parse", {
          params: {
            url: "https://yadonor.ru/donorstvo/gde-sdat/where/",
          },
        });

        setDeptPage(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
      }
    };

    fetchData();
  }, []);

  const parseMultipleUrls = async (urls) => {
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
    }
  };

  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <DonorContext.Provider
      value={{
        data,
        deptPage,
        parseMultipleUrls,
        searchResults,
        isSearching,
        setSearchResults,
        setIsSearching,
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
