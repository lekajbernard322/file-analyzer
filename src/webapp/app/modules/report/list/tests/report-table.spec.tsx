import React from 'react';
import { fireEvent } from "@testing-library/react";
import ReportTable from "../report-table";
import {renderWithContext} from "../../../../utils/test.utils";

const onLoadMore = jest.fn();

const mockReports = [
    {
        _id: "1",
        name: "report1",
        created: "some date",
    },
    {
        _id: "2",
        name: "report1",
        created: "some date",
    },
];

describe("ReportTable", () => {

    const renderComponent = (mockReports, mockDisabled) => {
        return renderWithContext(null, <ReportTable reports={mockReports} disabled={mockDisabled} onLoadMore={onLoadMore}/>)
    }

    beforeAll(() => {
        onLoadMore.mockClear();
    })

    it('should render correctly with data', () => {
        const {rendered: {container}} = renderComponent(mockReports, false)

        expect(container).toMatchSnapshot();
    });

    it('should render no data message when no reports are available', () => {
        const {rendered: {container}} = renderComponent(null, false)

        expect(container).toMatchSnapshot();
    });

    it('should call onLoadMore when clicked on load more button', () => {
        const {rendered: {queryByText}} = renderComponent(null, false);

        const loadMoreButton = queryByText('Load more');

        fireEvent.click(loadMoreButton);

        expect(onLoadMore).toHaveBeenCalled();
    });

    it('should call onLoadMore when clicked on load more button', () => {
        const {rendered: {queryByText}} = renderComponent(null, true);

        const loadMoreButton = queryByText('Load more');

        expect(loadMoreButton).toBeDisabled();
    });
});
