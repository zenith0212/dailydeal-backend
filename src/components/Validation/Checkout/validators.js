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

export const contactNumberValidator = contactNumber => {
    if(!contactNumber){
        return 'Contact Number is required';
    } else if (isNaN(contactNumber)){
        return 'Contact Number must be digits';
    }
    return '';
}
export const addressValidator = address => {
    if(!address){
        return "Street Address is required";
    }
    return '';
}
export const cityValidator = city => {
    if(!city){
        return "City is required";
    }
    return '';
}
export const zipCodeValidator = zipCode => {
    if(!zipCode){
        return "zipCode is required";
    } else if(isNaN(zipCode)){
        return "Zip Code is required only digits"
    }
    return '';
}
