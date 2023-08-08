import {
  inject,
  Injectable,
  InjectionToken,
  Type,
} from '@angular/core';
import {
  Router as TanStackRouter,
  RouterState,
  NavigateOptions
} from '@tanstack/router';
import { BehaviorSubject, map } from 'rxjs';

export type RouteObject = {
  element: Type<any>;
  children?: RouteObject[];
};

export type DataRouteMatch = {
  route: { element: Type<any> };
};

export const TANSTACK_ROUTER = new InjectionToken<TanStackRouter>('TanStack Router');

export const ROUTE_CONTEXT = new InjectionToken<{
  id: string;
  params: any;
}>('Route Context');

export function getRouter() {
  const router = inject(Router);

  return router;
}

export function getRouteContext() {
  return inject(ROUTE_CONTEXT, { optional: true, skipSelf: true });
}

// export function getActionData() {
//   const router = inject(Router);
//   const context = getRouteContext();

//   return router.routerState$.pipe(
//     filter((rs) => !!rs),
//     map((rs) => rs.actions![context!.id])
//   );
// }

export function getLoaderData<T extends object = object>() {
  const router = inject(Router);
  const context = getRouteContext();

  return router.routerState$.pipe(
    map((rs) => {
      const route = rs.matches.find((match) => {
        return match.routeId === context!.id;
      });

      return ((route && route.loaderData) || {}) as T;
    })
  );
}

export function getRouteParams<T extends object = object>() {
  const router = inject(Router);
  const context = getRouteContext();

  return router.routerState$.pipe(
    map((rs) => {
      const route = rs.matches.find((match) => {
        return match.routeId === context!.id;
      });

      return ((route && route.params) || {}) as T;
    })
  );
}

@Injectable({
  providedIn: 'root',
})
export class Router {
  private _tanstackRouter = inject(TANSTACK_ROUTER);
  routerState$ = new BehaviorSubject<RouterState>(this._tanstackRouter.state);

  constructor() {
    this._tanstackRouter.load().then(() => this.routerState$.next(this._tanstackRouter.state));
    this._tanstackRouter.options.onRouteChange = () => {
      console.log('router state changed', this._tanstackRouter.state);
      this.routerState$.next(this._tanstackRouter.state)
    };
  }

  get state() {
    return this._tanstackRouter.state;
  }

  navigate(opts: NavigateOptions) {
    this._tanstackRouter.navigate(opts as any);
  }

  getRoute(routeId: string) {
    return this._tanstackRouter.getRoute(routeId as never);
  }
}


