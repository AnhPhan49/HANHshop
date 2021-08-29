import React, { useState, useEffect } from "react";
import fireicon from "../../assets/fire-icon-1.gif";
import { NavLink, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { HiMenu } from "react-icons/hi";
import useWindowDimensions from "../GetScreenWidthHeight/useWindowDimensions";
import Drawer from "@material-ui/core/Drawer";
import ShopApi from "../../apis/shopApis";
import img from '../../assets/sidebar-logo.png'

const NavBar = () => {
  const { width } = useWindowDimensions();
  const classes = useStyles();
  const [drawner, setDrawner] = useState(false);
  const [cateList, setCatelist] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const res = await ShopApi.getCategoryList();
      if (res.status === 200) {
        setCatelist(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const list = () => (
    <div
      role="presentation"
      onClick={() => setDrawner(false)}
      onKeyDown={() => setDrawner(false)}
      className={classes.list}
    >
      <div className='sidebar-logo text-center'>
        <img alt='' src={img}></img>
      </div>
      <Link to="/" style={{ padding: 0 }}>
        <div className="sidebar-item">Trang chủ</div>
      </Link>
      <Link to="/product">
        <div className="sidebar-item">Sản phẩm</div>
      </Link>
      <div className='sidebar-child-item'>
        <ul>
        {cateList.length ? (
          cateList.map((ele, index) => (
            <li key={index}>
              <Link to={`/category/${ele._id}`}>
                <div>{ele.name}</div>
              </Link>
            </li>
          ))
        ) : (
          <></>
        )}
        </ul>
        
      </div>
      <Link to="/discount">
        <div className="sidebar-item">Ưu đãi</div>
      </Link>
      <Link to="/contact">
        <div className="sidebar-item">Liên Hệ</div>
      </Link>
      <Link to="/booked">
        <div className="sidebar-item">Đơn hàng</div>
      </Link>
    </div>
  );

  const onCloseDrowner = () => {
    setDrawner(false);
  };

  return (
    <div>
      <Drawer
        open={drawner}
        onClose={onCloseDrowner}
        classes={{ paper: classes.paper }}
      >
        {list()}
      </Drawer>
      {width >= 1000 ? (
        <div className="nav-item">
          <nav className="nav-menu">
            <ul className="nav-container">
              <li>
                <NavLink to="/">Trang Chủ</NavLink>
              </li>
              <li>
                <NavLink to="/product">Danh Sách Sản Phẩm</NavLink>
                <ul className="dropdown">
                  {cateList.length ? (
                    cateList.map((ele, index) => (
                      <li key={index}>
                        <Link to={`/category/${ele._id}`}>
                          <a>{ele.name}</a>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
              </li>
              <li>
                <NavLink to="/discount">
                  Ưu Đãi
                  <span>
                    <img src={fireicon} alt=""></img>
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact">Liên Hệ</NavLink>
              </li>
              <li>
                <NavLink to="/booked">Đơn Hàng</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div className={classes.root}>
          <AppBar position="static" style={{ backgroundColor: "#ff6f64" }}>
            <Toolbar className={classes.customizeToolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawner(true)}
              >
                <HiMenu size="26px" color="white" />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  customizeToolbar: {
    minHeight: 36,
  },
  paper: {
    background: "#ff6f64",
  },
  list: {
    width: 250,
    paddingTop: 10,
  },
}));

export default NavBar;
