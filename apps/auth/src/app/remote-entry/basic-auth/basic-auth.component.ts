import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { AppState, Auth, STATIC_BASE_URL } from '@tt-webapp/service';
import { environment } from '../../../environments/environment';
import { Observable, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'tt-basic-auth',
  templateUrl: './basic-auth.component.html',
  styleUrls: ['./basic-auth.component.scss'],
})
export class BasicAuthComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  authenticating = false;

  authSubscription: Subscription | null;
  message$: Observable<string | null | undefined>;

  date = new Date();

  // Todo collect the active language from the URL & If its production
  languageControl = new FormGroup({
    selection: new FormControl(this.activeLanguage),
  });

  languages: { code: string; languageName: string }[] = [
    {
      code: 'bn',
      languageName: 'Bangla',
    },
    {
      code: 'zh',
      languageName: 'Chinese',
    },
    {
      code: 'zh-Hant',
      languageName: 'Chinese (Taiwan)',
    },
    {
      code: 'en',
      languageName: 'English',
    },
    {
      code: 'et',
      languageName: 'Estonian',
    },
    {
      code: 'fr',
      languageName: 'French',
    },
    {
      code: 'hi',
      languageName: 'Hindi',
    },
    {
      code: 'it',
      languageName: 'Italian',
    },
    {
      code: 'ja',
      languageName: 'Japanese',
    },
    {
      code: 'kn',
      languageName: 'Kannada',
    },
    {
      code: 'lv',
      languageName: 'Latvian',
    },
    {
      code: 'lt',
      languageName: 'Lithuanian',
    },
    {
      code: 'ml',
      languageName: 'Malayalam',
    },
    {
      code: 'pl',
      languageName: 'Polish',
    },
    {
      code: 'pt',
      languageName: 'Portuguese',
    },
    {
      code: 'ro',
      languageName: 'Romanian',
    },
    {
      code: 'es',
      languageName: 'Spanish',
    },
    {
      code: 'sv',
      languageName: 'Swedish',
    },
    {
      code: 'ta',
      languageName: 'Tamil',
    },
    {
      code: 'te',
      languageName: 'Telugu',
    },
    {
      code: 'tr',
      languageName: 'Turkish',
    },
    {
      code: 'vi',
      languageName: 'Vietnamese',
    },
  ];

  get staticUrl() {
    return this._staticUrl;
  }

  get activeLanguage() {
    return this.document.location.pathname.split('/')[1];
  }

  constructor(
    private titleService: Title,
    private store: Store<AppState>,
    @Inject(STATIC_BASE_URL) private _staticUrl: string,
    @Inject(DOCUMENT) private document: Document
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

  onLanguageChange(): void {
    if (environment.production) {
      const path = this.document.location.pathname.split('/');
      path.shift();
      path[0] = this.languageControl.get('selection')?.value;
      this.document.location.href =
        this.document.location.origin + '/' + path.join('/');
    }
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
