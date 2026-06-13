import { Routes } from '@angular/router';
import { VehicleDetail } from './components/vehicle-detail/vehicle-detail';
import { Home } from './components/home/home';
import { AdminPanel } from './components/admin-panel/admin-panel';
import { authGuard } from './guards/auth-guard';
import { AdminLogin } from './components/admin-login/admin-login';

export const routes: Routes = [
    {
        path: '', component: Home
    },
    {
        path: 'vehicles/:slug', component: VehicleDetail
    },
    {
        path: 'admin', component: AdminPanel, canActivate: [authGuard]
    }, {
        path: 'admin/login', component: AdminLogin
    }
];
