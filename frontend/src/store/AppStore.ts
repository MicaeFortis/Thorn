import { observable, computed, action, autorun, toJS, extendObservable } from "mobx";

export interface AppStoreType {
    authenticationHeader: string,
    setAuthenticationHeader(authenticationHeader: string): void,
}

function autoSave(store: AppStore, save: (json: string) => void) {
    let firstRun = true;
    autorun(() => {
        const json = JSON.stringify(toJS(store));
        if (!firstRun) {
            save(json);
        }
        firstRun = false;
    });
}

export class AppStore implements AppStoreType {
    @observable
    authenticationHeader = '';

    constructor() {
        this.load();
        autoSave(this, this.save);
    }

    @action.bound
    setAuthenticationHeader(authenticationHeader: string): void {
        this.authenticationHeader = authenticationHeader;
    }



    load() {
        if (sessionStorage.getItem('appStore') !== null) {
            const data: AppStore = JSON.parse(sessionStorage.getItem('appStore')!)
            this.authenticationHeader = data.authenticationHeader;
        }
    }

    save(json: string) {
        sessionStorage.setItem('appStore', json);
    }
}