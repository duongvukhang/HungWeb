// src/pages/Contact.jsx
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const contactItems = [
  {
    icon: '📞',
    label: 'Hotline / Zalo',
    value: '0906 351 669',
    href: 'tel:0906351669',
    isPhone: true,
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'info@nhietnangviet.com',
    href: 'mailto:info@nhietnangviet.com',
  },
  {
    icon: '🏢',
    label: 'Văn phòng',
    value: '222 Đường Linh Trung, Khu phố 1, P. Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh',
  },
  {
    icon: '🏭',
    label: 'Nhà máy',
    value: 'ĐH 509, xã Phước Thạnh, TP. Hồ Chí Minh',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState('');

  const MAX_MESSAGE_LENGTH = 3000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!formData.full_name.trim()) {
      setError('Vui lòng nhập họ và tên.');
      setLoading(false);
      return;
    }
    if (!formData.phone) {
      setError('Vui lòng nhập số điện thoại.');
      setLoading(false);
      return;
    }
    const phoneNumber = parsePhoneNumberFromString(formData.phone);
    if (!phoneNumber?.isValid()) {
      setError('Số điện thoại không hợp lệ. Vui lòng nhập số hợp lệ (Việt Nam hoặc quốc tế).');
      setLoading(false);
      return;
    }
    if (!formData.subject.trim()) {
      setError('Vui lòng nhập tiêu đề / nội dung cần tư vấn.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, phone: phoneNumber.format('E.164') }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          setError(errorData.error || 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng đợi một lúc.');
        } else {
          throw new Error(errorData.error || 'Gửi thất bại. Vui lòng thử lại.');
        }
        return;
      }

      setSuccess(true);
      setFormData({ full_name: '', phone: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-stone-300 bg-white text-zinc-800 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-200 transition-colors placeholder-zinc-400";

  return (
    <>
     <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />
    <div className="min-h-screen bg-stone-50">

      {/* ── Hero ── */}
      <div className="relative bg-slate-800 text-white py-20 md:py-28 overflow-hidden">
        {/* Red → amber gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700" />
        {/* Radial glows */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-red-700/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        {/* Left vertical stripe */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-700 via-amber-500 to-transparent opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-5 h-0.5 bg-amber-400 block" />
            <p className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase">Liên Hệ</p>
            <span className="w-5 h-0.5 bg-amber-400 block" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            LIÊN HỆ <span className="text-red-400">VỚI CHÚNG TÔI</span>
          </h1>
          <div className="flex items-center gap-2 max-w-xs mx-auto mt-5 mb-5">
            <hr className="flex-grow border-t border-white/20" />
            <span className="w-2 h-2 bg-amber-500 rotate-45 block flex-shrink-0" />
            <hr className="flex-grow border-t border-white/20" />
          </div>
          <p className="text-white/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn về mọi thông tin liên quan đến nhiên liệu sinh khối,
            viên nén, than sinh học và giải pháp năng lượng xanh.
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative py-16 md:py-20 overflow-hidden">
        {/* Subtle bg accents */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-red-700/4 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-400/4 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* ── LEFT: Contact info ── */}
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-4 h-0.5 bg-red-700 block" />
                  <p className="text-[10px] font-bold tracking-[0.18em] text-red-700 uppercase">Thông Tin</p>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900">
                  Thông tin <span className="text-red-700">liên hệ</span>
                </h2>
                <p className="mt-3 text-zinc-500 text-base leading-relaxed">
                  Liên hệ ngay hôm nay để được tư vấn miễn phí và báo giá tốt nhất.
                </p>
              </div>

              {/* Contact cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-stone-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5"
                  >
                    {/* Red top strip */}
                    <div className="h-0.5 bg-red-700 -mx-5 -mt-5 mb-4" />
                    <div className={`flex ${item.isPhone ? 'items-center' : 'items-start'} gap-3`}>
                      <div className="w-10 h-10 bg-red-700 flex items-center justify-center text-lg shrink-0 text-white">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-0.5">{item.label}</h4>
                        {item.href ? (
                          <a href={item.href} className="text-red-700 hover:text-red-800 font-semibold text-sm block break-all transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-zinc-600 text-sm leading-relaxed">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call CTA */}
              <div className="bg-red-700 hover:bg-red-800 transition-colors duration-200 group inline-block">
                <a
                  href="tel:0906351669"
                  className="flex items-center gap-3 px-8 py-4 text-white font-bold text-base"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-red-200 block">Gọi ngay</span>
                    <span className="text-lg font-extrabold group-hover:tracking-wider transition-all duration-200">0906 351 669</span>
                  </span>
                </a>
              </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="relative bg-white border border-stone-200 shadow-xl overflow-hidden">
              {/* Red top strip */}
              <div className="h-1 bg-red-700 w-full" />
              {/* Amber corner */}
              <div className="absolute top-1 right-0 w-10 h-1 bg-amber-500" />

              <div className="p-6 md:p-8 lg:p-10">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-4 h-0.5 bg-red-700 block" />
                    <p className="text-[10px] font-bold tracking-[0.18em] text-red-700 uppercase">Tư Vấn</p>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900">
                    Gửi yêu cầu tư vấn
                  </h3>
                </div>

                {/* Success */}
                {success && (
                  <div className="mb-6 p-4 bg-stone-50 border-l-4 border-amber-500 flex items-center gap-3 text-zinc-700 text-sm">
                    <span className="text-amber-500 font-bold text-lg">✓</span>
                    Cảm ơn! Chúng tôi đã nhận được yêu cầu và sẽ liên hệ sớm nhất.
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 flex items-center gap-3 text-red-700 text-sm">
                    <span className="font-bold text-lg">✕</span>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1.5">
                        Họ và tên <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData(p => ({ ...p, full_name: e.target.value }))}
                        required
                        className={inputClass}
                        placeholder="Nguyễn Văn A"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1.5">
                        Số điện thoại <span className="text-red-600">*</span>
                      </label>
                      <PhoneInput
                        placeholder="+84906351669"
                        value={formData.phone}
                        onChange={(value) => setFormData(p => ({ ...p, phone: value || '' }))}
                        defaultCountry="VN"
                        international
                        countryCallingCodeEditable={false}
                        className="phone-input-custom w-full border border-stone-300 bg-white px-4 py-3 text-sm focus-within:border-red-600 transition-colors"
                      />
                      {formData.phone && (
                        <p className={`mt-1 text-xs font-medium ${parsePhoneNumberFromString(formData.phone)?.isValid() ? 'text-amber-600' : 'text-zinc-400'}`}>
                          {parsePhoneNumberFromString(formData.phone)?.isValid() ? '✓ Hợp lệ' : 'Vui lòng nhập số hợp lệ'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1.5">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      className={inputClass}
                      placeholder="example@email.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1.5">
                      Tiêu đề / Nội dung cần tư vấn <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
                      required
                      className={inputClass}
                      placeholder="Tôi muốn hỏi về giá viên nén gỗ..."
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1.5">
                      Nội dung chi tiết
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                      maxLength={MAX_MESSAGE_LENGTH}
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="Mô tả nhu cầu của bạn..."
                    />
                    <div className="mt-1.5 flex justify-between text-xs text-zinc-400">
                      <span className={formData.message.length > 1000 ? 'text-amber-600 font-medium' : ''}>
                        {formData.message.length} / {MAX_MESSAGE_LENGTH} ký tự
                      </span>
                      <span>≈ {Math.round(formData.message.trim().split(/\s+/).filter(Boolean).length)} từ</span>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 px-6 font-bold text-sm tracking-widest uppercase transition-all duration-200 ${
                      loading
                        ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                        : 'bg-red-700 hover:bg-red-800 text-white hover:-translate-y-0.5 hover:shadow-lg'
                    }`}
                  >
                    {loading ? 'Đang gửi...' : 'Gửi yêu cầu →'}
                  </button>
                </form>

                <p className="text-center text-xs text-zinc-400 mt-5">
                  Chúng tôi cam kết bảo mật thông tin của bạn.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
}