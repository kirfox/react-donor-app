import { useDonor } from "../context/donor-context";

import "../index.css";
import Dept from "./Dept";
import BloodTypePicker from "./BloodTypePicker";

export default function Info() {
  const { searchResults, isSearching } = useDonor();

  return (
    <div>
      {searchResults.length === 0 || isSearching ? (
        <BloodTypePicker></BloodTypePicker>
      ) : (
        <Dept searchResults={searchResults}></Dept>
      )}
    </div>
  );
}
