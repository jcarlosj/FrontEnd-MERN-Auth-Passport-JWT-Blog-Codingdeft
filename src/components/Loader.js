import React from 'react';
import { Spinner } from '@blueprintjs/core'

const Loader = props => {
    return (
        <div className="loader">
            <Spinner size={ 50 } />
        </div>
    )
}

export default Loader;
