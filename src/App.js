import { useState, useContext } from 'react';
import { Card, Tab, Tabs } from '@blueprintjs/core';

import Login from './components/Login';
import Register from './components/Register';

import { UserContext } from './context/UserContext';
import Welcome from './components/Welcome';

// * Define Functional Component
function App() {

    // * Define State Component
    const [ currentTab, setCurrentTab ] = useState( 'login' );

    // * Define Context Component
    const [ userContext, setUserContext ] = useContext( UserContext );

    // * Condiciona el despliegue de Componente
    return ! userContext.token ? (
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
    ) : (
        <Welcome />
    );
}

export default App;
