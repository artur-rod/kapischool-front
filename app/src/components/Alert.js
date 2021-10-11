import SweetAlert from "sweetalert2";

export function Alert(type, title, text) {
  SweetAlert.fire({
    type: type,
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 2000,
  });
}
