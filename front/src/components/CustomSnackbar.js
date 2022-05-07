import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

/**
 * alert을 띄우기 편하게 데이터를 가공합니다.
 * @param {boolean} state
 * @param {function} setState
 * @param {string} message
 * @param {string} type
 * @returns {{open:boolean, setOpen:function, message:string, type: string}}
 */
const setAlertData = (state, setState, message, type) => {
  return { open: state, setOpen: setState, message, type };
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * 오른쪽 하단에 alert를 띄워줍니다.
 * @constructor
 * @param {boolean} open true면 alert을 띄웁니다.
 * @param {function} setOpen 상태 변경 함수입니다.
 * @param {string} message alert에 들어갈 메시지입니다.
 * @param {string} type alert의 타입을 설정합니다.
 * @returns {JSX.Element}
 */
function CustomSnackbar({ open, setOpen, message, type }) {
  const alertPosition = { vertical: "bottom", horizontal: "right" };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={alertPosition}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export { CustomSnackbar, setAlertData };
