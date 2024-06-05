import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from '../layout/App'
import ActivityDashboard from "../../features /activities/dashbord/ActivityDashboard";
import ActivityForm from "../../features /activities/form/ActivityForm";
import ActivityDetails from "../../features /activities/details/ActivityDetails";
import TestError from "../../features /Errors/TestError";
import NotFound from "../../features /Errors/NotFound";
import ServerError from "../../features /Errors/ServerError";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
           
            {
                path: 'activities',
                element: <ActivityDashboard />
            }, 
            {
                path: 'activities/:id',
                element: <ActivityDetails />
            },
            {
                path: 'createActivity',
                element: <ActivityForm key={"createActivity"}/>
            },
            {
                path: 'manageActivity/:id',
                element: <ActivityForm key={"manage"} />
            },
            {
                path: 'errors',
                element: <TestError />
            },
            {
                path: 'not-found',
                element: <NotFound />
            },
            {
                path: 'server-error',
                element: <ServerError />
            },
            {
                path: '*',
                element: <Navigate replace to={'/not-found'}/>
            }
            
        ]
    }


]
export const  router = createBrowserRouter(routes);