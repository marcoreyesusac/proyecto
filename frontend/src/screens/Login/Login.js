import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { Label } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import 'date-fns';
import Collapse from '@material-ui/core/Collapse';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Alert from '@material-ui/lab/Alert';
import '@rmwc/typography/styles';
import Titulo from '../../components/Textos/Titulo';
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0px 0px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        border: 'black 1px solid',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    margin: {
        margin: theme.spacing(1),

    },
    textField: {
        backgroundColor: "#FFFFFF",
        borderColor: '#000',
    },
    button: {
        width: '250px',
        margin: theme.spacing(1),
        backgroundColor: "#0B78F4",
        color: "#FFFFFF",
        fontWeight: "bold",
        font: "Verdana"
    },
    tamAlert: {
        width: '200px',
    },
    centrarContenido: {
        textAlign: 'center',
        width: '360px',
    },
    margenContenedor: {
        width: '50%',
        border: 'black 3px solid',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    bloque: {
        textAlign: 'center',
        display: 'block',
    },
    alinearCaja: {
        display: 'inline-block',
        borderRadius: '10px',
        border: 'black 1px solid',
        backgroundColor: '#FFF',
    },

}));


const Login = ({ history }) => {

    const [activarBotonEntrar, setActivarBotonEntrar] = useState(true);
    const [PrimeraVez, setPrimeraVez] = useState(true);
    const [errorData, setErrorData] = useState(false);
    const [MensajeError, setMensajeError] = useState('');


    const classes = useStyles();
    const [valuesUser, setValues] = useState({
        nombre: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...valuesUser, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...valuesUser, showPassword: !valuesUser.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [mensajeNombre, setMensajeNombre] = useState(false);
    const [mensajeContrasena, setMensajeContrasena] = useState(false);

    const initialState = {
        user: {},
        error: null
    }
    const [state, setState] = useState(initialState);

    let [activarEfecto, setActivarEfecto] = useState(false);

    if (PrimeraVez) {
        localStorage.setItem('token', '')
        localStorage.setItem('typeOfUser', '')
        localStorage.setItem('nameUser', '')
        localStorage.setItem('esAutenticado', false)
        setPrimeraVez(false);
    }
    useEffect(
        () => {
            let isSubscribed = true;
            if (activarEfecto) {
                const user2 = {
                    email: valuesUser.nombre,
                    password: valuesUser.password
                };
                //ENVIAR DATOS DEL USUARIO
                axios.post('https://ayd1-190621.herokuapp.com/LoginEmployee', user2)
                    .then(response => {
                        // console.log(response.data)
                        //Verifica si el objeto de respuesta trae información o viene vacío
                        if (response.data.auth) {
                            setActivarEfecto(!activarEfecto)
                            localStorage.setItem('token',response.data.data.token)
                            localStorage.setItem('typeOfUser',response.data.data.typeOfUser)
                            localStorage.setItem('nameUser',response.data.data.name)
                            localStorage.setItem('esAutenticado',true)
                            cambiarEstadoEntrar();
                            response.json();
                        } else {
                            setActivarEfecto(!activarEfecto)
                            //Bandera Para mostrar error en inicio de sesión
                            if(response.data.error.message === 'E-mail or password incorrects, plese try again.'){
                                setMensajeError('Correo o contraseña incorrecto, inténtelo de nuevo,')
                            }else{
                                setMensajeError('No se pudo realizar la petición. Contacte a su servidor. ')
                            }
                            setErrorData(true);
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

                            
                            setMensajeError('');
                            setActivarEfecto(false);
                            setMensajeError('No se pudo conectar al servidor.')
                            setErrorData(true);
                        } 
                        // else {
                        //     console.log("ERROR ---- ");
                        // }
                    });
            }
            return () => (isSubscribed = false);
        },
        [activarEfecto],
    );

    const handleClick = (event) => {
        event.preventDefault();
        let valido = true;
        if (valuesUser.nombre === '') {
            setMensajeNombre(true);
            valido = false;
        }
        if (valuesUser.password === '') {
            setMensajeContrasena(true);
            valido = false;
        }
        if (valido) {
            setActivarEfecto(true);
        }
    };

    const cambiarEstadoEntrar = () => {
        setActivarBotonEntrar(false);
        setTimeout(() => {
            setValues({
                nombre: '',
                password: '',
                showPassword: false,
            });
            setMensajeContrasena(false);
            setMensajeNombre(false);
            setActivarBotonEntrar(true);
            history.push('/Inicio')
        }, 3500);
    }
    //style={{ width: 'auto%', border: 'black 1px solid', borderRadius: '10px' }}
    //style={{ backgroundImage: " url('fondo.jpeg')"}}
    return (
        <div className={classes.bloque}  >
            <div className={classes.alinearCaja} >
                <form style={{ margin: '30px' }} >
                    <img align="center" alt="imagen ususario iniciar sesión" src="/users2.png" />
                    <Titulo nombre='Iniciar sesión' />
                    <TextField
                        label="Correo"
                        onChange={handleChange('nombre')}
                        required
                        id="outlined-required"
                        className={clsx(classes.margin, classes.textField)}
                        value={valuesUser.nombre}
                        variant="outlined"
                        style={{ width: '235px' }}
                    />

                    <Collapse in={mensajeNombre}>
                        <Label style={{ color: "#C62E2E" }}> Ingresa un correo </Label>
                    </Collapse>

                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={valuesUser.showPassword ? 'text' : 'password'}
                            value={valuesUser.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {valuesUser.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <Collapse in={mensajeContrasena}>
                        <Label style={{ color: "#C62E2E" }}> Ingresa una contraseña</Label>
                    </Collapse><Collapse in={!activarBotonEntrar}>
                        <Button style={{ color: '#333333' }} startIcon={<CircularProgress />}>
                            ...Entrando
                        </Button>
                    </Collapse>
                    <Collapse in={activarBotonEntrar}>
                        <Button
                            variant="contained"
                            size="large"
                            style={{ color: '#FFFFFF', backgroundColor: '#161557' }}
                            onClick={handleClick}
                        >
                            <VpnKeyIcon /> &nbsp;&nbsp;Entrar
                        </Button>
                    </Collapse>
                    <Collapse in={errorData}>
                        <Box p={1} >
                            <Alert variant="filled" severity="error" width="10px">
                                {MensajeError}
                            </Alert>
                        </Box>
                    </Collapse>
                </form>
            </div>
        </div>
    );
}

export default withRouter(Login);
