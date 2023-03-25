import React, {useState, useEffect} from 'react';
import {Card, Container, ProgressBar} from  'react-bootstrap';
import { useParams } from 'react-router-dom'

const OrganizationInfo = (props) => {
    const [ratings, changeRatings] = useState(84.5);
    const [orgInfo, changeOrgInfo] = useState({organization:"Almeda Turf", ProjManager:"Almeda Airlines", url: "https://media.discordapp.net/attachments/1040657808179335299/1089072402597691452/premium_photo-1661775317533-2163ba4dbc93.png?width=997&height=662", highlighted_projects: "Region V Metro Line 5", country:"Indonesia", status:"Active", Ratings:"87.3"})
    const { organization } = useParams()
    useEffect(() => {
      console.log(organization)
      const getPrompts = async () => {
        let result = await window.contract.getManagerInfo({manager:organization});
        result = JSON.parse(result);
        changeOrgInfo(result);
      };
      getPrompts();
    }, []);
    
    return(
       
        <Container className="mt-3">
                    <Card className="mt-3" style={{width: '70%', margin: '0 auto'}}>
                        <Card.Img variant="top" src={orgInfo.url} />
                            <Card.Body>
                                <Card.Title>{organization}</Card.Title>
                                <Card.Text>
                                Managed by: {orgInfo.ProjManager} <br></br>
                                Renowned Projects: {orgInfo.highlighted_projects}<br></br>
                                Base Country: {orgInfo.country}<br></br>
                                Status: {orgInfo.status}<br></br>
                                </Card.Text>
                                <Card.Text>Ratings: {orgInfo.Ratings}%</Card.Text>
                                <ProgressBar now={orgInfo.Ratings} className="mb-2"/>
                                
                            </Card.Body>
                    </Card>
                    
        </Container>
    );
};
export default OrganizationInfo;