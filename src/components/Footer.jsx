import { Link } from "react-router-dom";
import { Store, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white text-xl font-bold mb-4">
              <Store size={24} className="text-amber-400" />
              <span>購物天地</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              提供最優質的商品與服務，讓您的購物體驗更加便捷愉快。
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-amber-400 transition-colors text-sm font-medium">Facebook</a>
              <a href="#" className="hover:text-amber-400 transition-colors text-sm font-medium">Instagram</a>
              <a href="#" className="hover:text-amber-400 transition-colors text-sm font-medium">Twitter</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">快速連結</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">首頁</Link></li>
              <li><Link to="/shop" className="hover:text-amber-400 transition-colors">商店</Link></li>
              <li><Link to="/cart" className="hover:text-amber-400 transition-colors">購物車</Link></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">關於我們</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">商品分類</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-amber-400 transition-colors">電子產品</Link></li>
              <li><Link to="/shop" className="hover:text-amber-400 transition-colors">服飾</Link></li>
              <li><Link to="/shop" className="hover:text-amber-400 transition-colors">家居生活</Link></li>
              <li><Link to="/shop" className="hover:text-amber-400 transition-colors">美妝保養</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">聯絡我們</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-amber-400 flex-shrink-0" />
                <span>台北市信義區市府路1號</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-amber-400 flex-shrink-0" />
                <span>02-1234-5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-amber-400 flex-shrink-0" />
                <span>service@shoptw.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          <p>© 2024 購物天地. 版權所有. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
