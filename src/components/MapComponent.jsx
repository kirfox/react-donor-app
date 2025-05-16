import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

export default function MapComponent() {

  const arr = [
    [55.684758, 37.738521],
    [55.684758, 37.628521],
    [55.684758, 37.608521]
  ]
  


  const item = arr.map((coord, index) => (

     <Placemark key={index} geometry={coord} />

  ));


    return(
        
    <div>
      My awesome application with maps!
      <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} >
        {item}
      </Map>
      
    </div>
 
    )
}