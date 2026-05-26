export interface Product {
    id: string;
    name: string;
    category: string;
    price: string;
}

export const PRODUCTS: Product[] = [
    { id: 'shirt-01', name: 'Essential Oversized Fit', category: 'T-Shirts', price: '$45' },
    { id: 'shoe-01', name: 'Streetwise Low Top', category: 'Footwear', price: '$120' },
    { id: 'beanie-01', name: 'Knitted Skull Cap', category: 'Headwear', price: '$25' }
];

export const COLORS = [
    { name: 'Onyx Black', hex: '#1a1a1a' },
    { name: 'Arctic White', hex: '#f2f2f2' },
    { name: 'Sage Green', hex: '#879782' },
    { name: 'Dusty Rose', hex: '#c59f9c' },
    { name: 'Cobalt Blue', hex: '#3155a3' },
];
