
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Suppliers from './components/Suppliers';
import AIInsights from './components/AIInsights';
import CreatePurchaseOrderModal from './components/CreatePurchaseOrderModal';
import { ViewType } from './types';

// Simple Inventory Placeholder
const InventoryView = () => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <span className="text-4xl">📦</span>
    </div>
    <h2 className="text-2xl font-bold text-slate-900 mb-2">库存管理系统</h2>
    <p className="text-slate-500 mb-8 max-w-md mx-auto">
      库存模块正在进行数据同步，您可以稍后查看最新的物料库存详情和库存预警列表。
    </p>
    <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
      刷新同步
    </button>
  </div>
);

// Requisitions Placeholder
const RequisitionsView = ({ onOpenCreate }: { onOpenCreate: () => void }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-900">采购申请单</h2>
      <button 
        onClick={onOpenCreate}
        className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
      >
        新建申请
      </button>
    </div>
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-sm font-bold text-slate-700">单据号</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-700">申请标题</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-700">申请人</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-700">总金额</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-700">状态</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-700">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[
            { id: 'PR-20231001', title: 'Q4 办公用品采购', user: '张三', total: '¥5,200', status: '待审批', statusCol: 'text-amber-500' },
            { id: 'PR-20231002', title: '服务器扩容需求', user: '李四', total: '¥120,000', status: '已批准', statusCol: 'text-emerald-500' },
            { id: 'PR-20231003', title: '行政部门午餐福利', user: '王五', total: '¥800', status: '处理中', statusCol: 'text-indigo-500' },
            { id: 'PR-20231004', title: '人体工学椅换新', user: '赵六', total: '¥4,500', status: '已撤回', statusCol: 'text-slate-400' },
          ].map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4 text-sm font-semibold text-slate-900">{item.id}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{item.title}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{item.user}</td>
              <td className="px-6 py-4 text-sm font-bold text-slate-900">{item.total}</td>
              <td className={`px-6 py-4 text-sm font-bold ${item.statusCol}`}>{item.status}</td>
              <td className="px-6 py-4 text-sm">
                <button className="text-indigo-600 hover:text-indigo-800 font-semibold mr-4">查看</button>
                <button className="text-slate-400 hover:text-slate-600 font-semibold">编辑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('DASHBOARD');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case 'DASHBOARD':
        return <Dashboard />;
      case 'REQUISITIONS':
        return <RequisitionsView onOpenCreate={() => setIsModalOpen(true)} />;
      case 'SUPPLIERS':
        return <Suppliers />;
      case 'INVENTORY':
        return <InventoryView />;
      case 'AI_INSIGHTS':
        return <AIInsights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {renderContent()}
      <CreatePurchaseOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Layout>
  );
};

export default App;
