import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { VideoComponent } from './components/video/video.component';
import { MainPageComponent } from './components/main-page/main-page.component';

export const routes: Routes = [
    {path: 'video', component:VideoComponent, canActivate:[authGuardFn]},
    {path: 'main', component:MainPageComponent, canActivate:[authGuardFn]}
];
