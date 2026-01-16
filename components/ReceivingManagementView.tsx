
import React, { useState, useMemo } from 'react';
import { ChevronRight, PackageCheck, AlertCircle } from 'lucide-react';
import ConfirmReceivingModal from './ConfirmReceivingModal';

interface ReceivingOrder {
  id: string;
  inspectionId: string;
  supplier: string;
  createTime: string;
  receiver: string;
  status: '待收货' | '已收货';
}

const ReceivingManagementView: React.FC = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Mock data for receiving orders
  const receivingOrders: ReceivingOrder[] = useMemo(() => [
    { id: 'REC202601140001', inspectionId: 'INS464288540000258', supplier: '测试供应商', createTime: '2026-01-14 10:30:00', receiver: '管理员', status: '待收货' },
    { id: 'REC202601130005', inspectionId: 'INS462835016531970', supplier: '测试供应商', createTime: '2026-01-13 14:20:15', receiver: '采购员A', status: '已收货' },
  ], []);

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">采购收货管理</h2>
          <p className="text-slate-500">管理已发起的收货单，并对已验货通过的产品进行入库确认。</p>
        </div>
        <button 
          className="bg-[#82AD00] hover:bg-[#729800] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#82AD00]/20"
          onClick={() => setIsConfirmModalOpen(true)}
        >
          <PackageCheck className="w-5 h-5" />
          确认收货入库
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded border border-slate-200 flex items-center gap-4 text-sm shadow-sm">
        <div className="flex items-center gap-2">
          <label className="font-medium text-slate-600">收货单号：</label>
          <input 
            type="text" 
            placeholder="请输入收货单号"
            className="border border-slate-200 px-3 py-1.5 rounded w-48 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium text-slate-600">供应商：</label>
          <input 
            type="text" 
            placeholder="搜索供应商"
            className="border border-slate-200 px-3 py-1.5 rounded w-48 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <button className="bg-[#A5CC32] hover:bg-[#92b52b] text-white px-6 py-1.5 rounded font-medium transition-colors ml-auto">
          查询
        </button>
        <button className="bg-white border border-slate-200 text-slate-600 px-6 py-1.5 rounded font-medium hover:bg-slate-50 transition-colors">
          重置
        </button>
      </div>

      {/* Table Section - List of Receiving Orders */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-[13px] border-collapse">
          <thead className="bg-[#fcfcfc] border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 w-12 text-center">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 focus:ring-indigo-500" />
              </th>
              <th className="px-4 py-4 font-semibold text-slate-700">收货单号</th>
              <th className="px-4 py-4 font-semibold text-slate-700">关联验货单</th>
              <th className="px-4 py-4 font-semibold text-slate-700">供应商</th>
              <th className="px-4 py-4 font-semibold text-slate-700">收货日期</th>
              <th className="px-4 py-4 font-semibold text-slate-700">收货人</th>
              <th className="px-4 py-4 font-semibold text-slate-700 text-center">状态</th>
              <th className="px-4 py-4 font-semibold text-slate-700 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {receivingOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer" />
                </td>
                <td className="px-4 py-5 font-bold text-[#1890ff] cursor-pointer hover:underline">{order.id}</td>
                <td className="px-4 py-5 text-slate-600 font-mono">{order.inspectionId}</td>
                <td className="px-4 py-5 text-slate-800 font-medium">{order.supplier}</td>
                <td className="px-4 py-5 text-slate-500">{order.createTime}</td>
                <td className="px-4 py-5 text-slate-600">{order.receiver}</td>
                <td className="px-4 py-5 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                    order.status === '待收货' 
                      ? 'bg-amber-50 text-amber-600 border-amber-200' 
                      : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-5 text-right">
                  <button className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 ml-auto">
                    明细查看 <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {receivingOrders.length === 0 && (
          <div className="py-20 flex flex-col items-center gap-4 text-slate-400">
            <AlertCircle className="w-12 h-12 opacity-20" />
            <p className="text-lg">暂无收货记录</p>
          </div>
        )}
      </div>

      <ConfirmReceivingModal 
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
};

export default ReceivingManagementView;
