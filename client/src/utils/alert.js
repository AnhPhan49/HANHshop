import Swal  from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

const alert = ({title,msg, icon,...props}) => {
    // const mySwal = withReactContent(Swal)
    Swal.fire({
        allowOutsideClick : false,
        icon : icon,
        title : title,
        text : msg,
    })
}
export default alert