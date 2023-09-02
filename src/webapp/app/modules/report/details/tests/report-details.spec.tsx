import React from "react";
import ReportDetailsPage from "../report-details";
import {renderWithContext} from "../../../../utils/test.utils";
import {
    getReportDetails,
    getDllOccurrences,
} from "../report-details.reducer";
import {getDllStatistics, getFunctionStatistics} from "../../list/report-list.reducer";

export const mockData = {
    report: {
        details: {
            data: {
                _id: "1",
                name: "report1",
                created: "some date",
                content: [
                    {
                        DLLName: "test.dll",
                        Functions: ["function1", "function2"],
                    },
                ],
            },
            dllOccurrences: {
                "test.dll": 3,
            },
        },
        list: {
            functionStatistics: {
                averageNumberOfFunctions: 1,
                minNumberOfFunctions: 2,
                maxNumberOfFunctions: 3,
            },
            dllStatistics: {
                averageNumberOfDlls: 4,
                minNumberOfDlls: 5,
                maxNumberOfDlls: 6,
            },
        },
    },
};

describe("ReportDetail", () => {
    const renderComponent = () => {
        return renderWithContext(mockData, <ReportDetailsPage/>);
    };

    it("should render correctly", () => {
        const {
            rendered: {container},
        } = renderComponent();

        expect(container).toMatchSnapshot();
    });

    it("should execute fetches for data", () => {
        const {store} = renderComponent();

        const [
            getFunctionStatisticsPendingAction,
            getDllStatisticsPendingAction,
            getReportDetailsPendingAction,
            getDllOccurrencesPendingAction
        ] = store.getActions();

        expect(getFunctionStatisticsPendingAction).toMatchObject({
            type: getFunctionStatistics.pending.type,
        });
        expect(getDllStatisticsPendingAction).toMatchObject({
            type: getDllStatistics.pending.type,
        });
        expect(getReportDetailsPendingAction).toMatchObject({
            type: getReportDetails.pending.type,
        });
        expect(getDllOccurrencesPendingAction).toMatchObject({
            type: getDllOccurrences.pending.type,
        });
    });
});
