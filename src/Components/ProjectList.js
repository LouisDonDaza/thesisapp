import React, {useState, useEffect} from 'react';
import {Table, Container, Button, Card, Row, Col} from  'react-bootstrap';
import { Link } from "react-router-dom";
const ProjectList = (props) => {
    const [projList, changeProjList]=useState([{title:'Region IV Metro Line 7',
                                                sector:'Mass Transit',
                                                budget:'10',
                                                funds:'Philippines',
                                                region:'Region IV',
                                                agency:'DOExam',
                                                manager:'Billy Builds',
                                                start:'2021',
                                                end:'2023',
                                                status:'Ongoing',
                                                index:'0'},
                                                {title:'Region V Metro Station 7',
                                                sector:'Mass Transit',
                                                budget:'2',
                                                funds:'Singapore',
                                                region:'Region V',
                                                agency:'DOExam',
                                                manager:'Almeda Turf',
                                                start:'2024',
                                                end:'2025',
                                                status:'Pipeline for Approval',
                                                index:'1'},
                                                {title:'Laptops for High Schoolers',
                                                sector:'Education',
                                                budget:'3.5',
                                                funds:'Japan',
                                                region:'Region II',
                                                agency:'DOExam',
                                                manager:'Carlo Castles',
                                                start:'2024',
                                                end:'2025',
                                                status:'Pipeline for Approval',
                                                index:'2'}]);
    

    /*
    useEffect(async ()=>{
        changePromptList(await window.contract.getAllPrompt())
        "Who is the better bob?", "Which application is your favorite?",
    }, []);*/
    useEffect(() => {
        const getPrompts = async () => {
          let projectString = await window.contract.getAllProjects();
          let projects = projectString.map(project=>{
            return JSON.parse(project)
          })
          changeProjList(projects);
        };
        getPrompts();
      }, []);
    return (
        <Container>
            <h3 className="mt-2">Featured Projects</h3>
            <Row>
                <Col md={4}>
                    <Link to={`/projects/2`}>
                        <Card>
                            <Card.Img variant="top" src="https://media.discordapp.net/attachments/1040657808179335299/1060781491640082452/Best-School-Laptop-2020.png?width=1005&height=670" />
                            <Card.Body>
                                <Card.Title>Laptops for Youth</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4}>
                    <Link to={`/projects/1`}>
                        <Card>
                            <Card.Img variant="top" src="https://media.discordapp.net/attachments/1040657808179335299/1060779027083829278/lrt1-new-train-012621.png?width=1005&height=670" />
                            <Card.Body>
                                <Card.Title>Region V Metro Line 5</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4}>
                    <Link to={`/projects/3`}>
                        <Card>
                            <Card.Img variant="top" src="https://media.discordapp.net/attachments/1040657808179335299/1060782856609214474/pexels-photo-3912479.png?width=1004&height=670" />
                            <Card.Body>
                                <Card.Title>Biodiversity Assessment</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>
            <h3 className="mt-2">Trending Projects</h3>
            <Row>
                <Col md={4}>
                    <Link to={`/projects/0`}>
                        <Card>
                            <Card.Img variant="top" src="https://media.discordapp.net/attachments/1040657808179335299/1060770097347706880/2_trains.png" />
                            <Card.Body>
                                <Card.Title>Region IV Metro Line 7</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4}>
                    <Link to={`/projects/6`}>
                        <Card>
                            <Card.Img variant="top" src="https://media.discordapp.net/attachments/1040657808179335299/1060817049200369664/pexels-photo-3619870.png?width=1005&height=670" />
                            <Card.Body>
                                <Card.Title>Wind Power Plant Development</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4}>
                    <Link to={`/projects/4`}>
                        <Card>
                            <Card.Img variant="top" src="https://media.discordapp.net/attachments/1040657808179335299/1060814488594550814/pexels-photo-4386466.png?width=1005&height=670" />
                            <Card.Body>
                                <Card.Title>Health Financing</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>
            <Table style={{marginTop:"5vh"}} striped bordered hover>
                <thead className='thead-light'>
                    <tr>
                        <th>Project</th>
                        <th>Sector</th>
                        <th>Budget "Bln Pesos"</th>
                        <th>Funding Source</th>
                        <th>Region</th>
                        <th>Implementation Agency</th>
                        <th>Manager</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {projList.map((el, index)=>{
                        return (
                            <tr key={index}>
                            <td><Link to={`/projects/${el.index}`}>{el.title}</Link></td>
                            <td>{el.sector}</td>
                            <td>{el.budget}</td>
                            <td>{el.funds}</td>
                            <td>{el.region}</td>
                            <td>{el.agency}</td>
                            <td><Link to={`/organization/${el.manager}`}>{el.manager} </Link></td>
                            <td>{el.start}</td>
                            <td>{el.end}</td>
                            <td>{el.status}</td>
                        </tr>
                        );  
                    })
                }
                </tbody>
            </Table>
        </Container>
    );
}
export default ProjectList;