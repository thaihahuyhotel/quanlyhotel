import { Booking, Room, HotelSettings } from '../types/hotel';
import { ROOM_TYPES, CHANNELS } from '../data/initialData';
import { formatVND } from '../utils/pricing';
import { 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Bed, 
  Sparkles, 
  Layers, 
  CreditCard,
  PieChart,
  BarChart3,
  Calendar
} from 'lucide-react';

interface AnalyticsViewProps {
  bookings: Booking[];
  rooms: Room[];
  settings: HotelSettings;
}

export default function AnalyticsView({ bookings, rooms, settings }: AnalyticsViewProps) {
  // Aggregate stats
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter((r) => r.status === 'occupied').length;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  // Revenue calculation for active and completed bookings
  const relevantBookings = bookings.filter((b) => b.status === 'active' || b.status === 'completed');

  const totalGrossRevenue = relevantBookings.reduce((sum, b) => {
    const srv = b.services.reduce((s, i) => s + i.total, 0);
    return sum + b.totalRoomPrice + srv - (b.discount || 0);
  }, 0);

  const totalManagementFees = relevantBookings.reduce((sum, b) => sum + (b.managementFee || 0), 0);
  const totalOtaCommissions = relevantBookings.reduce((sum, b) => sum + (b.otaCommissionAmount || 0), 0);
  const totalNetRevenue = totalGrossRevenue - totalOtaCommissions;

  // By Channel statistics
  const channelStats = (['direct', 'agoda', 'booking', 'trip', 'airbnb'] as const).map((ch) => {
    const chBookings = relevantBookings.filter((b) => b.channel === ch);
    const revenue = chBookings.reduce((sum, b) => sum + b.totalRoomPrice, 0);
    const mgmtFee = chBookings.reduce((sum, b) => sum + (b.managementFee || 0), 0);
    const comm = chBookings.reduce((sum, b) => sum + (b.otaCommissionAmount || 0), 0);
    const count = chBookings.length;
    const nights = chBookings.reduce((sum, b) => sum + b.nights, 0);

    return {
      channel: ch,
      info: CHANNELS[ch],
      bookingsCount: count,
      nightsCount: nights,
      revenue,
      mgmtFee,
      comm,
      net: revenue - comm,
    };
  });

  // By Room Type statistics
  const roomTypeStats = Object.keys(ROOM_TYPES).map((typeKey) => {
    const t = ROOM_TYPES[typeKey];
    const tBookings = relevantBookings.filter((b) => b.roomType === typeKey);
    const revenue = tBookings.reduce((sum, b) => sum + b.totalRoomPrice, 0);
    const nights = tBookings.reduce((sum, b) => sum + b.nights, 0);

    return {
      typeKey,
      info: t,
      bookingsCount: tBookings.length,
      nightsCount: nights,
      revenue,
    };
  });

  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Net Revenue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Doanh Thu Thực Nhận</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-700">
            {formatVND(totalNetRevenue)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Tổng phát sinh: {formatVND(totalGrossRevenue)}
          </div>
        </div>

        {/* Management Fee Bonus */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-amber-900 font-semibold mb-1">
            <span>Phí Quản Lý Thu Được (+150k)</span>
            <span className="p-1.5 rounded-lg bg-amber-200/60 text-amber-800">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-amber-800">
            {formatVND(totalManagementFees)}
          </div>
          <div className="text-[11px] text-amber-700 mt-1">
            Dôi dư sau khi trừ chiết khấu sàn OTA
          </div>
        </div>

        {/* OTA Commissions Paid */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Hoa Hồng Sàn OTA Đã Trừ</span>
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <Percent className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-rose-600">
            {formatVND(totalOtaCommissions)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Agoda, Booking, Trip, Airbnb giữ lại
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Công Suất Phòng Hôm Nay</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Bed className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-indigo-600">
            {occupancyRate}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {occupiedRooms} / {totalRooms} phòng đang ở
          </div>
        </div>
      </div>

      {/* Channel Breakdown Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Báo Cáo Hiệu Quả Theo Kênh Bán (Channel Performance)
            </h3>
            <p className="text-xs text-slate-500">
              Đánh giá tỷ lệ doanh thu, chiết khấu và lợi nhuận quản lý thực tế trên từng kênh
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Kênh Bán</th>
                <th className="py-3 px-3 text-center">Đơn / Đêm</th>
                <th className="py-3 px-3 text-right">Tổng Tiền Niêm Yết</th>
                <th className="py-3 px-3 text-right">Hoa Hồng Sàn Trừ</th>
                <th className="py-3 px-3 text-right">Phí Quản Lý Thu (+150k)</th>
                <th className="py-3 px-4 text-right">Thực Thu Về Khách Sạn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {channelStats.map((st) => (
                <tr key={st.channel} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded font-bold ${st.info.bgColor}`}>
                      {st.info.name}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {st.channel === 'direct' ? '0% hoa hồng' : `Hoa hồng ~${Math.round(st.info.defaultCommissionRate * 100)}%`}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="font-bold text-slate-800">{st.bookingsCount} đơn</span>
                    <span className="text-[11px] text-slate-400 block">({st.nightsCount} đêm)</span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-medium text-slate-700">
                    {formatVND(st.revenue)}
                  </td>
                  <td className="py-3.5 px-3 text-right text-rose-600 font-medium">
                    {st.comm > 0 ? `-${formatVND(st.comm)}` : '0 ₫'}
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-amber-600">
                    {st.mgmtFee > 0 ? `+${formatVND(st.mgmtFee)}` : '—'}
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-emerald-700 text-sm">
                    {formatVND(st.net)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Room Type Breakdown Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-base">
            Doanh Thu Theo 4 Hạng Phòng Khách Sạn
          </h3>
          <p className="text-xs text-slate-500">
            Standard (20 phòng: 19 1G + 1 2G), Đơn VIP (501), Deluxe (505), Family (201 & 401)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
          {roomTypeStats.map((r) => (
            <div key={r.typeKey} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-xs font-bold text-indigo-700 block uppercase">
                {r.info.badgeName}
              </span>
              <div className="font-extrabold text-slate-900 text-base">{r.info.name}</div>
              <div className="text-xs text-slate-500">
                🛏️ {r.info.bedDescription}
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-500">Giá gốc:</span>
                <span className="font-bold text-emerald-700">{formatVND(r.info.directPrice)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Đã bán:</span>
                <span className="font-bold text-slate-800">{r.nightsCount} đêm ({r.bookingsCount} lượt)</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200 font-bold">
                <span className="text-slate-700">Tổng doanh thu:</span>
                <span className="text-indigo-950 font-black">{formatVND(r.revenue)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
