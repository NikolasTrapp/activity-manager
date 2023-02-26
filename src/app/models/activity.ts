import { Category } from "./category";

export interface Activity{
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    category: Category;
}