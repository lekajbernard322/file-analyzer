import React from "react";
import Footer from "../footer";
import {renderWithContext} from "../../../utils/test.utils";

const getMockData = (mockError, mockLoading) => ({
    report: {
        list: {
            error: mockError,
            loading: mockLoading
        },
        details: {
            error: mockError,
            loading: mockLoading
        }
    }
});

describe("Footer", () => {
    const renderComponent = (mockData) => {
        return renderWithContext(mockData, <Footer/>)
    };

    it('should show that it is idle', () => {
        const {rendered: {queryByText}} = renderComponent(getMockData(false, false));

        const idleText = queryByText(/Idle/);

        expect(idleText).toBeInTheDocument();
    });

    it('should show that it is loading', () => {
        const {rendered: {queryByText}} = renderComponent(getMockData(false, true));

        const loadingText = queryByText(/Loading/);

        expect(loadingText).toBeInTheDocument();
    });

    it('should show that it an error occurred', () => {
        const {rendered: {queryByText}} = renderComponent(getMockData(true, false));

        const errorText = queryByText(/Error/);

        expect(errorText).toBeInTheDocument();
    });
})
