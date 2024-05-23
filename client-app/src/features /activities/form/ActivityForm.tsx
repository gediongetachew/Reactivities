import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import { Activity } from "../../../app/models/activity";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';





function ActivityForm () {
    const {ActivityStore} = useStore();
    const {createActivity,updateActivity, loadActivity, loadingInitial} = ActivityStore;
    const {id} = useParams();
    const navigate = useNavigate();
    
   const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue:''
   });

useEffect(() => {
    if(id) loadActivity(id).then((activity)=> setActivity(activity!));
}, [id, loadActivity])


function handleSubmit () {

if(!activity.id){
    activity.id = uuid()
    createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
 }else{
    updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
 }
}
 

function handleFormChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {

     const {name,value} = event.target;

     setActivity({...activity,[name] : value});
}

// function handleCancel () {
//     navigate('/activities')
// }

 
 if(loadingInitial) return <LoadingComponent content="Loading" />


    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
               <Form.Input placeholder="Title" value={activity.title} name='title' onChange={handleFormChange}/>
               <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleFormChange}/>
               <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleFormChange}/>
               <Form.Input type='date' placeholder='Date' value={activity.date} name='date'onChange={handleFormChange}/>
               <Form.Input placeholder='City' value={activity.city} name='city'onChange={handleFormChange}/>
               <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleFormChange}/>
               <Button  loading={ActivityStore.loading} floated='right' positive type='submit' content='Submite' />
               <Button as={NavLink} to={'/activities'} floated='right'  type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)

