import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';
import NavBar from '../../../app/layout/NavBar';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';



function ActivityDashboard () {

    const {ActivityStore} = useStore();
    const {loadActivities,ActivityRegistry} = ActivityStore


useEffect(() =>{
   if(ActivityRegistry.size <= 1) loadActivities();
  },[ActivityRegistry.size ,ActivityRegistry])
  
   
  if(ActivityStore.loadingInitial)  return <LoadingComponent content='Loading App...'/>
  
    return (
        <Grid>
            <NavBar />
            <Grid.Column width='10'>
              <ActivityList
             
             />
            </Grid.Column>
            <Grid.Column width={'6'}>
               <h2>Actvity filters</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard) 