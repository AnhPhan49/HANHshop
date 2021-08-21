import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
});

function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const AccountManagePage = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return(
        <div className='account-page'>
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