import { Activity } from '../../../app/models/activity';
import { Button, Item, ItemGroup, Label, Segment } from 'semantic-ui-react';

interface props {
    activities: Activity[],
    handleSelectedActivity: (id:string) => void
    deleteActivity: (id: string) => void

}


function ActivityList ({activities, handleSelectedActivity,deleteActivity}:props) {
    return (
         <Segment>
            <ItemGroup divided >
                {activities.map(activity => 
                <Item key={activity.id}>
                    <Item.Content>
                    <Item.Header as='a'>{activity.title}</Item.Header>
                    <Item.Meta>{activity.date}</Item.Meta>
                    <Item.Description>
                        <div>{activity.description}</div>
                        <div>{activity.city},{activity.venue}</div>
                    </Item.Description>
                    <Item.Extra>
                        <Button  onClick={()=> handleSelectedActivity(activity.id)} floated='right' content="View" color='blue' />
                        <Button  onClick={()=>deleteActivity(activity.id)} floated='right' content="Delete" color='red' />
                        <Label content={activity.category} />
                    </Item.Extra>
                </Item.Content> 
                </Item>
              
                )}
            </ItemGroup>
         </Segment>
    )
}

export default ActivityList