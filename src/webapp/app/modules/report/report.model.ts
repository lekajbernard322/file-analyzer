export interface IContent {
    DLLName: string;
    Functions: string[];
}

export interface IReport {
    _id: string;
    name: string;
    content: IContent[];
    created: string;
}
