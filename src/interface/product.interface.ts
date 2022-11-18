export interface IBaseProduct {
    name: string;
    price: number;
}

export interface IProduct extends IBaseProduct {
    id: string;
    updateDate?: Date;
}