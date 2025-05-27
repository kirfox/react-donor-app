import { useDonor } from "../context/donor-context";
import "../index.css";
import BloodTypePicker from "./BloodTypePicker";
import MapComponent from "./MapComponent";

export default function Info() {
  const { searchResults } = useDonor();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 50,
      }}
    >
      <BloodTypePicker></BloodTypePicker>
      {searchResults.length !== 0 ? (
        <MapComponent searchResults={searchResults}></MapComponent>
      ) : (
        <></>
      )}
    </div>
  );
}
