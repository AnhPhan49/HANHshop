import React, {useState} from 'react'
import { TextField, Button, FormGroup, Switch, FormControlLabel } from '@material-ui/core'

const CategoryEditModal = (props) => {
    const [checked, setChecked] = useState(false)

    const handleSwitch = () => {
        setChecked(!checked)
    }

    return(
        <div className='category-edit-modal'>
            <h4>Edit Category</h4>
            <form>
                <FormGroup>
                    <TextField id="standard-basic" label="Tên danh mục" />
                </FormGroup>
                <FormGroup className='mt-3'>
                <FormControlLabel                    
                    control={<Switch checked={checked} onChange={handleSwitch} name="" />}
                    label="Trạng thái"
                />
                </FormGroup>
                <FormGroup className='mt-3'>
                    <Button variant="contained" color="primary" id='demo-simple-select-label'>
                        Lưu
                    </Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default CategoryEditModal