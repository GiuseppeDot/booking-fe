// HomeCardList.jsx
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";

function HomeCard() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzQyNDc3NDkzLCJleHAiOjE3NDI0ODEwOTN9.z6RcZ-e4mJLvd-XKAwlSvPV3UG8AnegWU5d5mKo7v9U";

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch("http://localhost:8080/api/rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setRooms(data);
      } catch (error) {
        setError(error.message);
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Row>
        {rooms.map((room) => (
          <Col key={room.id} md={4} className="mb-4">
            <HomeCard
              title={room.name}
              description={room.description}
              imageUrl={room.image}
              buttonText="View Details"
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomeCard;

// function HomeCard() {

// const [rooms setRooms] = useState([])

//   return (
//     <Card>
//       <Card.Img variant="top" src="holder.js/100px180" />
//       <Card.Body>
//         <Card.Title>Card Title</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Button variant="primary">Go somewhere</Button>
//       </Card.Body>
//     </Card>
//   );
// }

// export default HomeCard;
