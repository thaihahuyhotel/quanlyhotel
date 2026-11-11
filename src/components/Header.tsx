import { useState, useEffect } from 'react';
import { HotelSettings, Room } from '../types/hotel';
import { 
  Building2, 
  Calendar, 
  Clock, 
  Plus, 
  Sliders, 
  Layers, 
  Sparkles, 
  Tag, 
  BarChart3, 
  FileText,
  BedDouble,
  Download,
  HelpCircle,
  UploadCloud,
  CheckCircle2,
  X
} from 'lucide-react';

interface HeaderProps {
  currentView: 'rooms' | 'ota' | 'bookings' | 'analytics';
  onChangeView: (view: 'rooms' | 'ota' | 'bookings' | 'analytics') => void;
  settings: HotelSettings;
  rooms: Room[];
  onOpenQuickBooking: () => void;
  onOpenSettings: () => void;
}

export default function Header({
  currentView,
  onChangeView,
  settings,
  rooms,
  onOpenQuickBooking,
  onOpenSettings,
}: HeaderProps) {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [showHostingGuide, setShowHostingGuide] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
      setDate(
        now.toLocaleDateString('vi-VN', {
          weekday: 'short',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const total = rooms.length;
  const available = rooms.filter((r) => r.status === 'available').length;
  const occupied = rooms.filter((r) => r.status === 'occupied').length;
  const cleaning = rooms.filter((r) => r.status === 'cleaning').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Hotel Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-slate-900 text-lg tracking-tight leading-tight">
                  {settings.hotelName}
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                  25 Phòng
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate max-w-[200px] sm:max-w-xs">
                Quản lý phòng & Kênh OTA (+150k phí quản lý)
              </p>
            </div>
          </div>

          {/* Quick Room Occupancy Status Pills (Hidden on small mobile) */}
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {available} Trống
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 font-semibold">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              {occupied} Đang ở
            </span>
            {cleaning > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 font-semibold">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                {cleaning} Cần dọn
              </span>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex flex-col text-right text-[11px] text-slate-500 border-r border-slate-200 pr-3">
              <span className="font-bold text-slate-800">{time}</span>
              <span className="capitalize">{date}</span>
            </div>

            <a
              href="/hotel25-dist.zip"
              download="hotel25-dist.zip"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm shadow-emerald-600/20 transition-all hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
              title="Tải gói file ZIP (hotel25-dist.zip) về máy tính để đưa lên hosting cPanel / Netlify"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Tải Gói Hosting (ZIP)</span>
              <span className="md:hidden">Tải ZIP</span>
            </a>

            <button
              type="button"
              onClick={() => setShowHostingGuide(true)}
              className="p-2 text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200"
              title="Xem hướng dẫn tải và đưa file lên hosting"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenQuickBooking}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm shadow-indigo-600/20 transition-all hover:shadow-md hover:scale-[1.02] active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Nhận Phòng / Đặt Chỗ</span>
              <span className="sm:hidden">Đặt Phòng</span>
            </button>

            <button
              onClick={onOpenSettings}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
              title="Cài đặt hệ thống & 25 phòng"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 -mx-2 px-2 scrollbar-none border-t border-slate-100">
          <button
            onClick={() => onChangeView('rooms')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              currentView === 'rooms'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Sơ Đồ 25 Phòng (Tầng 1 - 5)
          </button>

          <button
            onClick={() => onChangeView('ota')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              currentView === 'ota'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Bảng Giá OTA & Kênh Bán (+150k)
          </button>

          <button
            onClick={() => onChangeView('bookings')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              currentView === 'bookings'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Quản Lý Đặt Phòng
          </button>

          <button
            onClick={() => onChangeView('analytics')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              currentView === 'analytics'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Báo Cáo Doanh Thu
          </button>
        </div>
      </div>

      {/* Hosting Download & Deployment Guide Modal */}
      {showHostingGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                  <UploadCloud className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black">
                    Tải File Đóng Gói & Đưa Lên Hosting
                  </h3>
                  <p className="text-xs text-emerald-200">
                    File nén: <strong className="text-white font-mono">hotel25-dist.zip</strong> (sẵn sàng chạy trên mọi hosting)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowHostingGuide(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs text-slate-600">
              {/* Direct download banner */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="font-extrabold text-emerald-950 text-sm block">
                    File nén đã được tạo sẵn trong hệ thống:
                  </span>
                  <span className="text-emerald-800 text-xs">
                    Tên file: <strong>hotel25-dist.zip</strong> (~180 KB)
                  </span>
                </div>
                <a
                  href="/hotel25-dist.zip"
                  download="hotel25-dist.zip"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-xs cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  BẤM VÀO ĐÂY ĐỂ TẢI VỀ MÁY
                </a>
              </div>

              {/* Step by step guide */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Hướng dẫn 3 bước đưa lên hosting website (cPanel / DirectAdmin / AZDIGI...):
                </h4>

                <div className="space-y-3">
                  <div className="flex gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      1
                    </span>
                    <div>
                      <strong className="text-slate-900 block text-xs">Tải file về máy tính:</strong>
                      Bấm nút xanh ở trên để tải file <code>hotel25-dist.zip</code> về thư mục <em>Downloads</em> trên máy tính của bạn.
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      2
                    </span>
                    <div>
                      <strong className="text-slate-900 block text-xs">Đăng nhập Hosting & Upload:</strong>
                      Đăng nhập cPanel / DirectAdmin của bạn → Vào <strong>File Manager (Quản lý tập tin)</strong> → mở thư mục <strong><code>public_html</code></strong> → Bấm <strong>Upload</strong> và chọn file <code>hotel25-dist.zip</code>.
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      3
                    </span>
                    <div>
                      <strong className="text-slate-900 block text-xs">Giải nén (Extract):</strong>
                      Chuột phải vào <code>hotel25-dist.zip</code> trên hosting chọn <strong>Extract</strong>. File <code>.htaccess</code> đã có sẵn giúp tự động điều hướng. Mở tên miền của bạn là website chạy ngay lập tức!
                    </div>
                  </div>
                </div>

                {/* Free Hosting Alternatives */}
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl space-y-1 text-[11px] text-blue-900">
                  <span className="font-bold block">💡 Cách nhanh hơn: Up lên Netlify hoàn toàn miễn phí:</span>
                  <p>
                    Vào trang <strong>netlify.com</strong> → Kéo thả trực tiếp file <code>hotel25-dist.zip</code> (hoặc thư mục <code>dist</code>) vào ô deploy. Chỉ mất 30 giây là trang web hoạt động online vĩnh viễn!
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                File lưu trữ cục bộ: <code>/hotel25-dist.zip</code>
              </span>
              <button
                type="button"
                onClick={() => setShowHostingGuide(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold"
              >
                Đã Hiểu & Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
