import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import 'date-fns';
import { Label } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';
import '@rmwc/typography/styles';
import Titulo from '../../components/Textos/Titulo';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    contenedor: {
        textAlign: 'center',
        display: 'block',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    alinearContenedor: {
        display: 'inline-block',
        borderRadius: '10px',
        border: 'black 1px solid',
        backgroundColor: '#FFF',
    },
    table: {
        display: 'inline-block',
        borderRadius: '10px',
        border: '#393E46 1px solid',
        backgroundColor: '#FFF',
    },
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 940,
    },
    subtitulos: {
        fontSize: '18px',
        fontWeight: 'bolder',
    },
    text: {
        fontSize: '19px',
        fontFamily: 'Calibri'
    },
    root2: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    inactive: {
        pointerEvents: 'none', // pointer-events not supported below IE11
        position: 'fixed'
    }

}));


export default function Visualizar() {
    const classes = useStyles();
    let [dataReportes, setDataReportes] = useState([]);
    let [currentServer, setCurrentServer] = useState('');
    let [bufferServer, setBufferServer] = useState('');
    let [errorData, setErrorData] = useState(false);
    let [mensajeErr, setMensajeErr] = useState('');
    let [banderaCambiarEstado, setBanderaCambiarEstado] = useState(false);
    let [mensajeNotificacion, setmensajeNotificacion] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    let [detallesReporte, setDetallesReporte] = useState('');
    const [open, setOpen] = React.useState(false);
    const [openEmpresa, setOpenEmpresa] = React.useState(false);
    const [value, setValue] = React.useState('');
    let [carnetbusqueda, setCarnet] = React.useState('');
    let [tipoAlerta, setTipoAlerta] = useState('success');
    let [opciones, setOpciones] = useState('');
    let [datosUsu, setDatosUsu] = useState({
        id_usuario: '',
        usuario: '',
        idReporte: '',
    });
const [valuesUser, setValues] = useState({
        carnetbusqueda:''
    });
const unafila = {
            key: '0',
            carnet: '0',
            cuerpo: '',
            estudiante: '',
            curso:'',
            servidor:''
        }
        const dataReporteslimpio=[];
        dataReporteslimpio.push(unafila);
    let [empresaM, setEmpresaM] = useState({
        idReporte: '',
        empresa: ''
    });

const enviarArchivo = async(event, carnet, nombre, descripcion, servidor, curso) => {
        
        localStorage.setItem('carnetactual',carnet);
        localStorage.setItem('nombreactual',nombre);
        localStorage.setItem('descripcionactual',descripcion);
        localStorage.setItem('servidoractual',servidor);
localStorage.setItem('cursoactual',curso);
         setOpenEmpresa(true);

        
    };


    const getDataReportes = async () => {

        try {
if(localStorage.getItem('busqueda')!=null){
 const { data } = await axios.get(
                'http://35.202.67.211:4000/reporte');

            // if (data && data.length) {
            if (data != null) {
                setErrorData(false);
               
                dataReportes = data.data.map((o, index) => {
                    if (o.carnet==localStorage.getItem('busqueda')) {
                    return {

                        key: o.id, carnet: o.carnet, cuerpo: o.cuerpo, estudiante: o.estudiante, curso: o.cursoProyecto, servidor:o.servidor

                    }}
                    else{
                        return unafila;
                    }

                });
            } else {
                setErrorData(true);
                setMensajeErr('No se pudo recuperar la información de los reportes.')
            }
       }
       if(localStorage.getItem('busqueda')===''){
        console.log('entre a busquedaddddd')
        const { data } = await axios.get(
                'http://35.202.67.211:4000/reporte');

        console.log(unafila)
            // if (data && data.length) {
                setCurrentServer(data.servidor);
                console.log(data);
            if (data != null) {
                setErrorData(false);
                dataReportes = data.data.map((o, index) => {
                    
                    return {

                        key: o.id, carnet: o.carnet, cuerpo: o.cuerpo, estudiante: o.estudiante, curso: o.cursoProyecto, servidor:o.servidor

                    }
                });
            } else {
                setErrorData(true);
                setMensajeErr('No se pudo recuperar la información de los reportes.')
            }

       }



 }
        catch (err) {
            setErrorData(true);
            setMensajeErr('')
            setDataReportes([]);
        }
    };
    useEffect(() => {
        const timeOut = setInterval(() => {
            setDataReportes([...dataReporteslimpio]);
            getDataReportes();
            console.log(dataReportes.length);
            if (dataReportes.length===0) {
               dataReportes.push(unafila);
               console.log(dataReportes);

            }

            setDataReportes([...dataReportes]);
        }, 2000)
        getDataReportes();
        return () => clearInterval(timeOut);

    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...valuesUser, [prop]: event.target.value });
    };

 const handleBuscar = (event) => {
    console.log(valuesUser.carnetbusqueda);
    localStorage.setItem('busqueda',valuesUser.carnetbusqueda);
    console.log(localStorage.getItem('busqueda'));
}

 const handleLimpiar = (event) => {
    console.log(valuesUser.carnetbusqueda);
    localStorage.setItem('busqueda','');
    console.log(localStorage.getItem('busqueda'));
}

    const handleClose = () => {
        // console.log(value)
        setValue('')
        setOpen(false);
        setOpenEmpresa(false);
    };

    const handleEnviarNotiEmpresa = (event) => {
       
        setOpenEmpresa(false);
    };
const handleClick = (event) => {
      
    }
    const handleEnviarNoti = (event) => {
        // setDetallesReporte(detallesReporte + '\nComentario: ' + value);
        detallesReporte += '<br>Comentario: ' + value;
        let data = {
            content: detallesReporte,
            user_iduserto: datosUsu.id_usuario
        }
        axios.post('https://ayd1-190621.herokuapp.com/CreateCitizenNotification/',
            data,
            {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(response => {
                //  console.log(response)
                if (response.data.correct) {
                    setmensajeNotificacion('El reporte Registro No. ' + datosUsu.idReporte + ' ha sido cerrado exitosamente. ' +
                        '\nSe ha enviado una notificación al ciudadano: ' + datosUsu.usuario + '.');
                    // setmensajeConfirmacion('Se ha enviado una notificación al ciudadano con la actualización de su reporte exitosamente.')
                } else {
                    setmensajeNotificacion('El reporte Registro No. ' + datosUsu.idReporte + ' ha sido cerrado exitosamente.' +
                        '\nNo se ha enviado una notificación al ciudadano: ' + datosUsu.usuario + '.');
                    setTipoAlerta('error');
                }
                espera();
            }
            );
        setValue('')
        setOpen(false);
    };

    const espera = () => {
        setBanderaCambiarEstado(true);
        setTimeout(() => {
            setBanderaCambiarEstado(false);
            setmensajeNotificacion('');
            setTipoAlerta('success');
        }, 5000)
    }

    const mostrarNotificacion = (tipo_de_cambio, idReporte, tipo, direccion, fecha_reportado, fecha_problema, descripcion, usuario, id_usuario) => {
        let nuevoEstado = '';
        if (tipo_de_cambio === 1) {
            setmensajeNotificacion('Ha seleccionado el reporte Registro No. ' + idReporte + ' para ser atentido. ')
            nuevoEstado = 'ATENDIDO';
            espera();
        } else if (tipo_de_cambio === 2) {
            nuevoEstado = 'PROCESADO';
            let t = 'Delincuencia';
            let company = 'Policía Nacional Civil'
            if (tipo === 'bump') {
                t = 'Bache'
                company = 'Municipalidad de Mixco'
            }
            setEmpresaM({ idReporte: idReporte, empresa: company })
            setDetallesReporte(
                'Estado: ' + nuevoEstado +
                '\nRegistro No. : ' + idReporte +
                '\nTipo: ' + t +
                '\nFecha del Reporte: ' + fecha_reportado +
                '\nFecha del Problema: ' + fecha_problema +
                '\nDirección: ' + direccion +
                '\nDescripción: ' + descripcion
            );
            setOpenEmpresa(true);
        } else if (tipo_de_cambio === 3) {
            nuevoEstado = 'CERRADO'
            if (usuario !== 'Anónimo') {
                setDatosUsu({ id_usuario: id_usuario, usuario: usuario, idReporte: idReporte })
                let t = 'Delincuencia';
                if (tipo === 'bump') {
                    t = 'Bache'
                }
                setDetallesReporte(
                    'Estado: ' + nuevoEstado +
                    '\nRegistro No. : ' + idReporte +
                    '\nTipo: ' + t +
                    '\nFecha del Reporte: ' + fecha_reportado +
                    '\nFecha del Problema: ' + fecha_problema +
                    '\nDirección: ' + direccion +
                    '\nDescripción: ' + descripcion
                );
                setOpen(true);
            } else {
                setmensajeNotificacion('El reporte Registro No. ' + idReporte + ' ha sido cerrado exitosamente. ')
                espera();
            }
        }
    }




    const metodoBtnCambiarEstado = (event, idReport, idStatus, tipo, direccion, fecha_reportado, fecha_problema, descripcion, usuario, id_usuario) => {
        const data = {
            status_idstatus: idStatus + 1,
        }
        axios.put('https://ayd1-190621.herokuapp.com/ModifyReportStatus/' + idReport,
            data,
            {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(response => {
                if (response.data.correct) {
                    mostrarNotificacion(idStatus, idReport, tipo, direccion, fecha_reportado, fecha_problema, descripcion, usuario, id_usuario);
                }
            }
            );
    }
    return (
        <Paper className={classes.root}>
            <div style={{ paddingLeft: '100px' }} >
              <form style={{ margin: '30px' }} >
                    <Titulo nombre='Reportar' />
                    <TextField
                        label="Carnet"
                        required
                         onChange={handleChange('carnetbusqueda')}
                         value={valuesUser.carnetbusqueda}
                        id="outlined-required"
                        variant="outlined"
                        style={{ width: '235px' }}
                    />

                    
                   
                        <Button
                            variant="contained"
                            size="large"
                           
                            style={{ color: '#FFFFFF', backgroundColor: '#161557' }}
                            onClick={handleBuscar}
                        >
                             &nbsp;&nbsp;Buscar
                        </Button>
                <Button
                            variant="contained"
                            size="large"
                           
                            style={{ color: '#FFFFFF', backgroundColor: '#161557' }}
                            onClick={handleLimpiar}
                        >
                             &nbsp;&nbsp;Limpiar busqueda
                        </Button>
                </form>  
            </div>
            <Collapse in={banderaCambiarEstado}>
                <Alert variant="filled" severity={tipoAlerta} width="10px" style={{ fontSize: '19px' }}>
                    {mensajeNotificacion}
                </Alert>
            </Collapse>
            <Collapse in={errorData}>
                <Alert variant="filled" severity='error' width="10px" style={{ fontSize: '19px' }}>
                    {mensajeErr}
                </Alert>
            </Collapse>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick={true}>
                <Alert variant="filled" severity='success' width="10px" style={{ fontSize: '19px' }}>
                    Notificaciones para Ciudadanos
                </Alert>
                <DialogTitle id="form-dialog-title">Detalles del reporte:</DialogTitle>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <textarea defaultValue={detallesReporte} rows='10' />
                <DialogContent>
                    <DialogContentText>
                        Escriba un comentario:
                    </DialogContentText>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Comentario"
                        multiline
                        rowsMax={5}
                        style={{ width: '60%' }}
                        value={value}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>

                    <Button onClick={(e) => { handleEnviarNoti(e) }} color="primary">
                        Enviar notificación
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEmpresa} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick={true}>
               
                <DialogTitle id="form-dialog-title">Detalles del reporte:</DialogTitle>
                <DialogContent>
                    
                     <form style={{ margin: '10px' }} >
                    <Titulo nombre='Reporte' />
                    <TextField
                        label="Carnet"
                        required
                        id="outlined-required"
                        value={localStorage.getItem('carnetactual')}
                        variant="outlined"
                        style={{ width: '345px', pointerEvents:'none' }}
                    />
                    <br />
                    <br />
                    
                    <TextField
                        label="Nombre"
                        required
                        id="outlined-required"
                        value={localStorage.getItem('nombreactual')}
                        variant="outlined"
                        style={{ width: '345px', pointerEvents:'none' }}
                    />
                    <br />
                    <br />

                    

                    <TextField
                        label="Curso/Proyecto"
                        required
                        id="outlined-required"
                       
                        value={localStorage.getItem('cursoactual')}
                        variant="outlined"
                        style={{ width: '345px', pointerEvents:'none' }}
                    />
                    <br />
                    <br />

                    
                    <TextField
                        label="Descripción de reporte"
                        required
                        multiline
                        rows={4}
                        rowsMax={8}
                        id="outlined-required"
                        value={localStorage.getItem('descripcionactual')}
                        variant="outlined"
                        style={{ width: '345px', pointerEvents:'none' }}
                    />
                    <br />
                    <br />
                    <TextField
                        label="Servidor"
                        required
                        id="outlined-required"
                        value={localStorage.getItem('servidoractual')}
                        variant="outlined"
                        style={{ width: '345px', pointerEvents:'none' }}
                    />
                    <br />
                    <div  style={{marginTop:'15px', width: '345px',padding:'10px',background:'#0c6efd', color:'#fff'}} >
                     <h6>Solicitud atendida por el servidor {bufferServer}</h6>
                    </div>
                </form>
                
                </DialogContent>
                <DialogActions>

                    <Button onClick={(e) => { handleEnviarNotiEmpresa(e) }} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ fontWeight: 'bolder', fontSize: '15px', color: '#393E46' }}>Id</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bolder', fontSize: '15px', color: '#393E46' }}>Carnet</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bolder', fontSize: '15px', color: '#393E46' }}>Nombre</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bolder', fontSize: '15px', color: '#393E46' }}>Proyecto</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bolder', fontSize: '15px', color: '#393E46' }}>Servidor</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bolder', fontSize: '15px', color: '#393E46' }}>Acciones</TableCell>
                        
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataReportes.filter(f => (opciones !== "" && opciones !== null ? f.estado.toString() === opciones : true)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                           
                            if(row.carnet != '0'){
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
                                    <TableCell  align="center">
                                        {row.key}
                                    </TableCell>
                                    <TableCell>
                                        {row.carnet}
                                    </TableCell>
                                    <TableCell>
                                        {row.estudiante}
                                    </TableCell>
                                    <TableCell>
                                        {row.curso}
                                        
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.servidor}
                                       

                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                                                                    variant="contained"
                                                                                    size="large"
                                                                                    onClick={(e) => { setBufferServer(currentServer); enviarArchivo(e, row.carnet, row.estudiante, row.cuerpo, row.servidor, row.curso) }}
                                                                                    style={{ minWidth: '0', width: '170px', padding: '0', backgroundColor: '#fff', alignItems: 'center', margin: '0 0 0 7px' }}
                                                                                > <Typography>Ver reporte</Typography>
                                                                                 </Button>
                                       

                                    </TableCell>
                                </TableRow>
                            );
                        }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div  style={{marginTop:'50px',padding:'10px 15px',background:'#0c6efd', color:'#fff'}} >
                     <h4>Solicitud atendida por el servidor {currentServer}</h4>
            </div>
        </Paper>
    );
}