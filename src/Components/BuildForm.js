import React, { Component } from "react";
import {Col, Container, Button, Row, Form} from  'react-bootstrap';

class BuildForm extends Component {
    constructor() {
      super();
      this.state = {
        queries: ['How satisfied are you with the management?', 'How well does the project meet your expectations', 'Does the project comply with what is needed?', 'How sufficient are the quality tests being done at the moment?']
      };
      this.onValueChange = this.onValueChange.bind(this);
      this.formSubmit = this.formSubmit.bind(this);
    }
  
    onValueChange(event) {
        const prompt = event.target.name
        //console.log(event.target)
      this.setState({
        [prompt]: event.target.value
      });
    }
  
    formSubmit(event) {
      event.preventDefault();
      console.log(this.state)
    }
  
    render() {
      return (
          <Container className="justify-content-center mt-3">
          <Form onSubmit={this.formSubmit}>
         
         <fieldset>
         {this.state.queries.map((query, index)=>{

                return (
                    <fieldset key={index}>
                    <Form.Group className="mb-3" >
                     <Row>
                         <Form.Label as="legend" column>
                         {query}
                         </Form.Label>
                     </Row>
  
                 <Row md={5} sm={3}>
                     <Form.Check
                     type="radio"
                     label="1 (Least)"
                     value="1"
                     name={"formHorizontalRadios1"+ index}
                     checked={this.state["formHorizontalRadios1"+ index] === "1"}
                     onChange={this.onValueChange}
                     id={"formHorizontalRadios1"+ index}
                     />
                     <Form.Check
                     type="radio"
                     label="2 (Somewhat)"
                     value="2"
                     name={"formHorizontalRadios1"+ index}
                     checked={this.state["formHorizontalRadios1"+ index] === "2"}
                     onChange={this.onValueChange}
                     id={"formHorizontalRadios2" + index }
                     />
                     <Form.Check
                     type="radio"
                     label="3 (Average)"
                     value="3"
                     name={"formHorizontalRadios1"+ index}
                     checked={this.state["formHorizontalRadios1"+ index] === "3"}
                     onChange={this.onValueChange}
                     id={"formHorizontalRadios3" + index }
                     />
                     <Form.Check
                     type="radio"
                     label="4 (Likely)"
                     value="4"
                     name={"formHorizontalRadios1"+ index}
                     checked={this.state["formHorizontalRadios1"+ index] === "4"}
                     onChange={this.onValueChange}
                     id={"formHorizontalRadios4" + index}
                     />
                     <Form.Check
                     type="radio"
                     label="5 (Highly)"
                     value="5"
                     name={"formHorizontalRadios1"+ index}
                     id={"formHorizontalRadios5" + index }
                     checked={this.state["formHorizontalRadios1"+ index] === "5"}
                     onChange={this.onValueChange}
                     />
                 </Row>
                 </Form.Group>
                </fieldset>
                );
            })}
                 
                 
             </fieldset>
        <Form.Group as={Row} className="mb-3">
             <Col sm={{ span: 10 }}>
             <Button type="submit">Submit</Button>
             </Col>
         </Form.Group>
         </Form>
     </Container>
      );
    }
  }
  
  export default BuildForm;
 