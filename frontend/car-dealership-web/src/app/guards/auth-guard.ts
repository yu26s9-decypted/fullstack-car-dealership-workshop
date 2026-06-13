import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuth = localStorage.getItem('admin_token') !== null;

  if(isAuth){
    return true;
  }

  router.navigate(["/admin/login"])
  return false;
  
};
