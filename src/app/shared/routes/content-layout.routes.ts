import { Routes, RouterModule } from "@angular/router";

//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CONTENT_ROUTES: Routes = [
  {
    path: "pages",
    loadChildren: () =>
      import("../../pages/content-pages/content-pages.module").then(
        (m) => m.ContentPagesModule
      ),
  },
  {
    path: "recherche-client",
    loadChildren: () =>
      import("../../recherche-client/recherche-client.module").then(
        (m) => m.RechercheClientModule
      ),
  },
  {
    path: 'detail-client',
    loadChildren: () =>
      import('../../client-detail/client-detail.module').then(
        (m) => m.ClientDetailModule
      ),
  },
  {
    path: "survey",
    loadChildren: () =>
      import('../../survey-page/survey-page.module').then(
        (m) => m.SurveyPageModule
      ),
  },
  {
    path: "users",
    loadChildren: () =>
      import("../../utilisateur/utilisateur.module").then(
        (m) => m.UtilisateurModule
      ),
  },
];
