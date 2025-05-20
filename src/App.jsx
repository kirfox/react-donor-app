import { DonorContextProvider } from "./context/donor-context";
import Info from "./components/Info";
import MapComponent from "./components/mapComponent";
import { Map, YMaps } from "@pbe/react-yandex-maps";

const App = () => (
  
  
   <DonorContextProvider>
    
    <Info></Info>  
    {/* <YMaps query={{apikey: import.meta.env.VITE_API_KEY}}> 
      <MapComponent></MapComponent>
    </YMaps> */}
  </DonorContextProvider> 
  

  
);
export default App;
