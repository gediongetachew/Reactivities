import { makeAutoObservable } from 'mobx';

export default class commonStore {
    error: serverError | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setServerError = (error: serverError) => {
        this.error = error;
    }
}

