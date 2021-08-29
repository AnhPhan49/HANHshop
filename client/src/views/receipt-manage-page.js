import React, { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import Pagination from "@material-ui/lab/Pagination";
import AdminApi from "../apis/adminApis";
import LinearProgress from "@material-ui/core/LinearProgress";
import ConfirmModal from "../components/confirm-modal";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import alert from "../utils/alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ReceiptManagePage = () => {
  const [loading, setLoader] = useState(true);  
  const [totalPage, setTotalPage] = useState(1);
  const [inventoryList, setInventoryList] = useState([]);
  const [alertState, setAlertState] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageDetail, setPageDetail] = useState();
  const [btnState, setBtnState] = useState(false);
  const [deleteItem, setDeleteItem] = useState();

  useEffect(() => {
    getReceiptList(1);
  }, []);

  const getReceiptList = async (page) => {
    try {
      setLoader(true);
      const res = await AdminApi.getReceiptList(page);
      setPageDetail(res.data.page);
      if (res.status === 200) {
        setInventoryList(res.data.receipts);
        setTotalPage(res.data.total_page);
      }
    } catch (e) {
      console.log(e);
    }
    setLoader(false);
  };

  const handleDelete = async (id) => {
    try {
      setBtnState(true);
      const res = await AdminApi.cancelReceipt(id);
      if (res.status === 200) {
        console.log(res);
        alert({
          icon: "success",
          title: res.message,
          msg: "Xóa sản phẩm thành công",
        });
        getReceiptList(page);
      }
    } catch (e) {
      console.log(e);
    }
    setBtnState(false);
    handleCloseConfirmModal();
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };
  const handleOpenConfirmModal = (product) => {
    setDeleteItem(product);
    setOpenConfirmModal(true);
  };

  const handleAcceptConfirmModal = () => {
    handleDelete(deleteItem._id);
  };

  const formatCurrency = (price) => {
    return price.toLocaleString('it-IT');                
}

  const pageChange = (event, page) => {
    getReceiptList(page);
    setPage(page);
  };

  const convertTime = (unformatTime) => {
    let date = new Date(unformatTime);
    const formatedTime =
      date.getDate() +
      " / " +
      (date.getMonth() + 1) +
      " / " +
      date.getFullYear();
    return formatedTime;
  };

  const approveReceipt = async (id) => {
    try {
      const res = AdminApi.approveReceipt(id);
      if (res.status === 200) {
        setAlertState(true);
        getReceiptList(page);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const closeAlert = () => {
    setAlertState(false);
  };

  return (
    <div className="production-page">
      <Snackbar open={alertState} autoHideDuration={3000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity="success">
          <div style={{ fontSize: "1.4rem" }}>Đã xác nhận đơn hàng</div>
        </Alert>
      </Snackbar>
      <ConfirmModal
        open={openConfirmModal}
        handleClose={handleCloseConfirmModal}
        unaccept={handleCloseConfirmModal}
        accept={handleAcceptConfirmModal}
        buttonState={btnState}
      ></ConfirmModal>
      <h4>Đơn Hàng</h4>
      <div className="row m-0 title">
        <div className="col-1 text-center">ID</div>
        <div className="col-1 text-center">Tên</div>
        <div className="col-1 text-center">Điện Thoại</div>
        <div className="col-2 text-center">Địa chỉ</div>
        <div className="col-2 text-center">Ngày Đặt</div>
        <div className="col-1 text-center">Tổng Tiền</div>
        <div className="col-1 text-center">Mã Đơn</div>
        <div className="col-2 text-center">Tình Trạng</div>
        <div className="col-1 text-center">Tùy Chọn</div>
      </div>
      <div className="product-list">
        {loading ? <LinearProgress></LinearProgress> : <></>}
        {inventoryList.length?(
          inventoryList.map((item, index) => (
            <div
              className="row m-0 product-row"
              style={{ background: `${index % 2 === 0 ? "#ebebeb" : ""}` }}
              key={item._id}
            >
              <div className="col-1 product-item">
                {(pageDetail - 1) * 10 + index + 1}
              </div>
              <div className="col-1 product-item">{item.name}</div>

              <div className="col-1 product-item">{item.phone}</div>
              <div className="col-2 product-item">{item.address}</div>
              <div className="col-2 product-item">
                {convertTime(item.createdAt)}
              </div>
              <div className="col-1 product-item price">{formatCurrency(item.total_price)}đ</div>
              <div className="col-1 product-item">{item.id_receipt}</div>
              <div className="col-2 product-item">{item.status.present}</div>
              <div className="col-1 product-item">
                <IconButton
                  color="primary"
                  onClick={() => approveReceipt(item._id)}
                >
                  <CheckIcon style={{ fontSize: 20 }}></CheckIcon>
                </IconButton>
                <IconButton
                  className="text-danger"
                  color="secondary"
                  aria-label="delete"
                  onClick={() => handleOpenConfirmModal(item)}
                >
                  <CloseIcon style={{ fontSize: 20 }}></CloseIcon>
                </IconButton>
              </div>
            </div>
          ))):(
            <></>
          )}
      </div>
      <div className="mt-4 paging">
        <Pagination
          count={totalPage}
          page={page}
          onChange={pageChange}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default ReceiptManagePage;
