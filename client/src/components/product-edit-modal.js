import React, {useState} from 'react'
import { TextField, Button, FormGroup } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const ProductEditModal = (props) => {
    const classes = useStyles();
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [store, setStore] = useState(false);

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value)
    };

    const handleChange = () => {
        setStore(!store)
    }


    return(
        <div className='edit-product-modal'>
            <h5>Edit Product</h5>
            <form>                   
                <FormGroup>
                    <TextField id="standard-basic" label="ID" />
                </FormGroup>
                <FormGroup>
                    <TextField id="standard-basic" label="Tên sản phẩm" />
                </FormGroup>
                <FormGroup>
                    <TextField id="standard-basic" label="Giá tiền" />
                </FormGroup>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    onChange={handleChangeCategory}
                    >
                    <MenuItem value='0'>Nồi</MenuItem>
                    <MenuItem value='1'>Áo quần</MenuItem>
                    <MenuItem value='2'>Thể thao</MenuItem>
                    </Select>
                </FormControl>          
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    onChange={handleChangeStatus}
                    >
                    <MenuItem value='0'>Hot</MenuItem>
                    <MenuItem value='1'>Sale</MenuItem>
                    <MenuItem value='2'>N/a</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel
                    className='mt-3'
                    control={
                    <Switch
                        checked={store}
                        onChange={handleChange}
                        name="luukho"
                        color="primary"
                    />
                    }
                    label="Lưu kho"
                />

                <FormGroup className='mt-2'>
                    <Button variant="contained" color="primary">
                        Lưu
                    </Button>
                </FormGroup>
            </form>
            
        </div>
    )
}

export default ProductEditModal