
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Dashboard from './screens/Dashboard/Dashboard';
import Reportar from './screens/Reportar/Reportar';
import Reportar from './screens/Reporte/Reporte';
import Visualizar from './screens/Visualizar/Visualizar';
import Buscar from './screens/Buscar/Buscar';
import Asistir from './screens/Asistir/Asistir';
import Reporte from './screens/Reporte/Reporte';
export default function ScreensRoot() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Reportar} /> 
                <Route exact path='/Reportar' component={Reportar} />
                <Route exact path='/Visualizar' component={Visualizar} />
                <Route exact path='/Buscar' component={Buscar} /> 
                <Route exact path='/Reporte' component={Reporte} /> 
                <Route exact path='/Asistir' component={Asistir} /> 

            //    <Redirect from="*" to="/NotFoundPage" /> 
            </Switch>
        </BrowserRouter>
    );
}