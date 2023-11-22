import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { AuthService } from "./auth/auth.service";
import { getUser } from "./shared/Helpers/localStorage";
import { UserActions } from "./store/user/user.actions";

@Injectable()
export class AppService { 
    constructor(private storeNgRx: Store, private authService: AuthService ){

    }

    verifyLocalStorage(){
        const storedUser = getUser();

        if (!storedUser) {
            this.storeNgRx.dispatch(UserActions.resetUserState())
        }else{
            this.storeNgRx.dispatch(UserActions.setUser({ data: storedUser }))
        }
    }
}