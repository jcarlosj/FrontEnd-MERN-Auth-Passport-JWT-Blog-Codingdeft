import React, { useEffect, useCallback, useContext } from 'react';
import { Button, Card } from '@blueprintjs/core';

import { UserContext } from '../context/UserContext';

import Loader from './Loader';

// * Define Functional Component
const Welcome = () => {
    // * Define Context Component
    const [ userContext, setUserContext ] = useContext( UserContext );

    console.log( `${ process.env.REACT_APP_API_ENDPOINT }/users/me` );

    const fetchUserDetails = useCallback( () => {
        fetch( `${ process.env.REACT_APP_API_ENDPOINT }/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userContext.token }`
            }
        })
        .then( async response => {

            console.log( 'response: ', response );

            console.group( 'response.ok', response.ok );
            if( response.ok ) {

                const data = await response.json();
                console.log( 'data', data );

                // Define New Context Component
                setUserContext( oldValues => {
                    console.log( 'oldValues', oldValues );

                    return { ...oldValues, details: data }
                });
            }
            else if( response.status === 401 ) {
                // ! NOTA: Cuando el Token ha expirado.
                // !       Si la invocación a refreshToken falla, por: fallo en la conexión o pestaña del navegador abierta desde el día anterior (intenta ahcer clic en el botón Obtener)
                window.location.reload();
            }
            else {
                // Define New Context Component
                setUserContext( oldValues => {
                    console.log( 'oldValues', oldValues );

                    return { ...oldValues, details: null }
                });
            }
            console.groupEnd();
        });


    }, [ setUserContext, userContext.token ] );

    // * Define Efecto para el Componente
    useEffect( () => {
        // ? Obtener los detalles del usuario solo cuando no están presentes
        if( ! userContext.details ) {
            fetchUserDetails();
        }
    }, [ userContext.details, fetchUserDetails ] );

    const handlerRefetch = () => {
        // ! NOTA: Establezca los detalles como indefinidos para que muestre el Spinner y
        // !       fetchUserDetails se invocará desde el useEffect

        // Define New Context Component
        setUserContext( oldValues => {
            console.log( 'oldValues', oldValues );

            return { ...oldValues, details: undefined }
        });
    }

    return userContext.details === null ? (
        <>
            <h1>Welcome!</h1>
            <p>"Error Loading User details"</p>
        </>
    ) : ! userContext.details ? (
        <Loader />
    ) : (
        <Card elevation="1">
            <div className="user-details">
                <div>
                    <h1>Welcome!</h1>
                    <p>Hello, 
                        <strong>
                            { userContext.details.firstName }
                            { userContext.details.lastName && " " + userContext.details.lastName}
                        </strong>!
                    </p>
                    <p>
                        Your reward points: <strong>{ userContext.details.points }</strong>
                    </p>
                </div>
                <div className="user-actions">
                    <Button text="Refetch" intent="primary" onClick={ handlerRefetch } />
                </div>
            </div>
        </Card>
    )
}

export default Welcome;
