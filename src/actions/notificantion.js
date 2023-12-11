import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notification = (message) => toast(message);

<ToastContainer autoClose={2000} />
