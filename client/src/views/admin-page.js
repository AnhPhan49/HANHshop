import React, {useState} from 'react'
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
    ListItemText
} from '@material-ui/core';
import {GrFormNext, GrFormPrevious} from 'react-icons/gr'
import {RiStackFill, RiShoppingCart2Fill, RiLogoutBoxFill} from 'react-icons/ri'
import {FaUsers, FaStore} from 'react-icons/fa'
import {HiMenu} from 'react-icons/hi'
import { IoReceiptSharp } from "react-icons/io5";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {userlogoutsuccess} from '../reducers/userReducer'
import clsx from 'clsx';

import CategoryManagePage from './category-manage-page'
import ProductManagePage from './product-manage-page'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),    
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  sidebarText: {
    fontWeight: 700,
    color: 'gray',
  }
}));

const AdminPage = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();

    var sidebar = [
      {
        title: <h5 className={classes.sidebarText}>Tài khoản</h5>,
        icon: <FaUsers size='24px'></FaUsers>
    }, {
        title: <h5 className={classes.sidebarText}>Danh mục</h5>,
        icon: <RiStackFill size='24px'></RiStackFill>
    }, {
        title: <h5 className={classes.sidebarText}>Sản phẩm</h5>,
        icon: <RiShoppingCart2Fill size='24px'></RiShoppingCart2Fill>
    }, {
        title: <h5 className={classes.sidebarText}>Quản lý kho</h5>,
        icon: <FaStore size='24px'></FaStore>
    }, {
        title: <h5 className={classes.sidebarText}>Xác nhận đơn hàng</h5>,
        icon: <IoReceiptSharp size='24px'></IoReceiptSharp>
    }, {
      title: <h5 className={classes.sidebarText}>Đăng xuất</h5>,
        icon: <RiLogoutBoxFill size='24px'></RiLogoutBoxFill>
    }
  ]

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };
    
    const handleView = (index) => {
      setView(index)
    }

    const renderSwitch = (param) => {
      switch(param) {
        case 1:
          return <CategoryManagePage></CategoryManagePage>;
        case 2:
          return <ProductManagePage></ProductManagePage>;
        case 5:
          localStorage.removeItem('token')
          dispatch(userlogoutsuccess())
          return history.push('/login')
        default:
      }
    }

    return(
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
                    <HiMenu size='26px' color='white'/>
                </IconButton>
                <Typography variant="h4" noWrap>
                    Admin
                </Typography>
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
                      {theme.direction === 'rtl' ? <GrFormNext size='26px'/> : <GrFormPrevious size='26px'/>}
                  </IconButton>
                </div>
                <Divider />
                    <List>
                    {sidebar.map((item, index) => (
                        <ListItem button key={item.title} onClick={() => handleView(index)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title}/>
                        <Divider />
                        </ListItem>                        
                    ))}
                    </List>                                
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {
                  renderSwitch(view)
                }
            </main>
        </div>
    )
}

export default AdminPage