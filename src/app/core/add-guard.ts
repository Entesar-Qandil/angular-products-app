import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const addGuard: CanActivateFn = () => {
  const router = inject(Router);
  const ok = localStorage.getItem('allowAdd') === 'true';
  if (!ok) {
    router.navigate(['/products']);
    return false;
  }
  return true;
};
