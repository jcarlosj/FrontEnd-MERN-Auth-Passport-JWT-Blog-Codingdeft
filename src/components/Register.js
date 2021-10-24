import { useState } from 'react';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';

// * Define Functional Component
const Register = () => {

    // * Define State Component
    const
        [ firstName, setFirstName ] = useState( '' ),
        [ lastName, setLastName ] = useState( ''  ),
        [ email, setEmail ] = useState( '' ),
        [ password, setPassword ] = useState( '' );

    return (
        <>
            <form className="auth-form">
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
                <Button intent="primary" text="Register" fill type="submit" />
            </form>
        </>
    )
}

export default Register;
