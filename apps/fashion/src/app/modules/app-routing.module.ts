import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WildcardAuthGuard } from '@tt-webapp/service';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'error',
        loadChildren: () =>
          import('@tt-webapp/ui').then((m) => m.FailedToLoadApplicationModule),
      },
      {
        path: '**',
        loadChildren: () =>
          import('@tt-webapp/ui').then((m) => m.PageNotFoundModule),
        canActivate: [WildcardAuthGuard],
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
