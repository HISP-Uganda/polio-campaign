import { Store } from "../interfaces";
import { domain } from "./Domain";
import {
  changeCurrentUser,
  setCurrentLevel,
  setGeojson,
  setLocations,
  setSelectedUnits,
  setSublevel,
  setUserUnits,
  setZoom,
} from "./Events";
changeCurrentUser("");

export const $store = domain
  .createStore<Store>({
    currentUser: "",
    selectedUnits: "",
    userUnits: [],
    currentLevel: 3,
    sublevel: 3,
    zoom: 6.0,
  })
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
  })
  .on(setUserUnits, (state, userUnits) => {
    return { ...state, userUnits };
  })
  .on(setCurrentLevel, (state, currentLevel) => {
    return { ...state, currentLevel };
  })
  .on(setZoom, (state, zoom) => {
    return { ...state, zoom };
  })
  .on(setSublevel, (state, sublevel) => {
    return { ...state, sublevel };
  });
