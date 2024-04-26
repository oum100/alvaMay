import { H3Event, H3Error } from "h3";

/**
 * @desc Checks whether email is valid
 * @param email The email string
 */
export function validateEmail(email: string): boolean {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
}


export async function validateRegisterBody(user:any) {
    // const body = await readBody(event);

    if ("name" in user === false || user.name.trim() == "") {
      return "'Name' is required";
    }
    
    if ("email" in user === false || user.email.length === 0) {
      return "'Email' is required";
    }

    if ( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) ) {
        return "'Email' format is invalid.";
    }    
  
    if ("password" in user === false || user.password.length === 0) {
      return "'Password' is required";
    }
    
    if (user.password.length < 8) {
        return "'Password' at least 8 digits";
      }    

    if ("confirm" in user === false || user.password.length === 0) {
        return "'Confirm password' is required";
    }    

    if(user.password !== user.confirm){
        return "'Password and Confirm password' is not match";
    }

    return false
}

export function validateMatchPassword(user:any) {
    // const body = await readBody(event);

    if(user.password === user.confirm){
        return true;
    }
    return false
}