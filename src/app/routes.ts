import { RootRoute, Route, Router } from '@tanstack/router';
import { TANSTACK_ROUTER } from '@tanstack/angular-router';

import {
  AboutComponent,
  loader as aboutLoader,
  // action as aboutAction,
} from './about.component';
import { HomeComponent } from './home.component';
import { ParentComponent } from './parent.component';
import { ChildComponent } from './child.component';
import { AppComponent } from './app.component';

const rootRoute = new RootRoute({ component: AppComponent });
const homeRoute = new Route({ getParentRoute: () => rootRoute, path: '/', component: HomeComponent });
const aboutRoute = new Route({ getParentRoute: () => rootRoute, path: 'about', component: AboutComponent });
const parentRoute = new Route({ getParentRoute: () => rootRoute, path: 'parent', component: ParentComponent });
const childRoute = new Route({ getParentRoute: () => parentRoute, path: '$id', component: ChildComponent });

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  parentRoute.addChildren([childRoute]),
]);

const router = new Router({ routeTree });

export function provideRouter() {
  return {
    provide: TANSTACK_ROUTER,
    useFactory: () => {
      return router;
    }
  }
}

declare module '@tanstack/router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router
  }
}