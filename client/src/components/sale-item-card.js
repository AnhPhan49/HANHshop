import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const SaleItemCard = (props) => {
    const classes = useStyles();

    const formatCurrency = (price) => {
        return price.toLocaleString('it-IT');                
    }

    return(
        <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="180"
            image={props.img_src}
            title="Contemplative Reptile"
          />
          <CardContent>
              <div className='sale-item-card'>
                <div className='title'>
                    {props.title}
                </div>
                <div className='sale-price'>
                    đ {formatCurrency(props.sale_price)}                  
                </div>
                
                <div className='percent-sale'>
                    <span>
                    Giảm {props.discount_percent}%
                    </span>                    
                </div>
                {/* <div className='base-price'>
                    đ {formatCurrency(props.base_price)}             
                </div> */}
              </div>
          </CardContent>
        </CardActionArea>       
      </Card>
    )
}

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    borderRadius:'10px',
    height: '100%',    
  },
});

export default SaleItemCard