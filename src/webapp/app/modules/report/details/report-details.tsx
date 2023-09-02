import "./report-details.scss";
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Breadcrumbs from "../../common/breadcrumbs";
import {Headline, Subheading} from "../../common/typography";
import HorizontalRule from "../../common/horizontal-rule";
import {useAppDispatch, useAppSelector} from "../../../configuration/store";
import {getReportDetails, clearReportDetails, getDllOccurrences, IDllOccurrences} from "./report-details.reducer";
import {IReport} from "../report.model";
import HorizontalContainer from "../../common/horizontal-container";
import InformationHighlighter from "../../common/information-highlighter";
import PageContent from "../../common/page-content";
import {getDllStatistics, getFunctionStatistics} from "../list/report-list.reducer";
import SearchField from "../../common/search-field";
import ReportDetailsList from "./report-details-list";
import {useTranslation} from "react-i18next";

const getMessageDependingOnComparison = (value: number, average: number, t) => {
    if (!value || !average) {
        return "";
    } else if (value > average) {
        return `${t('reports.higherThanAverage')} [${average}]`;
    } else if (value < average) {
        return `${t('reports.lowerThanAverage')} [${average}]`;
    } else {
        return `${t('reports.sameAsAverage')} [${average}]`;
    }
}

const filterReport = (report: IReport, searchTerm: string): IReport => {
    const clonedReport = {...report};

    clonedReport.content = clonedReport.content?.map(c => ({
        ...c,
        'Functions': c.Functions?.filter(f => f.toLowerCase().includes(searchTerm?.toLowerCase()))
    })).filter(c => {
        return c.DLLName?.toLowerCase().includes(searchTerm?.toLowerCase()) || c.Functions?.length
    });

    return clonedReport;
}

type ReportDetailsParameters = {
    reportId: string;
}

const ReportDetailsPage = () => {
    const {reportId} = useParams<ReportDetailsParameters>();
    const dispatch = useAppDispatch();
    const report = useAppSelector(store => store.report.details.data);
    const dllOccurrences = useAppSelector(store => store.report.details.dllOccurrences);
    const numberOfDlls = report?.content?.length;
    const numberOfFunctions = report?.content?.map(el => el.Functions?.length).reduce((prev, curr) => prev + curr);

    const functionStatistics = useAppSelector(store => store.report.list.functionStatistics);
    const dllStatistics = useAppSelector(store => store.report.list.dllStatistics);
    const {averageNumberOfFunctions} = functionStatistics || {};
    const {averageNumberOfDlls} = dllStatistics || {};

    const [searchTerm, setSearchTerm] = useState('');

    const {t} = useTranslation();

    useEffect(() => {
        dispatch(getFunctionStatistics());
        dispatch(getDllStatistics());
    }, []);

    useEffect(() => {
        dispatch(getReportDetails(reportId));

        return () => {
            dispatch(clearReportDetails())
        }
    }, [reportId]);

    useEffect(() => {
        if (report) {
            const dllNames = report?.content?.map(el => el.DLLName);

            dispatch(getDllOccurrences(dllNames));
        }
    }, [report]);

    return (
        <div>
            <Breadcrumbs config={[{label: t('breadcrumb.reports'), to: '/'}, {label: t('breadcrumb.details'), to: '#'}]}/>
            <Headline message={report?.name}/>
            <Subheading message={t('reports.detailSubtitle')}/>

            <HorizontalRule/>

            <HorizontalContainer>
                <InformationHighlighter
                    message={`${t('reports.numberOfDlls')}, ${getMessageDependingOnComparison(numberOfDlls, averageNumberOfDlls, t)}`}
                    highlightedInformation={numberOfDlls}/>
                <InformationHighlighter
                    message={`${t('reports.numberOfFunctions')}, ${getMessageDependingOnComparison(numberOfFunctions, averageNumberOfFunctions, t)}`}
                    highlightedInformation={numberOfFunctions}/>
            </HorizontalContainer>

            <HorizontalRule/>

            <SearchField searchTerm={searchTerm} onChangeSearchTerm={setSearchTerm}/>

            <PageContent>
                <ReportDetailsList report={filterReport(report, searchTerm)} dllOccurrences={dllOccurrences}/>
            </PageContent>
        </div>
    );
}

export default ReportDetailsPage;
