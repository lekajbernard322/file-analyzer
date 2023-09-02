import axios from 'axios';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IReport} from "../report.model";

export type IDllOccurrences = { [dll: string]: number };

const initialState = {
    data: null as IReport,
    dllOccurrences: null as IDllOccurrences,
    loading: false,
    error: false
};

export type ReportDetailsState = Readonly<typeof initialState>;

export const getReportDetails = createAsyncThunk(
    'reportDetails/get_report_details',
    async (reportId: string) => axios.get<any>(`report/${reportId}/`)
);

export const getDllOccurrences = createAsyncThunk(
    'reportDetails/get_dll_occurrences',
    async (dlls: string[]) => {
        const dllsJoined = dlls?.join(',');
        return axios.get<any>(`report/dll-occurrences-count/`, {params: {dlls: dllsJoined}});
    }
);

export const ReportDetailsSlice = createSlice({
    name: 'reportDetails',
    initialState: initialState as ReportDetailsState,
    reducers: {
        clearReportDetails() {
            return {
                ...initialState
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getReportDetails.pending, state => {
                state.loading = true
            })
            .addCase(getReportDetails.fulfilled, (state, action) => ({
                ...state,
                data: action.payload.data,
                loading: false,
                error: null
            }))
            .addCase(getReportDetails.rejected, () => ({
                ...initialState,
                error: true
            }))
            .addCase(getDllOccurrences.fulfilled, (state, action) => ({
                ...state,
                dllOccurrences: action.payload.data?.reduce((agg, val) => {
                    return {
                        ...agg,
                        [val._id?.toLowerCase()]: val.occurrences
                    }
                }, {})
            }))
    }
});

export const {clearReportDetails} = ReportDetailsSlice.actions;

export default ReportDetailsSlice.reducer;
