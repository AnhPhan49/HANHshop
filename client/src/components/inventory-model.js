import React, {useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react'
import { TextField, Button, FormGroup, IconButton, FormLabel } from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AdminApi from '../apis/adminApis'
import alert from '../utils/alert'
import NumberFormat from 'react-number-format';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: '55px',
          marginBottom :'10px',
          marginTop :'45px',
          marginLeft :'35px',
          fontSize: '1.5rem',
          transform: 'translate(0, -21.5px) scale(1.5)',
         
        },
      },
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
        fontSize: '1.0rem',
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
        height: 350,
        minWidth: 300,
        // overflowY:'scroll'
    },
    paperContainer: {
        padding: theme.spacing(5, 5, 5),
        fontSize: '23px'
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
    // titleBar: {
    //     background:
    //       'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    // },
    title: {
        color: 'red',
        fontSize: 25
    }
  }));

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    
     return (
            <NumberFormat
                {...other}
                getInputRef={inputRef}
                allowNegative={false}
                 onValueChange={(values) => {
                  onChange({
                      target: {
                          name: props.name,
                          value: values.value,
                      },
                  });
              }}   
              
                isNumericString
            />
        );
  }

  

const ProductModal = forwardRef((props, ref) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)    
    const [editNumber, setEditNumber] = useState()
    const [editProducer, setEditProducer] = useState()
    const [buttonstatus, setstatus]=useState(false);
    useImperativeHandle(ref, () => ({
        handleOpenModal(){
            setOpen(true)
        },        
    }));
 
  
    const handleCloseModal = () => {
        setOpen(false)
     
    }
    const demo=()=>{
      if(props.status===true){
          return( <Fade in={open}>
            <div className={classes.paper}>                        
                <div className={classes.paperContainer}>
                    <h4>{props.title}</h4>
                    <form onSubmit={handleSubmitFormExport}>        
                                     
                 <div className={classes.root}>
                      <FormGroup>
            <TextField
                id="standard-basic"
                label="Số Lượng"
                value={editNumber}
              
                InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                onChange={(e) => setEditNumber(e.target.value)}
                />
        </FormGroup>   
        </div>                        
                <FormGroup className='mt-5'>
                            <Button disabled={buttonstatus} type='submit' variant="contained" color="primary" id='material-button-label'>
                                Lưu
                            </Button>
                        </FormGroup>
                    </form>                    
                </div>
            </div>
        </Fade>)
      }
      else if(props.status===false){
          return(
            <Fade in={open}>
            <div className={classes.paper}>                        
                <div className={classes.paperContainer}>
                    <h4>{props.title}</h4>
                    <form onSubmit={handleSubmitFormImport}>          
                    <div className={classes.root}>                 
        <FormGroup>                           
        <TextField
                id="standard-basic"
                label="Nhà Cung Cấp"
                value={editProducer}
                InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,                              
                    }
                }}
                onChange={(e) => setEditProducer(e.target.value)}
                />
        </FormGroup>     
             <FormGroup>
            <TextField
                id="standard-basic"
                label="Số Lượng"
                value={editNumber}
              
                InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                onChange={(e) => setEditNumber(e.target.value)}
                />
        </FormGroup>   
        
        
        </div>
        {/* <FormGroup>
            <TextField
                id="standard-basic"
                label="Nhà Cung Cấp"
                value={editProducer}
                InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,                              
                    }
                }}
                onChange={(e) => setEditProducer(e.target.value)}
                />
        </FormGroup>                           */}
                        <FormGroup className='mt-5'>
                            <Button disabled={buttonstatus} type='submit' variant="contained" color="primary" id='material-button-label'>
                                Lưu
                            </Button>
                        </FormGroup>
                    </form>                    
                </div>
            </div>
        </Fade>
            )
      }
    }
    
    const handleSubmitFormImport = async(e) => {
       try{
            setstatus(true)
            e.preventDefault();
          
                let formData = {
                
                    "count":Number(editNumber),
                    "producer":editProducer
                    
                }
                console.log(formData)
            
          
            let res = null
            if (props.modalEditFilter) {
                res = await AdminApi.updateInventory(props.modalEditFilter._id, formData);
                console.log(res);
            }          
            if(res.status === 200) {              
                alert({icon : 'success',title : 'Updated', msg : res.message})                                                    
            } 
       
                 
        }
        catch(e) {
            console.log(e)
        }
        setOpen(false)
        setstatus(false)
        props.reloadNewData()
        return 

    }
    const handleSubmitFormExport = async(e) => {
        try{
            setstatus(true)
            e.preventDefault();
            
                let formData = {
                    "count":Number(editNumber)*-1
                }
                console.log(formData)
             
           
             let res = null
            
             if (props.modalEditFilter) {
                 res = await AdminApi.updateInventory(props.modalEditFilter._id, formData);
                 console.log(res);
             }          
             if(res.status === 200) {              
                 alert({icon : 'success',title : 'Updated', msg : res.message})                                                    
             } 
         }
                  
         
         catch(e) {
             console.log(e)
         }
         setOpen(false)
         setstatus(false)
         props.reloadNewData()
         return 
 
     }
    

// console.log(props.modalEditFilter.total);
// console.log(Number(editNumber));
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
                 {demo()} 
              
            </Modal>
        </div>
    )
})

export default ProductModal