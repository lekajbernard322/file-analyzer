import {combineReducers} from "redux";

import list, {ReportListState} from './list/report-list.reducer';
import details, {ReportDetailsState} from './details/report-details.reducer';

export interface IReportState {
    list: ReportListState;
    details: ReportDetailsState;
}

export default combineReducers<IReportState>({
    list, details
});
