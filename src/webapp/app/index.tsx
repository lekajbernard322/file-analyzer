import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import getStore from './configuration/store';

import ErrorBoundary from './modules/common/error-boundary';
import AppComponent from './app';

import './configuration/i18n';

const store = getStore();

const rootEl = document.getElementById('root');

const render = Component =>
    // eslint-disable-next-line react/no-render-return-value
    ReactDOM.render(
        <ErrorBoundary>
            <Provider store={store}>
                <div>
                    <Component/>
                </div>
            </Provider>
        </ErrorBoundary>,
        rootEl
    );

render(AppComponent);
