
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Suppliers from './components/Suppliers';
import AIInsights from './components/AIInsights';
import CreatePurchaseOrderModal from './components/CreatePurchaseOrderModal';
import { ViewType } from './types';
import { ChevronLeft, ChevronRight, Trash2, CheckCircle, Clock } from 'lucide-react';

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

// Requisitions View with Batch Operations and Pagination
const RequisitionsView = ({ onOpenCreate }: { onOpenCreate: () => void }) => {
  // Generate more mock data for pagination
  const allRequisitions = useMemo(() => {
    const statuses = [
      { label: '待审批', color: 'text-amber-500', bg: 'bg-amber-50' },
      { label: '已批准', color: 'text-emerald-500', bg: 'bg-emerald-50' },
      { label: '处理中', color: 'text-indigo-500', bg: 'bg-indigo-50' },
      { label: '已撤回', color: 'text-slate-400', bg: 'bg-slate-50' }
    ];
    return Array.from({ length: 25 }).map((_, i) => {
      const statusIdx = i % 4;
      return {
        id: `PR-202310${(i + 1).toString().padStart(2, '0')}`,
        title: i % 3 === 0 ? 'Q4 办公用品采购' : i % 3 === 1 ? '服务器扩容需求' : '人体工学椅换新',
        user: ['张三', '李四', '王五', '赵六'][i % 4],
        total: `¥${(Math.random() * 10000 + 500).toFixed(0)}`,
        status: statuses[statusIdx].label,
        statusCol: statuses[statusIdx].color,
        statusBg: statuses[statusIdx].bg,
      };
    });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const totalPages = Math.ceil(allRequisitions.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = allRequisitions.slice(startIndex, startIndex + pageSize);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map(item => item.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBatchApprove = () => {
    alert(`批量批准: ${selectedIds.join(', ')}`);
    setSelectedIds([]);
  };

  const handleBatchDelete = () => {
    if (confirm(`确定删除选中的 ${selectedIds.length} 项吗？`)) {
      alert(`已删除: ${selectedIds.join(', ')}`);
      setSelectedIds([]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">采购申请单</h2>
          <p className="text-slate-500 text-sm">管理企业内部的所有采购申请需求。</p>
        </div>
        <button 
          onClick={onOpenCreate}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 flex items-center gap-2"
        >
          <PlusIcon /> 新建申请
        </button>
      </div>

      {/* Batch Operations Bar */}
      <div className={`h-14 flex items-center px-4 rounded-xl transition-all duration-300 ${
        selectedIds.length > 0 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white border border-slate-200'
      }`}>
        {selectedIds.length > 0 ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <span className="font-semibold">已选择 {selectedIds.length} 项</span>
              <div className="h-6 w-[1px] bg-indigo-400"></div>
              <button 
                onClick={handleBatchApprove}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium"
              >
                <CheckCircle className="w-4 h-4" /> 批量批准
              </button>
              <button 
                onClick={handleBatchDelete}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium text-rose-100"
              >
                <Trash2 className="w-4 h-4" /> 批量删除
              </button>
            </div>
            <button onClick={() => setSelectedIds([])} className="text-sm font-medium opacity-80 hover:opacity-100">
              取消选择
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-6 w-full text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>当前列表支持多选操作</span>
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center gap-2">
              <span>每页显示:</span>
              <select 
                value={pageSize} 
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-transparent font-semibold text-slate-900 focus:outline-none"
              >
                <option value={5}>5 条</option>
                <option value={10}>10 条</option>
                <option value={20}>20 条</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 w-12">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">单据号</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">申请标题</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">申请人</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">总金额</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.map((item) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-slate-50/80 transition-colors group ${selectedIds.includes(item.id) ? 'bg-indigo-50/30' : ''}`}
                >
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{item.user}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{item.total}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.statusBg} ${item.statusCol}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs">查看</button>
                      <button className="text-slate-400 hover:text-slate-600 font-semibold text-xs">编辑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            显示第 <span className="font-semibold text-slate-900">{startIndex + 1}</span> 至 
            <span className="font-semibold text-slate-900"> {Math.min(startIndex + pageSize, allRequisitions.length)} </span> 项，
            共 <span className="font-semibold text-slate-900">{allRequisitions.length}</span> 项
          </p>
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-2 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 text-sm font-semibold rounded-lg transition-all ${
                  currentPage === i + 1 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-2 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3.75V14.25M3.75 9H14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
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
