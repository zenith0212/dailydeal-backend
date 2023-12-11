

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
    } else if (confirmPassword.length < 8) {
        return "Confirm password must have a minimum 8 characters";
    } else if (confirmPassword !== form.password) {
        return "Passwords do not match";
    }
    return "";
};