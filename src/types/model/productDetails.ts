export interface IProductDetails {
    _id: string;
    name: string;
    active: boolean;
    price: number;
    typeProduct: string;
    os: string;
    brand: string;
    color?: IColor[];
    createdAt?: Date;
    updatedAt?: Date;
    specification: ISpecification
}

export interface IColor {
    colorCode: string;
    images: string[];
    details: [
        {
            storage: number;
            quantity: number;
        }
    ];
}

export interface ISpecification {
    name: string
    cpu: string;
    coreCpu: number;
    ram?: string;
    screenSize: number;
    mainCamera: string;
    frontCamera: string;
    batteryCapacity: number;
}