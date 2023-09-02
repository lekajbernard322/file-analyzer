import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../configuration/store";
import {getDllStatistics, getFunctionStatistics, getReports, clearReportList} from "./report-list.reducer";
import {Headline, Subheading} from "../../common/typography";
import HorizontalRule from "../../common/horizontal-rule";
import Breadcrumbs from "../../common/breadcrumbs";
import InformationHighlighter from "../../common/information-highlighter";
import HorizontalContainer from "../../common/horizontal-container";
import PageContent from "../../common/page-content";
import SearchField from "../../common/search-field";
import ReportTable from "./report-table";
import {Trans, useTranslation} from "react-i18next";

const ReportListPage = () => {
    const dispatch = useAppDispatch();
    const reports = useAppSelector(store => store.report.list.data);
    const totalNumberOfReports = useAppSelector(store => store.report.list.total);
    const functionStatistics = useAppSelector(store => store.report.list.functionStatistics);
    const dllStatistics = useAppSelector(store => store.report.list.dllStatistics);

    const {t} = useTranslation();

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        searchReports(searchTerm);
        dispatch(getFunctionStatistics());
        dispatch(getDllStatistics());
    }, []);

    const searchReportsInner = (search, offset = 0, limit = 2) => {
        dispatch(getReports({search, limit, offset}));
    }

    const searchReports = (search, offset = 0, limit = 2) => {
        dispatch(clearReportList())
        searchReportsInner(search, offset, limit);
    }

    const loadMoreReports = () => {
        searchReportsInner(searchTerm, reports?.length);
    }

    return (
        <div>
            <Breadcrumbs config={[{label: t('breadcrumb.reports'), to: '/'}]}/>
            <Headline message={t('reports.title')}/>
            <Subheading message={t('reports.subtitle')}/>

            <HorizontalRule/>

            <HorizontalContainer>
                <InformationHighlighter message={t('reports.totalNumberOfReports')}
                                        highlightedInformation={totalNumberOfReports}/>
                <InformationHighlighter message={t('reports.averageNumberOfDlls')}
                                        highlightedInformation={functionStatistics?.averageNumberOfFunctions}/>
                <InformationHighlighter message={t('reports.averageNumberOfFunctions')}
                                        highlightedInformation={dllStatistics?.averageNumberOfDlls}/>
            </HorizontalContainer>

            <HorizontalRule/>

            <SearchField searchTerm={searchTerm} onChangeSearchTerm={setSearchTerm}
                         onPressEnter={() => searchReports(searchTerm)}/>
            <button onClick={() => searchReports(searchTerm)}><Trans i18nKey={'common.filter'}/></button>

            <PageContent>
                <ReportTable reports={reports} disabled={reports?.length === totalNumberOfReports}
                             onLoadMore={loadMoreReports}/>
            </PageContent>
        </div>
    );
};

export default ReportListPage;
