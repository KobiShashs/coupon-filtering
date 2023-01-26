export interface CouponModel {
    id: number;
    category: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    price: number;
    image: string;
}