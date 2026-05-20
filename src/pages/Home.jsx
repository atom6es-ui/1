import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Truck, HeadphonesIcon } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const categoryIcons = {
  電子產品: "💻",
  服飾: "👗",
  家居生活: "🏠",
  美妝保養: "✨",
};

const categoryColors = {
  電子產品: "from-blue-500 to-indigo-600",
  服飾: "from-pink-500 to-rose-600",
  家居生活: "from-green-500 to-emerald-600",
  美妝保養: "from-purple-500 to-violet-600",
};

const categories = ["電子產品", "服飾", "家居生活", "美妝保養"];

const features = [
  { icon: Truck, title: "免費配送", desc: "訂單滿 NT$1,000 免運費" },
  { icon: Shield, title: "安全保障", desc: "購物資料加密保護" },
  { icon: Zap, title: "快速出貨", desc: "24小時內快速處理" },
  { icon: HeadphonesIcon, title: "客戶服務", desc: "週一至週六 09:00-18:00" },
];

export default function Home() {
  const featured = products.slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-500 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-amber-400 text-indigo-900 text-sm font-bold px-4 py-1 rounded-full mb-6">
            🎉 全館限時優惠中
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            探索精選好物
            <br />
            <span className="text-amber-300">盡在購物天地</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
            涵蓋電子產品、時尚服飾、家居生活、美妝保養，
            為您精心挑選最優質的商品，讓購物成為享受。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-indigo-900 font-bold px-8 py-4 rounded-2xl text-lg transition-colors shadow-lg"
            >
              立即購物 <ArrowRight size={20} />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border-2 border-white hover:bg-white hover:text-indigo-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors"
            >
              瀏覽商品
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon size={22} className="text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">商品分類</h2>
          <p className="text-gray-500">探索我們豐富多樣的商品類別</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/shop?category=${cat}`}
              className={`bg-gradient-to-br ${categoryColors[cat]} text-white rounded-2xl p-8 text-center hover:scale-105 transition-transform shadow-lg`}
            >
              <div className="text-5xl mb-3">{categoryIcons[cat]}</div>
              <p className="font-bold text-lg">{cat}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">精選商品</h2>
              <p className="text-gray-500">為您嚴選最受歡迎的熱銷商品</p>
            </div>
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
            >
              查看全部 <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-indigo-600 font-semibold"
            >
              查看全部商品 <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-indigo-700 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">訂閱電子報</h2>
          <p className="text-indigo-200 mb-8">
            訂閱即可獲得最新優惠活動、新品上架通知，首次訂閱享 9 折優惠券！
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="請輸入您的電子郵件"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-indigo-900 font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
            >
              立即訂閱
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
