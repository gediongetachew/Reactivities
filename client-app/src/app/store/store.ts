import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface Store {
    ActivityStore: ActivityStore
    CommonStore: CommonStore
}

export const store: Store = {
    ActivityStore: new ActivityStore(),
    CommonStore: new CommonStore()
}

export const storeContext = createContext(store);

export function useStore(){
    return useContext(storeContext);
}