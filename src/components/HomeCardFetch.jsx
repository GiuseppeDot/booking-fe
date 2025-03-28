import { useEffect, useState } from "react";
import RoomList from "./RoomList"; // Modifica il percorso secondo la tua struttura

function HomeCardFetch() {
  const [roomsData, setRoomsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzQyNDc3NDkzLCJleHAiOjE3NDI0ODEwOTN9.z6RcZ-e4mJLvd-XKAwlSvPV3UG8AnegWU5d5mKo7v9U";

  useEffect(() => {
    const controller = new AbortController();

    fetch("http://localhost:8080/api/rooms", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Errore HTTP! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log("dati ricevuti", data);
        setRoomsData(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setError(error.message);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [token]);

  if (loading) return <div>Caricamento in corso...</div>;
  if (error) return <div>Errore: {error}</div>;

  return (
    <div>
      <h2 className="mb-4">Elenco Stanze</h2>
      <RoomList data={roomsData} />
    </div>
  );
}

export default HomeCardFetch;
