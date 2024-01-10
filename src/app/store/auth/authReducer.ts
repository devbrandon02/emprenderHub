interface User {
  name: string | null;
  email: string | null;
  emailVerified: boolean | null;
  phoneNumber: string | null;
  photoURL: string | null;
  lastSignInTime: string | undefined;
}

interface AuthState {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}

export const InitialAuthState: AuthState = {
  user: null,
  isAuth: false,
  loading: false,
  error: null,
};

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  SET_ERROR = 'SET_ERROR',
  SET_LOADING = 'SET_LOADING',
}

type ActionType =
  | {type: AuthActionTypes.LOGIN; payload: AuthState}
  | {type: AuthActionTypes.LOGOUT; payload: AuthState}
  | {type: AuthActionTypes.SET_ERROR; payload: {error: string}}
  | {type: AuthActionTypes.SET_LOADING; payload: {loading: boolean}};

export const authReducer = (
  state: typeof InitialAuthState,
  action: ActionType,
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isAuth: true,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuth: false,
      };
    case AuthActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case AuthActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
};
