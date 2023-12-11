import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    localStorage.removeItem("email");
    window.location.href = "/";
};