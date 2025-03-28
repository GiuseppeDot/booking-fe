import React from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";

const RoomList = ({ data }) => {
  if (!data?.content || data.content.length === 0) {
    return <div>Nessuna stanza disponibile</div>;
  }

  return (
    <Container>
      <Row xs={1} md={1} lg={3} className="g-4 d-flex ">
        {data.content.map((stanza) => (
          <Col key={stanza.id}>
            <Card className="h-100 shadow">
              <Card.Img
                variant="top"
                src={stanza.imageUrl}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>
                  Stanza #{stanza.roomNumber}
                  <span
                    className={`ms-2 badge ${
                      stanza.available ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {stanza.available ? "Disponibile" : "Esaurita"}
                  </span>
                </Card.Title>

                <Card.Subtitle className="mb-2 text-muted">
                  Tipo: {stanza.type}
                </Card.Subtitle>

                <Card.Text className="mt-auto">
                  <span className="h4 text-primary d-block mb-2">
                    €{stanza.price.toFixed(2)}/notte
                  </span>
                  <Button variant="primary" className="mt-2">
                    Prenota Ora
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RoomList;
