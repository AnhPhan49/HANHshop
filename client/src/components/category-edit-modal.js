import React, {useState} from 'react'
import { TextField, Button, FormGroup, Switch, FormControlLabel } from '@material-ui/core'

const CategoryEditModal = (props) => {
    const [checked, setChecked] = useState(false)

    const handleSwitch = () => {
        setChecked(!checked)
    }

    return(
        <div className=''>
            <h5>Edit Category</h5>
            <form>
                <FormGroup>
                    <TextField id="standard-basic" label="Tên danh mục" />
                </FormGroup>
                <FormGroup>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleSwitch} name="" />}
                    label="Trạng thái"
                />
                </FormGroup>
                <FormGroup>
                    <Button variant="contained" color="primary">
                        Lưu
                    </Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default CategoryEditModal