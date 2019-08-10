import { observable, computed, action } from "mobx";
import { persist } from 'mobx-persist';

export interface AppStoreType {
    authenticationHeader: string,
    setAuthenticationHeader(authenticationHeader: string): void,
}

export class AppStore implements AppStoreType {
    @persist('object')
    @observable 
    authenticationHeader = '';

    @action.bound
    setAuthenticationHeader(authenticationHeader: string): void {
        this.authenticationHeader = authenticationHeader;
    }
}