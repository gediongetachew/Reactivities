import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import { Activity } from "../../../app/models/activity";
import { Form, NavLink, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';
import { Formik } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { options } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

function ActivityMyTextInput() {
    const { ActivityStore } = useStore();
    const { createActivity, updateActivity, loadActivity, loadingInitial } = ActivityStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        category: Yup.string().required('Category is required'),
        date: Yup.string().required('Date is required').nullable(),
        city: Yup.string().required('City is required'),
        venue: Yup.string().required('Venue is required')
    });

    useEffect(() => {
        if (id) loadActivity(id).then((activity) => setActivity(activity!));
    }, [id, loadActivity]);

    function handleSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }

    if (loadingInitial) return <LoadingComponent content="Loading" />;

    return (
        <Segment clearing>
            <Header sub color="teal" content='Activity Details' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={activity}
                onSubmit={value => handleSubmit(value)}
            >
                {({ handleSubmit, isSubmitting, dirty, isValid }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput name="title" placeHolder="Title" />
                        <MyTextArea placeHolder='Description' name='description' row='3' />
                        <MySelectInput options={options} placeHolder='Category' name='category'/>
                        <MyDateInput placeholderText='Date' name='date' showTimeSelect timeCaption="time" dateFormat={'MMMM d, yyyy h:mm aa'} />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeHolder='City' name='city'  />
                        <MyTextInput placeHolder='Venue' name='venue' />
                        <Button disabled={isSubmitting || !isValid || !dirty} loading={ActivityStore.loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={NavLink} to={'/activities'} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    );
}

export default observer(ActivityMyTextInput);
