export interface Property {
  _id: string;
  name: string;
  description: string;
  address: string;
  country: string;
  city: string;
  pricePerNight: string;
  adultsNumber: string;
  roomsNumber: string;
  dimmension: string;
  balcony: boolean;
  privateBathroom: boolean;
  airConditioning: boolean;
  freeParking: boolean;
  breakfastIncluded: boolean;
  petsAllowed: boolean;
  distanceFromCenter: number;
  score: number;
  imagesPaths: string[];
}