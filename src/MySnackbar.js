import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MySnackbar({ open, title, color }) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%", backgroundColor: color }}
        >
          {title}
        </Alert>
      </Snackbar>
    </div>
  );
}
