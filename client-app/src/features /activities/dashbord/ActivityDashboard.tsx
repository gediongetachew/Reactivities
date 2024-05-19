import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';
import NavBar from '../../../app/layout/NavBar';



function ActivityDashboard () {

    const {ActivityStore} = useStore();
    const {selectedActivity, editMode} = ActivityStore
    return (
        <Grid>
            <NavBar />
            <Grid.Column width='10'>
              <ActivityList
             
             />
            </Grid.Column>
            <Grid.Column width={'6'}>
                {selectedActivity && !editMode &&
                <ActivityDetails />}
                {ActivityStore.editMode &&
                <ActivityForm  />}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard) 