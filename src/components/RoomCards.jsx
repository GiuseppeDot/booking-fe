import { useEffect, useState } from "react";

function RoomCards() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzQyNDc3NDkzLCJleHAiOjE3NDI0ODEwOTN9.z6RcZ-e4mJLvd-XKAwlSvPV3UG8AnegWU5d5mKo7v9U";

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Errore HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        setRooms(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (isLoading) {
    return <div>Caricamento in corso...</div>;
  }

  if (error) {
    return <div>Errore: {error}</div>;
  }

  return (
    <div className="rooms-container">
      {rooms.map((room) => (
        <Card key={room.id}>
          <Card.Img variant="top" src={room.imageUrl} />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              {room.type}
              <p>{room.price}/notte</p>
            </Card.Text>
            <Button variant="primary">Prenota</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default RoomCards;
