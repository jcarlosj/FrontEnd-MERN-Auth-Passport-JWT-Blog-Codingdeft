import { useState, useContext, useCallback, useEffect } from 'react';
import { Card, Tab, Tabs } from '@blueprintjs/core';

import Login from './components/Login';
import Register from './components/Register';
import Loader from './components/Loader.js';
import Welcome from './components/Welcome';

import { UserContext } from './context/UserContext';

// * Define Functional Component
function App() {

    // * Define State Component
    const [ currentTab, setCurrentTab ] = useState( 'login' );

    // * Define Context Component
    const [ userContext, setUserContext ] = useContext( UserContext );

    // * Define Memorizacion de un Callback (evitando re-declaracion al renderizar el componente)
    const verifyUser = useCallback( () => {

        console.log( `${ process.env.REACT_APP_API_ENDPOINT }/users/refreshToken` );

        // Peticion al BackEnd para realizar la actualizacion silenciosa del Token
        fetch( `${ process.env.REACT_APP_API_ENDPOINT }/users/refreshToken`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
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

                    return { ...oldValues, token: data.token }
                });
            }
            else {
                // Define New Context Component
                setUserContext( oldValues => {
                    console.log( 'oldValues', oldValues );

                    return { ...oldValues, token: null }
                });
            }
            console.groupEnd();

            // * Invoca a refreshToken cada 5 minutos para renovar el token de autenticación
            setTimeout( verifyUser, 0.5 * 60 * 1000 );

        });

    }, [ setUserContext ] );

    // * Define Efecto para el Componente
    useEffect( () => {
        verifyUser();
    }, [ verifyUser ] );


    // * Condiciona el despliegue de Componente
    return userContext.token === null ? (
        <Card elevation="1">
            <Tabs
                id="Tabs"
                onChange={ setCurrentTab }
                selectedTabId={ currentTab }
            >
                <Tab
                    id="login"
                    title="Login Panel"
                    panel={ <Login /> }
                />
                <Tab
                    id="register"
                    title="Register Panel"
                    panel={ <Register /> }
                />
                <Tabs.Expander />
            </Tabs>
        </Card>
    ) : userContext.token ? (
        <Welcome />
    ) : (
        <Loader />
    );
}

export default App;
