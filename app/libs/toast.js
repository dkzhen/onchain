import { Flip, toast } from "react-toastify";

const toastWarn = (message) =>
  toast.warn(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
    style: {
      width: "auto",
      maxWidth: "50vw", // atau 360px
      minWidth: "250px",
      wordBreak: "break-word",
      margin: "0.5rem 1rem 0.5rem 0",
    },
  });
const toastSuccess = (message) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
    style: {
      width: "auto",
      maxWidth: "50vw", // atau 360px
      minWidth: "250px",
      wordBreak: "break-word",
      margin: "0.5rem 1rem 0.5rem 0",
    },
  });
const toastError = (message) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
    style: {
      width: "auto",
      maxWidth: "50vw", // atau 360px
      minWidth: "250px",
      wordBreak: "break-word",
      margin: "0.5rem 1rem 0.5rem 0",
    },
  });
export { toastWarn, toastSuccess, toastError };
