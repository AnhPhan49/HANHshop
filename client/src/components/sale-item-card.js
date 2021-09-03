import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const SaleItemCard = (props) => {
  const classes = useStyles();

  const formatCurrency = (price) => {
    return price.toLocaleString("it-IT");
  };

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.rootContain}>
        <CardMedia
          component="img"
          height="180"
          image={props.img_src[0] ? props.img_src[0].url : ""}
        />
        <CardContent>
          <div className="sale-item-card">
            <div className="title">{props.title}</div>
            <div className="sale-price">
              {props.sale_price
                ? formatCurrency(props.sale_price)
                : formatCurrency(props.base_price)}
              đ
            </div>
            {props.discount_percent ? (
              <div className="row m-0">
                <div className="base-price col-6">
                  {formatCurrency(props.base_price)}đ
                </div>
                <div className="percent-sale col-6">
                  <span>Giảm {props.discount_percent}%</span>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    borderRadius: "10px",
    height: 290,
  },
  rootContain: {
    height: "100%",
  },
});

export default SaleItemCard;
