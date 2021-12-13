export interface Store {
  currentUser: string;
  name?: string;
  geojson?: any;
  locations?: { id: string; name: string }[];
}
