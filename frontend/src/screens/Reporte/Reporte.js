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


const Reportar = ({ history }) => {

    const [activarBotonEntrar, setActivarBotonEntrar] = useState(true);
    const [PrimeraVez, setPrimeraVez] = useState(true);
    const [errorData, setErrorData] = useState(false);
    const [MensajeError, setMensajeError] = useState('');


    const classes = useStyles();
    const [valuesUser, setValues] = useState({
        nombre: '',
        carnet: '',
        curso: '',
        reporte: ''
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

    
    
    const handleClick = (event) => {
        
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
                    <Titulo nombre='Reportar' />
                    <TextField
                        label="Carnet"
                        onChange={handleChange('carnet')}
                        required
                        id="outlined-required"
                        className={clsx(classes.margin, classes.textField)}
                        value={valuesUser.carnet}
                        variant="outlined"
                        style={{ width: '235px' }}
                    />

                    <Collapse in={mensajeNombre}>
                        <Label style={{ color: "#C62E2E" }}> Ingresa un carnet </Label>
                    </Collapse>
                    <TextField
                        label="Nombre"
                        onChange={handleChange('nombre')}
                        required
                        id="outlined-required"
                        className={clsx(classes.margin, classes.textField)}
                        value={valuesUser.nombre}
                        variant="outlined"
                        style={{ width: '235px' }}
                    />

                    <Collapse in={mensajeNombre}>
                        <Label style={{ color: "#C62E2E" }}> Ingresa un nombre </Label>
                    </Collapse>

                    <TextField
                        label="Curso/Proyecto"
                        onChange={handleChange('curso')}
                        required
                        id="outlined-required"
                       
                        className={clsx(classes.margin, classes.textField)}
                        value={valuesUser.curso}
                        variant="outlined"
                        style={{ width: '235px' }}
                    />

                    <Collapse in={mensajeNombre}>
                        <Label style={{ color: "#C62E2E" }}> Ingresa un curso o proyecto </Label>
                    </Collapse>
                    <TextField
                        label="Descripción de reporte"
                        onChange={handleChange('reporte')}
                        required
                        multiline
                        rows={4}
                        rowsMax={8}
                        id="outlined-required"
                        className={clsx(classes.margin, classes.textField)}
                        value={valuesUser.reporte}
                        variant="outlined"
                        style={{ width: '235px' }}
                    />

                    <Collapse in={mensajeNombre}>
                        <Label style={{ color: "#C62E2E" }}> Ingresa tu reporte</Label>
                    </Collapse>

                    
                    
                   
                        <Button
                            variant="contained"
                            size="large"
                            style={{ color: '#FFFFFF', backgroundColor: '#161557' }}
                            onClick={handleClick}
                        >
                             &nbsp;&nbsp;Registrar
                        </Button>
               
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

export default withRouter(Reportar);