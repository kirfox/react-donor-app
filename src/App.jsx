import { DonorContextProvider } from "./context/donor-context";
import Info from "./components/Info";

const App = () => (
  <DonorContextProvider>
    <Info></Info>
  </DonorContextProvider>
);
export default App;
