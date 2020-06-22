import { Routes, RouterModule } from "@angular/router";

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: "page",
    loadChildren: () =>
      import("../../page/page.module").then((m) => m.PageModule),
  },
  {
    path: "recherche-client",
    loadChildren: () =>
      import("../../recherche-client/recherche-client.module").then(
        (m) => m.RechercheClientModule
      ),
  },
  {
    path: "detail-client",
    loadChildren: () =>
      import("../../client-detail/client-detail.module").then(
        (m) => m.ClientDetailModule
      ),
  },
  {
    path: "survey",
    loadChildren: () =>
      import("../../survey-page/survey-page.module").then(
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
  {
    path: "plaintes",
    loadChildren: () =>
      import("../../plainte/plainte.module").then(
        (m) => m.PlainteModule
      ),
  },
  {
    path: "commandes",
    loadChildren: () =>
      import("../../commande/commande.module").then(
        (m) => m.CommandeModule
      ),
  },
];
