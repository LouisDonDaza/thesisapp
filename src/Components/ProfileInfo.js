import React,  {useEffect, useRef, useState} from 'react';
import {Table, Container, Row, Col} from  'react-bootstrap';
const VoteCheck = (props) => {
    const [validated, changeValidated] = useState(false);
    const user = useRef();
    const [votesList, changeVotesList] = useState([["Who would win in Smash bros?", "Your mum"]]);
    useEffect(()=>{
        const callBlockChain = async () => {
            let  results = await window.contract.getFeedbackTally({
                user:window.accountId
            });
            
           console.log("Your votes are : " + results);
           if(results.length > 0){
            changeValidated(true);
            changeVotesList(results);
           }
           
        }
        callBlockChain()
    })
    
    return (
        <Container style={{marginTop:"10px"}}>
            <Row>
                <Col className='justify-content-center d-flex'><h2>Vote Checker</h2></Col>
            </Row>
            {validated?<div>
                    <p>Displaying feedback for user: <b>{window.accountId}</b></p>
                    <Table style={{margin:"5vh"}} striped bordered hover>
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
                    </Table>
            </div>:<p>You have not provided any feedback so far.</p>}
        </Container>
    );
};


export default VoteCheck;