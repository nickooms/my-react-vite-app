import { LocationType } from './LocationType';
import { Point } from './Point';

export interface Housenumber {
  Municipality: string;
  Zipcode: number;
  Thoroughfarename: string;
  Housenumber: number;
  ID: number;
  FormattedAddress: string;
  Location: Point;
  LocationType: LocationType;
  BoundingBox: {
    LowerLeft: Point;
    UpperRight: Point;
  };
}
