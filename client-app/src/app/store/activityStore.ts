import {  makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid'; 

export default class ActivityStore {
ActivityRegistry = new Map<string,Activity>();
 selectedActivity: Activity | undefined  = undefined;
 loading = false;
 editMode = false
 loadingInitial = true;
 submitting = false;


    constructor(){
      makeAutoObservable(this)
    }

    get activitiesByDate () {
      return Array.from(this.ActivityRegistry.values())
      .sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async() => {
     try {
        const activities =  await agent.Activities.list()
        runInAction(() => {
           activities.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        this.ActivityRegistry.set(activity.id, activity);
        })
      
     }) 
     this.setLoadingInitial(false);
     } catch (error) {
   console.log(error);
      this.setLoadingInitial(false);
      
        
    }
   
    }
    setLoadingInitial = (state: boolean) => {
      this.loadingInitial = state;
    }


    selectActivity = (id : string) => {
     this.selectedActivity=  this.ActivityRegistry.get(id);
     
    }
    
    cancelSelectedActivity = () => {
      this.selectedActivity = undefined;
    }

    openForm = (id? : string) =>{
      id? this.selectActivity(id) : this.cancelSelectedActivity();
       this.editMode = true;
    }

    closeForm = () => {
      this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
      this.loading = true;
      activity.id = uuid();
      await agent.Activities.create(activity);
      try {
         runInAction(() => {
         this.ActivityRegistry.set(activity.id, activity);
         this.selectedActivity = activity;
         this.editMode = false;
         this.loading = false;

      })
      } catch (error) {
        console.log(error);
        runInAction(() => {
          
          this.loading = false;
        })
        
      }
     
    }

    updateActivity = async (activity: Activity) => {
      this.loading = true;
      
      try {
        await agent.Activities.update(activity);
         runInAction(() => {
       this.ActivityRegistry.set(activity.id, activity);
       this.selectedActivity = activity;
       this.loading = false;
       this.editMode = false;

      })
      } catch (error) {
        console.log(error) 
        runInAction(() => {
          this.loading = false;
        })
      }
     
    }

    deleteActivity = (id: string) => {
      this.loading = true;
      try {
         agent.Activities.delete(id);
      runInAction(() => {
        this.ActivityRegistry.delete(id);
        this.loading = false
       
      })
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.loading = false;
        })
      }
     
    }


 }




