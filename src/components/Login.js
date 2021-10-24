import React, { useState } from 'react';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';

// * Define Functional Component
const Login = () => {

    // * Define State Component
    const
        [ email, setEmail ] = useState( '' ),
        [ password, setPassword ] = useState( '' );

    return (
        <>
            <form className="auth-form">
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
                <Button intent="primary" fill type="submit" text="Sign In" />
            </form>
        </>
    )
}

export default Login;
