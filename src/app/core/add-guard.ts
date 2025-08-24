import { CanActivateFn } from '@angular/router';

export const addGuard: CanActivateFn = (route, state) => {
  return true;
};
