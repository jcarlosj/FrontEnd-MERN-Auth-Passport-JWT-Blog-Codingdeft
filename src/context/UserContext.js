import React, { useState } from 'react';

// * Define Context
const UserContext = React.createContext([
    {},
    () => {}
]);

// Define State
let initialState = {};

// * Define Funcional Component (Provider)
const UserProvider = props => {

    // * Define State Component
    const [ state, setState ] = useState( initialState );

    return (
        <UserContext.Provider
            value={ [ state, setState ] }
        >
            { props.children }
        </UserContext.Provider>
    );

}

export {
    UserContext,
    UserProvider
}