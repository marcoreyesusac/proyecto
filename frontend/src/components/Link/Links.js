import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import {
    ListItem,
    ListItemText
} from "@rmwc/list";

import {
    Typography
} from "@rmwc/typography";
import '@rmwc/typography/styles';


const useStyles = makeStyles(() => ({
    link: {
        textDecoration: 'none',
        color: "#f44336",
        fontWeight: 'bold',
        
        // padding: '-20px 1px',
        wordWrap: 'normal',
        display: 'inline-block'
    },
    margen: {
        fontSize: '25px',
        padding: '24px',
        wordWrap: 'normal',
        display: 'inline-block',
        color: '#161557'
    }
}));

export default function Links(props) {
    const classes = useStyles();
    return (
        <Link to={props.path} className={classes.link}>
            <ListItem >
                <ListItemText>
                    <Typography className={classes.margen} use="headline6">{props.texto}</Typography>
                </ListItemText>
            </ListItem>
        </Link>
    );
}