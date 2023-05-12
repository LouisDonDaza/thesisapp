import React, {useState, useEffect} from 'react';
import {Card, Container, Button, Row, Col, ProgressBar, Alert} from  'react-bootstrap';
import { useParams } from 'react-router-dom'
import { PieChart } from "react-minimal-pie-chart";
import { login } from '../utils'

const ProjectInfo = (props) => {
    const [project, changeProject] = useState({"title":"Region IV Metro Line 7","sector":"Mass Transit","budget":"10","funds":"Philippines","region":"Region IV","agency":"DOExam","manager":"Billy Builds","start":"2021","end":"2023","status":"Ongoing","index":"0", "url":"https://media.discordapp.net/attachments/1040657808179335299/1089041580595355758/Saly-1.png?width=606&height=606"});
    const [ratings, changeRatings] = useState(80.6);
    const [voted, changeVotedStatus] = useState(false);
    const { id } = useParams()
    let sett = ['Logistics', 'Manpower', 'Misc']
    useEffect(() => {
      const getPrompts = async () => {
        let result = await window.contract.getProject({project:id});
        

        result = JSON.parse(result);
        changeProject(result);
        localStorage.setItem("project", result.title);
        if(window.accountId===''){
          changeVotedStatus(true);
        }else{
          let didUserVote = await window.contract.didProvideFeedback({
            project: result.title,
            user: window.accountId,
          });
          changeVotedStatus(didUserVote);
        }
        let feedback = await window.contract.getFeedback({project: result.title});
        console.log('feedback: ', feedback)
        if (feedback[1]==0){
          console.log(feedback)
          changeRatings(100)
        }else{
          changeRatings(feedback[0]/(feedback[0]+feedback[1]) * 100)
        }
      };
      getPrompts();
      
    }, []);
    const addVote=async(index)=>{
       
        let remark = index ? 'Disapprove' : 'Approve'
        changeVotedStatus(true);
        await window.contract.addFeedback({
            project: localStorage.getItem("project"),
            index:Number(index)
        })
        await window.contract.recordUserFeedback({
          project: localStorage.getItem("project"),
          user:window.accountId
        })
        
        await window.contract.setFeedbackTally({
            user: window.accountId,
            project: localStorage.getItem("project"),
            feedback: remark
        })
        changeRatings(feedback[0]+1/(feedback[0]+feedback[1]+1) * 100)
        console.log('voted')
    }
    return(
       
        <Container className="mt-3">
          <h2>{project.title}</h2>
          <img src={`${project.url}`} alt="Responsive image" style={{width:'auto', height:'55vh', margin:'0 auto', display:'block'}}></img>
          <Row className="my-3" >
            <Col style={{margin:'0 auto', display:'block'}}>
              {window.accountId===""? <Alert variant={'warning'}>
          You must be logged in to cast your vote. Pls try again. 
          <Alert.Link onClick={login}>Log in now</Alert.Link>.
        </Alert>:null }
            {voted && window.accountId!==""? <Alert variant={'success'}>
            Log [dev-1665068648944-83303412206156]: Your vote has successfully been casted to the blockchain.
        </Alert>:null }
            <Button variant="success" disabled={voted} style={{marginLeft:'25vw'}} onClick={()=>addVote(0)}>Approve</Button>
            <Button variant="danger" disabled={voted} style={{marginLeft:'5vw'}} onClick={()=>addVote(1)}>Disapprove</Button>
            </Col>
            
          </Row>
          <Row style={{margin:'0 auto'}}>
                <Col md={3}className="my-3">
                  <Card className="p-4" style={{height: '100%'}}>
                  <i className="fas fa-user-tie" style={{fontSize:'2rem', color:'gray'}}></i>
                  <Card.Text style={{color:'gray'}} className="my-1">Managed by:</Card.Text>
                  <Card.Text style={{fontSize:'1.4rem', fontWeight:'bold'}}>{project.manager}</Card.Text>
                  </Card>
                </Col>
                <Col md={3}className="my-3">
                  <Card className="p-4" style={{height: '100%'}}>
                  <i className="fas fa-calendar-alt" style={{fontSize:'2rem', color:'gray'}}></i>
                  <Card.Text style={{color:'gray'}} className="my-1">Start</Card.Text>
                  <Card.Text style={{fontSize:'1.4rem', fontWeight:'bold'}}>{project.start}</Card.Text>
                  </Card>
                </Col>
                <Col md={3}className="my-3">
                  <Card className="p-4" style={{height: '100%'}}>
                  <i className="fas fa-cut" style={{fontSize:'2rem', color:'gray'}}></i>
                  <Card.Text style={{color:'gray'}} className="my-1">End</Card.Text>
                  <Card.Text style={{fontSize:'1.4rem', fontWeight:'bold'}}>{project.end}</Card.Text>
                  </Card>
                </Col>
                <Col md={3}className="my-3">
                  <Card className="p-4" style={{height: '100%'}}>
                  <i className="fas fa-tasks" style={{fontSize:'2rem', color:'gray'}}></i>
                  <Card.Text style={{color:'gray'}} className="my-1">Status</Card.Text>
                  <Card.Text style={{fontSize:'1.4rem', fontWeight:'bold'}}>{project.status}</Card.Text>
                  </Card>
                </Col>

                <Col md={3}>
                  <Card className="p-4" style={{height: '100%'}}>
                  <i className="fas fa-donate" style={{fontSize:'2rem', color:'gray'}}></i>
                  <Card.Text style={{color:'gray'}} className="my-1">Budget "Bln Pesos"</Card.Text>
                  <Card.Text style={{fontSize:'1.4rem', fontWeight:'bold'}}>{project.budget}</Card.Text>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="p-4" style={{height: '100%'}}>
                  <i className="fas fa-hands-helping" style={{fontSize:'2rem', color:'gray'}}></i>
                  <Card.Text style={{color:'gray'}} className="my-1">Funds</Card.Text>
                  <Card.Text style={{fontSize:'1.4rem', fontWeight:'bold'}}>{project.funds}</Card.Text>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="p-4" style={{height: '100%'}}>
                  <i className="fas fa-globe" style={{fontSize:'2rem', color:'gray'}}></i>
                  <Card.Text style={{color:'gray'}} className="my-1">Agency</Card.Text>
                  <Card.Text style={{fontSize:'1.4rem', fontWeight:'bold'}}>{project.agency}</Card.Text>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="p-4" style={{height: '100%'}}>
                  <i className="fas fa-smile" style={{fontSize:'2rem', color:'gray'}}></i>
                  <Card.Text style={{color:'gray'}} className="my-1">Ratings: {ratings}%</Card.Text>
                  <ProgressBar now={ratings} className="mb-2"/>
                  </Card>
                </Col>
          </Row>
          
            <Row style={{justifyContent:'align-center'}}>
                <Col md={12}>
                <h3 style={{textAlign:'center'}} className="mt-2">Budget Overview</h3>
                <PieChart
                style={{
                    fontFamily:
                      '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                    fontSize: '6px', width:'auto', height:'70vh', margin:'0 auto', display:'block'
                  }}
                data={[
                    { title: `${project.logistics} Bln Pesos`, value: Number(project.logistics), color: '#E38627', label:'Food' },
                    { title: `${project.manpower} Bln Pesos`, value: Number(project.manpower), color: '#C13C37' },
                    { title: `${project.misc} Bln Pesos`, value: Number(project.misc), color: '#6A2135' },
                  ]}
                  lineWidth={60}
                  radius={40}
                  label={({ dataIndex, dataEntry }) => sett[dataIndex]+ ": " + Math.round(dataEntry.percentage) + '%'}
                  labelPosition={100 - 60 / 2}
                    labelStyle={{
                        fill: '#000',
                        opacity: 0.75,
                        pointerEvents: 'none',
                    }}
                    />        
                </Col>
            </Row>
        </Container>
    );
};
export default ProjectInfo;