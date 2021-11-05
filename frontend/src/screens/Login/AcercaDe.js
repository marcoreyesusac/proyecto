import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        backgroundColor: "#0B78F4",
        color: "#FFFFFF",
        fontWeight: "bold",
        font: "Verdana",
        left: '18%',
    },
    centrarTexto: {
        textAlign: 'center',
    },
    centrarContenido: {
        textAlign: 'center',
    },
    bloque: {
        textAlign: 'center',
        display: 'block',

    },
    alinearAlerta: {
        display: 'inline-block',
        width: '50%'
    },
    table: {
        display: 'inline-block',
        borderRadius: '10px',
        border: '#393E46 1px solid',
        backgroundColor: '#FFF',
    }
}));
export default function AcercaDe() {
    const classes = useStyles();
    return (
        <div className={classes.bloque}>
            <p style={{ fontSize: '35px' }}>Mr. Soluciones AyD</p>
            <br/>
            <div className={classes.table}>
                <TableContainer >
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ fontWeight: 'bolder', fontSize: '15px', color: '#393E46' }}>Carné</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', fontSize: '15px', color: '#393E46' }}>Nombre</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', fontSize: '15px', color: '#393E46' }}>Correo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell align="center" style={{ fontSize: '15px', color: '#393E46' }} >201505550</TableCell>
                                <TableCell align="center" style={{ fontSize: '15px', color: '#393E46' }}>José Gonzalo Hernández Morales</TableCell>
                                <TableCell align="center" style={{ fontSize: '15px', color: '#393E46' }}>josegonzahm@gmail.com</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" style={{ fontSize: '15px', color: '#393E46' }} >201612408</TableCell>
                                <TableCell align="center" style={{ fontSize: '15px', color: '#393E46' }}>Katherine Lisseth Sánchez Girón</TableCell>
                                <TableCell align="center" style={{ fontSize: '15px', color: '#393E46' }}>sanchezkathy29@gmail.com</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" style={{ fontSize: '15px', color: '#393E46' }} >201708850</TableCell>
                                <TableCell align="center" style={{ fontSize: '15px', color: '#393E46' }}>Marco Antonio Reyes García</TableCell>
                                <TableCell align="center" style={{ fontSize: '15px', color: '#393E46' }}>marcoreyesinfoemiliani@gmail.com</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" style={{ fontSize: '15px', color: '#393E46' }} >201800984</TableCell>
                                <TableCell align="center" style={{ fontSize: '15px', color: '#393E46' }}>Alex Fernando Méndez Lópezn</TableCell>
                                <TableCell align="center" style={{ fontSize: '15px', color: '#393E46' }}>201800984@ingenieria.usac.edu.gt</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}