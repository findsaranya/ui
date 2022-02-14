import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { BootstrapService } from '@tt-webapp/service';
import { LayoutComponent } from './layout.component';

function getRoutes(bs: BootstrapService): Routes {
  return [
    {
      path: '',
      component: LayoutComponent,
      children: bs.loadedRoutes.child,
    },
  ];
}

@NgModule({
  imports: [RouterModule.forChild([])],
  exports: [RouterModule],
  providers: [
    {
      provide: ROUTES,
      useFactory: getRoutes,
      deps: [BootstrapService],
      multi: true,
    },
  ],
})
export class LayoutRoutingModule {}
