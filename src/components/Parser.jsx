import React, { useEffect, useState } from 'react';
import axios from 'axios';
/*
const Parser = () => {

  const [data, setData] = useState('');
  const [items, setItems] = useState([]);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Делаем запрос к прокси-серверу
        const response = await axios.get('http://localhost:5000/proxy');
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(response.data, 'text/html');

        // Пример: извлекаем заголовок страницы
        const title = htmlDocument.querySelector('title').textContent;
        setData(title);

        // Пример: извлекаем все элементы с классом .some-class
        // const items = htmlDocument.querySelectorAll('.js-points-link-first');
        
        // items.forEach((item) => {
        //   dept.push(item)
        // });
        const elements = Array.from(htmlDocument.querySelectorAll('.js-points-link-first')).map(
          
          
          (element) => {
            console.log(element);
            
            return element.textContent
          }
        );
        setItems(elements);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      <h1>Parsed Data:</h1>
      <p>{data}</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
*/

// App.jsx



export default function Parser() {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/donor-points');
        if (response.data.success) {
          setPoints(response.data.data);
        } else {
          setError(response.data.error);
        }
      } catch (err) {
        setError('Не удалось загрузить данные');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="donor-points">
      <h1>Пункты сдачи крови</h1>
      <div className="points-list">
        {points.map((point, index) => (
          <div key={index} className="point-card">
            <h3>{point.title}</h3>
            <p>{point.address}</p>
            {point.phone && <p>Телефон: {point.phone}</p>}
            {point.link && (
              <a href={point.link} target="_blank" rel="noopener noreferrer">
                Подробнее
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}




