import { Product } from '@/types/marketplace';

// Mock Data Source
const allProducts: Product[] = [
    {
        id: 'acs-acr1552u',
        name: 'ACS ACR1552U USB-C NFC Reader IV',
        brand: 'ACS',
        category: 'NFC Readers',
        rating: 4.9,
        price: 124999,
        originalPrice: 149000,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6J_11qPV0OmQwFJoKJtTMpD_qjs1SsBP9UsQg0ecJWY2IONWb79e03v7EMbPHEBzTJtdwTiWa4uHBlwQpbnU0EI9XkmDEOrQF_F57RfXBMpzCz3WITiymIK5fKWEIyOxSSyurDKwi32cxVO-m90-snIAYuoCD8Yr181lIcfNaCRwZr0bXXLyxdrvlnrxIO6jof5lw-BXhuVlPaRUFxFKCg5okpbY0Vrtjw1r2KKRGWGcmaZz_OUHZQ7qJnz8J7LCbuEvtvZWaxQWL",
        desc: 'Dual-interface Smart Card Reader with CCID Support',
        tag: 'In Stock',
        tagColor: 'bg-emerald-500',
        action: 'cart'
    },
    {
        id: 'omnikey-5422',
        name: 'OMNIKEY 5422 Dual Interface Reader',
        brand: 'HID Global',
        category: 'NFC Readers',
        rating: 4.8,
        price: 189000,
        originalPrice: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA13i7tJ7UvtV5AeSpw3wOHaYE8eOSOAHsJtyf9B8QtVXaQpAPS3C7Teyqjev3z6_-2UBAUUsl9_wQrPFQB4dsL21qcM803GIIhce48iGdAgKXjYlhpJBNo1PKjrd-FnkGqZzA9IKKpAIcee1B396E-WCSuonb2_wSUSBjZpX_9OT6hB2FsxRZYweRceLiA9MfmDMM0f3rXJHKAq-TzdbZ2XPvvKlIxen5gbQNQZlFxGq791xkCofDQmiLKdWXKTXx5bV39FHTL2Zxu",
        desc: 'Contactless 13.56 MHz and Contact Smart Card',
        tag: 'Bulk Choice',
        tagColor: 'bg-blue-500',
        action: 'quote'
    },
    {
        id: 'sdk-bundle',
        name: 'Universal NFC Developer SDK',
        brand: 'EntryConnect',
        category: 'Development Kits',
        rating: 5.0,
        price: 499000,
        originalPrice: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9fUTe24WCXHHYE4D4j0PVwg79HTdwdPmXG64DA9YOPJgE3IueN-3HHmLPcpgz0mA8Zv-HKS9rL6Wkpp0FRhDePtzWdJ8_vVpFbqT8grR6SyWyuQJlAYEZMHdIjcJAkZASE4iH8WHSJS0bqM0mvzNzPuctGZfYF0QsdbMOcQ6NuiCqpWrfcnaU-XlodX_ZGJcMfXXdD-uW2yjKMdzwsrPxqDjvTp8eIYbZWNSV2IIKpeWykSDBLl3dNFlzK8D46MQVO4EpHHXmsIsE",
        desc: 'Python, C++, Java & WebHID API wrappers',
        tag: 'Software',
        tagColor: 'bg-indigo-500',
        action: 'download'
    },
    {
        id: 'ntag215-pack',
        name: 'NTAG215 PVC Smart Cards (Pack of 100)',
        brand: 'NXP',
        category: 'Smart Cards',
        rating: 4.7,
        price: 85500,
        originalPrice: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjOLHjEImnuX2LOtQ9_35UJ5iBVDjYgoAdUkfVCIOKlzLzNbR8jzZuXMqBzr2zm7bTB60FByuzS4DfbPxOdC-XETnsg_xSz6HydW21C7a49GAGuikH8vL51ldD0GCCYAAAWeyYjrsST43T02ixab1YBLQ0SN7FPkmwUSZjyJwz5rbAfLT4RqccxCFX1gzrKZ55WEV-TfuHqVMMxN3TpGlj_Q1xdnQblfVWikTCC9YahMk0rdT2xgoAgGPqhqumczAzvpmU-SttVIU1",
        desc: '504 Bytes Memory, Compatible with Amiibo',
        tag: 'Multipack',
        tagColor: 'bg-amber-500',
        action: 'cart'
    },
    {
        id: 'sl025m-module',
        name: 'SL025M 13.56MHz RFID Reader/Writer Module',
        brand: 'StrongLink',
        category: 'Modules',
        rating: 4.5,
        price: 15400,
        originalPrice: null,
        image: "https://m.media-amazon.com/images/I/61+yV+J+d3L._AC_SL1000_.jpg",
        desc: 'Embedded module for custom hardware integration.',
        tag: 'Component',
        tagColor: 'bg-gray-500',
        action: 'cart'
    },
    {
        id: 'nfc-wristband',
        name: 'Silicone NFC Wristband (Event Pack)',
        brand: 'EntryConnect',
        category: 'Accessory',
        rating: 4.6,
        price: 45000,
        originalPrice: 60000,
        image: "https://sc04.alicdn.com/kf/H835260171a3949989506684724495537t.jpg",
        desc: 'Waterproof wristbands for event access control.',
        tag: 'Bulk',
        tagColor: 'bg-purple-500',
        action: 'quote'
    },
    {
        id: 'ntag216-keyfob',
        name: 'NTAG216 Epoxy Keyfob (Pack of 50)',
        brand: 'NXP',
        category: 'Smart Cards',
        rating: 4.8,
        price: 65000,
        originalPrice: null,
        image: "https://m.media-amazon.com/images/I/61kQqnyv7BL._AC_SX679_.jpg",
        desc: 'Durable epoxy finish, 888 bytes memory.',
        tag: 'Keyfob',
        tagColor: 'bg-teal-500',
        action: 'cart'
    },
    {
        id: 'acr122u-reader',
        name: 'ACS ACR122U USB NFC Reader',
        brand: 'ACS',
        category: 'NFC Readers',
        rating: 4.6,
        price: 45000,
        originalPrice: 55000,
        image: "https://m.media-amazon.com/images/I/61+yV+J+d3L._AC_SL1000_.jpg", // Placeholder - replace if needed
        desc: 'Popular NFC reader for desktop applications.',
        tag: 'Standard',
        tagColor: 'bg-gray-500',
        action: 'cart'
    },
     {
        id: 'metal-nfc-card',
        name: 'Premium Metal NFC Business Card',
        brand: 'EntryConnect',
        category: 'Smart Cards',
        rating: 4.9,
        price: 25000,
        originalPrice: null,
        image: "https://m.media-amazon.com/images/I/61kQqnyv7BL._AC_SX679_.jpg", // Placeholder
        desc: 'Matte black metal finish with laser engraving.',
        tag: 'Premium',
        tagColor: 'bg-yellow-600',
        action: 'cart'
    }
];

export const fetchProducts = async (
    page: number = 1,
    limit: number = 8,
    category: string = 'All Products',
    priceRange: [number, number] = [0, 1000000],
    brands: string[] = [],
    searchQuery: string = ''
) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    let filtered = allProducts.filter(p => {
        const matchesCategory = category === 'All Products' || p.category === category || (category === 'All Hardware' && p.category !== 'Software');
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        const matchesBrand = brands.length === 0 || brands.includes(p.brand);
        const matchesSearch = searchQuery === '' || 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            p.desc.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesPrice && matchesBrand && matchesSearch;
    });

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedProducts = filtered.slice(start, end);

    return {
        products: paginatedProducts,
        totalPages,
        totalCount
    };
};
