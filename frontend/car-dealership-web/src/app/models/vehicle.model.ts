import { Dealership } from "./dealership.model";

export interface Vehicle{
    id: number;
    vin: string;
    make: string;
    model: string;
    vehicleType: string;
    color: string;
    odometer: number;
    price: number;
    dealership: Dealership;
}
