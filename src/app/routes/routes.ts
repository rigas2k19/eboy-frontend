import {UserComponent} from "../user/user.component";
import {SignUpComponent} from "../user/sign-up/sign-up.component";
import {DeleteComponent} from "../user/delete/delete.component";
import {LoginComponent} from "../user/login/login.component";
import {StartingPageComponent} from "../user/starting-page/starting-page.component";
import {AuthGuard} from "../guards/auth.guard";
import {Role} from '../model/role';

export const  appRoutes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'users',
    children :[
      {
        path: '',
        component: UserComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'delete',
    component: DeleteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'StartingPage',
    component: StartingPageComponent,
    canActivate: [AuthGuard]//,
    //data:{roles: ['ROLE_USER', 'ROLE_GUEST']}
  },
  { path: '**', redirectTo: '' }
];
