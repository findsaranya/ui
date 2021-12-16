import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class BootstrapService {
  appInitialized: ((value: void | PromiseLike<void>) => void) | undefined;
  env: unknown;

  // constructor(private store: Store) {}

  /**
   * init
   * @param envConfig
   * @returns
   */
  init(envConfig: unknown): Promise<void> {
    return new Promise((resolve) => {
      this.appInitialized = resolve;
      this.env = envConfig;
      this.appInitialized();
    });
  }
}
