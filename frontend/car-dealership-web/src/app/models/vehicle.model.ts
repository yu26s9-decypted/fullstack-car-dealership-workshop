import { Dealership } from "./dealership.model";
import { VehicleSpecs } from "./vehiclespecs.model";

export interface Vehicle{
    id: number;
    vin: string;
    year: number;
    make: string;
    model: string;
    vehicleType: string;
    color: string;
    odometer: number;
    price: number;
    dealership: Dealership;
    description: string;
    imageURL: string;
    bannerUrl: string;
    specs: VehicleSpecs;
    vehicleTier: string;
}
