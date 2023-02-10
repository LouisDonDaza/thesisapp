import React, {useState, useEffect} from 'react';
import {Table, Container, Button, Card} from  'react-bootstrap';

const Build = (props) => {
    const [promptList, changePromptList]=useState(['How important is security?', 'Which part of system is needed', 'Does the application comply with what is needed?', 'How sufficient are the quality tests being done at the moment?']);
    const [teamVotes, changeTeamVotes]=useState([3,4,4,3]);
    const [marketingVotes, changeMarketingVotes]=useState([4,2,5,3]);
    const [QAVotes, changeQAVotes]=useState([2,4,3,4]);
    const [securityVotes, changeSecurityVotes]=useState([5,4,3,3]);

    /*
    useEffect(async ()=>{
        changePromptList(await window.contract.getAllPrompt())
        "Who is the better bob?", "Which application is your favorite?",
    }, []);*/
    return (
        <Container>
            <Card bg={'info'} style={{marginTop:'2vh'}}>
                <Card.Header as="h5">Build 7</Card.Header>
                <Card.Body>
                    <Card.Title>Lorem Ipsum</Card.Title>
                    <Card.Text>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                    </Card.Text>
                    <Button variant="warning" text="white">Archive</Button>
                </Card.Body>
            </Card>
            <Table style={{marginTop:"5vh"}} striped bordered hover>
                <thead>
                    <tr>
                        <th>Prompts</th>
                        <th>Team Lead</th>
                        <th>Marketing</th>
                        <th>Quality</th>
                        <th>Security</th>
                    </tr>
                </thead>
                <tbody>
                    {promptList.map((el, index)=>{
                        return (
                            <tr key={index}>
                            <td>{el}</td>
                            <td >{teamVotes[index]}</td>
                            <td>{marketingVotes[index]}</td>
                            <td>{QAVotes[index]}</td>
                            <td>{securityVotes[index]}</td>
                        </tr>
                        );  
                    })
                }
                </tbody>
            </Table>
        </Container>
    );
}
export default Build;