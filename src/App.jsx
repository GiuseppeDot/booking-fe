import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "./components/CustomNavbar";
//import HomeCard from "./components/HomeCard";
import { Container, Row, Col } from "react-bootstrap";
import HomeCardFetch from "./components/HomeCardFetch";
import RoomCards from "./components/RoomCards";
import RoomList from "./components/RoomList";

function App() {
  return (
    <>
      <header>
        <CustomNavbar />
      </header>
      <main>
        <Container>
          <Row>
            <Col xs={12} md={6} lg={4} className="mt-3">
              <HomeCardFetch />
              <RoomList />
            </Col>
          </Row>
        </Container>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
