import { Store } from "../interfaces";
import { domain } from "./Domain";
import {
  changeCurrentUser,
  setCurrentLevel,
  setDays,
  setGeojson,
  setLocations,
  setMapCenter,
  setSelectedUnits,
  setSublevel,
  setSublevels,
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
    days: [
      {
        label: "Day 1",
        value: "LnW4HiRwsGV",
      },
      {
        label: "Day 2",
        value: "vMnKiXj54yp",
      },
      {
        label: "Day 3",
        value: "GyRRnHvTiD7",
      },
    ],
    sublevels: [],
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
  })
  .on(setDays, (state, days) => {
    return { ...state, days };
  })
  .on(setSublevels, (state, sublevels) => {
    return { ...state, sublevels };
  })
  .on(setMapCenter, (state, mapCenter) => {
    return { ...state, mapCenter };
  });

export const $days = $store.map((state) => {
  return state.days.map((d) => d.value).join("-");
});

export const $realDays = $store.map((state) => {
  return state.days.length;
});
