
import { logging, PersistentMap } from 'near-sdk-as'

//store feedback on project 
const ProjectInfo = new PersistentMap<string, string>("store individual projects");
const ProjectList = new PersistentMap<string, string[]>("store projectlist");
const FeedbackArray = new PersistentMap<string, i32[]>("store feedback");
const userFeedbackGiven = new PersistentMap<string, string[]>("user Participation Record");
const FeedbackTally = new PersistentMap<string, string[][]>("yes");
const ManagerInfo = new PersistentMap<string, string>("store individual managers");
const ManagerList = new PersistentMap<string, string[]>("store manager list");
// VIEW METHODS
// Does not change state of the blockchain
// Does not incur a fee
//Pulls and reads information from blockchain

// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!


export function getFeedback(project:string):i32[] {
  if(FeedbackArray.contains(project)){
    return FeedbackArray.getSome(project);
  }else{
    logging.log('prompt not found for this feedback');
    return[0,0];
  }
}
export function getProject(project:string):string {
  if(ProjectInfo.contains(project)){
    return ProjectInfo.getSome(project);
  }else{
    logging.log('prompt not found for this feedback');
    return '';
  }
}
export function getAllProjects():string[] {
  if(ProjectList.contains('AllArrays')){
    return ProjectList.getSome("AllArrays");
  }else{
    logging.log('no prompts found');
    return [];
  }
}
export function getProjectLength():i32 {
  if(ProjectList.contains('AllArrays')){
    logging.log(ProjectList.getSome("AllArrays"))
   
    return 1;
  }else{
    logging.log('no projects found');
    return 0;
  }
}
export function getProjectInfoLength():i32 {
  if(ProjectInfo.contains('AllArrays')){
    logging.log(ProjectInfo.getSome("AllArrays"))
    logging.log('checking project info')
    logging.log(ProjectInfo)
    return 1;
  }else{
    logging.log('no projects found');
    return 0;
  }
}
export function getFeedbackTally(user: string):string[][]{
  if(FeedbackTally.contains(user)){
    return FeedbackTally.getSome(user);
  }else{
    logging.log(`can't find that user`)
    return [];
  }
}
export function didProvideFeedback(project:string, user:string):bool{
  if(userFeedbackGiven.contains(project)){
    let getArray=userFeedbackGiven.getSome(project);
    return getArray.includes(user);
  }else{
    logging.log('prompt not found');
    return false
  }
}
export function getManagerInfo(manager:string):string{
  if(ManagerInfo.contains(manager)){
    return ManagerInfo.getSome(manager);
  }else{
    logging.log(`can't find that manager`)
    return '';
  }
}
export function getAllManagers():string[] {
  if(ManagerList.contains('AllArrays')){
    return ManagerList.getSome("AllArrays");
  }else{
    logging.log('no prompts found');
    return [];
  }
}
//Change Methods
//Changes state of blockchain
//costs a transaction fee to do so
//Adds or modifies information to blockchain

//------------------------------------------
export function addFeedback(project:string, index:i32):void {
  if(FeedbackArray.contains(project)){
    let tempArray = FeedbackArray.getSome(project)
    let tempVal=tempArray[index];
    let newVal = tempVal+1;
    tempArray[index]=newVal;
    FeedbackArray.set(project, tempArray);
  }else{
    let newArray=[0,0];
    newArray[index]=1;
    FeedbackArray.set(project, newArray);
  }
}
export function setFeedbackTally(user: string, project: string, feedback: string):void{
  if(FeedbackTally.contains(user)){
    let tempArray = FeedbackTally.getSome(user);
    tempArray.push([project, feedback]);
    FeedbackTally.set(user, tempArray);
  }else{
    let tempArray = [[project,feedback]];
    FeedbackTally.set(user, tempArray);
  }
}
export function recordUserFeedback(project:string, user:string):void{
  if(userFeedbackGiven.contains(project)){
    let tempArray = userFeedbackGiven.getSome(project);
    tempArray.push(user);
    userFeedbackGiven.set(project,tempArray);
  }else{
    userFeedbackGiven.set(project, [user]);
  }
  logging.log('recorded user feedback participation')
}
export function addToProjectList(project: string):void
{
  
  logging.log('added to project array');
  if(ProjectList.contains("AllArrays")){
    let listLength = ProjectList.getSome("AllArrays").length
    let projectAdded = project.slice(0,-1) + `,"index":"${listLength}"}` 
    let tempArray = ProjectList.getSome("AllArrays")
    tempArray.push(projectAdded)
    ProjectList.set("AllArrays",tempArray);
    //weird bug where the string had a \
    //e.g. {\"title\":\"Region V Metro Line5\",\"sector\":\"Mass ""
    //projectAdded = projectAdded.replace('\'',"")
    ProjectInfo.set(`${listLength}`, projectAdded)
  }else{
    let listLength = 0;
    let projectAdded = project.slice(0,-1) + `,"index":"${listLength}"}`
    ProjectList.set("AllArrays", [projectAdded])
    //projectAdded = projectAdded.replace('\'',"")
    ProjectInfo.set(`${listLength}`, projectAdded)
  }
}
export function addToManagerList(orgInfo: string, organization:string):void{
  logging.log('added to manager array');
  if(ManagerList.contains("AllArrays")){
    let listLength = ManagerList.getSome("AllArrays").length
    let managerAdded = orgInfo.slice(0,-1) + `,"index":"${listLength}"}` 
    let tempArray = ManagerList.getSome("AllArrays")
    tempArray.push(managerAdded)
    ManagerList.set("AllArrays",tempArray);
    
    ManagerInfo.set(organization, managerAdded)
  }else{
    let listLength = 0;
    let managerAdded = orgInfo.slice(0,-1) + `,"index":"${listLength}"}`
    ManagerList.set("AllArrays", [managerAdded])
    //projectAdded = projectAdded.replace('\'',"")
    ManagerInfo.set(organization, managerAdded)
  }
}
export function clearProjectArray():void{
  logging.log('clearing prompt array');
  ProjectList.delete("AllArrays")
}
export function clearProjectInfoList():void{
  logging.log('clearing prompt array');
  ProjectInfo.delete("AllArrays")

}
export function clearManagerInfo(manager:string):void{
  logging.log('clearing Manager info array');
  ManagerInfo.delete(manager)
}
export function clearManagerList():void{
  logging.log('clearing Manager List array');
  ManagerList.delete("AllArrays")
}
export function clearFeedbackArray(project:string):void{
  logging.log('clearing feedback array for given project');
  FeedbackArray.delete(project)
}
export function clearFeedbackGiven(project:string):void{
  logging.log('clearing feedback given (checker) for project');
  userFeedbackGiven.delete(project)
}
export function clearFeedbackTally(user:string):void{
  logging.log('clearing feedback tally of user');
  FeedbackTally.delete(user)
}
/*
export function getProject(prompt:string):Object {
  if(ProjectDetail.contains(prompt)){
    return ProjectDetail.getSome(prompt);
  }else{
    logging.log('prompt not found for this feedback');
    return{};
  }
}
export function addToProjectList(project: Object):void
{
  logging.log('added to project array');
  if(ProjectDetail.contains("AllArrays")){
    let tempArray = ProjectDetail.getSome("AllArrays")
    tempArray.push(project)
    ProjectDetail.set("AllArrays",tempArray);
  }else{
    ProjectDetail.set("AllArrays", [project])
  }
}
*/

const CandidateURL=new PersistentMap<string, string>("CandidateURL");
const CandidatePair = new PersistentMap<string, string[]>("Canidate Pair");
const PromptArray = new PersistentMap<string, string[]>("array of prompts");
const VoteArray = new PersistentMap<string, i32[]>("store votes");
const userParticipation = new PersistentMap<string, string[]>("user Participation Record");
const VotesTally = new PersistentMap<string, string[][]>("yes");


export function getUrl(name:string):string {
  if(CandidateURL.contains(name)){
    return CandidateURL.getSome(name)
  }else{
    logging.log(`can't find that user`)
    return ''
  }
}
export function getVotesTally(user: string):string[][]{
  if(VotesTally.contains(user)){
    return VotesTally.getSome(user);
  }else{
    logging.log(`can't find that user`)
    return [];
  }
}
export function didParticipate(prompt:string, user:string):bool{
  if(userParticipation.contains(prompt)){
    let getArray=userParticipation.getSome(prompt);
    return getArray.includes(user);
  }else{
    logging.log('prompt not found');
    return false
  }
}
export function getAllPrompt():string[] {
  if(PromptArray.contains('AllArrays')){
    return PromptArray.getSome("AllArrays");
  }else{
    logging.log('no prompts found');
    return [];
  }
}

export function getVotes(prompt:string):i32[] {
  if(VoteArray.contains(prompt)){
    return VoteArray.getSome(prompt);
  }else{
    logging.log('prompt not found for this vote');
    return[0,0];
  }
}
export function getCandidatePair(prompt:string):string[]{
  if(CandidatePair.contains(prompt)){
    return CandidatePair.getSome(prompt);
  }else{
    logging.log('record not found')
    return []
  }
}
export function getPromptLength():i32 {
  if(PromptArray.contains('AllArrays')){
    logging.log(PromptArray.getSome("AllArrays"))
   
    return PromptArray.getSome("AllArrays").length;
  }else{
    logging.log('no prompts found');
    return 0;
  }
}


//-------------------------------------------------

export function addUrl(name:string, url:string):void{
  CandidateURL.set(name,url),
  logging.log('added url for ' + name);
}
export function addCandidatePair(prompt:string, name1:string, name2: string):void{
  CandidatePair.set(prompt, [name1, name2])

}
export function addToPromptArray(prompt:string):void{
  logging.log('added to prompt array');
  if(PromptArray.contains("AllArrays")){
    let tempArray = PromptArray.getSome("AllArrays")
    tempArray.push(prompt)
    PromptArray.set("AllArrays",tempArray);
  }else{
    PromptArray.set("AllArrays", [prompt])
  }
}
//
export function addVote(prompt:string, index:i32):void {
  if(VoteArray.contains(prompt)){
    let tempArray = VoteArray.getSome(prompt)
    let tempVal=tempArray[index];
    let newVal = tempVal+1;
    tempArray[index]=newVal;
    VoteArray.set(prompt, tempArray);
  }else{
    let newArray=[0,0];
    newArray[index]=1;
    VoteArray.set(prompt, newArray);
  }
}
export function setVotesTally(user: string, prompt: string, vote: string):void{
  if(VotesTally.contains(user)){
    let tempArray = VotesTally.getSome(user);
    tempArray.push([prompt, vote]);
    VotesTally.set(user, tempArray);
  }else{
    let tempArray = [[prompt,vote]];
    VotesTally.set(user, tempArray);
  }
}
export function recordUser(prompt:string, user:string):void{
  if(userParticipation.contains(prompt)){
    let tempArray = userParticipation.getSome(prompt);
    tempArray.push(user);
    userParticipation.set(prompt,tempArray);
  }else{
    userParticipation.set(prompt, [user]);
  }
}