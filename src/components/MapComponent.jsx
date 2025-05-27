import { YMaps, Map, Placemark, useYMaps } from "@pbe/react-yandex-maps";
import { useEffect, useState } from "react";
import { useDonor } from "../context/donor-context";

const Geocoder = ({ searchResults, onGeocodeComplete }) => {
  const ymaps = useYMaps(["geocode"]);
  const [progress, setProgress] = useState(0);

  const addresses = searchResults.map(
    (dept) => "г. Москва, " + dept.data.address.split("\n")[0].trim()
  );

  useEffect(() => {
    if (!ymaps) return;

    const geocodeAll = async () => {
      const results = [];
      for (let i = 0; i < addresses.length; i++) {
        try {
          const res = await ymaps.geocode(addresses[i], {
            boundedBy: [
              [41.18, 19.38], // Границы РФ
              [81.85, 180.0],
            ],
            strictBounds: true,
          });

          const firstGeoObject = res.geoObjects.get(0);

          if (firstGeoObject) {
            const country = firstGeoObject.getCountry();
            if (country === "Россия") {
              results.push({
                name: searchResults[i].data.title,
                coords: firstGeoObject.geometry.getCoordinates(),
                url: searchResults[i].data.url,
              });
            } else {
              console.warn(`Адрес вне РФ: ${addresses[i]} (${country})`);
            }
          }
        } catch (error) {
          console.error(`Ошибка геокодирования: ${addresses[i]}`, error);
        }
        setProgress(((i + 1) / addresses.length) * 100);
      }
      onGeocodeComplete(results);
    };

    geocodeAll();
  }, [ymaps, searchResults, onGeocodeComplete]);
};

export default function MapComponent({ searchResults }) {
  const [coordinates, setCoordinates] = useState([]);
  const { setIsSearching } = useDonor();
  return (
    <YMaps
      query={{ apikey: import.meta.env.VITE_API_KEY, load: "package.full" }}
    >
      <div style={{ width: "80%", height: "60vh" }}>
        {coordinates.length === 0 ? (
          <Geocoder
            searchResults={searchResults}
            onGeocodeComplete={setCoordinates}
          />
        ) : (
          <Map
            defaultState={{
              center: coordinates[0].coords || [55.75, 37.61],
              zoom: 10,
            }}
            width="100%"
            height="100%"
          >
            {coordinates.map((item, index) => {
              setIsSearching(false);
              return (
                <Placemark
                  key={index}
                  geometry={item.coords}
                  properties={{
                    balloonContent: `<a href="${item.url}" target='blank'>${item.name}</a>`,
                    hintContent: item.name,
                  }}
                  options={{
                    preset: "islands#redDotIcon",
                    balloonCloseButton: true,
                  }}
                  modules={["geoObject.addon.balloon"]}
                />
              );
            })}
          </Map>
        )}
      </div>
    </YMaps>
  );
}
