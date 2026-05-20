import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "全部"
  );

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        selectedCategory === "全部" || p.category === selectedCategory;
      const matchSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">所有商品</h1>
        <p className="text-gray-500">探索我們精心挑選的優質商品</p>
      </div>

      {/* Search + Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋商品名稱..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
            <SlidersHorizontal size={18} className="text-gray-500" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-gray-500 text-sm">
        共找到 <span className="font-semibold text-indigo-600">{filtered.length}</span> 件商品
        {selectedCategory !== "全部" && (
          <span>
            {" "}· 分類：<span className="font-semibold">{selectedCategory}</span>
          </span>
        )}
        {searchQuery && (
          <span>
            {" "}· 搜尋：<span className="font-semibold">「{searchQuery}」</span>
          </span>
        )}
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <Search size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">找不到符合的商品</p>
          <p className="text-sm mt-2">請嘗試調整搜尋條件或選擇其他分類</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("全部"); }}
            className="mt-6 text-indigo-600 hover:underline font-medium"
          >
            清除所有篩選
          </button>
        </div>
      )}
    </div>
  );
}
