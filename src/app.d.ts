// STEP 1: SvelteKit ambient types — lets TypeScript know about App.Locals,
// App.PageData, App.Error on every page. We leave interfaces empty until
// we actually need server-side session data.
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
