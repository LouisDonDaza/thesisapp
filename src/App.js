import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// components
import Home from './Components/Home';
import NewPoll from './Components/NewPoll';
import PollingStation from './Components/PollingStation';
import VoteCheck from './Components/VoteCheck';
import Landing from './Components/Landing';
import BuildList from './Components/BuildList';
import ProjectList from './Components/ProjectList';
import BuildForm from './Components/BuildForm';
import NewProject from './Components/NewProject';
import ProjectInfo from './Components/ProjectInfo';
import OrganizationInfo from './Components/OrganizationInfo';
import ProfileInfo from './Components/ProfileInfo';
//images
//import BlockLogo from "./assets/blocklogoicon.png";
import BlockLogo2 from "./assets/blocklogoicon2.png";
//import BlockLogo3 from "./assets/blocklogoicon3.png";
import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  const changeCandidatesFunction = async (prompt) => {
    let namePair = await window.contract.getCandidatePair({prompt:prompt})
    localStorage.setItem("Candidate1", namePair[0]);
    localStorage.setItem("Candidate2", namePair[1]);
    localStorage.setItem("prompt", prompt);
    window.location.replace(window.location.href+"PollingStation")
  }
  return (<Router>
    <Navbar className="primary--bg" collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/projects"><img src={BlockLogo2} style={{height:'2rem', width:'auto'}}></img></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mx-auto">
    </Nav>
    <Nav>
      {window.accountId==='loid.testnet'? <Nav.Link href='/NewPoll'>New Poll</Nav.Link>: null}
      
      <NavDropdown title="IELEC" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/projects">
                Projects
              </NavDropdown.Item>
              {window.accountId==='loid.testnet' ? 
              <NavDropdown.Item href="/NewProject">
                New Project
              </NavDropdown.Item>:null}
              <NavDropdown.Divider />
              {window.accountId==='loid.testnet' ? 
              <NavDropdown.Item href="/votecheck">
              Feedback Check
            </NavDropdown.Item>:null}
            </NavDropdown>
      <NavDropdown title={window.accountId==='' ? 'Login': window.accountId} id="navbarScrollingDropdown">
              {window.accountId==='' ? null:
              <NavDropdown.Item href="/profile">
                Profile
              </NavDropdown.Item>}
              <NavDropdown.Item onClick={window.accountId===''?login:logout} >
              {window.accountId==='' ? 'Login':'Logout'}
              </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
<Routes>
  <Route exact path ='/'element={window.accountId===""?<Landing/>: <ProjectList/> }>
  </Route>
  <Route exact path="/testing" element={<Home changeCandidates={changeCandidatesFunction}/>}> </Route>
  <Route  exact path="/PollingStation" element={<PollingStation/>}>
    
  </Route>
  <Route  exact path="/NewPoll" element={<NewPoll/>}> </Route>
  <Route  exact path="/votecheck" element={<VoteCheck/>}></Route>
  <Route  exact path="/landing" element={<Landing/>}></Route>
  <Route  exact path="/buildlist" element={<BuildList/>}> </Route>
  <Route  exact path="/projects" element={<ProjectList/>}> </Route>
  <Route  exact path="/buildform" element={<BuildForm/>}> </Route>
  <Route  exact path="/NewProject" element={<NewProject/>}> </Route>
  <Route  exact path="/profile" element={<ProfileInfo/>}> </Route>
  <Route  path="/projects/:id" element={<ProjectInfo/>}> </Route>
  <Route  path="/organization/:organization" element={<OrganizationInfo/>}> </Route>
</Routes>
  </Router>);
}
/*
<Navbar className="primary--bg" collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/projects"><img src={BlockLogo} style={{height:'2rem', width:'auto'}}></img></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mx-auto">
    </Nav>
    <Nav>
      {window.accountId==='loid.testnet'? <Nav.Link href='/NewPoll'>New Poll</Nav.Link>: null}
      <Nav.Link href='/votecheck'>Vote Check</Nav.Link>
      <NavDropdown title="IELEC" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/buildlist">Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="/build">
                Build
              </NavDropdown.Item>
              <NavDropdown.Item href="/projects">
                Projects
              </NavDropdown.Item>
              <NavDropdown.Item href="/NewProject">
                New Project
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/buildform">
                New Build Form
              </NavDropdown.Item>
            </NavDropdown>
      
      <Nav.Link onClick={window.accountId===''?login:logout}>
        {window.accountId===""? "Login": window.accountId}
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
*/