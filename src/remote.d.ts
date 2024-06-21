declare module 'SHELL/AuthService' {
  export declare class AuthService {
    isLogin: BehaviorSubject<boolean>;
    isLogin$: import('rxjs').Observable<boolean>;
  }
}

declare module 'SHELL/InjectStyleService' {
  export declare class InjectStyleService {
    attact(url: string): void;
    deAttact(): void;
  }
}

interface Error {
  errorCode: number;
  message: string;
}

interface User {
  email: string;
  phone: string;
}

interface AuthState {
  isLogin: boolean;
  loading: boolean;
  error?: Error;
  user?: User;
}

declare module 'SHELL/selectIsLogin' {
  export declare const selectIsLogin: import('@ngrx/store').MemoizedSelector<
    object,
    boolean,
    (s1: AuthState) => boolean
  >;
}

declare module 'SHELL/updateIsLogin' {
  export declare const updateIsLogin: import('@ngrx/store').ActionCreator<
    '[Update login] update is login',
    (props: { isLogin: boolean }) => {
      isLogin: boolean;
    } & import('@ngrx/store/src/models').TypedAction<'[Update login] update is login'>
  >;
}

declare module 'SHELL/updateIsLogin' {
  export declare const updateIsLogin: import('@ngrx/store').ActionCreator<
    '[Update login] update is login',
    (props: { isLogin: boolean }) => {
      isLogin: boolean;
    } & import('@ngrx/store/src/models').TypedAction<'[Update login] update is login'>
  >;
}

declare module 'SHELL/login' {
  export declare const login: import('@ngrx/store').ActionCreator<
    '[Update login] login',
    (props: { userName: string; password: string }) => {
      userName: string;
      password: string;
    } & import('@ngrx/store/src/models').TypedAction<'[Update login] login'>
  >;
}

declare module 'SHELL/selectAuthState' {
  export declare const selectAuthState: import('@ngrx/store').MemoizedSelector<
    object,
    AuthState,
    (s1: AuthState) => AuthState
  >;
}

// image
declare module 'SHELL/imageModule' {
  export declare class ImageModule {
    static config(config: {
      domain: string;
    }): import('@angular/core').ModuleWithProviders<ImageModule>;
  }
}

declare module 'SHELL/imageComponent' {
  declare class ImageComponent {
    private imageService;
    src: string;
    alt: string;
    width: string;
    height: string;
    class: string;
    style: string;
    processedSrc: string;
    constructor(imageService: ImageService);
    ngOnInit(): void;
  }
}
