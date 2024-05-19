import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    ActivityStore: ActivityStore
}

export const store: Store = {
    ActivityStore: new ActivityStore()
}

export const storeContext = createContext(store);

export function useStore(){
    return useContext(storeContext);
}