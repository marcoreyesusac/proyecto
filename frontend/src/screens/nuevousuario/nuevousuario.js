import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
// import Box from '@material-ui/core/Box';
import axios from 'axios';
// import { Label } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
// import IconButton from '@material-ui/core/IconButton';
import 'date-fns';
import Collapse from '@material-ui/core/Collapse';
// import VpnKeyIcon from '@material-ui/icons/VpnKey';
// import Alert from '@material-ui/lab/Alert';
import '@rmwc/typography/styles';
// import Titulo from '../../components/Textos/Titulo';
const useStyles = makeStyles((theme) => ({
    centrarTexto: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '20px'
    },
    centrarContenido: {
        textAlign: 'center',
    },
    colorBloque: {
        backgroundColor: '#EBAC44',
        minHeight: 635
    },
    bloque: {
        textAlign: 'right',
        display: 'block',
    },
    alinearAlerta: {
        display: 'inline-block',
        width: '50%'
    },
    bloqueTabla: {
        textAlign: 'center',
        display: 'block',
    },
    alinearTabla: {
        display: 'inline-block',
        width: '88%',
        backgroundColor: '#fff',
        borderRadius: '20px'
    },
    container: {
        maxHeight: 420,
    },
    estiloAutoComplete: {

        // backgroundColor: '#FFF',
        width: '100%',
    },
    anchoTextField: {
        width: '70%',
        backgroundColor: '#FFF',
        borderRadius: '20px',
    },
    anchoPagination: {
        maxWidth: '70%'
    },
    bloqueGrafica: {
        textAlign: 'left',
        display: 'block',
        maxWidth: '20%'
    },
    grafica: {
        padding: '4px',
        background: '#fff',
        borderRadius: '20px',
    },
    contGrafica: {
        height: '420px',
        width: '370',
        border: '1px solid #ddd',
        background: '#f1f1f1',
        overflowx: 'scroll',
        overflowy: 'scroll',
        borderRadius: '20px',
    },
    ancho: {
        width: 'auto',
        height: 'auto',
        borderRadius: '20px',
    },
    maxAlto: {
        maxHeight: '500',
    },
    colorHeadTable: {
        backgroundColor: '#E6E6E6',
        fontWeight: 'bolder',
        fontSize: '20',
        fontFamily: 'arial',
    }
}));

function Nuevousuario(props) {
    const [activarBotonEntrar, setActivarBotonEntrar] = useState(true);
    // const [PrimeraVez, setPrimeraVez] = useState(true);
    // const [errorData, setErrorData] = useState(false);
    // const [mensajeNombre, setMensajeNombre] = useState(false);
    // const [mensajeContrasena, setMensajeContrasena] = useState(false);

    const classes = useStyles();
    const [valuesUser, setValues] = useState({
        name: '',
        lastname: '',
        email: '',
        password: ''
    });



    const handleChange = (prop) => (event) => {
        setValues({ ...valuesUser, [prop]: event.target.value });
    };

    const initialState = {
        user: {},
        error: null
    }
    const [state, setState] = useState(initialState);

    let [activarEfecto, setActivarEfecto] = useState(false);

    useEffect(
        () => {
            let isSubscribed = true;
            if (activarEfecto) {
                const user2 = {

                };
                //ENVIAR DATOS DEL USUARIO
                axios.post('http://localhost:3000/Login', user2)
                    .then(response => {
                        //Verifica si el objeto de respuesta trae información o viene vacío
                        if (Object.entries(response.data).length !== 0) {

                            response.json();
                        } else {
                            //Bandera Para mostrar error en inicio de sesión
                            // setErrorData(true);
                        }
                    })
                    .then(data => isSubscribed ? setState(prevState => ({
                        ...prevState, user: data

                    })) : null)
                    .catch(error => {
                        if (isSubscribed) {
                            setState(prevState => ({
                                ...prevState,
                                error
                            }));

                            // setErrorData(false);
                            setActivarEfecto(false);
                            cambiarEstadoEntrar();

                        } else {
                            console.log("ERROR");
                        }
                    });
            }
            return () => (isSubscribed = false);
        },
        [activarEfecto],
    );

    const handleClick = (event) => {
        event.preventDefault();
        axios.post('https://ayd1-190621.herokuapp.com/RegisterEmployee', {
            name: valuesUser.name,
            lastname: valuesUser.lastname,
            email: valuesUser.email,
            password: valuesUser.password
        })
            .then((response) => {
                if(response.data.auth){
                    setValues({name: '',
                    lastname: '',
                    email: '',
                    password: ''})
                    alert("Nuevo usuario creado exitosamente.");
                }else{
                    alert("Usuario no creado. Verifique los datos ingresados e inténtelo de nuevo.");
                }
                // console.log(response);
                
            }, (error) => {
                console.log(error);
            }
            );
    }




    const cambiarEstadoEntrar = () => {
        setActivarBotonEntrar(false);
        setTimeout(() => {
            setValues({
                nombre: '',
                password: '',
            });
            // setMensajeContrasena(false);
            // setMensajeNombre(false);
            setActivarBotonEntrar(true);
        }, 1000);
    }

    return (
        <div className="container-fluid">
            <br />
            <div>
                <div className="row justify-content-center">
                    {/* <div className="row"> */}
                    <div className="col col-lg-6 col-md-12 col-sm-12 col-12 order-sm-last order-last order-lg-first order-md-last">
                        <div className="card border-dark mb-3">
                            <div className="card-header">
                                <div className={classes.centrarTexto}>
                                    Crear nuevo usuario
                                    {/* <Typography use="headline3">Formulario para Crear Usuario</Typography> */}
                                </div>
                            </div>
                            <div className="card-body">
                                <div className={classes.centrarContenido}>
                                    <br /><br />
                                    <form id='nuevousuario'>
                                        <TextField
                                            label="Nombre"
                                            //   onChange={handleChange('nombre')}
                                            onChange={handleChange('name')}

                                            required
                                            id="outlined-required"
                                            className={clsx(classes.margin, classes.textField)}
                                            value={valuesUser.name}

                                            variant="outlined"
                                        /><br /><br />
                                        <TextField
                                            label="Apellido"
                                            onChange={handleChange('lastname')}

                                            required
                                            id="outlined-required"
                                            className={clsx(classes.margin, classes.textField)}
                                            value={valuesUser.lastname}
                                            variant="outlined"
                                        /><br /><br />
                                        <TextField
                                            label="Correo"
                                            onChange={handleChange('email')}

                                            required
                                            id="outlined-required"
                                            className={clsx(classes.margin, classes.textField)}
                                            variant="outlined"
                                            value={valuesUser.email}
                                        /><br /><br />
                                        <TextField
                                            label="Contraseña"
                                            onChange={handleChange('password')}

                                            required
                                            id="outlined-required"
                                            className={clsx(classes.margin, classes.textField)}
                                            variant="outlined"
                                            value={valuesUser.password}
                                        /><br /><br /><br />
                                        <Collapse in={activarBotonEntrar}><br />
                                            <Button
                                                variant="contained"
                                                size="large"
                                                style={{ color: '#FFFFFF', backgroundColor: '#161557' }}
                                                onClick={handleClick}
                                            >
                                                Registrar
                                            </Button>
                                        </Collapse>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default (Nuevousuario);
