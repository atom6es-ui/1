import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Star, ChevronRight, Minus, Plus, Package } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../hooks/useCart";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));
  const related = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-2xl text-gray-500 mb-4">找不到此商品</p>
        <Link to="/shop" className="text-indigo-600 hover:underline font-medium">
          返回商店
        </Link>
      </div>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-indigo-600 transition-colors">首頁</Link>
        <ChevronRight size={14} />
        <Link to="/shop" className="hover:text-indigo-600 transition-colors">商店</Link>
        <ChevronRight size={14} />
        <span className="text-gray-800 font-medium">{product.name}</span>
      </nav>

      {/* Product Main */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 lg:h-[500px] object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {/* Category + Stock */}
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full font-medium">
              {product.category}
            </span>
            <span className={`text-sm flex items-center gap-1 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
              <Package size={14} />
              {product.stock > 0 ? `庫存 ${product.stock} 件` : "缺貨中"}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={
                    star <= Math.round(product.rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-300 fill-gray-300"
                  }
                />
              ))}
            </div>
            <span className="font-semibold text-gray-700">{product.rating}</span>
            <span className="text-gray-500 text-sm">({product.reviews} 則評價)</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mb-6 bg-indigo-50 rounded-2xl p-4">
            <span className="text-4xl font-extrabold text-indigo-700">
              NT${product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through mb-1">
                  NT${product.originalPrice.toLocaleString()}
                </span>
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-lg font-bold mb-1">
                  省 {discount}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-700 font-medium">數量：</span>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="px-5 py-2 font-semibold text-gray-800 bg-white min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all ${
                added
                  ? "bg-green-500 text-white"
                  : product.stock === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-200"
              }`}
            >
              <ShoppingCart size={20} />
              {added ? "已加入購物車 ✓" : "加入購物車"}
            </button>
            <button
              onClick={() => {
                addToCart(product, quantity);
                navigate("/checkout");
              }}
              disabled={product.stock === 0}
              className="flex-1 py-4 rounded-2xl font-bold text-lg bg-amber-400 hover:bg-amber-500 text-indigo-900 transition-colors shadow-lg disabled:opacity-50"
            >
              立即購買
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">相關商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
