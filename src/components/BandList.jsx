import React, { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'

export const BandList = () => {

    const [bands, setBands] = useState([])

    const { socket } = useContext(SocketContext)

    useEffect(() => {
        socket.on( 'currents-bands' , (bands) => {
          setBands( bands )
        })
    }, [socket])



    const cambiarNombres = (event , id) => {
        const nuevoNombre = event.target.value;
        
        setBands( bands => bands.map( band =>{
            if  ( band.id === id ) {
                  band.name = nuevoNombre;
            }
            return band;
        }));
    }


    const onPerdioFoco = (id , nombre ) => {     
        socket.emit('cambiar-nombre', { id, nombre } )
    }



    const crearRows = () => {
        return(
            bands.map( band => (
                <tr key={band.id}>
                    <td> 
                        <button 
                            className="btn btn-primary"
                            onClick={ ()=> {  socket.emit('votar-banda', band.id ) } }
                        > +1 
                        
                        </button> 
                    </td>
                    <td>
                        <input  
                            className="form-control" 
                            type="text"
                            value={band.name}
                            onChange={ (ev)=>cambiarNombres( ev , band.id ) }
                            onBlur={ () => onPerdioFoco( band.id , band.name ) }
                        />
                    </td>
                    <td>
                        <h3> { band.votes } </h3>
                    </td>
                    <td>
                        <button 
                            className="btn btn-danger"
                            onClick={ () => ( socket.emit( 'borrar-banda',  band.id ) ) }
                        > 
                        Borrar 
                        </button>
                    </td>
                </tr>
            ))
            
        )
    }

    return (
        <>
            

            <table className="table table-striped">
               <thead>
                   <tr>
                       <th></th>
                       <th>Nombre</th>
                       <th>votos</th>
                       <th>Borrar</th>
                   </tr>
               </thead>
               <tbody>
                   {
                       crearRows()
                   }
               </tbody>
            </table>
        </>
    )
}
