import React, {useState, useEffect} from 'react'
import {AppBar} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {setCustomerData, setManagerData} from '../reducers/accountManagementReducer'
import { useDispatch } from 'react-redux'
import AdminApi from '../apis/adminApis'

function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const AccountManagePage = () => {    
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        getCustomerList()
        getManagerList()
    }, [])
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const getCustomerList = async () => {
        try {
            const res = AdminApi.getCustomerAccountList();
            if(res === 200) {
                dispatch(setCustomerData(res.data))
            }
        } catch(e) {
            console.log(e)
        }
    }

    const getManagerList = async () => {
        try {
            const res = AdminApi.getManagerAccountList();
            if(res === 200) {
                dispatch(setManagerData(res.data))
            }
        } catch(e) {
            console.log(e)
        }
    }

    return(
        <div>
            <AppBar position="static" color="white">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    >
                    <Tab label={<h5>Khách hàng</h5>} {...a11yProps(0)} />
                    <Tab label={<h5>Quản lý</h5>} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                {/* <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel> */}
        </div>
    )
}

export default AccountManagePage