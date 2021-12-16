import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { BootstrapService } from '@tt-webapp/service';
import { environment } from '../environments/environment';
import { PageNotFoundComponent } from '@tt-webapp/shared-components';

function initApplication(bsService: BootstrapService): () => Promise<void> {
  return () => bsService.init(environment);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(
      [
        {
          path: 'auth',
          loadChildren: () =>
            loadRemoteModule({
              remoteName: 'auth',
              remoteEntry: 'http://localhost:4201/remoteEntry.js',
              exposedModule: './Module',
            }).then((m) => m.RemoteEntryModule),
        },
        {
          path: '**',
          component: PageNotFoundComponent,
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [
    BootstrapService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      multi: true,
      deps: [BootstrapService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
