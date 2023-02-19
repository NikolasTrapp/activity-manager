import { Category } from "./category";

export interface Activity{
    id: number;
    title: string;
    description: string;
    startDate: Date;
    finalDate: Date;
    category: Category;
}