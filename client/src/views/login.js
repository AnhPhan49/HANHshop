import React, { useState } from "react";
import {
  FormControl,
  TextField,
  FormGroup,
  Button,
  makeStyles,
} from "@material-ui/core";
import AuthApis from "../apis/authApis";
import AdminApi from "../apis/adminApis";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import bgimg from "../assets/login-background.png";
import { useDispatch } from "react-redux";
import { savecurrentuserdata } from "../reducers/userReducer";
import { userloginsuccess } from "../reducers/userReducer";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Footer from "../components/Footer/Footer";
import img from "../assets/logo.png";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();  
  const [btn, setBtn] = useState(false);
  const [checked, setChecked] = useState(false);  

  const onSubmit = async (data) => {
    try {
      setBtn(true);
      const res = await AuthApis.login(data);
      if (res.status === 200) {
        localStorage.setItem("token", res.data);
        AuthApis.setHeaderAxios(res.data);
        getCurrentUserAndRoute();
      }
    } catch (e) {
      console.log(e);
    }
    setBtn(false);
  };

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const getCurrentUserAndRoute = async () => {
    try {
      const res = await AdminApi.getCurrentUser();
      if (res.status === 200) {
        dispatch(savecurrentuserdata(res.data));
        if (res.data.role === "admin" || res.data.role === "manager") {
          dispatch(userloginsuccess());
          history.push("/admin");
        } else {
          dispatch(userloginsuccess());
          history.push("/");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login-page">
      <div className="row m-0 login-header">
        <div
          className="col-lg-2 col-md-2 col-sm-6 logo-session text-center"
          onClick={() => history.push("/")}
        >
          <img alt="" src={img}></img>
        </div>
        <h3 className="col-lg-2 col-md-2 col-sm-6 mt-4 text-center">
          Đăng nhập
        </h3>
      </div>
      <div className="login-body row m-0">
        <div className="col-lg-6 col-md-6 col-sm-6 hidden-xs">
          <img alt="" src={bgimg}></img>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <div className="login-form">
            <h4>Đăng nhập</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <FormControl>
                  <TextField
                    {...register("phone")}
                    InputLabelProps={{
                      classes: {
                        root: classes.resize,
                      },
                    }}
                    InputProps={{
                      classes: {
                        input: classes.resize,
                      },
                    }}
                    required
                    label="Số điện thoại"
                  />
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl>
                  <TextField
                    {...register("password")}
                    InputLabelProps={{
                      classes: {
                        root: classes.resize,
                      },
                    }}
                    InputProps={{
                      classes: {
                        input: classes.resize,
                      },
                    }}
                    type="password"
                    required
                    label="Mật khẩu"
                  />
                </FormControl>
              </FormGroup>
              <FormControlLabel
                className="mt-3"
                control={
                  <Checkbox checked={checked} onChange={handleCheckbox} />
                }
                label={<h6>Ghi nhớ mật khẩu</h6>}
              />
              <FormGroup className="mt-3">
                <Button
                  disabled={btn}
                  variant="contained"
                  type="submit"
                  style={{
                    backgroundColor: "#ff6f64",
                    fontSize: "1.3rem",
                    color: "white",
                  }}
                >
                  Đăng nhập
                </Button>
              </FormGroup>
              <FormGroup className="mt-4">
                <Link to="/register">Đăng kí tài khoản</Link>
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  resize: {
    fontSize: "1.5rem",
  },
}));

export default Login;
