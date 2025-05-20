import { useDonor } from "../context/donor-context";

import "../index.css";
import Dept from "./Dept";
import BloodTypePicker from "./BloodTypePicker";
import MapComponent from "./mapComponent";
import { YMaps } from "@pbe/react-yandex-maps";

export default function Info() {
  const { searchResults, isSearching } = useDonor();
  
  return (
    <div>
      {/* {searchResults.length === 0 || isSearching ? (
        <BloodTypePicker></BloodTypePicker>
      ) : (
        <Dept searchResults={searchResults}></Dept>
      )} */}

    {searchResults.length === 0 || isSearching ? (
        <BloodTypePicker></BloodTypePicker>
      ) : (
          // <YMaps query={{apikey: import.meta.env.VITE_API_KEY}}> 
            <MapComponent searchResults={searchResults}></MapComponent>
          // </YMaps>
      )}
     
    
          
    </div>
  );
}



