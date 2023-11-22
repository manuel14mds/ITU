import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "src/app/model/user";


export const UserActions = createActionGroup({
    source:'user',
    events:{
        'Set User':props<{data:User}>(),
        'Register User':props<{data:User}>(),
        'Reset User state': emptyProps(),
    }
})