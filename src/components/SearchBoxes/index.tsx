import { Container, Form, Row, Col } from 'react-bootstrap';

function SearchBoxes(props: any) {
  return (
    <Container>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom05">
          <Form.Label>Search by Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={'Introduce a name to search'}
            value={props.title}
            onChange={e => {
              props.setTitle(e.currentTarget.value)
            }}
            className="name-input remove-height"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom06">
          <Form.Label>Search by Age</Form.Label>
          <Form.Control
            type="text"
            placeholder={'Introduce an age to search'}
            value={props.age}
            disabled={props.enableAge}
            onChange={e => {
              if (e.currentTarget.value.length < 3) props.setAge(e.currentTarget.value)
              if (e.currentTarget.value === "7") props.setEnableAge(true);
            }}
            className="name-input remove-height"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid age.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </Container>
  );
}

export default SearchBoxes;
