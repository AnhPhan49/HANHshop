import React, {useState, useEffect} from 'react'
import { TextField, Button, FormGroup, Switch, FormControlLabel } from '@material-ui/core'
import AdminApi from '../apis/adminApis'
import alert from '../utils/alert'

const CategoryEditModal = (props) => {        
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
               "name":editName,
                "active":checked
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
        <div className='category-edit-modal'>
            <h4>{props.title}</h4>
            <form onSubmit={onSubmit}>
                <FormGroup>
                    <TextField id="standard-basic" label="Tên danh mục" value={editName} onChange={(e) => setEditName(e.target.value)} required/>
                </FormGroup>
                <FormGroup className='mt-3'>
                <FormControlLabel                    
                    control={<Switch checked={checked} onChange={handleSwitch} />}
                    label="Trạng thái"
                />
                </FormGroup>
                <FormGroup className='mt-3'>
                    <Button variant="contained" color="primary" id='demo-simple-select-label' type='submit'>
                        Lưu
                    </Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default CategoryEditModal