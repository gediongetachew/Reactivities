import { useEffect} from 'react';
import { Container } from 'semantic-ui-react';

import NavBar from './NavBar';
import ActivityDashboard from '../../features /activities/dashbord/ActivityDashboard';

import LoadingComponent from './LoadingComponent';
import { useStore } from '../store/store';
import { observer } from 'mobx-react-lite';


function App() {
  const {ActivityStore}= useStore();


useEffect(() =>{
  ActivityStore.loadActivities();
},[ActivityStore])

 
if(ActivityStore.loadingInitial)  return <LoadingComponent content='Loading...'/>

  return (
    <>
    <NavBar/>
    <Container style={{marginTop: '7em'}}>
      <ActivityDashboard 
      
      />
    </Container> 
    </>
  )
     
}
export default observer(App)
