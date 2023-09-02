import reportDetails, {getReportDetails, getDllOccurrences} from '../report-details.reducer'

describe("Report details reducer", () => {
    describe("Default", () => {
        it("should return the initial state", () => {
            const derivedState = reportDetails(undefined, {type: ""});

            expect(derivedState).toMatchObject({
                data: null,
                dllOccurrences: null,
                error: false,
                loading: false,
            });
        });
    });

    describe("Requests", () => {
        it("should set loading flag", () => {
            const derivedState = reportDetails(undefined, {
                type: getReportDetails.pending.type,
            });

            expect(derivedState).toMatchObject({loading: true});
        });
    });

    describe("Fulfilled", () => {
        it("should set the data on getReportDetails success", () => {
            const payload = {
                data: {
                    _id: "1",
                    name: "report1",
                    content: [
                        {
                            DLLName: "test.dll",
                            Functions: ["function1", "function2"],
                        },
                    ],
                    created: "some date",
                }
            };
            const derivedState = reportDetails(undefined, {
                type: getReportDetails.fulfilled.type,
                payload,
            });

            expect(derivedState).toMatchObject({
                "data": {
                    _id: "1",
                    name: "report1",
                    content: [
                        {
                            DLLName: "test.dll",
                            Functions: ["function1", "function2"],
                        },
                    ],
                    created: "some date",
                },
                "error": null,
                "loading": false
            })
        });

        it("should set the data on getDllOccurrences success", () => {
            const payload = {
                data: [
                    {
                        _id: "test.dll",
                        occurrences: 3
                    }
                ]
            };
            const derivedState = reportDetails(undefined, {
                type: getDllOccurrences.fulfilled.type,
                payload,
            });

            expect(derivedState).toMatchObject({
                "dllOccurrences": {
                    "test.dll": 3,
                }
            })
        });
    })

    describe("Error", () => {
        it("should set error flag on error", () => {
            const derivedState = reportDetails(undefined, {
                type: getReportDetails.rejected.type,
            });

            expect(derivedState).toMatchObject({error: true});
        })
    })
})
