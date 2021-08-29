import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingPage = () => {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      style={{ width: "100vw", height: "100vh", backgroundColor: "white" }}
    >
      <CircularProgress
        size={40}
        style={{
          color: "#ff6f64",
          position: "absolute",
          left: "50%",
          top: "50%",
        }}
      />
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

export default LoadingPage;
