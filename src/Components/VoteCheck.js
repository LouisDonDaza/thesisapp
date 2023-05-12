import React,  {useRef, useState} from 'react';
import {Table, Container, Form, Button, Row, Col} from  'react-bootstrap';
const VoteCheck = (props) => {
    const [validated, changeValidated] = useState(false);
    const user = useRef();
    const [votesList, changeVotesList] = useState([["Who would win in Smash bros?", "Your mum"]]);

    const callBlockChain = async () => {
        let  results = await window.contract.getFeedbackTally({
            user:user.current.value
        });
        
       console.log("Your votes are : " + results);
       if(results.length > 0){
        changeValidated(true);
        changeVotesList(results);
       }
       
    }
    const submitEntry = async (e) => {
        e.preventDefault()
        console.log(e)
        if (e.key === 'Enter') {
            console.log('Entered')
            callBlockChain()
          }
    }
    return (
        <Container style={{marginTop:"10px"}}>
            <Row>
                <Col className='justify-content-center d-flex'><h2>Vote Checker</h2></Col>
            </Row>
            
                <Form.Group className="mb-3">
                    <Form.Label>Account ID</Form.Label>
                    <Form.Control ref={user} placeholder="Enter Account ID" onKeyUp={submitEntry}>

                    </Form.Control>
                </Form.Group>
                
            
            <Button variant='primary' className="primary--bg" onClick={callBlockChain}>Submit</Button>
            {validated?<Table style={{margin:"5vh"}} striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Project</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {votesList.map((el, index)=>{
                        return (
                            <tr key={index}>
                            <td>{index+1}</td>
                            <td>{el[0]}</td>
                            <td>{el[1]}</td>
                        </tr>
                        );  
                    })
                }
                </tbody>
            </Table>:<p>You have not provided any feedback so far.</p>}
        </Container>
    );
};


export default VoteCheck;