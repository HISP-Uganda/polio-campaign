import { Store } from "../interfaces";
import { domain } from "./Domain";
import { changeCurrentUser } from "./Events";
changeCurrentUser('');

export const $store = domain.createStore<Store>({ currentUser: '' })
    .on(changeCurrentUser, (state, user) => {
        return { ...state, currentUser: user }
    });