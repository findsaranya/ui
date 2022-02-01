import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WildcardAuthGuard } from '@tt-webapp/service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [WildcardAuthGuard],
  },
  {
    path: 'error',
    loadChildren: () =>
      import('@tt-webapp/ui').then((m) => m.FailedToLoadApplicationModule),
  },
  {
    path: 'logout',
    loadChildren: () => import('@tt-webapp/ui').then((m) => m.LogoutModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('@tt-webapp/ui').then((m) => m.PageNotFoundModule),
    canActivate: [WildcardAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
