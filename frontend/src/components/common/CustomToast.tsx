import { ToastContainer, toast } from 'react-toastify';
import '../../design/common/Toast.css';

export const showToast = (message: string) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
  });
};

const Toast = () => {
  return <ToastContainer />;
};

export default Toast;