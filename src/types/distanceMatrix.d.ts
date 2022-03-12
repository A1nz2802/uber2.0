export interface Data {
  destination_addresses: string[];
  origin_addresses:      string[];
  rows:                  Row[];
  status:                string;
}

export interface Row {
  elements: Element[];
}

export interface Element {
  distance: Distance;
  duration: Distance;
  status:   string;
}

export interface Distance {
  text:  string;
  value: number;
}