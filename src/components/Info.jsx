import { useDonor } from "../context/donor-context";

import "../index.css";
import Dept from "./Dept";
import BloodTypePicker from "./BloodTypePicker";
import MapComponent from "./mapComponent";
import { YMaps } from "@pbe/react-yandex-maps";

export default function Info() {
  const { searchResults, isSearching } = useDonor();
  
  return (
    <div  style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {/* {searchResults.length === 0 || isSearching ? (
        <BloodTypePicker></BloodTypePicker>
      ) : (
        <Dept searchResults={searchResults}></Dept>
      )} */}

    {/* {searchResults.length === 0 || isSearching ? (
        <BloodTypePicker></BloodTypePicker>
      ) : (
          
            <MapComponent searchResults={searchResults}></MapComponent>
         
      )} */}
     <BloodTypePicker></BloodTypePicker>
     {searchResults.length !== 0 ? (<MapComponent  searchResults={searchResults}></MapComponent>): <></>}
          
    </div>
  );
}



