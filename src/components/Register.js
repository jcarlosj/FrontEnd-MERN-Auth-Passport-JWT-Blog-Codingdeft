import { useState, useContext } from 'react';
import { Button, Callout, FormGroup, InputGroup } from '@blueprintjs/core';

import { UserContext } from '../context/UserContext';

// * Define Functional Component
const Register = () => {

    // * Define State Component
    const
        [ firstName, setFirstName ] = useState( '' ),
        [ lastName, setLastName ] = useState( ''  ),
        [ email, setEmail ] = useState( '' ),
        [ password, setPassword ] = useState( '' ),
        [ error, setError ] = useState( '' ),
        [ isSubmitting, setIsSubmitting ] = useState( false );

    // * Define Context Component
    const [ userContext, setUserContext ] = useContext( UserContext );

    const handleSubmit = event => {
        event.preventDefault();
        console.log( `${ process.env.REACT_APP_API_ENDPOINT }/users/signup` );

        const genericErrorMessage = 'Something went wrong! Please try again later.';

        // Define New State Component
        setIsSubmitting( true );
        setError( '' );

        // Peticion al BackEnd para realizar el Registro
        fetch( `${ process.env.REACT_APP_API_ENDPOINT }/users/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                username: email,
                password
            })
        }).
        then( async response => {

            console.log( response.ok );

            // Define New State Component
            setIsSubmitting( false );

            if( ! response.ok ) {
                if( response.status === 400 )
                    setError( 'Please fill all the fields correctly!' );
                else if( response.status === 401 )
                    setError( 'Invalid email and password combination.' );
                else if( response.status === 500 ) {
                    const data = await response.json();

                    console.log( response );
                    if( data.message )
                        setError( data.message || genericErrorMessage );
                }
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
            {   error && <Callout indent="danger">{ error }</Callout> }
            <form
                className="auth-form"
                onSubmit={ handleSubmit }
            >
                <FormGroup label="First Name" labelFor="firstName">
                    <InputGroup
                        id="firstName"
                        placeholder="First Name"
                        name="firstName"
                        value={ firstName }
                        onChange={ event => setFirstName( event .target .value ) }
                    />
                </FormGroup>
                <FormGroup label="Last Name" labelFor="lastName">
                    <InputGroup
                        id="lastName"
                        placeholder="Last Name"
                        name="lastName"
                        value={ lastName }
                        onChange={ event => setLastName( event .target .value ) }
                    />
                </FormGroup>
                <FormGroup label="Email" labelFor="email">
                    <InputGroup
                        id="email"
                        placeholder="Email"
                        name="email"
                        value={ email }
                        onChange={ event => setEmail( event .target .value ) }
                    />
                </FormGroup>
                <FormGroup label="Password" labelFor="password">
                    <InputGroup
                        id="passpord"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={ password }
                        onChange={ event => setPassword( event .target .value ) }
                    />
                </FormGroup>
                <Button
                    intent="primary"
                    text={ `${ isSubmitting ? 'Registering' : 'Register' }` }
                    fill
                    type="submit"
                    disabled={ isSubmitting }
                />
            </form>
        </>
    )
}

export default Register;
