import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WildcardAuthGuard } from '@tt-webapp/service';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('../layout/layout.module').then((m) => m.LayoutModule),
        canActivate: [WildcardAuthGuard],
      },
      {
        path: 'error',
        loadChildren: () =>
          import('@tt-webapp/ui/failed-to-load-application').then(
            (m) => m.FailedToLoadApplicationModule
          ),
      },
      {
        path: 'logout',
        loadChildren: () =>
          import('../logout/logout.module').then((m) => m.LogoutModule),
      },
      {
        path: '**',
        loadChildren: () =>
          import('@tt-webapp/ui/page-not-found').then(
            (m) => m.PageNotFoundModule
          ),
        canActivate: [WildcardAuthGuard],
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
