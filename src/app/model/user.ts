import {Validators} from "@angular/forms";

export class User {
  username: string | undefined;
  password: string | undefined;
  name: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  location: string | undefined;
  afm: string | undefined;
  roles: string[] = [];
  token?: string;
  approved: boolean |undefined;

}
