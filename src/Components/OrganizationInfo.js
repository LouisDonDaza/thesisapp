import React, {useState, useEffect} from 'react';
import {Card, Container, ProgressBar} from  'react-bootstrap';
import { useParams } from 'react-router-dom'

const OrganizationInfo = (props) => {
    const [ratings, changeRatings] = useState(84.5);
    const { organization } = useParams()
    useEffect(() => {
      console.log(organization)
      
    }, []);
    
    return(
       
        <Container className="mt-3">
                    <Card className="mt-3" style={{width: '70%', margin: '0 auto'}}>
                        <Card.Img variant="top" src={`https://media.discordapp.net/attachments/1040657808179335299/1060786803105349693/pexels-photo-1216589.png?width=1005&height=670`} />
                            <Card.Body>
                                <Card.Title>{organization}</Card.Title>
                                <Card.Text>
                                Managed by: Billy Bobz <br></br>
                                Renowned Projects: Region IV Metro Line 7<br></br>
                                Base Country: Philippines<br></br>
                                Status: Hello<br></br>
                                </Card.Text>
                                <Card.Text>Ratings: {ratings}%</Card.Text>
                                <ProgressBar now={ratings} className="mb-2"/>
                                
                            </Card.Body>
                    </Card>
                    
        </Container>
    );
};
export default OrganizationInfo;