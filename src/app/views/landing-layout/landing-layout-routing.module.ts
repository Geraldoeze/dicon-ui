import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CssComponent } from './css/css.component';
import { PgProgramesComponent } from './pg-programes/pg-programes.component';
import { DicGalleryComponent } from './dic-gallery/dic-gallery.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { LayoutComponent } from './layout.component';
import { PgApplicationComponent } from './pg-application/pg-application.component';
import { AboutComponent } from './about/about.component';
import { CommandantComponent } from './commandant/commandant.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    {path: 'home', component: HomePageComponent},
    {path: 'css', component: CssComponent},
    {path: 'unndic', component: PgProgramesComponent},
    {path: 'gallery', component: DicGalleryComponent},
    {path: 'news', component: NewsPageComponent},
    {path: 'pg-application', component: PgApplicationComponent},
    {path: 'about', component: AboutComponent},
    {path: 'commandants', component: CommandantComponent},
    {path: 'contact', component: ContactComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingLayoutRoutingModule { }
