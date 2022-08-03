import {UserComponent} from "../user/user.component";
import {SignUpComponent} from "../user/sign-up/sign-up.component";
import {DeleteComponent} from "../user/delete/delete.component";
import {LoginComponent} from "../user/login/login.component";

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
        component: UserComponent
      },
    ]
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'delete',
    component: DeleteComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
];
