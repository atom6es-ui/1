import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, CreditCard, Building2, Truck } from "lucide-react";
import { useCart } from "../hooks/useCart";

const paymentMethods = [
  { id: "credit_card", label: "信用卡", icon: CreditCard },
  { id: "atm", label: "ATM 轉帳", icon: Building2 },
  { id: "cod", label: "貨到付款", icon: Truck },
];

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    payment: "credit_card",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber] = useState(
    () => "ORD" + Math.random().toString(36).substr(2, 8).toUpperCase()
  );

  const shipping = cartTotal >= 1000 || cartTotal === 0 ? 0 : 80;
  const total = cartTotal + shipping;

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "請輸入收件人姓名";
    if (!form.phone.trim()) newErrors.phone = "請輸入聯絡電話";
    else if (!/^[0-9\-+]{8,15}$/.test(form.phone)) newErrors.phone = "請輸入有效電話號碼";
    if (!form.email.trim()) newErrors.email = "請輸入電子郵件";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "請輸入有效電子郵件";
    if (!form.address.trim()) newErrors.address = "請輸入收件地址";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-3">訂單確認成功！</h2>
        <p className="text-gray-500 mb-2">感謝您的購買，我們將盡快為您處理訂單。</p>
        <p className="text-indigo-600 font-semibold mb-2">
          訂單編號：{orderNumber}
        </p>
        <p className="text-gray-500 text-sm mb-8">
          確認信已寄送至 <span className="font-medium">{form.email}</span>
        </p>
        <Link
          to="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-2xl transition-colors"
        >
          返回首頁
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">結帳</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {/* Delivery Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">收件資訊</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  收件人姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="請輸入真實姓名"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    errors.name ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  聯絡電話 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="09XX-XXX-XXX"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  電子郵件 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    errors.email ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  收件地址 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="縣市 + 區 + 路名 + 門牌號"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    errors.address ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">付款方式</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {paymentMethods.map(({ id, label, icon: Icon }) => (
                <label
                  key={id}
                  className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                    form.payment === id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={id}
                    checked={form.payment === id}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <Icon
                    size={22}
                    className={form.payment === id ? "text-indigo-600" : "text-gray-400"}
                  />
                  <span
                    className={`font-medium ${
                      form.payment === id ? "text-indigo-700" : "text-gray-600"
                    }`}
                  >
                    {label}
                  </span>
                  {form.payment === id && (
                    <div className="ml-auto w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={items.length === 0}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-2xl text-lg transition-colors shadow-lg"
          >
            確認下單 · NT${total.toLocaleString()}
          </button>
          {items.length === 0 && (
            <p className="text-center text-gray-400 text-sm">購物車是空的，請先加入商品</p>
          )}
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6">訂單內容</h2>

            {items.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">購物車是空的</p>
            ) : (
              <>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">× {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">
                        NT${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>商品小計</span>
                    <span>NT${cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>運費</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "免費" : `NT$${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-800 text-base pt-2 border-t border-gray-100">
                    <span>合計</span>
                    <span className="text-indigo-700 text-xl">NT${total.toLocaleString()}</span>
                  </div>
                </div>
              </>
            )}

            <Link
              to="/cart"
              className="block text-center text-sm text-indigo-500 hover:text-indigo-700 mt-4 transition-colors"
            >
              ← 返回購物車修改
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
