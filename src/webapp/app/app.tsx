import './app.scss';
import './modules/common/common-ui-elements.scss';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import AppRoutes from './routes';
import Paper from "./modules/common/paper";
import Footer from "./modules/common/footer";
import HorizontalRule from "./modules/common/horizontal-rule";

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
    return (
        <Router basename={baseHref}>
            <div className={'app-container'}>
                <Paper>
                    <AppRoutes/>

                    <HorizontalRule />

                    <Footer/>
                </Paper>
            </div>
        </Router>
    );
};

export default App;
