import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import NavRoutes from './routes/Routes';

const App = () => {
    return (
        <>
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-center"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar={true}
            />
            <NavRoutes />
        </>
    );
};

export default App;
