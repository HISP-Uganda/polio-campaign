import { domain } from "./Domain";

export const changeCurrentUser = domain.createEvent<string>()