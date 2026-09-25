// src/pages/admin/Partners.jsx

import React, { useState, useEffect } from 'react';
import { partnersAPI } from '../../services/api';

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    color: '#6d28d9',
    order: 0,
    isActive: true,
  });

  // ============================================
  // جلب الشركاء
  // ============================================
  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await partnersAPI.getAll();
      setPartners(response.data.data || []);
    } catch (err) {
      setError('فشل تحميل الشركاء');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // ============================================
  // فتح Modal (إضافة)
  // ============================================
  const openAddModal = () => {
    setEditingPartner(null);
    setFormData({
      name: '',
      logo: '',
      color: '#6d28d9',
      order: partners.length,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  // ============================================
  // فتح Modal (تعديل)
  // ============================================
  const openEditModal = (partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      logo: partner.logo,
      color: partner.color,
      order: partner.order,
      isActive: partner.isActive,
    });
    setIsModalOpen(true);
  };

  // ============================================
  // حفظ (إضافة أو تعديل)
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingPartner) {
        await partnersAPI.update(editingPartner._id, formData);
        setSuccess('✅ تم التعديل بنجاح');
      } else {
        await partnersAPI.create(formData);
        setSuccess('✅ تم الإضافة بنجاح');
      }

      setIsModalOpen(false);
      fetchPartners();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ');
    }
  };

  // ============================================
  // حذف
  // ============================================
  const handleDelete = async (id, name) => {
    if (!window.confirm(`هل أنت متأكد من حذف "${name}"؟`)) return;

    try {
      await partnersAPI.delete(id);
      setSuccess('✅ تم الحذف بنجاح');
      fetchPartners();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('فشل الحذف');
    }
  };

  // ============================================
  // تغيير الحقول
  // ============================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            🤝 إدارة الشركاء
          </h1>
          <p className="text-gray-600 mt-1">
            {partners.length} شريك في قاعدة البيانات
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 transition shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <span>➕</span>
          <span>إضافة شريك</span>
        </button>
      </div>

      {/* رسائل */}
      {success && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700">
          {success}
        </div>
      )}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* الجدول */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-gray-600">جاري التحميل...</p>
          </div>
        ) : partners.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">لا يوجد شركاء</h3>
            <p className="text-gray-600 mb-6">ابدأ بإضافة أول شريك</p>
            <button
              onClick={openAddModal}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
            >
              ➕ إضافة شريك
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase">
                    الشعار
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase">
                    الاسم
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase">
                    اللون
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase">
                    الترتيب
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase">
                    الحالة
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {partners.map((partner) => (
                  <tr
                    key={partner._id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="w-16 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-8 max-w-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {partner.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-lg border border-gray-200"
                          style={{ backgroundColor: partner.color }}
                        />
                        <span className="text-xs text-gray-500 font-mono">
                          {partner.color}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {partner.order}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                          partner.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {partner.isActive ? '✅ نشط' : '⏸️ معطل'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(partner)}
                          className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition"
                          title="تعديل"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(partner._id, partner.name)}
                          className="w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition"
                          title="حذف"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {editingPartner ? '✏️ تعديل شريك' : '➕ إضافة شريك جديد'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  اسم الشريك *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Cisco, AWS, Microsoft..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  رابط الشعار *
                </label>
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="/images/partners/Partnerslogo1.png"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    اللون
                  </label>
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full h-12 rounded-xl border border-gray-200 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    الترتيب
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-bold text-gray-700">
                    نشط (يظهر على الموقع)
                  </span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 transition shadow-lg"
                >
                  {editingPartner ? '💾 حفظ التعديلات' : '➕ إضافة'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition"
                >
                  إلغاء
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Partners;