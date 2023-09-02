import React from "react";
import {render} from "@testing-library/react";
import ReportDetailsList from "../report-details-list";

const mockReport = {
    _id: "1",
    name: "report1",
    created: "some date",
    content: [
        {
            DLLName: "test.dll",
            Functions: ["function1", "function2"],
        },
    ],
}

const mockDllOccurrences = {
    "test.dll": 3,
};

describe("ReportDetailsList", () => {
    it("should render correctly", () => {
        const {container} = render(
            <ReportDetailsList report={mockReport} dllOccurrences={mockDllOccurrences} />
        );

        expect(container).toMatchSnapshot()
    })
})
