import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const addGuard: CanActivateFn = () => {
  const ok = localStorage.getItem('allowAdd') === 'true';
  if (ok) return true;

  alert('Add page blocked. Set localStorage.allowAdd = "true" to continue.');
  inject(Router).navigateByUrl('/products');
  return false;
};
