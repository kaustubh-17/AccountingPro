export interface Expense {
    id?: number;
    companyName: string;
    contractStart: Date;
    contractEnd: Date;
    category: string;
    amount: number;
    mode: string;
}