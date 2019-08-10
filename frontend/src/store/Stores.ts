import { AppStore } from "./AppStore";
import { create } from 'mobx-persist'

export const stores = {
    appStore: new AppStore(),
}

const hydrate = create();
hydrate('appStore', stores.appStore).then(() => console.log('appStore has been hydrated'))