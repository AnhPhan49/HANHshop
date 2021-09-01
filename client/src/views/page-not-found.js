import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const PageNotFound = () => {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      style={{ width: "100vw", height: "100vh", backgroundColor: "white" }}
    >
      <img alt='' src='https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-template-3.png'></img>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    position: "relative",
  },
}));

export default PageNotFound;
