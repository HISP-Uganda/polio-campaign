import { Store } from "../interfaces";
import { domain } from "./Domain";
import {
  changeCurrentUser,
  setGeojson,
  setLocations,
  setSelectedUnits,
} from "./Events";
changeCurrentUser("");

export const $store = domain
  .createStore<Store>({ currentUser: "", selectedUnits: "" })
  .on(changeCurrentUser, (state, user) => {
    return { ...state, currentUser: user };
  })
  .on(setSelectedUnits, (state, selectedUnits) => {
    return { ...state, selectedUnits };
  })
  .on(setGeojson, (state, geojson) => {
    return { ...state, geojson };
  })
  .on(setLocations, (state, locations) => {
    return { ...state, locations };
  });
