export interface Store {
  currentUser: string;
  name?: string;
  geojson?: any;
  locations?: { id: string; name: string }[];
  selectedUnits: string;
}

export interface DataValue {
  parameters: { [key: string]: string } | undefined;
  sqlView: string | "" | undefined | null;
}
export interface Indicator {
  numerator: DataValue;
  denominator: DataValue;
}
