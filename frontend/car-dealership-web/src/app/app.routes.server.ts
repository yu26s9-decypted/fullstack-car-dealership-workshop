import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Client
  },
  {
    path: 'vehicles/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin', component: AdminPanel, canActivate: [authGuard]
  },
  {
    path: 'admin/login', component: AdminLogin
  }
];
