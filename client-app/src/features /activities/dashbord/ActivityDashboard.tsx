import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';


interface props {
    activities: Activity[],
    selectedActivity: Activity | undefined,
    handleSelectedActivity: (id:string) => void,
    handleCancelSelectedActivity: () => void
    editMode: boolean
    openForm: (id:string) => void 
    closeForm: () => void
    createOrEdit: (activity: Activity) => void
    deleteActivity: (id: string) => void
    submitting: boolean
}

function ActivityDashboard ({activities, selectedActivity,handleSelectedActivity,handleCancelSelectedActivity,
                            editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting
}: props) {
    return (
        <Grid>
            <Grid.Column width='10'>
              <ActivityList 
              activities={activities} 
              handleSelectedActivity={handleSelectedActivity} 
              deleteActivity={deleteActivity}
              submitting />
            </Grid.Column>
            <Grid.Column width={'6'}>
                {selectedActivity && !editMode &&
                <ActivityDetails
                   activity={selectedActivity} 
                   handleCancelSelectedActivity={handleCancelSelectedActivity}
                   openForm={openForm}/>}
                {editMode &&
                <ActivityForm submitting={submitting} closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard