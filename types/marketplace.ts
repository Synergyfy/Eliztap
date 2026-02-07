export interface Product {
    id: string;
    name: string;
    brand: string;
    category: string;
    rating: number;
    price: number;
    originalPrice: number | null;
    image: string;
    desc: string;
    tag: string;
    tagColor: string;
    action: 'cart' | 'quote' | 'download';
}

export type ProductsResponse = {
    products: Product[];
    totalPages: number;
    totalCount: number;
};
