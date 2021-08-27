import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  makeStyles,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { RiUserReceivedFill, RiLockPasswordFill } from "react-icons/ri";
import { FaUsers, FaStore } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { IoReceiptSharp } from "react-icons/io5";
import { AiFillSetting } from "react-icons/ai";
import { BsFillInboxesFill, BsFillInboxFill } from "react-icons/bs";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { userlogoutsuccess } from "../reducers/userReducer";
import clsx from "clsx";

import CategoryManagePage from "./category-manage-page";
import ProductManagePage from "./product-manage-page";
import InventoryManagePage from "./inventory-manage-page";
import AccountManagePage from "./account-manage-page";

const drawerWidth = 240;

const AdminPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSidebar, setCurrentSidebar] = useState();

  useEffect(() => {
    if (user.role === "admin") {
      setCurrentSidebar(AdminSidebar);
    } else {
      setCurrentSidebar(ManagerSidebar);
    }
  }, []);

  useEffect(() => {
    if (user.role === "admin") {
      setCurrentSidebar(AdminSidebar);
    } else {
      setCurrentSidebar(ManagerSidebar);
    }
  }, [view]);

  var AdminSidebar = [
    {
      title: <h5 className={classes.sidebarText}>Danh mục</h5>,
      icon: (
        <BsFillInboxesFill
          size="24px"
          color={view === 0 ? "rgba(0,204,255,255)" : ""}
        ></BsFillInboxesFill>
      ),
    },
    {
      title: <h5 className={classes.sidebarText}>Sản phẩm</h5>,
      icon: (
        <BsFillInboxFill
          size="24px"
          color={view === 1 ? "rgba(0,204,255,255)" : ""}
        ></BsFillInboxFill>
      ),
    },
    {
      title: <h5 className={classes.sidebarText}>Quản lý kho</h5>,
      icon: (
        <FaStore
          size="24px"
          color={view === 2 ? "rgba(0,204,255,255)" : ""}
        ></FaStore>
      ),
    },
    {
      title: <h5 className={classes.sidebarText}>Xác nhận đơn hàng</h5>,
      icon: (
        <IoReceiptSharp
          size="24px"
          color={view === 3 ? "rgba(0,204,255,255)" : ""}
        ></IoReceiptSharp>
      ),
    },
    {
      title: <h5 className={classes.sidebarText}>Tài khoản</h5>,
      icon: (
        <FaUsers
          size="24px"
          color={view === 4 ? "rgba(0,204,255,255)" : ""}
        ></FaUsers>
      ),
    },
  ];

  var ManagerSidebar = [
    {
      title: <h5 className={classes.sidebarText}>Danh mục</h5>,
      icon: (
        <BsFillInboxesFill
          size="24px"
          color={view === 0 ? "rgba(0,204,255,255)" : ""}
        ></BsFillInboxesFill>
      ),
    },
    {
      title: <h5 className={classes.sidebarText}>Sản phẩm</h5>,
      icon: (
        <BsFillInboxFill
          size="24px"
          color={view === 1 ? "rgba(0,204,255,255)" : ""}
        ></BsFillInboxFill>
      ),
    },
    {
      title: <h5 className={classes.sidebarText}>Quản lý kho</h5>,
      icon: (
        <FaStore
          size="24px"
          color={view === 2 ? "rgba(0,204,255,255)" : ""}
        ></FaStore>
      ),
    },
    {
      title: <h5 className={classes.sidebarText}>Xác nhận đơn hàng</h5>,
      icon: (
        <IoReceiptSharp
          size="24px"
          color={view === 3 ? "rgba(0,204,255,255)" : ""}
        ></IoReceiptSharp>
      ),
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleView = (index) => {
    setView(index);
  };

  const handleClickSettingMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettingMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userlogoutsuccess());
    setAnchorEl(null);
    return history.push("/login");
  };

  const renderSwitch = (param) => {
    switch (param) {
      case 4:
        return <AccountManagePage></AccountManagePage>;
      case 0:
        return <CategoryManagePage></CategoryManagePage>;
      case 1:
        return <ProductManagePage></ProductManagePage>;
      case 2:
        return <InventoryManagePage></InventoryManagePage>;
      default:
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <HiMenu size="26px" color="white" />
          </IconButton>
          <Typography variant="h4" noWrap>
            {user && user.role}
          </Typography>
          <div className="admin-toolbar-setting">
            <IconButton onClick={handleClickSettingMenu}>
              <AiFillSetting size="24px" color="white"></AiFillSetting>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseSettingMenu}
            >
              <MenuItem onClick={handleCloseSettingMenu}>
                <h5>
                  <RiLockPasswordFill size="18px"></RiLockPasswordFill>{" "}
                  <span>Đổi mật khẩu</span>
                </h5>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <h5>
                  <RiUserReceivedFill size="18px"></RiUserReceivedFill>{" "}
                  <span>Đăng xuất</span>
                </h5>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <GrFormNext size="26px" />
            ) : (
              <GrFormPrevious size="26px" />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {currentSidebar &&
            currentSidebar.map((item, index) => (
              <ListItem button key={index} onClick={() => handleView(index)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
                <Divider />
              </ListItem>
            ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {renderSwitch(view)}
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  sidebarText: {
    fontWeight: 700,
    color: "gray",
  },
}));

export default AdminPage;
