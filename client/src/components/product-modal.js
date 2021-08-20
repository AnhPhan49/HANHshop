import React, {useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react'
import { TextField, Button, FormGroup, IconButton, FormLabel } from '@material-ui/core'
import { PhotoLibrary } from '@material-ui/icons';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import {AiOutlineCloseCircle, AiOutlineCloudUpload} from 'react-icons/ai'
import AdminApi from '../apis/adminApis'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import alert from '../utils/alert';
import axios from 'axios'

import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: "1%",      
        width: '48%'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    selectTemplate:{
        padding: 4,
        fontSize: '1.4rem'
    },
    labelRoot: {
        fontSize: '1.5rem',
    },
    switchControl: {
        marginTop: 6,        
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',      
    },
    paper: {
        backgroundColor: theme.palette.background.paper,      
        boxShadow: theme.shadows[5],        
        borderRadius: 10,        
        height: 600,
        minWidth: 350,
        overflowY:'scroll'
    },
    paperContainer: {
        padding: theme.spacing(5, 5, 5),
    },
    imageWrapper: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,  
    },
    imageList: {
        flexWrap: 'nowrap',    
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    title: {
        color: 'red',
        fontSize: 20
    }
  }));

const ProductModal = forwardRef((props, ref) => {
    const classes = useStyles();
    const fileRef = useRef()

    const [open, setOpen] = useState(false)    
    const [previewFile, setPreviewFile] = useState([])
    const [file, setFile] = useState([])    
    
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [saletag, setSaleTag] = useState()
    const [desc, setDesc] = useState()
    const [category, setCategory] = useState()
    const [categoryList, setCategoryList] = useState([])
    const [status, setStatus] = useState('N/A')
    
    const [submitButtonState, setSubmitButtonState] = useState(true)

    useImperativeHandle(ref, () => ({
        handleOpenModal(){
            setOpen(true)
            setPreviewFile([])
            setFile([])
        },        
    }));

    useEffect(() => {
        getCategoryList()
    }, [])

    useEffect(() => {
        if(status !== 'Sale') {
            setSaleTag('')
        }
    }, [status])

    useEffect(() =>{
        if(status === 'Sale'){
            if(name && price && desc && category && file.length && saletag) {
                setSubmitButtonState(false)
            } else {
                setSubmitButtonState(true)
            }            
        } else {
            if(name && price && desc && category && file.length) {
                setSubmitButtonState(false)
            } else {
                setSubmitButtonState(true)
            }
        }
    }, [name , price , desc , category , file , saletag, status])
    
    const getCategoryList = async () => {
        try{
            const res = await AdminApi.getCategoryList();
            if(res.status === 200){
                setCategoryList(res.data)
            }
        } catch(e) {

        }
    }

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value)
    };

    const handleCloseModal = () => {
        setPreviewFile([])
        setFile([])
        setName('')
        setPrice('')
        setSaleTag('')
        setDesc('')
        setCategory('')
        setStatus('N/A')
        setOpen(false)
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setSubmitButtonState(true)
        try {
            const formData = new FormData();

            formData.append("name", name)
            formData.append("price", price)  
            formData.append("status", status)
            formData.append("category", category)                        
            file.forEach((item) => {
                formData.append("file", item)
            })
            formData.append("description", desc)
            if(saletag) {
                formData.append("price", saletag)
            }
            let token = localStorage.getItem('token')

            const res = await axios.post('https://hanh-shop.herokuapp.com/api/product/create', formData,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "multipart/form-data",
                },
            })            
            if(res.status === 200) {
                alert({icon: 'success', title: 'Tạo thành công', msg: res.message})
            }
        } catch(e) {
            console.log(e)
        }
        setSubmitButtonState(false)
        handleCloseModal()
        props.reloadNewData()
    }

    const handleChangeMedia = (e) => {
        const files = [...e.target.files];
        const fileArr = [];
        const fileErrorArr = []
        if (!files.length) return;

        if(file.length === 3){            
            // alert({icon:'error' ,title:'File is too large!', msg:'Maximum size of a file is 10MB'})
            return;
        }

        files.forEach((file) => {
            if (file.size > 1024 * 1024 * 10) {
                fileErrorArr.push(file.name)
            }
            else
                fileArr.push(file);
        });
             
        fileReader(fileArr)

        if(fileErrorArr.length) {            
            // alert({icon:'error' ,title:'File ảnh quá lớn', msg:'Dung lượng ảnh tối đa chỉ được 10MB'})
        }            
    }

    const fileReader = async (data) => {
        try {
            await data.forEach((item) => {
                const reader = new FileReader();
                reader.readAsDataURL(item)
                reader.onloadend = () => {
                    setPreviewFile([...previewFile, reader.result])          
                }
            })            
            setFile(file.concat(data))                    

        } catch(e){
            console.log(e)
        }             
    }

    const handleRemoveMedia = (index) => {        
        setPreviewFile(previewFile.filter((_, i) => i !== index))        
        setFile(file.filter((_, i) => i !== index))     
    }

    return(
        <div className='product-modal'>    
            <Modal                
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleCloseModal}            
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>                        
                        <div className={classes.paperContainer}>
                            <h4>{props.title}</h4>
                            <form onSubmit={handleSubmitForm}>                            
                                <FormGroup>
                                    <TextField                                        
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.labelRoot
                                            }
                                        }}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        id="standard-basic"
                                        label="Tên sản phẩm"/>
                                </FormGroup>
                                <FormGroup>
                                    <TextField                                        
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.labelRoot
                                            }
                                        }}
                                        value={price}
                                        onChange={(e) => {
                                            if(e.target.value > 0) {
                                                setPrice(e.target.value)
                                            }                                            
                                        }}
                                        InputProps={{
                                            inputProps: { 
                                                min: 1000
                                            }
                                        }}
                                        required                                        
                                        type='number'                                        
                                        id="standard-basic"
                                        label="Giá tiền" />
                                        <FormHelperText id="component-error-text"><h6>Giá tiền không được là giá trị âm</h6></FormHelperText>                                
                                </FormGroup>
                                <FormGroup>
                                    <TextField                                        
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.labelRoot
                                            }
                                        }}
                                        disabled={(status === 'Sale')?false:true}                                        
                                        value={saletag}
                                        onChange={(e) => {
                                            if(e.target.value > 0 && e.target.value <= 100) {
                                                setSaleTag(e.target.value)
                                            }                          
                                        }}
                                        InputProps={{
                                            inputProps: { 
                                                min: 1,
                                                max: 100
                                            }
                                        }}
                                        type="number"                                                                            
                                        required
                                        id="standard-basic"
                                        label="Phần trăm Sale (Chỉ dành cho Sale)" />
                                        <FormHelperText id="component-error-text"><h6>Phần trăm Sale không được chêch lệch 0-100%</h6></FormHelperText>
                                </FormGroup>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label"><span style={{ fontSize: '1.5rem' }}>Danh mục</span></InputLabel>
                                    <Select
                                    className={classes.selectTemplate}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    onChange={handleChangeCategory}
                                    required
                                    >
                                        {
                                            categoryList.map((item,index) => (
                                                <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                                        ))
                                        }                                       
                                    </Select>
                                </FormControl>          
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label"><span style={{ fontSize: '1.5rem' }}>Trạng thái</span></InputLabel>
                                    <Select
                                    className={classes.selectTemplate}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    onChange={handleChangeStatus}
                                    required                 
                                    >
                                        <MenuItem value='N/A'><em>N/A</em></MenuItem>
                                        <MenuItem value='Hot'>Hot</MenuItem>
                                        <MenuItem value='Sale'>Sale</MenuItem>
                                        <MenuItem value='Phổ biến'>Phổ biến</MenuItem>                    
                                    </Select>
                                </FormControl>
                                <FormGroup className='mt-3 mb-3'>
                                    <FormLabel><span style={{ fontSize: '1.5rem' }}>Mô tả sản phẩm</span></FormLabel>
                                    <div className='ckeditor'>
                                        <CKEditor                                                        
                                            editor={ ClassicEditor }
                                            fontSize={16}
                                            onReady={ editor => {                                
                                                editor.editing.view.change(writer => {
                                                    writer.setStyle(
                                                    "height",
                                                    "100px",                                                                                                  
                                                    editor.editing.view.document.getRoot()
                                                    );
                                                });
                                            } }                                  
                                            config={{                                                  
                                                toolbar: ['heading','|','bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', 'insertTable',
                                                'tableColumn', 'tableRow', 'mergeTableCells', '|', 'undo', 'redo'],
                                                
                                            }}                                                                   
                                            data={desc}
                                            onChange={ ( event, editor ) => {                                                                   
                                                setDesc(editor.getData())
                                            } }                                       
                                        />
                                    </div>                                    
                                </FormGroup>                             
                                <FormGroup>
                                    <FormGroup className='mt-1'>
                                        <input                            
                                            type='file'
                                            hidden                                            
                                            onChange={handleChangeMedia}
                                            alt=""
                                            accept="image/png, image/jpeg"
                                            ref={fileRef}
                                        />                                                                             
                                        <div className='modal-image-frame'>
                                            {
                                                (file.length)?(
                                                    <div className={classes.imageWrapper}>
                                                        <ImageList className={classes.imageList} cols={3} rowHeight={140}>
                                                            {previewFile.map((item, index) => (
                                                            <ImageListItem key={index}>
                                                                <img src={item} alt='' />
                                                                <ImageListItemBar
                                                                classes={{
                                                                    root: classes.titleBar,                                                        
                                                                }}
                                                                actionIcon={
                                                                    <IconButton onClick={() => handleRemoveMedia(index)}>
                                                                        <AiOutlineCloseCircle className={classes.title} />
                                                                    </IconButton>
                                                                }
                                                                />
                                                            </ImageListItem>
                                                            ))}
                                                        </ImageList>
                                                    </div>
                                                ):(
                                                    <div className='upload-template'>
                                                        <AiOutlineCloudUpload size={80} color='lightgray'></AiOutlineCloudUpload>
                                                        <div>
                                                            Thêm hình ảnh
                                                        </div>
                                                    </div>
                                                )
                                            }                                            
                                            <div>
                                                <Button                                    
                                                    onClick={() => fileRef.current.click()}                                                
                                                    id='material-button-label'
                                                    type='button'                                         
                                                    color="primary"                                                    
                                                    >
                                                    Add <span><PhotoLibrary></PhotoLibrary></span>
                                                </Button> 
                                            </div>                                                                       
                                        </div>
                                        <FormHelperText id="component-error-text"><h5>Chỉ tối đa có thể up được 3 ảnh</h5></FormHelperText>                                                                           
                                    </FormGroup>                                    
                                </FormGroup>

                                <FormGroup className='mt-3'>
                                    <Button disabled={submitButtonState} type='submit' variant="contained" color="primary" id='material-button-label'>
                                        Lưu
                                    </Button>
                                </FormGroup>
                            </form>                    
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
})

export default ProductModal