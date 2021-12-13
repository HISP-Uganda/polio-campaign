import { Store } from "../interfaces";
import { domain } from "./Domain";
import { changeCurrentUser, setGeojson, setLocations } from "./Events";
changeCurrentUser("");

export const $store = domain
  .createStore<Store>({ currentUser: "" })
  .on(changeCurrentUser, (state, user) => {
    return { ...state, currentUser: user };
  })
  .on(setGeojson, (state, geojson) => {
    return { ...state, geojson };
  })
  .on(setLocations, (state, locations) => {
    return { ...state, locations };
  });
