
import React from 'react';
import { Star, MoreVertical, Plus, Filter, Mail, Phone } from 'lucide-react';
import { Supplier } from '../types';

const mockSuppliers: Supplier[] = [
  { id: '1', name: '晨光文具股份有限公司', contact: '张经理', email: 'zhang@chenguang.com', rating: 4.8, category: '办公用品', active: true },
  { id: '2', name: '联想（北京）有限公司', contact: '李主管', email: 'li@lenovo.com', rating: 4.5, category: '电子设备', active: true },
  { id: '3', name: '全友家私有限公司', contact: '王经理', email: 'wang@quanyou.com', rating: 4.2, category: '办公家具', active: true },
  { id: '4', name: '京东企业购', contact: '赵经理', email: 'zhao@jd.com', rating: 4.9, category: '综合电商', active: true },
  { id: '5', name: '顺丰速运', contact: '孙主管', email: 'sun@sf.com', rating: 4.6, category: '物流服务', active: true },
];

const Suppliers: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">供应商管理</h2>
          <p className="text-slate-500">管理并评估您的全供应链合作伙伴。</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
          <Plus className="w-5 h-5" />
          新增供应商
        </button>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex gap-2">
          {['全部', '办公用品', '电子设备', '物流服务', '办公家具'].map(cat => (
            <button key={cat} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              cat === '全部' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-50'
            }`}>
              {cat}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 text-slate-500 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4" />
          更多筛选
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockSuppliers.map(supplier => (
          <div key={supplier.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {supplier.name[0]}
              </div>
              <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="font-bold text-slate-900 text-lg mb-1">{supplier.name}</h3>
            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-md uppercase tracking-wider">
              {supplier.category}
            </span>

            <div className="mt-6 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(supplier.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
              ))}
              <span className="text-sm font-bold text-slate-900 ml-1">{supplier.rating}</span>
            </div>

            <div className="mt-6 space-y-3 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Mail className="w-4 h-4" />
                {supplier.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Phone className="w-4 h-4" />
                {supplier.contact}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                查看详情
              </button>
              <button className="flex-1 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                发起采购
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suppliers;
