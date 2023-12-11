export const emailValidator = email => {
    if (!email) {
        return "Email is required";
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
        return "Incorrect email format";
    }
    return '';
}
export const codeValidator  = code =>{
    if(!code){
        return "Code is required";
    } else if (code.length !== 6){
        return "Verify code must have 6 charactors"
    }
}