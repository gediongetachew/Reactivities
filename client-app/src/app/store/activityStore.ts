import {  makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid'; 
import { format } from "date-fns";

export default class ActivityStore {
ActivityRegistry = new Map<string,Activity>();
 selectedActivity: Activity | undefined  = undefined;
 loading = false;
 editMode = false
 loadingInitial = false;
 submitting = false;


    constructor(){
      makeAutoObservable(this)
    }

    get activitiesByDate () {
      return Array.from(this.ActivityRegistry.values())
      .sort((a,b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupedActivites () {
      return Object.entries(
        this.activitiesByDate.reduce((activities, activity) => {
          const date = activity.date!.toISOString().split('T')[0];
          activities[date!] = activities[date!] ? [...activities[date!], activity] : [activity]
          return activities
        },{} as {[key: string] : Activity[]})
      )
    }

    loadActivities = async() => {
      this.setLoadingInitial(true);
     try {
        const activities =  await agent.Activities.list()
        runInAction(() => {
           activities.forEach(activity => {
           this.setActivity(activity);
           this.setLoadingInitial(false);
        })
      
     }) 
    
     } catch (error) {
   console.log(error);
      this.setLoadingInitial(false);
      
        
    }
   
    }
   
    loadActivity = async(id: string) => {
      
       let activity = this.ActivityRegistry.get(id) ;
       if(activity) {
        this.selectedActivity = activity;
         return activity;
       } 

       else {
        this.setLoadingInitial(true);
        try {
          activity = await agent.Activities.details(id);
          this.setActivity(activity);
          runInAction(() => {this.selectedActivity = activity;})
          this.setLoadingInitial(false) 
          return activity; 
        }
         catch (error) {
          console.log(error)
          this.setLoadingInitial(false);
        }
       }
       
    }
  
    private setActivity = (activity: Activity) => {
        activity.date = new Date(activity.date!);
        this.ActivityRegistry.set(activity.id, activity);
    }
     
    private setLoadingInitial = (state: boolean) => {
      this.loadingInitial = state;
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




