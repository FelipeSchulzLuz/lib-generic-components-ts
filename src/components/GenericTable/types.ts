interface TableDataObject {
    dataLabel: string;
    dataForLines: string[];
}

interface TableHeaderObject {
    label: string;
    headerKey: string;
    onClick?: any;
    value?: any;
}

interface GenericLineType {
   lineKey: string;
    [key: string]: any;
    [key: number]: any;
}

export type { TableDataObject, TableHeaderObject, GenericLineType };
