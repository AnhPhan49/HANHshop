import React, { useState } from "react";
import { FormGroup, TextField, makeStyles, Button } from "@material-ui/core";
import bgimg from "../assets/login-background.png";
import AuthApis from "../apis/authApis";
import { Link, useHistory } from "react-router-dom";
import alert from "../utils/alert";
import Footer from "../components/Footer/Footer";
import img from "../assets/logo.png";

//Firebase
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const RegisterPage = () => {
  const classes = useStyles();
  const history = useHistory();  
  // const auth = getAuth();
  const [lastname, setLastname] = useState();
  const [firstname, setFirstname] = useState();
  const [phone, setPhone] = useState();
  // const [otp, setOtp] = useState();
  const [address, setAddress] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRepassword] = useState();
  const [btn, setBtn] = useState(false);  

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== repassword) {
      alert({
        icon: "error",
        title: "Đăng kí thất bại",
        msg: "Nhập lại mật khẩu không trùng khớp",
      });
      return;
    }

    const data = {
      lastname: lastname,
      firstname: firstname,
      phone: phone,
      address: address,
      password: password,
    };

    try {
      setBtn(true);
      const res = await AuthApis.register(data);
      if (res.status === 200) {
        alert({ icon: "success", title: "Đăng kí thành công" });
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
    setBtn(false);
  };

//   const configureCaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
//       'size': 'invisible',
//       'callback': (response) => {
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
//         onSignInSubmit();
//         console.log('recaptcha')
//       },
//       defaultCountry: 'VN'
//     }, auth);
//   }

// const onSignInSubmit = () => {
//   configureCaptcha()
//   const phoneNumber = "+84" + phone;
//   const appVerifier = window.recaptchaVerifier;

//   const auth = getAuth();
//   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//       .then((confirmationResult) => {
//         // SMS sent. Prompt user to type the code from the message, then sign the
//         // user in with confirmationResult.confirm(code).
//         window.confirmationResult = confirmationResult;
//         console.log('OTP has been sent')
//         // ...
//       }).catch((error) => {
//         // Error; SMS not sent
//         // ...
//         console.log(error)
//       });
// }

// const getOTPCode = () => {
//     const code = getCodeFromUserInput();
//     confirmationResult.confirm(code).then((result) => {
//     // User signed in successfully.
//     const user = result.user;
//     // ...
//   }).catch((error) => {
//     // User couldn't sign in (bad verification code?)
//     // ...
//   });
// }

  return (
    <div className="login-page">
      <div className="row m-0 login-header">
        <div
          className="col-lg-2 col-md-2 col-sm-6 logo-session text-center"
          onClick={() => history.push("/")}
        >
          <img alt="" src={img}></img>
        </div>
        <h3 className="col-lg-2 col-md-2 col-sm-6 mt-4 text-center">Đăng kí</h3>
      </div>
      <div className="login-body row m-0">
        <div className="col-lg-6 col-md-6 col-sm-6 hidden-xs">
          <img alt="" src={bgimg}></img>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <div className="register-form">
            <h4>Đăng kí</h4>
            <form onSubmit={onSubmit}>
              <FormGroup className={classes.FormGroup}>
                <TextField
                  InputLabelProps={{
                    classes: {
                      root: classes.resize,
                    },
                  }}
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                  required
                  label="Họ"
                />

                <TextField
                  InputLabelProps={{
                    classes: {
                      root: classes.resize,
                    },
                  }}
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                  required
                  label="Tên"
                />
              </FormGroup>

              <FormGroup className={classes.FormGroup}>
                <TextField
                  InputLabelProps={{
                    classes: {
                      root: classes.resize,
                    },
                  }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                  required
                  label="Số điện thoại"
                />
                
              </FormGroup>

              <FormGroup className={classes.FormGroup}>
                <TextField
                  InputLabelProps={{
                    classes: {
                      root: classes.resize,
                    },
                  }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                  required
                  label="Địa chỉ liên lạc"
                />
              </FormGroup>

              <FormGroup className={classes.FormGroup}>
                <TextField
                  InputLabelProps={{
                    classes: {
                      root: classes.resize,
                    },
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                  type="password"
                  required
                  label="Mật khẩu"
                />
              </FormGroup>

              <FormGroup className={classes.FormGroup}>
                <TextField
                  InputLabelProps={{
                    classes: {
                      root: classes.resize,
                    },
                  }}
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                  type="password"
                  required
                  label="Nhập lại mật khẩu"
                />
              </FormGroup>
              <FormGroup className="mt-5">
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
                  Đăng kí
                </Button>
              </FormGroup>
              <FormGroup className="mt-4">
                <Link to="/login">Đăng nhập tài khoản</Link>
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  resize: {
    fontSize: "1.5rem",
  },
}));

export default RegisterPage;
