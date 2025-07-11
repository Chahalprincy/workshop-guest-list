import { useEffect,useState } from "react";
import GuestList from "./components/GuestList";
import GuestDetails from "./components/GuestDetails";

const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2506-PRINCY";
const RESOURCE = "/guests";
const API = BASE + COHORT + RESOURCE; 

export default function App() {
  const [guests, setGuests] = useState([]);
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [guestDetails, setGuestDetails] = useState(null);

  useEffect(() => {
  async function fetchGuests() {
    try {
      const response = await fetch(API);
      const result = await response.json();
      setGuests(result.data); // Adjust depending on shape of data
    } catch (error) {
      console.error("Failed to fetch guests", error);
    }
  }

  fetchGuests();
}, []);

  useEffect(() => {
  if (selectedGuestId === null) return;

  async function fetchGuestDetails() {
    try {
      const response = await fetch(`${API}/${selectedGuestId}`);
      const result = await response.json();
      setGuestDetails(result.data); 
    } catch (error) {
      console.error("Failed to fetch guest details", error);
    }
  }

  fetchGuestDetails();
}, [selectedGuestId]);

  return (
  <div>
    {selectedGuestId === null ? (
      <GuestList guests={guests} onSelect={setSelectedGuestId} />
    ) : guestDetails === null ? (
      <p>Loading guest details...</p>
    ) : (
      <GuestDetails
        guest={guestDetails}
        onBack={() => {
          setSelectedGuestId(null);
          setGuestDetails(null);
        }}
      />
    )}
  </div>
);
}

