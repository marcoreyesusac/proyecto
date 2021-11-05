import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
    centrarTexto: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '20px'
    },
    centrarContenido: {
        textAlign: 'center',
    },
    colorBloque:{
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
    estiloAutoComplete:{
        
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
        padding:'4px',
	background:'#fff',
    borderRadius: '20px',
    },
    contGrafica:{
        height: '420px',
        width: '370',
        border: '1px solid #ddd',
        background: '#f1f1f1',
        overflowx: 'scroll',
        overflowy: 'scroll',
        borderRadius: '20px',
    },
    ancho:{
        width: 'auto',
        height: 'auto',
        borderRadius: '20px',
    },
    maxAlto:{
        maxHeight: '500',
    },
    colorHeadTable:{
        backgroundColor: '#E6E6E6',
        fontWeight: 'bolder',
        fontSize: '20',
        fontFamily: 'arial',
    }
}));

export default function Prueba2(){
   const classes = useStyles();
   return(
      <div className="container-fluid">
            <br />
            <div>
                <div className="row justify-content-center">
                    {/* <div className="row"> */}
                    <div className="col col-lg-6 col-md-12 col-sm-12 col-12 order-sm-last order-last order-lg-first order-md-last">
                        <div className="card border-dark mb-3">
                            <div className="card-header">
                                <div className={classes.centrarTexto}>
                                   Soy Prueba2
                                    {/* <Typography use="headline3">Formulario para Crear Usuario</Typography> */}
                                </div>
                            </div>
                            <div className="card-body">
                                <div className={classes.centrarContenido}>
                                    <br />
                                    <form id='formulario2'>
                                        <TextField
                                            label="Nombre"
                                          //   onChange={handleChange('nombre')}
                                            required
                                            id="outlined-required"
                                            className={clsx(classes.margin, classes.textField)}
                                            value='aja'
                                            variant="outlined"
                                        />
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