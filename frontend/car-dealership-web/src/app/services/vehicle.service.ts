import { Observable } from "rxjs";
import { Vehicle } from "../models/vehicle.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environment/environment";
import { Injectable } from "@angular/core";

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
}