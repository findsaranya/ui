import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { AppState } from '../+state/app.store';
import { loggedIn } from '../+state/auth';

@Injectable({
  providedIn: 'root',
})
export class WildcardAuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(
      select(loggedIn),
      take(1),
      map((loggedIn) => {
        if (loggedIn) return true;
        this.router.navigate(['login'], { queryParams: { next: state.url } });
        return false;
      })
    );
  }
}
