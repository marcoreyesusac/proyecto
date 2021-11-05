import React from 'react';
import { Label } from 'reactstrap';

export default function Titulo(titulo) {
    return (
        <div style={{ textAlign: "center" }}>
            <br>
            </br>
            <Label style={{ fontSize: "28px", textAlign: "center", fontFamily: "Verdana", color: "#161557" }}> {titulo.nombre} </Label>
        </div>
    );
}