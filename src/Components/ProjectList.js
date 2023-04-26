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
                    <Link to={`/projects/4`}>
                        <Card>
                            <Card.Img variant="top" src="https://media.discordapp.net/attachments/1040657808179335299/1100813157557088307/photo-1473876637954-4b493d59fd97.png?width=827&height=606" />
                            <Card.Body>
                                <Card.Title>Mindanao I Geothermal Plant</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                
                <Col md={4}>
                    <Link to={`/projects/0`}>
                        <Card>
                            <Card.Img variant="top" src="https://media.discordapp.net/attachments/1040657808179335299/1100807612959838318/photo-1551322127-bc5c4f4700d0.png?width=910&height=606" />
                            <Card.Body>
                                <Card.Title>Boracay Bridge Project</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4}>
                    <Link to={`/projects/6`}>
                        <Card>
                            <Card.Img variant="top" src="https://media.discordapp.net/attachments/1040657808179335299/1100815919007154196/premium_photo-1661698845550-6d0689adb388.png?width=910&height=606" />
                            <Card.Body>
                                <Card.Title>Database Infrastructure and Information Technology System</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>
            <h3 className="mt-2">Trending Projects</h3>
            <Row>
                <Col md={4}>
                    <Link to={`/projects/3`}>
                        <Card>
                            <Card.Img variant="top" src="https://media.discordapp.net/attachments/1040657808179335299/1100812177201442926/photo-1438550005440-ca2422768342.png?width=910&height=606" />
                            <Card.Body>
                                <Card.Title>Cavite-Laguna Expressway (CALAX)</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4}>
                    <Link to={`/projects/5`}>
                        <Card>
                            <Card.Img variant="top" src="https://media.discordapp.net/attachments/1040657808179335299/1100814738692259982/photo-1527822618093-743f3e57977c.png?width=910&height=606" />
                            <Card.Body>
                                <Card.Title>PPP for School Infrastructure Project Phase I (PSIP I) – Package A</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4}>
                    <Link to={`/projects/7`}>
                        <Card>
                            <Card.Img variant="top" src="https://media.discordapp.net/attachments/1040657808179335299/1060786803105349693/pexels-photo-1216589.png?width=908&height=606" />
                            <Card.Body>
                                <Card.Title>Bulacan Bulk Water Supply Project</Card.Title>
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
                        <th>Private Proponent (Manager)</th>
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
                            <td><a href={`${el.agencyURL}`} target="_blank">{el.agency}</a></td>
                            <td>{el.manager}</td>
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