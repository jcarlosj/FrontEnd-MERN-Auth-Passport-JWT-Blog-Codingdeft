import React, { useState, useContext } from 'react';
import { Button, Callout, FormGroup, InputGroup } from '@blueprintjs/core';

import { UserContext } from '../context/UserContext';

// * Define Functional Component
const Login = () => {

    // * Define State Component
    const
        [ email, setEmail ] = useState( '' ),
        [ password, setPassword ] = useState( '' ),
        [ error, setError ] = useState( '' ),
        [ isSubmitting, setIsSubmitting ] = useState( false );

    // * Define Context Component
    const [ userContext, setUserContext ] = useContext( UserContext );

    const handleSubmit = async event => {
        event.preventDefault();
        console.log( `${ process.env.REACT_APP_API_ENDPOINT }/users/login` );

        const genericErrorMessage = 'Something went wrong! Please try again later.';

        // Define New State Component
        setIsSubmitting( true );
        setError( '' );

        // Peticion al BackEnd para realizar el Login
        await fetch( `${ process.env.REACT_APP_API_ENDPOINT }/users/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password
            })
        })
        .then( async response => {

            console.log( response.ok );

            // Define New State Component
            setIsSubmitting( false );

            if( ! response.ok ) {
                if( response.status === 400 )
                    setError( 'Please fill all the fields correctly!' );
                else if( response.status === 401 )
                    setError( 'Invalid email and password combination.' );
                else
                    setError( genericErrorMessage );
            }
            else {
                const data = await response.json();

                // Define New Context Component
                setUserContext( oldValues => {
                    return {
                        ...oldValues,
                        token: data.token
                    }
                });
            }

        })
        .catch( error => {
            // Define New State Component
            setIsSubmitting( false );
            setError( genericErrorMessage );
        });
    }

    return (
        <>
            {   error && <Callout intent="danger">{ error }</Callout> }
            <form
                className="auth-form"
                onSubmit={ handleSubmit }
            >
                <FormGroup label="Email" labelFor="email">
                    <InputGroup
                        id="email"
                        placeholder="Email"
                        type="email"
                        value={ email }
                        onChange={ event => setEmail( event .target .value ) }
                    />
                </FormGroup>
                <FormGroup label="Password" labelFor="password">
                    <InputGroup
                        id="password"
                        placeholder="Password"
                        type="password"
                        value={ password }
                        onChange={ event => setPassword( event .target .value ) }
                    />
                </FormGroup>
                <Button
                    intent="primary"
                    fill
                    type="submit"
                    text={ `${ isSubmitting ? 'Signing In' : 'Sign In' }` }
                    disabled={ isSubmitting }
                />
            </form>
        </>
    )
}

export default Login;
