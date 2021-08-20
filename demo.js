import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput 
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[ /[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/,/\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};


export default function FormattedInputs() {
  const classes = useStyles();
  const [values, setValues] = React.useState();

  const handleChange = (e) => {
    setValues(e.target.value);
    console.log(values);
    let x1={"total":Number(values)};
    console.log(x1);
  };

  return (
    <form onSubmit={handleChange}>  
    <div className={classes.root}>
      <FormControl>
        <InputLabel htmlFor="formatted-text-mask-input">react-text-mask</InputLabel>
        <Input
          value={values}
          onChange={handleChange}
          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
        />
      </FormControl>
     
    </div>
    </form>
  );
}