import { Routes } from '@angular/router';
import { VehicleDetail } from './components/vehicle-detail/vehicle-detail';
import { Home } from './components/home/home';

export const routes: Routes = [
    {
        path: '', component: Home
    },
    {
        path: 'vehicles/:slug', component: VehicleDetail
    }
];
