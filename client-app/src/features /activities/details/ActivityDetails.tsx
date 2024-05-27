import { Grid, GridColumn } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import {  useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsSideBar from './ActivityDetailsSideBar';

function ActivityDetails () {
   
   const {ActivityStore} = useStore();
   const {selectedActivity: activity, loadingInitial, loadActivity} = ActivityStore;
   const {id} = useParams();


useEffect(() => {
      if(id) loadActivity(id);
   }, [id,loadActivity])

    if(loadingInitial || !activity) return <LoadingComponent content={'Loading Activity'} />;

    return (
       <Grid>
         <GridColumn width={'10'}>
            <ActivityDetailsHeader activity={activity} />
            <ActivityDetailsInfo activity={activity} />
            <ActivityDetailsChat />
         </GridColumn>
         <GridColumn width={'6'}>
            <ActivityDetailsSideBar />
         </GridColumn>
       </Grid>
    )
}

export default observer(ActivityDetails) 