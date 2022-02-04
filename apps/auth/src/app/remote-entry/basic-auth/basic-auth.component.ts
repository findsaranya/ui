import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { AppState, Auth, STATIC_BASE_URL } from '@tt-webapp/service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'tt-webapp-basic-auth',
  templateUrl: './basic-auth.component.html',
  styleUrls: ['./basic-auth.component.scss'],
})
export class BasicAuthComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  authenticating = false;

  authSubscription: Subscription | null;
  message$: Observable<string | null | undefined>;

  get staticUrl() {
    return this._staticUrl;
  }

  constructor(
    private titleService: Title,
    private store: Store<AppState>,
    @Inject(STATIC_BASE_URL) private _staticUrl: string
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.authSubscription = null;
    this.message$ = this.store.pipe(select(Auth.getAuthError));
  }

  ngOnInit(): void {
    this.titleService.setTitle('TrusTrace | Login');

    this.authSubscription = this.store
      .pipe(select(Auth.getAuthState))
      .subscribe((authState) => {
        this.authenticating = !!authState.authenticating;
        if (this.authenticating) {
          this.loginForm.disable();
        } else {
          this.loginForm.enable();
        }
      });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.store.dispatch(
        Auth.loadSessionFailed({ error: 'Form validation fails' })
      );
      return;
    }
    const { email = null, password = null } = this.loginForm.value;
    this.store.dispatch(Auth.loginStart({ email, password }));
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
