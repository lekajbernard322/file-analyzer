import thunk from "redux-thunk";
import {createMemoryHistory} from "history";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import React from "react";
import configureStore from "redux-mock-store";

export const renderWithContext = (additionalState, ui) => {
    const mockStore = configureStore([thunk]);
    const store = mockStore(additionalState);
    const history = createMemoryHistory();

    const Wrapper = ({children}) => (
        <Provider store={store}>
            <Router history={history}>
                {children}
            </Router>
        </Provider>);

    return {rendered: render(ui, {wrapper: Wrapper}), store, history};
};
