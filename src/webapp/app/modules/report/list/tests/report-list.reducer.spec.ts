import reportList, {
    getDllStatistics,
    getFunctionStatistics,
    getReports
} from "../report-list.reducer";

describe("Report list reducer", () => {
    describe("Default", () => {
        it("should return the initial state", () => {
            const derivedState = reportList(undefined, {type: ""});

            expect(derivedState).toMatchObject({
                data: null,
                dllStatistics: null,
                error: false,
                functionStatistics: null,
                loading: false,
                total: null,
            });
        });
    });

    describe("Requests", () => {
        it("should set loading flag", () => {
            const derivedState = reportList(undefined, {
                type: getReports.pending.type,
            });

            expect(derivedState).toMatchObject({loading: true});
        });
    });

    describe("Fulfilled", () => {
        it("should set the data on getReports success", () => {
            const payload = {
                data: {
                    results: [
                        {
                            _id: "1",
                            name: "report1",
                            created: "some date",
                        },
                    ],
                },
                count: 5,
            };
            const derivedState = reportList(undefined, {
                type: getReports.fulfilled.type,
                payload,
            });

            expect(derivedState).toMatchObject({
                "data": [
                    {
                        "_id": "1",
                        "created": "some date",
                        "name": "report1",
                    },
                ],
                "error": null,
                "loading": false
            })
        });

        it("should set the data on getFunctionStatistics success", () => {
            const payload = {
                data: {
                    averageNumberOfFunctions: 1,
                    minNumberOfFunctions: 2,
                    maxNumberOfFunctions: 3,
                }
            };
            const derivedState = reportList(undefined, {
                type: getFunctionStatistics.fulfilled.type,
                payload,
            });

            expect(derivedState).toMatchObject({
                functionStatistics: {
                    averageNumberOfFunctions: 1,
                    minNumberOfFunctions: 2,
                    maxNumberOfFunctions: 3,
                }
            })
        });

        it("should set the data on getDllStatistics success", () => {
            const payload = {
                data: {
                    averageNumberOfDlls: 4,
                    minNumberOfDlls: 5,
                    maxNumberOfDlls: 6,
                }
            };
            const derivedState = reportList(undefined, {
                type: getDllStatistics.fulfilled.type,
                payload,
            });

            expect(derivedState).toMatchObject({
                dllStatistics: {
                    averageNumberOfDlls: 4,
                    minNumberOfDlls: 5,
                    maxNumberOfDlls: 6,
                }
            })
        });
    });

    describe("Error", () => {
        it("should set error flag on error", () => {
            const derivedState = reportList(undefined, {
                type: getReports.rejected.type,
            });

            expect(derivedState).toMatchObject({error: true});
        })
    })
});
