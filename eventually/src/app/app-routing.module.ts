import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home/:uid',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'home/:uid/event-details/:eventid',
    loadChildren: () => import('./event-details/event-details.module').then( m => m.EventDetailsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'home/:uid/add-event',
    loadChildren: () => import('./add-event/add-event.module').then( m => m.AddEventPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'edit-event',
    loadChildren: () => import('./edit-event/edit-event.module').then( m => m.EditEventPageModule)
  },
  {
    path: 'home/:uid/event-details/:eventid/guest-list',
    loadChildren: () => import('./guest-list/guest-list.module').then( m => m.GuestListPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'home/:uid/event-details/:eventid/guest-list/:guestid/guest-details',
    loadChildren: () => import('./guest-details/guest-details.module').then( m => m.GuestDetailsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'home/:uid/event-details/:eventid/guest-list/add-guest',
    loadChildren: () => import('./add-guest/add-guest.module').then( m => m.AddGuestPageModule),
    canLoad: [AuthGuard]
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
