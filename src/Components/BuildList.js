import React, {useState, useEffect} from 'react';
import {Card, Container, Button, Row, Col} from  'react-bootstrap';

const BuildList = (props) => {
    const [Builds, updateBuildsList] = useState([{version: 1, title: 'Initial Build', description: 'Laying out the groundwork for the project'},
    {version: 2, title: 'Prototype Build', description: 'Added necessary components to develop project for testing and review'},
    {version: 3, title: 'Developmental Build', description: 'Worked further on the functions of the project to enhance user experience'},
    {version: 4, title: 'Implementation Build', description: 'Finally got around to doing what was needed, hooray'},
    {version: 5, title: 'Prototype Build', description: 'Added necessary components to develop project for testing and review'},
    {version: 6, title: 'Developmental Build', description: 'Worked further on the functions of the project to enhance user experience'},
    {version: 7, title: 'Implementation Build', description: 'Finally got around to doing what was needed, hooray'},])
    const [LatestBuild, updateLatestBuild] = useState(Builds[Builds.length-1])
    const selectBuild =  ()=>{
        console.log('going to build')
        window.location.replace(window.location.origin+"/build")
    }
    return(
       
        <Container className="mt-3">
            <Card >
                <Card.Header as="h5">Build {LatestBuild.version}</Card.Header>
                <Card.Body>
                    <Card.Title>{LatestBuild.title}</Card.Title>
                    <Card.Text>
                    Description: {LatestBuild.description}
                    </Card.Text>
                    <Card.Text>
                    Location: General Trias, Cavite
                    </Card.Text>
                    <Card.Text>
                    Organizer: Insert Company Corporation
                    </Card.Text>
                    <Button variant="primary" onClick={selectBuild}>More</Button>
                </Card.Body>
            </Card>
            <Row xs={1} md={8} className=" g-4">
            {Builds.slice(0, Builds.length -1).reverse().map((b, index, array)=>{
                return(
                   
                    <Col md={3} >
                        <Card className="mt-3" style={{height: '100%'}}>
                            <Card.Header as="h5">Build {b.version}</Card.Header>
                            <Card.Body>
                                <Card.Title>{b.title}</Card.Title>
                                <Card.Text>
                                {b.description}
                                </Card.Text>
                                <Button variant="primary">More</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )
                
            })}
            </Row>
        </Container>
    );
};
export default BuildList;