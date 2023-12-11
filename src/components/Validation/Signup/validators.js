export const firstNameValidator = firstName =>{
    if(!firstName){
        return 'First Name is required';
    }
    return '';
}
export const lastNameValidator = lastName =>{
    if(!lastName){
        return 'Last Name is required';
    }
    return '';
}
export const emailValidator = email => {
    if (!email) {
        return "Email is required";
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
        return "Incorrect email format";
    }
    return '';
}

export const passwordValidator = password => {
    if (!password) {
        return "Password is required";
    } else if (password.length < 5) {
        return "Password must have a minimum 5 characters";
    }
    return "";
};

export const confirmPasswordValidator = (confirmPassword, form) => {
    if (!confirmPassword) {
        return "Confirm password is required";
    } else if (confirmPassword.length < 5) {
        return "Confirm password must have a minimum 5 characters";
    } else if (confirmPassword !== form.password) {
        return "Passwords do not match";
    }
    return "";
};
