import { Button, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';

function ActivityDetails () {
   
   const {ActivityStore} = useStore();
   const {selectedActivity: activity, openForm, cancelSelectedActivity} = ActivityStore;

    if(!activity) return <LoadingComponent content={'this is just to remove an error it wont load'} />;

    return (
        <Card fluid>
           <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
           <Card.Content>
              <Card.Header>{activity.title}</Card.Header>
              <Card.Meta>
                 <span>{activity.date}</span>
              </Card.Meta>
              <Card.Description>
                 {activity.description}
              </Card.Description>
           </Card.Content>
           <Card.Content extra>
               <Button.Group width='2' fluid>
                  <Button onClick={()=> openForm(activity.id)} basic color='blue' content='Edit' />
                  <Button onClick={()=> cancelSelectedActivity()} basic color='grey' content='Cancel' />
                  
               </Button.Group>
           </Card.Content>
        </Card>
    )
}

export default ActivityDetails