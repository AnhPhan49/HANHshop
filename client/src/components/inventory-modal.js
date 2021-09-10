import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { TextField, Button, FormGroup } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import AdminApi from "../apis/adminApis";
import alert from "../utils/alert";
import NumberFormat from "react-number-format";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import CallMadeIcon from "@material-ui/icons/CallMade";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "55px",
      marginBottom: "10px",
      marginTop: "45px",
      marginLeft: "35px",
      fontSize: "1.5rem",
      transform: "translate(0, -21.5px) scale(1.5)",
    },
  },
  formControl: {
    margin: "1%",
    width: "48%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectTemplate: {
    padding: 4,
    fontSize: "1.4rem",
  },
  labelRoot: {
    fontSize: "1.0rem",
  },
  switchControl: {
    marginTop: 6,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    height: 350,
    minWidth: 300,
  },
  papernew: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],

    marginTop: "5px",
    height: 600,
    minWidth: 1000,
  },
  paperContainer: {
    padding: theme.spacing(5, 5, 5),
    fontSize: "22px",
  },
  imageWrapper: {
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  title: {
    color: "red",
    fontSize: 25,
  },
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

const InventoryModal = forwardRef((props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [editNumber, setEditNumber] = useState();
  const [editProducer, setEditProducer] = useState();
  const [historyProduct, setHistoryProduct] = useState([]);
  const [buttonstatus, setstatus] = useState(false);
  const [loader, setLoader] = useState(false);

  useImperativeHandle(ref, () => ({
    handleOpenModal() {
      setOpen(true);
      getProductList();
    },
  }));

  const handleCloseModal = () => {
    setOpen(false);
  };
  const clearInput = () => {
    setEditNumber();
    setEditProducer();
  };
  useEffect(() => {
    clearInput();

    getProductList();
  }, [props.modalEditFilter]);

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

  const getProductList = async () => {
    try {
      if (props.all === true) {
        setLoader(true);
        const res = await AdminApi.getHistoryInventory(
          props.page,
          props.modalEditFilter._id
        );
        if (res.status === 200) {
          setHistoryProduct(res.data.list);
        }
      }
    } catch (e) {
      console.log(e);
    }
    setLoader(false);
  };

  const demo = () => {
    if (props.all === true) {
      return (
        <Fade in={open}>
          <div className={classes.papernew}>
            <div className={classes.paperContainer}>
              <div className="production-page">
                <h4>{props.title}</h4>
                {loader ? (
                  <LinearProgress></LinearProgress>
                ) : (
                  <div>
                    <div className="row m-0 title">
                      <div className="col-3 text-center">Stt</div>
                      <div className="col-3 text-center">Số Lượng Nhập</div>
                      <div className="col-3 text-center">Tên Nhà Cung Cấp</div>
                      <div className="col-3 text-center">Ngày Nhập</div>
                    </div>
                    <div className="product-list">
                      {historyProduct &&
                        historyProduct.map((item, i) => (
                          <div
                            className="row m-0 product-row"
                            style={{
                              background: i % 2 === 0 ? "#ebebeb" : "white",
                            }}
                            key={item._id}
                          >
                            <div className="col-3 product-item">{i + 1}</div>
                            <div className="col-3 product-item">
                              {item.total_add <= 0
                                ? item.total_add
                                : item.total_add}
                              {item.total_add <= 0 ? (
                                <CallReceivedIcon
                                  style={{
                                    color: "red",
                                    marginTop: -4,
                                    fontSize: "20px",
                                  }}
                                />
                              ) : (
                                <CallMadeIcon
                                  style={{
                                    color: "green",
                                    marginTop: -4,
                                    fontSize: "20px",
                                  }}
                                />
                              )}
                            </div>

                            <div className="col-3 product-item">
                              {item.producer}
                            </div>
                            <div className="col-3 product-item">
                              {convertTime(item.createdAt)}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fade>
      );
    }
    if (props.all === false) {
      if (props.status === true) {
        return (
          <Fade in={open}>
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
                        required
                        onWheel={(e) => e.target.blur()}
                        type="number"
                        InputProps={{
                          inputComponent: NumberFormatCustom,
                        }}
                        onChange={(e) => setEditNumber(e.target.value)}
                      />
                    </FormGroup>
                  </div>
                  <FormGroup className="mt-5">
                    <Button
                      disabled={buttonstatus}
                      type="submit"
                      variant="contained"
                      color="primary"
                      id="material-button-label"
                    >
                      Lưu
                    </Button>
                  </FormGroup>
                </form>
              </div>
            </div>
          </Fade>
        );
      } else if (props.status === false) {
        return (
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
                        required
                        value={editProducer}
                        InputLabelProps={{
                          classes: {
                            root: classes.labelRoot,
                          },
                        }}
                        onChange={(e) => setEditProducer(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        id="standard-basic"
                        label="Số Lượng"
                        required
                        onWheel={(e) => e.target.blur()}
                        value={editNumber}
                        type="number"
                        InputProps={{
                          inputComponent: NumberFormatCustom,
                        }}
                        onChange={(e) => setEditNumber(e.target.value)}
                      />
                    </FormGroup>
                  </div>

                  <FormGroup className="mt-5">
                    <Button
                      disabled={buttonstatus}
                      type="submit"
                      variant="contained"
                      color="primary"
                      id="material-button-label"
                    >
                      Lưu
                    </Button>
                  </FormGroup>
                </form>
              </div>
            </div>
          </Fade>
        );
      }
    }
  };

  const handleSubmitFormImport = async (e) => {
    try {
      setstatus(true);
      e.preventDefault();

      let formData = {
        count: Number(editNumber),
        producer: editProducer,
      };

      let res = null;
      if (props.modalEditFilter) {
        res = await AdminApi.updateInventory(
          props.modalEditFilter._id,
          formData
        );
      }
      if (res.status === 200) {
        alert({ icon: "success", title: "Updated", msg: res.message });
      }
    } catch (e) {
      console.log(e);
    }
    clearInput();
    setOpen(false);
    setstatus(false);
    props.reloadNewData();
    return;
  };
  const handleSubmitFormExport = async (e) => {
    try {
      setstatus(true);
      e.preventDefault();

      let formData = {
        count: Number(editNumber) * -1,
      };

      let res = null;

      if (props.modalEditFilter) {
        res = await AdminApi.updateInventory(
          props.modalEditFilter._id,
          formData
        );
      }
      if (res.status === 200) {
        alert({ icon: "success", title: "Updated", msg: res.message });
      }
    } catch (e) {
      console.log(e);
    }
    clearInput();
    setOpen(false);
    setstatus(false);
    props.reloadNewData();
    return;
  };

  return (
    <div className="product-modal">
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
  );
});

export default InventoryModal;
