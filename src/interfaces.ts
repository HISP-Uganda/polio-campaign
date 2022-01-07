export interface Store {
  currentUser: string;
  userUnits: any[];
  name?: string;
  geojson?: any;
  locations?: { id: string; name: string }[];
  selectedUnits: string;
  currentLevel: number;
  zoom: number;
  sublevel: number;
}

export interface DataValue {
  parameters: { [key: string]: string } | undefined;
  sqlView: string | "" | undefined | null;
}
export interface Indicator {
  numerator: DataValue;
  denominator: DataValue;
}
