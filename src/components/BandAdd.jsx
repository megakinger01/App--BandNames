import React, { useState, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'

export const BandAdd = () => {

    const { socket } = useContext(SocketContext)

    const [valor, setValor] = useState('')

    const onsubmit = (ev) => {
        ev.preventDefault()

        if (valor.trim().length > 0) {
            socket.emit('agregar-banda', { nombre: valor })
        }
    }



    return (
        <>
            <h3>Agregar banda</h3>

            <form onSubmit={onsubmit}>
                <input 
                    className="form-control"
                    placeholder="nuevo nombre de banda"
                    value={valor}
                    onChange={(ev) => setValor(ev.target.value)}
                />

            </form>
        </>
    )
}
