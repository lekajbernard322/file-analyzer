import {IDllOccurrences} from "./report-details.reducer";
import {IReport} from "../report.model";
import React from "react";
import {Trans} from "react-i18next";

const OccurrenceDisplayer = ({dllName, dllOccurrences}: { dllName: string, dllOccurrences: IDllOccurrences }) => (
    <>
        {dllOccurrences &&
        <span>(<Trans i18nKey={'reports.occurrences'}/>: {dllOccurrences && dllOccurrences[dllName?.toLowerCase()]})</span>}
    </>
)

const ReportDetailsList = ({report, dllOccurrences}: { report: IReport, dllOccurrences: IDllOccurrences }) => {
    return (
        <div>
            <ul className={'report-details'}>
                {
                    report?.content?.map((item, i) => (
                        <li className={'dll-name'} key={i}>
                            {item.DLLName} <OccurrenceDisplayer dllName={item.DLLName}
                                                                dllOccurrences={dllOccurrences}/>
                            <ul>
                                {item.Functions?.map((fn, j) => (
                                    <li className={'function-name'} key={j}>{fn}</li>
                                ))}
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ReportDetailsList;
