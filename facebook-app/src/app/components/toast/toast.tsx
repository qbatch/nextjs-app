import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface ToastProps {
  message?: string;
  severity?: AlertProps['severity'];
  toastOpen: boolean;
  className?: string;
  handleToastClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message = '',
  severity = 'success',
  toastOpen = false,
  className = '',
  handleToastClose,
}) => {
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={toastOpen}
      className={className}
      autoHideDuration={4000}
      onClose={handleToastClose}
    >
      <Alert
        onClose={handleToastClose}
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
