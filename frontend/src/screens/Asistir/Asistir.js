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


const Asistir = ({ history }) => {

    const [activarBotonEntrar, setActivarBotonEntrar] = useState(true);
    const [PrimeraVez, setPrimeraVez] = useState(true);
    const [errorData, setErrorData] = useState(false);
    const [MensajeError, setMensajeError] = useState('');
    let [subirArchivoExtNewName, setSubirArchivoExtNewName] = useState('');


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

    const handleClick = (event) => {
        event.preventDefault();
        let input = document.getElementById('inputArchivo');
        let files = input.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(files);
        const arrTemp = files.name.split('.');
        setSubirArchivoExtNewName('.' + arrTemp[arrTemp.length-1]);
        reader.onload = () => {
            const arrb64 = reader.result.split(",");
            let name = files.name;
            
        const requestOptions = {
        "estudiante": valuesUser.nombre,
        "carnet": valuesUser.carnet,
        "evento": valuesUser.curso,
        "id_evento": valuesUser.reporte,
        "imagen": arrb64[1]
        }

        console.log(requestOptions);
        axios.post('http://api.redes214.tk/asistencia', {
            
    "estudiante": valuesUser.nombre,
    "carnet": valuesUser.carnet,
    "evento": valuesUser.curso,
    "id_evento": valuesUser.reporte,
    "imagen": arrb64[1]

        })
            .then((response) => {
                console.log(response);
                if(response.data != null){
                    setValues({nombre: '',
                    carnet: '',
                    reporte: '',
                    curso: ''})
                    alert("Exito marcando asistencia, servidor:"+response.data.servidor);
                }else{
                    alert("Reporte no creado. Verifique los datos ingresados e inténtelo de nuevo.");
                }
                // console.log(response);
                
            }, (error) => {
                console.log(error);
            }
            );
}    }
    //style={{ width: 'auto%', border: 'black 1px solid', borderRadius: '10px' }}
    //style={{ backgroundImage: " url('fondo.jpeg')"}}
    return (
        <div className={classes.bloque}  >
            <div className={classes.alinearCaja} >
                <form style={{ margin: '30px' }} >
                    <Titulo nombre='Nueva asistencia' />
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
                        label="Evento"
                        onChange={handleChange('curso')}
                        required
                        id="outlined-required"
                       
                        className={clsx(classes.margin, classes.textField)}
                        value={valuesUser.curso}
                        variant="outlined"
                        style={{ width: '235px' }}
                    />

                    <Collapse in={mensajeNombre}>
                        <Label style={{ color: "#C62E2E" }}> Ingresa un evento</Label>
                    </Collapse>
                    <TextField
                        label="ID del evento"
                        onChange={handleChange('reporte')}
                        required
                        multiline
                        id="outlined-required"
                        className={clsx(classes.margin, classes.textField)}
                        value={valuesUser.reporte}
                        variant="outlined"
                        style={{ width: '235px' }}
                    />

                    <Collapse in={mensajeNombre}>
                        <Label style={{ color: "#C62E2E" }}> Ingresa id del evento</Label>
                    </Collapse>

                    <input id="inputArchivo" type="file" accept="image/*, .txt, .pdf, audio/*, video/*"></input>
                    <br/>
                    <br/>
                    <br/>
                    
                    
                   
                        <Button
                            variant="contained"
                            size="large"
                            style={{ color: '#FFFFFF', backgroundColor: '#161557' }}
                            onClick={handleClick}
                        >
                             &nbsp;&nbsp;Registrar asistencia
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

export default withRouter(Asistir);
