import {UserComponent} from "../user/user.component";
import {SignUpComponent} from "../user/sign-up/sign-up.component";

export const  appRoutes = [

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
  },];
