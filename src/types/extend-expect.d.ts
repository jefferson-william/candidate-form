// tslint:disable:no-namespace
declare namespace jest {
  interface Matchers<R> {
    toHaveStyleRule: import('jest-styled-components').jest.Matchers<R>['toHaveStyleRule']
  }
}

declare module 'react-linkedin-login-oauth2'
