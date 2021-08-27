import React, {useState} from "react";
import { FormGroup, TextField, Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ShopApi from '../apis/shopApis'
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux'

const AuthPaymentModal = (props) => {
  const classes = useStyles();
  const accountdata = useSelector((state) => state.user.user)
  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const [detail, setDetail] = useState()
const [btn, setBtn] = useState(false)
  const [receiptInfo, setReceiptInfo] = useState()

  const submitReceipt = async () => {
    try {
        const data = {
            "name": name,
            "phone": phone,
            "address": address,
            "detail": detail
        }

        const res = await ShopApi.acceptReceipt()
    } catch(e) {

    }
  }

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
      className={classes.modal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <div className={classes.paper}>
          <h4>Thông tin đơn hàng</h4>
          <form>
            <FormGroup className={classes.FormGroup}>
              <TextField
                InputLabelProps={{
                  classes: {
                    root: classes.resize,
                  },
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
                required
                placeholder="Họ và tên"
              />
            </FormGroup>
            <FormGroup className={classes.FormGroup}>
              <TextField
                InputLabelProps={{
                  classes: {
                    root: classes.resize,
                  },
                }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
                required
                placeholder="Số điện thoại"
              />
            </FormGroup>
            <FormGroup className={classes.FormGroup}>
              <TextField
                InputLabelProps={{
                  classes: {
                    root: classes.resize,
                  },
                }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
                required
                placeholder='Địa chỉ liên lạc'
              />
            </FormGroup>
            <FormGroup className={classes.FormGroup}>
              <textarea value={detail} onChange={(e) => setDetail(e.target.value)} style={{fontSize:'1.4rem', outline:'none'}} placeholder='Ghi chú (nếu cần)' rows="4" cols="50"></textarea>
            </FormGroup>
            
          </form>
          <h4 className='mt-4'>Chi phí thanh toán</h4>
          <div style={{fontSize:'1.4rem', borderTop:'1px solid lightgray', borderBottom:'1px solid lightgray', padding:'12px'}}>
            <div className='row m-0 '>
              <div className='col-6 p-0'>
                Tạm tính:
              </div>
              <div className='col-6 p-0 text-right'>
                0đ
              </div>
            </div>
            <div className='row m-0'>
              <div className='col-6 p-0'>
              Phí vận chuyển:
              </div>
              <div className='col-6 p-0 text-right'>
                0đ
              </div>
            </div>            
          </div>
          <div className='row m-0' style={{fontSize:'1.4rem', padding:'12px', fontWeight:'550'}}>
              <div className='col-6 p-0'>
              Tổng cộng:
              </div>
              <div className='col-6 p-0 text-right text-danger'>
                0đ
              </div>
            </div>           
          <div className="mt-3 row modal-action">
            <div className="col-6">
              <Button
                type="button"
                onClick={props.handleClose}
                variant="contained"
                color="secondary"
                style={{ fontSize: "1.2rem" }}
              >
                Trở về
              </Button>
            </div>
            <div className="col-6">
              <Button
                disabled={btn}
                type="submit"
                variant="contained"
                color="primary"
                style={{ fontSize: "1.2rem" }}
              >
                Đặt hàng
              </Button>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  FormGroup: {
    marginTop: 14
  },
  resize: {
    fontSize: '1.5rem'
},
}));

export default AuthPaymentModal;
