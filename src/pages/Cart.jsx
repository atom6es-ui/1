import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const shipping = cartTotal >= 1000 || cartTotal === 0 ? 0 : 80;
  const total = cartTotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={72} className="mx-auto text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-600 mb-3">購物車是空的</h2>
        <p className="text-gray-400 mb-8">快去挑選您喜歡的商品吧！</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-2xl transition-colors"
        >
          <ArrowLeft size={18} />
          繼續購物
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">購物車</h1>
        <span className="text-gray-500 text-sm">{items.length} 種商品</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-center"
            >
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl flex-shrink-0 hover:opacity-80 transition-opacity"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`} className="hover:text-indigo-600 transition-colors">
                  <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                </Link>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                <p className="text-indigo-700 font-bold">
                  NT${item.price.toLocaleString()}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 py-2 font-semibold text-gray-800 min-w-[36px] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Subtotal + Remove */}
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-gray-800 mb-2">
                  NT${(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                  aria-label="移除商品"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <div className="flex items-center justify-between pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              <ArrowLeft size={16} />
              繼續購物
            </Link>
            <button
              onClick={clearCart}
              className="text-sm text-red-400 hover:text-red-600 transition-colors"
            >
              清空購物車
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6">訂單摘要</h2>

            <div className="space-y-3 text-sm mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span className="truncate max-w-[160px]">
                    {item.name} × {item.quantity}
                  </span>
                  <span>NT${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>商品小計</span>
                <span>NT${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>運費</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                  {shipping === 0 ? "免費" : `NT$${shipping}`}
                </span>
              </div>
              {shipping === 0 && cartTotal > 0 && (
                <p className="text-xs text-green-600">🎉 訂單滿 NT$1,000 享免運優惠</p>
              )}
              {shipping > 0 && (
                <p className="text-xs text-gray-400">
                  再購買 NT${(1000 - cartTotal).toLocaleString()} 可享免運
                </p>
              )}
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
              <span className="font-bold text-gray-800 text-lg">合計</span>
              <span className="font-extrabold text-indigo-700 text-2xl">
                NT${total.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-colors text-lg shadow-lg"
            >
              前往結帳
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
