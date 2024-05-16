import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

interface Props {
    activity: Activity | undefined
    closeForm: () => void
    createOrEdit: (activity: Activity) => void
    submitting: boolean

}


function ActivityForm ({activity: selectedActivity, closeForm, createOrEdit, submitting}: Props) {
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date:'',
        description:'',
        category:'',
        city:'',
        venue:'',
    }
    
const [activity,setActivity] = useState(initialState)

function handleFormChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {

     const {name,value} = event.target;

     setActivity({...activity,[name] : value});
}

function handleSubmit () {
   createOrEdit(activity);
}



    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
               <Form.Input placeholder="Title" value={activity.title} name='title' onChange={handleFormChange}/>
               <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleFormChange}/>
               <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleFormChange}/>
               <Form.Input type='date' placeholder='Date' value={activity.date} name='date'onChange={handleFormChange}/>
               <Form.Input placeholder='City' value={activity.city} name='city'onChange={handleFormChange}/>
               <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleFormChange}/>
               <Button loading={submitting} floated='right' positive type='submit' content='Submite' />
               <Button onClick={ closeForm} floated='right'  type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}

export default ActivityForm