import { toast } from "react-toastify";

class NotifierHelper {

  success(message) {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  }

  info(message) {
    toast.info(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  }

  error(message) {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }

}

export default new NotifierHelper();
