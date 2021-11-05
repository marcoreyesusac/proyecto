import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Label } from 'reactstrap';
const useStyles = makeStyles(() => ({
    bloque: {
        textAlign: 'center',
    }
}));

const NotFoundPage = () => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.bloque}>
                <Label style={{ fontSize: '200px' }}>404</Label>
                <h3>This page could not be found</h3>
            </div>
        </div>

    )
}

export default NotFoundPage;