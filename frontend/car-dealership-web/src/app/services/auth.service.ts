import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { AuthRequest, AuthResponse, RegisterRequest } from "../models/auth.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private http = inject(HttpClient);
    private apiUrl = `${environment.baseURL}/auth`

    register(request: RegisterRequest): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request);
    }

    login(request: AuthRequest): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request);
    }

    saveToken(token: string): void {
        localStorage.setItem('auth_token', token)
    }

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    }

    logout(): void {
        localStorage.removeItem('auth_token')
    }

    isLoggedIn(): boolean {
        return this.getToken() !== null;
    }

    isAdmin(): boolean {
        const token = this.getToken();
        if(!token) return false;

        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role === 'ADMIN'
    }
}