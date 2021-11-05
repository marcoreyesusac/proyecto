import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import 'date-fns';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import '@rmwc/typography/styles';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme) => ({
    contenedor: {
        textAlign: 'center',
        display: 'block',
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


export default function NotificacionesCompany() {
    const classes = useStyles();
    let [dataReportes, setDataReportes] = useState([]);
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
    let [tipoAlerta, setTipoAlerta] = useState('success');
    let [datosUsu, setDatosUsu] = useState({
        id_usuario: '',
        usuario: '',
        idReporte: '',
    });

    let [empresaM, setEmpresaM] = useState({
        idReporte: '',
        empresa: ''
    });

    const getDataReportes = async () => {
        try {
            const { data } = await axios.get(
                'https://ayd1-190621.herokuapp.com/EmployeeCompanyNotifications',
                {
                    headers: {
            'Authorization':localStorage.getItem('token'),
                    }
                });
            // if (data && data.length) {
            if (data.correct) {

                // console.log(data);
                let tmp = data.data.reverse();
                // console.log(tmp);
                setErrorData(false);
                // console.log('Cantidad de reportes: ' + data.data.length)
                dataReportes =tmp.map((o, index) => {
                    
                    // 2021-06-20T05:58:53.000Z
                    // let FR = o.dateofreport;
                    let FR = new Date(Date.parse(o.timestamp));
                    FR = FR.getDate().toString() + "/" + (FR.getMonth() + 1) + "/" + FR.getFullYear().toString() + ' - ' +
                        (FR.getHours()).toString() + ':' + FR.getMinutes().toString() + ':' + FR.getSeconds().toString()

                    return {
                        
                        key: index, usuario_reporte: o.company, fecha_reportado: FR, descripcion: o.content
                    
                    }
                });
            } else {
                setErrorData(true);
                setMensajeErr('No se pudo recuperar la información de los reportes.')
            }
        }
        catch (err) {
            setErrorData(true);
            setMensajeErr('No se pudo conectar al servidor.')
            setDataReportes([]);
        }
    };
    useEffect(() => {
        const timeOut = setInterval(() => {
            getDataReportes();
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

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClose = () => {
        // console.log(value)
        setValue('')
        setOpen(false);
        setOpenEmpresa(false);
    };

    const handleEnviarNotiEmpresa = (event) => {
        // setDetallesReporte(detallesReporte + '\nComentario: ' + value);
        detallesReporte += '<br>Comentario: ' + value;
        let data = {
            content: detallesReporte,
            company: empresaM.empresa
        }
        axios.post('https://ayd1-190621.herokuapp.com/CreateCompanyNotification/',
            data,
            {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(response => {
                if (response.data.correct) {
                    setmensajeNotificacion('El reporte Registro No. ' + empresaM.idReporte + ' ha sido cerrado exitosamente. ' +
                        '\nSe ha enviado una notificación a: ' + empresaM.empresa + '.');
                    // setmensajeConfirmacion('Se ha enviado una notificación al ciudadano con la actualización de su reporte exitosamente.')
                } else {
                    setmensajeNotificacion('El reporte Registro No. ' + empresaM.idReporte + ' ha sido cerrado exitosamente.' +
                        '\nNo se ha enviado una notificación a: ' + empresaM.empresa + '.');
                    setTipoAlerta('error');
                }
                espera();
            }
            );
        setValue('')
        setOpenEmpresa(false);
    };

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
                <textarea defaultValue={detallesReporte} rows='10'/>
                <DialogContent>
                    <DialogContentText>
                        Escriba un comentario:
                    </DialogContentText>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Comentario"
                        multiline
                        rowsMax={5}
                        style={{width: '60%'}}
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
                <Alert variant="filled" severity='success' width="10px" style={{ fontSize: '19px' }}>
                    Notificaciones para Empresas
                </Alert>
                <DialogTitle id="form-dialog-title">Detalles del reporte:</DialogTitle>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <textarea defaultValue={detallesReporte} rows='10'/>
                <DialogContent>
                    <DialogContentText>
                        Escriba un comentario:
                    </DialogContentText>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Comentario"
                        multiline
                        rowsMax={5}
                        style={{width: '60%'}}
                        value={value}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    
                    <Button onClick={(e) => { handleEnviarNotiEmpresa(e) }} color="primary">
                        Enviar notificación
                    </Button>
                </DialogActions>
            </Dialog>

            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ fontWeight: 'bolder', fontSize: '15px', color: '#393E46' }}>No.</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bolder', fontSize: '15px', color: '#393E46' }}>Reporte</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bolder', fontSize: '15px', color: '#393E46' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataReportes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
                                    <TableCell key={'K1' + row.key} align="center">
                                        {row.key + 1}
                                    </TableCell>
                                    <TableCell key={'K2' + row.key}>
                                        {/* INICIO TABLA CON DETALLES DE REPORTE */}
                                        <TableContainer>
                                            <Table className={classes.table} aria-label="customized table">
                                                <TableBody>
                                                    {/* style={{border:'1px solid black', padding: '10px'}} */}
                                                    <TableRow>
                                                       
                                                        <TableCell colSpan='2' >
                                                            <label className={classes.subtitulos}>Empresa: </label>&nbsp;  <label className={classes.text}>{row.usuario_reporte}</label>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell >
                                                            <label className={classes.subtitulos}>Fecha del Reporte:</label> &nbsp;  <label className={classes.text}>{row.fecha_reportado}</label>
                                                        </TableCell>
                                                        
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell colSpan="3" >
                                                            <label className={classes.subtitulos}>Descripción: </label>&nbsp;  <textarea defaultValue={row.descripcion} cols="110" rows="9" className={classes.text}/>
                                                        </TableCell>
                                                    </TableRow>
                                                  
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </TableCell>
                                    <TableCell key={'K3' + row.key} align="center">
                                       {
                                            (
                                                () => {
                                                    
                                                }
                                            )()
                                        }
                                            
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={dataReportes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}