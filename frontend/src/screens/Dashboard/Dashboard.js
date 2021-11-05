import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    TopAppBar,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
    TopAppBarFixedAdjust
} from "@rmwc/top-app-bar";

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerAppContent
} from "@rmwc/drawer";

import {
    List,
    ListItem,
    ListItemText
} from "@rmwc/list";

import '@rmwc/typography/styles';

import '@rmwc/list/styles';
import '@material/list/dist/mdc.list.css';
import '@rmwc/drawer/styles';
import '@material/drawer/dist/mdc.drawer.css';
import '@material/ripple/dist/mdc.ripple.css';
import '@rmwc/top-app-bar/styles'
import '@material/top-app-bar/dist/mdc.top-app-bar.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import MenuIcon from '@material-ui/icons/Menu';
import '@rmwc/theme/styles';
import '@material/theme/dist/mdc.theme.css';
import '@rmwc/theme/theme.css';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Nuevousuario from '../nuevousuario/nuevousuario';
import Reportar from '../Reportar/Reportar';
import Reporte from '../Reporte/Reporte';
import Asistir from '../Asistir/Asistir';
import Carnet from '../Carnet/Carnet';
import Evento from '../Evento/Evento';

import Visualizar from '../Visualizar/Visualizar';
import Links from '../../components/Link/Links';
import AcercaDe from '../Login/AcercaDe';
import Reportes from '../Reportes/Reportes';
import Reportesadmin from '../Reportes/Reportesadmin';
import Notificacionescompany from '../Notificaciones/Notificacionescompany';
import Notificacionesusuarios from '../Notificaciones/Notificacionesusuarios';

import Inicio from '../Inicio/Inicio';
const useStyles = makeStyles(() => ({
    drawerHeader: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    margen: {
        padding: '4px',
        wordWrap: 'normal',
        display: 'inline-block',
        color: '#454545'
    },
    // link: {
    //     textDecoration: 'none',
    //     color: "#f44336",
    //     fontWeight: 'bold',
    // }, 
    font: {

        textDecoration: 'none'
    }, title: {
        textAlign: "center",
        color: "#FBA21C"
    },
    colorBar: {
        backgroundColor: "#5C8E04",
    },
    link: {
        textDecoration: 'none',
        color: "#FFF",
        fontWeight: 'bold',
        padding: '-20px 1px',
        wordWrap: 'normal',
        display: 'inline-block'
    },

}));

const Dashboard = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    let [esAutenticado, setEsAutenticado] = useState();
    const drawerOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        const timeOut = setInterval(() => {
            if (localStorage.getItem('esAutenticado')==="true") {
                setEsAutenticado(true);
            } else {
                setEsAutenticado(false);
            }
        }, 3000);
        return () => clearInterval(timeOut)
    }, [])


    return (
        <div >
            <Router>
                <Drawer modal open={open} onClose={() => setOpen(false)} >
                    
                    <DrawerContent>
                    <hr/>
                        <List>
                           
                            <Links path='/Reportar' texto='Reportar' /> 
                            <Links path='/Visualizar' texto='Ver reportes' /> 
                            <Links path='/Asistir' texto='Marcar asistencia' /> 
                            <Links path='/Carnet' texto='Carnet' /> 
                            <Links path='/Evento' texto='Eventos' /> 
                        
                        </List>
                    </DrawerContent>
                    
                </Drawer>
                <DrawerAppContent >
                    <TopAppBar>
                        <TopAppBarRow style={{  }}>
                            <TopAppBarSection>
                                <MenuIcon onClick={() => drawerOpen(!open)} />
                                <TopAppBarTitle style={{fontSize:'12'}}>{localStorage.getItem('nameUser')}</TopAppBarTitle>
                            </TopAppBarSection>
                            <TopAppBarSection alignEnd>
                                {esAutenticado
                                    ?
                                    <List>
                                        {/* <IconButton aria-label="show 11 new notifications" color="inherit">
                                            <Badge badgeContent={11} color="secondary">
                                                <NotificationsIcon style={{color:'#fff'}}/>
                                            </Badge>
                                        </IconButton> */}
                                        <Link to={'/'} className={classes.link}>
                                            <ListItem >
                                                <ListItemText>
                                                    <ExitToAppIcon style={{ fontSize: '40px' }} />
                                                </ListItemText>
                                            </ListItem>
                                        </Link>
                                    </List>

                                    : null
                                }
                            </TopAppBarSection>
                        </TopAppBarRow>
                    </TopAppBar>
                    <TopAppBarFixedAdjust />

                    <div style={{ height: '100rem' }}>
                        <Switch>
                            <Route exact path='/' component={Reportar} />
                            <Route exact path='/Nuevousuario' component={Nuevousuario} />
                            <Route exact path='/Nosotros' component={AcercaDe} />
                            <Route exact path='/Visualizar' component={Visualizar} />
                            <Route exact path='/Reportar' component={Reportar} />
                            <Route exact path='/Reporte' component={Reporte} />
                            <Route exact path='/Asistir' component={Asistir} />
                            <Route exact path='/Carnet' component={Carnet} />
                            <Route exact path='/Evento' component={Evento} />
                    
                            <Route exact path='/NotFoundPage' component={NotFoundPage} />
                            <Redirect from="*" to="/NotFoundPage" />
                        </Switch>
                    </div>
                </DrawerAppContent>
            </Router>
        </div>
    )
}

export default withRouter(Dashboard);
