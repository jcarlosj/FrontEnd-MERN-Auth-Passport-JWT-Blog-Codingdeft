import { useState } from 'react';
import { Card, Tab, Tabs } from '@blueprintjs/core';

import Login from './components/Login';

// * Define Functional Component
function App() {

    // * Define State Component
    const [ currentTab, setCurrentTab ] = useState( 'login' );

    return (
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
            </Tabs>
        </Card>
    );
}

export default App;
