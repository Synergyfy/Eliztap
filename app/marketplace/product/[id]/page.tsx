'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useCartStore } from '@/store/cartStore';
import {
    ArrowRight, ShoppingCart, Star, Heart, Share2,
    FileText, Download, CheckCircle, ShieldCheck, Truck,
    ChevronRight, Home, Grid, GitCompare, Flag, MessageSquare, Play
} from 'lucide-react';
import { fetchProductDetail } from '@/lib/api/marketplace';
import { ProductDetailSkeleton } from '@/components/marketplace/Skeletons';
import useEmblaCarousel from 'embla-carousel-react';
import toast from 'react-hot-toast';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = React.use(params);

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductDetail(id)
    });

    const { addItem } = useCartStore();
    const [selectedImage, setSelectedImage] = React.useState(0);
    const [quantity, setQuantity] = React.useState(1);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    React.useEffect(() => {
        if (emblaApi) {
            emblaApi.on('select', () => {
                setSelectedImage(emblaApi.selectedScrollSnap());
            });
        }
    }, [emblaApi]);

    const scrollToImage = (index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    };

    if (isLoading) return <ProductDetailSkeleton />;
    if (isError || !product) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <button onClick={() => router.back()} className="text-primary underline">Go Back</button>
        </div>
    );

    const handleAddToCart = () => {
        addItem({
            id: Math.random().toString(36).substr(2, 9),
            productId: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.images[0],
            inStock: true,
            shippingInfo: 'Standard Delivery'
        });
        toast.success(`Added ${quantity} x ${product.name} to cart`);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header / Nav Mock (Assuming consistent Layout) */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-8">
                    <div className="flex items-center gap-3 shrink-0">
                        <Link href="/" className='flex items-center gap-2'>
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Grid className="text-primary" size={24} />
                            </div>
                            <span className="font-display text-2xl font-bold tracking-tight text-primary">ElizTap <span className="text-gray-400 font-medium text-lg">Marketplace</span></span>
                        </Link>
                    </div>
                    {/* ... other header elements if needed, or rely on Layout */}
                    <Link href="/marketplace" className="text-sm font-bold text-gray-500 hover:text-primary">
                        Back to Marketplace
                    </Link>
                </div>
            </header>

            <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex mb-8 text-sm font-medium text-gray-500">
                    <Link href="/" className="hover:text-primary flex items-center gap-1"><Home size={14} /> Home</Link>
                    <ChevronRight size={14} className="mx-2 self-center" />
                    <Link href="/marketplace" className="hover:text-primary">Marketplace</Link>
                    <ChevronRight size={14} className="mx-2 self-center" />
                    <span className="text-gray-900 font-bold">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Images */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="aspect-square bg-white rounded-3xl border border-gray-200 overflow-hidden relative group">
                            <div className="h-full w-full" ref={emblaRef}>
                                <div className="flex h-full">
                                    {product.images.map((img: string, i: number) => (
                                        <div className="flex-[0_0_100%] min-w-0 relative flex items-center justify-center p-12" key={i}>
                                            <img
                                                src={img}
                                                alt={`${product.name} - View ${i + 1}`}
                                                className="max-w-full h-full object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="absolute top-6 left-6 z-10">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${product.tagColor}`}>
                                    {product.tag}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => scrollToImage(i)}
                                    className={`aspect-square rounded-2xl border-2 overflow-hidden bg-white hover:opacity-100 transition-all ${selectedImage === i ? 'border-primary opacity-100 ring-4 ring-primary/10' : 'border-gray-200 opacity-60 hover:border-gray-300'}`}
                                >
                                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain p-2" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <h1 className="text-4xl font-display font-bold text-gray-900 mb-2 leading-tight">{product.name}</h1>
                            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                                <span>SKU: {product.sku}</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span className="flex items-center gap-1 text-amber-500">
                                    <Star size={14} fill="currentColor" /> 4.9 (124 Reviews)
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pricing Tier</span>
                                    <span className="text-xs font-bold text-primary">Bulk Savings Available</span>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    <div className="flex justify-between p-4 bg-primary/5">
                                        <span className="text-sm font-medium text-gray-700">1 - 10 Units</span>
                                        <span className="font-bold text-gray-900">₦{product.price.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between p-4">
                                        <span className="text-sm font-medium text-gray-500">11 - 100 Units</span>
                                        <span className="font-bold text-gray-900">₦{(product.price * 0.9).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between p-4">
                                        <span className="text-sm font-medium text-gray-500">100+ Units</span>
                                        <button className="font-bold text-primary cursor-pointer hover:underline text-sm">Request Quote</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 rounded-xl h-14 bg-white">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 text-gray-500 hover:text-primary transition-colors text-lg"
                                    >-</button>
                                    <input
                                        className="w-12 text-center bg-transparent border-none focus:ring-0 text-lg font-bold text-gray-900"
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                    />
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 text-gray-500 hover:text-primary transition-colors text-lg"
                                    >+</button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>
                                <button className="h-14 w-14 border border-gray-300 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all">
                                    <Heart size={24} />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Link
                                    href="/contact?type=quote"
                                    className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center"
                                >
                                    Request Bulk Quote
                                </Link>
                                <button className="w-full border border-gray-300 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                                    <MessageSquare size={18} /> Write Review
                                </button>
                            </div>

                            <div className="flex items-center justify-between gap-2 py-6 border-t border-gray-100 mt-2">
                                <button
                                    onClick={() => toast.success('Added to comparison')}
                                    className="flex-1 flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors py-2 rounded-lg hover:bg-primary/5"
                                >
                                    <GitCompare size={18} /> Compare
                                </button>
                                <div className="w-px h-8 bg-gray-200"></div>
                                <button
                                    onClick={() => toast.success('Link copied to clipboard')}
                                    className="flex-1 flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors py-2 rounded-lg hover:bg-primary/5"
                                >
                                    <Share2 size={18} /> Share
                                </button>
                                <div className="w-px h-8 bg-gray-200"></div>
                                <button
                                    onClick={() => toast.error('Report dialogue would open here')}
                                    className="flex-1 flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-red-500 transition-colors py-2 rounded-lg hover:bg-red-50"
                                >
                                    <Flag size={18} /> Report
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Truck size={20} /></div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900">Fast Delivery</p>
                                    <p className="text-[10px] text-gray-500 font-medium">Ships in 24-48h</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><ShieldCheck size={20} /></div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900">Genuine Product</p>
                                    <p className="text-[10px] text-gray-500 font-medium">Direct from Manufacturer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">

                        {/* Tabs / Sections */}
                        <div className="border-b border-gray-200">
                            <div className="flex gap-8 overflow-x-auto pb-1 no-scrollbar">
                                <button className="border-b-2 border-primary text-primary px-1 py-4 text-sm font-bold flex items-center gap-2 whitespace-nowrap">
                                    Specifications
                                </button>
                                {product.video && (
                                    <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-800 px-1 py-4 text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap">
                                        Video Demo
                                    </button>
                                )}
                                {product.howToSteps && product.howToSteps.length > 0 && (
                                    <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-800 px-1 py-4 text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap">
                                        How to Use
                                    </button>
                                )}
                                <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-800 px-1 py-4 text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap">
                                    Downloads <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px] ml-1">{product.documents.length}</span>
                                </button>
                            </div>
                        </div>

                        {/* Video Section */}
                        {product.video && (
                            <section className="space-y-6">
                                <h3 className="text-2xl font-display font-bold text-gray-900">Product Video</h3>
                                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg bg-black relative group">
                                    <iframe
                                        src={product.video.url || ''}
                                        className="w-full h-full"
                                        title="Product Video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </section>
                        )}

                        {/* How to Use Section */}
                        {product.howToSteps && product.howToSteps.length > 0 && (
                            <section className="space-y-6">
                                <h3 className="text-2xl font-display font-bold text-gray-900">How to Use</h3>
                                <div className="space-y-6 relative">
                                    <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-100 -z-10"></div>
                                    {product.howToSteps.map((step: any, idx: number) => (
                                        <div key={idx} className="flex gap-6">
                                            <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0 ring-4 ring-white z-10">
                                                {idx + 1}
                                            </div>
                                            <div className="pt-2">
                                                <h4 className="font-bold text-lg text-text-main mb-2">{step.title}</h4>
                                                <p className="text-text-secondary leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Specs Table */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-display font-bold text-gray-900">Technical Specifications</h3>
                            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                <table className="w-full text-sm text-left">
                                    <tbody className="divide-y divide-gray-100">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <tr key={key} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-gray-500 w-1/3 bg-gray-50/30">{key}</td>
                                                <td className="px-6 py-4 text-gray-900 font-medium">{value as string}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-display font-bold text-gray-900">Product Overview</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
                        </div>

                        {/* Documentation */}
                        {product.documents.length > 0 && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-display font-bold text-gray-900">Resources & SDKs</h3>
                                <div className="grid gap-4">
                                    {product.documents.map((doc: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-lg ${doc.type === 'sdk' ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'}`}>
                                                    <FileText size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">{doc.name}</p>
                                                    <p className="text-xs text-gray-500 mt-1 font-medium">{doc.size} • {doc.date}</p>
                                                </div>
                                            </div>
                                            <button className="flex items-center gap-2 text-sm font-bold text-gray-500 group-hover:text-primary transition-colors bg-gray-50 group-hover:bg-primary/5 px-4 py-2 rounded-lg">
                                                <Download size={16} /> Download
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-28">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Frequently Bought Together</h3>
                            <div className="space-y-6">
                                {product.relatedProducts.map((related: any) => (
                                    <Link key={related.id} href={`/marketplace/product/${related.id}`} className="flex gap-4 group">
                                        <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100 p-2 flex items-center justify-center">
                                            <img src={related.image} alt={related.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">{related.name}</h4>
                                            <p className="text-xs text-gray-500 font-medium mt-1 uppercase">{related.brand}</p>
                                            <p className="text-sm font-bold text-gray-900 mt-1">₦{related.price.toLocaleString()}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

            </main>

            <footer className="bg-white border-t border-gray-200 py-8 mt-20">
                <div className="max-w-[1600px] mx-auto px-4 md:px-8 text-center">
                    <p className="text-sm font-medium text-gray-500">
                        ElizTap Marketplace © {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
        </div>
    );
}
