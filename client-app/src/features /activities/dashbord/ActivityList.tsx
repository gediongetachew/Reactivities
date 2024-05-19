import { SyntheticEvent, useState } from 'react';
import { Button, Item, ItemGroup, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';



function ActivityList () {
    
    const [target, setTarget] = useState('');
    const {ActivityStore} = useStore();
    const {activitiesByDate,loading, deleteActivity} = ActivityStore;


    function handleDeleteActivity (e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
        
    }
    return (
         <Segment>
            <ItemGroup divided >
                {activitiesByDate.map(activity => 
                <Item key={activity.id}>
                    <Item.Content>
                    <Item.Header as='a'>{activity.title}</Item.Header>
                    <Item.Meta>{activity.date}</Item.Meta>
                    <Item.Description>
                        <div>{activity.description}</div>
                        <div>{activity.city},{activity.venue}</div>
                    </Item.Description>
                    <Item.Extra>
                        <Button  onClick={()=> ActivityStore.selectActivity(activity.id)} floated='right' content="View" color='blue' />
                        <Button name={activity.id}  onClick={(e)=>handleDeleteActivity(e,activity.id)} loading={loading && target === activity.id} floated='right' content="Delete" color='red' />
                        <Label content={activity.category} />
                    </Item.Extra>
                </Item.Content> 
                </Item>
              
                )}
            </ItemGroup>
         </Segment>
    )
}

export default observer(ActivityList);