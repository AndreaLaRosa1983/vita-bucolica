import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 10px"
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  imageHome: {
    marginLeft: "15px",
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
  },
  image: {
    marginLeft: "15px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  userName: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    width:"100%"
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  logout: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    display: "flex",
    alignItems: "center",
  }
}));
