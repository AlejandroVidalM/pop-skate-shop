import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";
import { NewCategoryComponent } from "./views/admin/new-category/new-category.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import {
  AuthGuardService as AuthGuard
} from '../app/services/auth-guard.service';
import { CategoryComponent } from "./views/admin/category/category.component";
import { ProductComponent } from "./views/admin/product/product/product.component";
import { NewProductComponent } from "./views/admin/product/new-product/new-product.component";
import { CartComponent } from "./views/shop/cart/cart.component";
const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent, canActivate: [AuthGuard] },
      { path: "maps", component: MapsComponent },
      { path: "categorias/new", component: NewCategoryComponent, canActivate: [AuthGuard] },
      { path: "categorias", component: CategoryComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always', },
      { path: "categorias/edit/:id", component: NewCategoryComponent, canActivate: [AuthGuard]},
      { path: "productos/new", component: NewProductComponent, canActivate: [AuthGuard] },
      { path: "productos", component: ProductComponent, canActivate: [AuthGuard] },
      { path: "productos/edit/:id", component: NewProductComponent, canActivate: [AuthGuard]},
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // user views
  {
    path: "shop",
    component: AdminComponent,
    children: [
      { path: "cart", component: CartComponent },
    ],
  },
  // no layout views
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard]  },
  { path: "landing", component: LandingComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
