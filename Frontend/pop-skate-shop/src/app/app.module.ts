import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";

// components for views and layouts

import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./components/cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./services/auth.service";
import { JwtModule } from "@auth0/angular-jwt";
import { NewCategoryComponent } from './views/admin/new-category/new-category.component';
import { CategoryComponent } from './views/admin/category/category.component';
import { ProductComponent } from './views/admin/product/product/product.component';
import { NewProductComponent } from './views/admin/product/new-product/new-product.component';
import { CardProductComponent } from './components/cards/card-product/card-product.component';
import { CartComponent } from './views/shop/cart/cart.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    AuthComponent,
    MapsComponent,
    SettingsComponent,
    TablesComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    LandingComponent,
    ProfileComponent,
    NewCategoryComponent,
    CategoryComponent,
    ProductComponent,
    NewProductComponent,
    CardProductComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  //   TranslateModule.forRoot({
  //     loader: {
  //         provide: TranslateLoader,
  //         useFactory: HttpLoaderFactory,
  //         deps: [HttpClient]
  //     },
  // }),
  JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      allowedDomains: ["example.com"],
      disallowedRoutes: ["http://example.com/examplebadroute/"],
    },
  }),
  ReactiveFormsModule,
  FormsModule,
  ],
  providers: [AuthService,],
  bootstrap: [AppComponent],
})
export class AppModule {}
