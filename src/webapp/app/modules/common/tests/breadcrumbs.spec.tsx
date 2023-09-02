import React from "react";
import {fireEvent} from "@testing-library/react";
import Breadcrumbs from "../breadcrumbs";
import {renderWithContext} from "../../../utils/test.utils";

const mockBreadcrumbs = [{label: 'Reports', to: '/reports'}]

describe("Breadcrumbs", () => {
    const renderComponent = () => {
        return renderWithContext(null, <Breadcrumbs config={mockBreadcrumbs}/>)
    }

    it("should render correctly", () => {
        const {rendered: {container}} = renderComponent();

        expect(container).toMatchSnapshot();
    });

    it("should route to / when clicked on Report breadcrumb", () => {
        const {rendered: {queryByText}, history} = renderComponent();

        const breadcrumb = queryByText(/Reports/);

        fireEvent.click(breadcrumb);

        expect(history.location.pathname).toEqual("/reports");
    })
});
