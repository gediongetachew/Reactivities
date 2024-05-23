import { Button, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

function ActivityDetails () {
   
   const {ActivityStore} = useStore();
   const {selectedActivity: activity, loadingInitial, loadActivity} = ActivityStore;
   const {id} = useParams();


useEffect(() => {
      if(id) loadActivity(id);
   }, [id,loadActivity])

    if(loadingInitial || !activity) return <LoadingComponent content={'Loading Activity'} />;

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
                  <Button as={Link} to={`/manageActivity/${id}`} basic color='blue' content='Edit' />
                  <Button as={Link} to={'/activities'} basic color='grey' content='Cancel' />
                  
               </Button.Group>
           </Card.Content>
        </Card>
    )
}

export default observer(ActivityDetails) 