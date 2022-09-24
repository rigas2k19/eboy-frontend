import {UserComponent} from "../user/user.component";
import {SignUpComponent} from "../user/sign-up/sign-up.component";
import {DeleteComponent} from "../user/delete/delete.component";
import {LoginComponent} from "../user/login/login.component";
import {StartingPageComponent} from "../user/starting-page/starting-page.component";
import {AuthGuard} from "../guards/auth.guard";
import {RoleGuard} from "../guards/role.guard";
import {ApproveComponent} from "../user/approve/approve.component";
import {WaitingComponent} from "../user/waiting/waiting.component";
import {AddItemComponent} from "../item/add-item/add-item.component";
import {ItemComponent} from "../item/item.component";
import {UserItemsComponent} from "../user/user-items/user-items.component";
import {ShowItemComponent} from "../item/show-item/show-item.component";
import {SearchComponent} from "../search/search.component";
import {MessagesComponent} from "../messages/messages.component";
import {SentComponent} from "../messages/sent/sent.component";
import {ReceivedComponent} from "../messages/received/received.component";
import {ItemsBoughtComponent} from "../user/items-bought/items-bought.component";

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
        path: 'approve',
        component: ApproveComponent,
        canActivate: [AuthGuard, RoleGuard],
        data:{role: ['ROLE_ADMIN']}
      },{
        path: '',
        component: UserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'items',
        component: UserItemsComponent
      },
      {
        path:'bought',
        component: ItemsBoughtComponent
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
    canActivate: [AuthGuard, RoleGuard],
    data:{role: ['ROLE_ADMIN']}
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
  {
    path: 'waiting',
    component: WaitingComponent
  },
  {
    path: 'items',
    children :[
      {
        path: 'add',
        component: AddItemComponent,
      },
      {
        path: 'show',
        component: ShowItemComponent,
      },
      {
        path: '',
        component: ItemComponent,
      },
    ]

  },
  {
    path:'search',
    component: SearchComponent
  },
  {
    path:'messages',
    children: [
      {
        path:'sent',
        component:SentComponent
      },
      {
        path:'received',
        component:ReceivedComponent
      },
      {
        path:'',
        component: MessagesComponent
      },
    ]
  },
  { path: '**', redirectTo: '' }
];
