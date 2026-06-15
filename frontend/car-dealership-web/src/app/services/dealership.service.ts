import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Dealership } from "../models/dealership.model";
import { environment } from "../../environment/environment";

@Injectable({
    providedIn: 'root'
})
    

export class DealershipService{
    constructor(private http: HttpClient) {}

    getAllDealership(): Observable<Dealership[]> {
        return this.http.get<Dealership[]>(`${environment.baseURL}/dealership`)
    }
}