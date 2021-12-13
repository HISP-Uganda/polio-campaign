import { domain } from "./Domain";

export const changeCurrentUser = domain.createEvent<string>();
export const setGeojson = domain.createEvent<any>();
export const setLocations =
  domain.createEvent<{ id: string; name: string }[]>();
