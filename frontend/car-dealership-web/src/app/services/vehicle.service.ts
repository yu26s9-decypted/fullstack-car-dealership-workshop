import { Observable } from "rxjs";
import { Vehicle } from "../models/vehicle.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environment/environment";
import { Injectable } from "@angular/core";
import { FinanceEstimate } from "../models/orderestimate.model";

@Injectable({
    providedIn: 'root'
})

export class VehicleService{
    constructor(private http: HttpClient) {}

    getAllVehicles(): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>(`${environment.baseURL}/vehicle`)
    }

    getVehicleByModel(model: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${environment.baseURL}/vehicle?model=${model}`);
    }

    updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
        return this.http.put<Vehicle>(`${environment.baseURL}/vehicle/${vehicle.id}`, vehicle)
    }

    getOrderEstimate(estimate: FinanceEstimate): Observable<FinanceEstimate> {
        return this.http.post<FinanceEstimate>(`${environment.baseURL}/order/estimate`, estimate)
    }
}