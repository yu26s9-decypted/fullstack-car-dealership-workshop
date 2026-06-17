import { Routes } from '@angular/router';
import { VehicleDetail } from './components/vehicles/vehicle-detail/vehicle-detail';
import { Home } from './components/pages/home/home';
import { AdminPanel } from './components/admin/admin-panel/admin-panel';
import { authGuard } from './guards/auth-guard';
import { AdminLogin } from './components/auth/admin-login/admin-login';
import { SignIn } from './components/auth/sign-in/sign-in';
import { CreateAccount } from './components/auth/create-account/create-account';
import { DealershipPage } from './components/pages/dealership/dealership';

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
    }, {path: 'create-account', component: CreateAccount},
    {path: 'login', component: SignIn},
    {path: 'dealership', component: DealershipPage}
];
