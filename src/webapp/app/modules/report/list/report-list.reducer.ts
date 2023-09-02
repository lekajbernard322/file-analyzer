import axios from 'axios';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IReport} from "../report.model";

export interface IFunctionStatistics {
    averageNumberOfFunctions: number;
    minNumberOfFunctions: number;
    maxNumberOfFunctions: number;
}

export interface IDllStatistics {
    averageNumberOfDlls: number;
    minNumberOfDlls: number;
    maxNumberOfDlls: number;
}

const initialState = {
    data: null as IReport[],
    total: null as number,
    functionStatistics: null as IFunctionStatistics,
    dllStatistics: null as IDllStatistics,
    loading: false,
    error: false
};

export type ReportListState = Readonly<typeof initialState>;

export const getReports = createAsyncThunk(
    'reportList/get_reports',
    async (params: {search: string, limit?: number, offset?: number}) => {
        return axios.get<any>('report/', {
            params: {
                ...params
            }
        });
    }
);

export const getFunctionStatistics = createAsyncThunk(
    'reportList/get_function_statistics',
    async () => axios.get<any>('report/function-statistics')
);

export const getDllStatistics = createAsyncThunk(
    'reportList/get_dll_statistics',
    async () => axios.get<any>('report/dll-statistics')
);

export const ReportListSlice = createSlice({
    name: 'reportList',
    initialState: initialState as ReportListState,
    reducers: {
        clearReportList(state) {
            return {
                ...state,
                data: initialState.data,
                total: initialState.total
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getReports.pending, state => {
                state.loading = true
            })
            .addCase(getReports.fulfilled, (state, action) => ({
                ...state,
                data: [...(state.data || []), ...(action.payload.data.results || [])],
                total: action.payload.data?.count,
                loading: false,
                error: null
            }))
            .addCase(getReports.rejected, () => ({
                ...initialState,
                error: true
            }))
            .addCase(getFunctionStatistics.fulfilled, (state, action) => ({
                ...state,
                functionStatistics: action.payload.data
            }))
            .addCase(getDllStatistics.fulfilled, (state, action) => ({
                ...state,
                dllStatistics: action.payload.data
            }))
    }
});

export const {clearReportList} = ReportListSlice.actions;

export default ReportListSlice.reducer;
