import React, {useState, useEffect} from 'react'
import { TextField, Button, FormGroup, Switch, FormControlLabel, makeStyles } from '@material-ui/core'
import AdminApi from '../apis/adminApis'
import alert from '../utils/alert'

import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
    labelRoot: {
        fontSize: '1.5rem',
    },
  }));

const CategoryEditModal = (props) => {  
    const classes = useStyles();        
    const [editName, setEditName] = useState()
    const [checked, setChecked] = useState(false)
    
    useEffect(() => {
        if(props.modalEditFilter){
            setEditName(props.modalEditFilter.name)
            setChecked(props.modalEditFilter.active)
        }
    }, [])

    const handleSwitch = () => {
        setChecked(!checked)
    }

    const onSubmit = async (e) => {        
        try{
            e.preventDefault();
            let formData = {
                "name": editName,
                "active": checked
            }
            let res = null
            if (props.modalEditFilter) {
                res = await AdminApi.updateCategory(props.modalEditFilter._id, formData);
            } else {
                res = await AdminApi.addCategory(formData);
            }            
            if(res.status === 200) {              
                alert({icon : 'success',title : 'Success', msg : res.message})                    
            } 
        }
        catch(e) {
            console.log(e)
        }
        props.closeModalHandler()
        return 
    }

    return(
        <div className='category-modal'>
            <h4>{props.title}</h4>
            <form onSubmit={onSubmit}>
                <FormGroup>
                    <TextField
                        id="standard-basic"
                        label="Tên danh mục"
                        value={editName}
                        InputLabelProps={{
                            classes: {
                              root: classes.labelRoot,                              
                            }
                        }}
                        onChange={(e) => setEditName(e.target.value)}
                        required/>
                </FormGroup>
                <FormGroup className='mt-3'>
                <FormControlLabel                    
                    control={<Switch checked={checked} onChange={handleSwitch} />}
                    label={<span style={{ fontSize: '1.5rem' }}>Trạng thái</span>}
                />
                </FormGroup>
                <FormGroup className='mt-3'>
                    <Button variant="contained" color="primary" id='material-button-label' type='submit'>
                        Lưu
                    </Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default CategoryEditModal