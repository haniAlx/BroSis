import swal from "sweetalert";

export const showErrorMessage = (e) => {
  let title = "Error occured";
  if (e.message == "Failed to fetch") title = "Check Your Internet connection";
  swal({
    title: title,
    text: `${e.message}`,
    icon: "error",
    dangerMode: true,
    buttons: [false, "OK"],
  });
};

/**SWAL SUCCESS MESSAGE   */
export const showSuccessMessage = (e) => {
  swal({
    title: "Success",
    text: `${e.message}`,
    icon: "success",
    dangerMode: true,
    buttons: [false, "OK"],
  });
};

export const showConfirmationMessage = async () => {
  let response = await swal({
    title: "Are you sure ?",
    text: `Do you want to Procced`,
    icon: "warning",
    dangerMode: true,
    buttons: ["cancel", "Procced"],
  });
  return response;
};
