import React, {useRef} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
const NewProject = (props) => {
    const projectTitle = useRef();
    const projectSector = useRef();
    const projectBudget = useRef();
    const projectFunds = useRef();
    const projectRegion = useRef();
    const projectAgency = useRef();
    const projectManager = useRef();
    const projectStart = useRef();
    const projectEnd = useRef();
    const projectStatus = useRef();
    const projectURL = useRef();

    const sendToBlockChain = async () => {
        let manpower = (Math.random() * (0.4-0.15) + 0.15).toFixed(3)
        let logistics = (Math.random() * (0.45-0.2) + 0.2).toFixed(3)
        let misc = 1 - manpower-logistics
        manpower = (projectBudget.current.value * manpower).toFixed(3)
        logistics = (projectBudget.current.value * logistics).toFixed(3)
        misc = (projectBudget.current.value * misc).toFixed(3)
        let proj = JSON.stringify({
            title: projectTitle.current.value,
            sector: projectSector.current.value,
            budget: projectBudget.current.value,
            funds: projectFunds.current.value,
            region: projectRegion.current.value,
            agency: projectAgency.current.value,
            manager: projectManager.current.value,
            start: projectStart.current.value,
            end: projectEnd.current.value,
            status: projectStatus.current.value,
            url: projectURL.current.value,
            manpower: manpower,
            logistics: logistics,
            misc: misc
        })
        //console.log(proj);
        
        await window.contract.addToProjectList({
            project:proj
        }
        );
        
        
    }
    return (
        <Container style={{marginTop:"10px", width:'70%'}}>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Project Title</Form.Label>
                    <Form.Control ref={projectTitle} placeholder="Enter Project Title">

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Project Sector</Form.Label>
                    <Form.Control ref={projectSector} placeholder="Enter Project Sector">

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Project Budget</Form.Label>
                    <Form.Control ref={projectBudget} placeholder="Enter Project Budget (e.g. 24)">

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Project Funds (Source of funds) </Form.Label>
                    <Form.Control ref={projectFunds} placeholder="Enter Project Funds (e.g. Canada)">

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Project Region</Form.Label>
                    <Form.Control ref={projectRegion} placeholder="Enter Project Region (e.g. NCR)">

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Project Agency</Form.Label>
                    <Form.Control ref={projectAgency} placeholder="Enter Project Agency (e.g. DOExample)">

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Project Manager</Form.Label>
                    <Form.Control ref={projectManager} placeholder="Enter Project Manager (e.g. Harry Household)">

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Project Start</Form.Label>
                    <Form.Control ref={projectStart} placeholder="Enter Project Start (e.g. 2069)">

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Project End</Form.Label>
                    <Form.Control ref={projectEnd} placeholder="Enter Project End (e.g. 2070)">

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Project Status</Form.Label>
                    <Form.Control ref={projectStatus} placeholder="Enter Status (e.g Ongoing)">

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control ref={projectURL} placeholder="Enter Image URL">

                    </Form.Control>
                </Form.Group>
            </Form>
            <Button variant='primary' className="primary--bg" onClick={sendToBlockChain}>Submit</Button>
        </Container>
    );
};


export default NewProject;