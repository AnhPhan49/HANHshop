import React, { useState, useEffect } from "react";
import { AppBar, useTheme, Tabs, Tab, IconButton } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { IoAddCircle } from "react-icons/io5";
import {
  setCustomerData,
  setManagerData,
} from "../reducers/accountManagementReducer";
import { useDispatch } from "react-redux";
import AdminApi from "../apis/adminApis";
import UserManagement from "../components/AccountManagement/user-management";
import ManagerManagement from "../components/AccountManagement/manager-management";

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const AccountManagePage = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCustomerList();
    getManagerList();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenAddModal = () => {
    setOpen(true);
  };

  const handleCloseAddModal = () => {
    setOpen(false);
  };

  const closeAfterSave = () => {
    getManagerList();
    handleCloseAddModal();
  };

  const getCustomerList = async () => {
    try {
      const res = await AdminApi.getCustomerAccountList();
      if (res.status === 200) {
        dispatch(setCustomerData(res.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getManagerList = async () => {
    try {
      const res = await AdminApi.getManagerAccountList();
      if (res.status === 200) {
        dispatch(setManagerData(res.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <AppBar position="static" color="white">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor=""
          textColor="primary"
          centered
        >
          <Tab label={<h4>Khách hàng</h4>} {...a11yProps(0)} />
          <Tab label={<h4>Quản lý</h4>} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
      >
        <UserManagement
          value={value}
          index={0}
          dir={theme.direction}
          reloadData={getCustomerList}
        ></UserManagement>
        <ManagerManagement
          value={value}
          index={1}
          dir={theme.direction}
          open={open}
          handleCloseAddModal={handleCloseAddModal}
          closeAfterSave={closeAfterSave}
          reloadData={getManagerList}
          handleOpenAddModal={handleOpenAddModal}
        ></ManagerManagement>
      </SwipeableViews>
    </div>
  );
};

export default AccountManagePage;
