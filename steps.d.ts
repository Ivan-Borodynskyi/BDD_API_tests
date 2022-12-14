/// <reference types='codeceptjs' />
type steps_file = typeof import('./bdd_tests/steps_file.js');
type Api = import('./helpers/api_helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends REST, JSONResponse, Api {}
  interface I extends ReturnType<steps_file>, WithTranslation<JSONResponse>, WithTranslation<Api> {}
  namespace Translation {
    interface Actions {}
  }
}
