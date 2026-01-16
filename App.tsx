
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Suppliers from './components/Suppliers';
import AIInsights from './components/AIInsights';
import CreatePurchaseOrderModal from './components/CreatePurchaseOrderModal';
import { ViewType } from './types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  Plus, 
  Download, 
  Upload, 
  RefreshCcw, 
  Settings, 
  ListFilter,
  MoreHorizontal
} from 'lucide-react';

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

// New component specifically for Purchase Order Management matching screenshot
const PurchaseOrdersView = ({ onOpenCreate, allOrders }: { onOpenCreate: () => void, allOrders: any[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    return allOrders.filter(order => order.id.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [allOrders, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

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

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Search Header */}
      <div className="bg-white p-4 rounded border border-slate-200 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600 whitespace-nowrap">采购单号：</label>
          <input 
            type="text" 
            placeholder="请输入采购单号"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-slate-200 px-3 py-1.5 rounded text-sm w-48 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <button className="bg-[#A5CC32] hover:bg-[#92b52b] text-white px-4 py-1.5 rounded text-sm font-medium transition-colors">
          查询
        </button>
        <button className="bg-white border border-slate-200 text-slate-600 px-4 py-1.5 rounded text-sm font-medium hover:bg-slate-50 transition-colors">
          重置
        </button>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-end gap-2 px-2">
        <button 
          onClick={onOpenCreate}
          className="bg-[#82AD00] hover:bg-[#729800] text-white px-4 py-1.5 rounded text-sm font-bold flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> 新增采购订单
        </button>
        <button 
          disabled={selectedIds.length === 0}
          className="bg-white border border-slate-200 text-slate-400 disabled:opacity-50 px-4 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 hover:bg-slate-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" /> 删除
        </button>
        <button className="bg-white border border-slate-200 text-slate-600 px-4 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 hover:bg-slate-50 transition-colors">
          <Upload className="w-4 h-4" /> 导入
        </button>
        <button className="bg-white border border-slate-200 text-slate-600 px-4 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4" /> 导出
        </button>
        <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>
        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
          <RefreshCcw className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
          <ListFilter className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#fcfcfc] border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 border-slate-300 rounded focus:ring-indigo-500"
                    checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 font-medium text-slate-700 text-center">采购单号</th>
                <th className="px-4 py-3 font-medium text-slate-700 text-center">采购金额（元）</th>
                <th className="px-4 py-3 font-medium text-slate-700 text-center">采购日期</th>
                <th className="px-4 py-3 font-medium text-slate-700 text-center">供应商ID</th>
                <th className="px-4 py-3 font-medium text-slate-700 text-center">订单类型</th>
                <th className="px-4 py-3 font-medium text-slate-700 text-center">状态</th>
                <th className="px-4 py-3 font-medium text-slate-700 text-center">创建人</th>
                <th className="px-4 py-3 font-medium text-slate-700 text-center">创建时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedData.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 border-slate-300 rounded focus:ring-indigo-500"
                      checked={selectedIds.includes(order.id)}
                      onChange={() => toggleSelect(order.id)}
                    />
                  </td>
                  <td className="px-4 py-3 text-[#1890ff] cursor-pointer hover:underline text-center">{order.id}</td>
                  <td className="px-4 py-3 text-slate-600 text-center">{order.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-slate-600 text-center">{order.date}</td>
                  <td className="px-4 py-3 text-slate-600 text-center">{order.supplierId}</td>
                  <td className="px-4 py-3 text-slate-600 text-center">{order.type}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${order.statusColor}`}></span>
                      <span className="text-slate-600 whitespace-nowrap">{order.statusText}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-center">{order.creator}</td>
                  <td className="px-4 py-3 text-slate-600 text-center">{order.createTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Custom Pagination matching screenshot */}
        <div className="px-4 py-3 flex items-center justify-end gap-4 bg-white border-t border-slate-50">
          <div className="flex items-center gap-1 text-slate-400">
            <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-6 h-6 flex items-center justify-center border border-indigo-500 text-indigo-500 rounded text-sm">1</button>
            <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-50 rounded text-sm">2</button>
            <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>跳至</span>
            <input type="text" className="w-10 border border-slate-200 rounded px-1 text-center py-0.5" />
            <span>页</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('DASHBOARD');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Maintain purchase orders list with specific fields from screenshot
  const [purchaseOrders, setPurchaseOrders] = useState(() => {
    const statuses = [
      { text: '待生成采购合同', dot: 'bg-slate-300' },
      { text: '采购合同盖章中', dot: 'bg-emerald-400' },
      { text: '待发起合同盖章', dot: 'bg-amber-400' },
      { text: '财务结算中', dot: 'bg-cyan-400' }
    ];
    
    return Array.from({ length: 15 }).map((_, i) => {
      const statusIdx = i % statuses.length;
      return {
        id: `POC202601${(13 + i).toString().padStart(6, '0')}`,
        amount: Math.random() * 5000 + 10,
        date: '2026-01-13',
        supplierId: '459401871753217',
        type: i % 2 === 0 ? '样品采购' : '批量采购',
        statusText: statuses[statusIdx].text,
        statusColor: statuses[statusIdx].dot,
        creator: '255569025865016',
        createTime: '2026-01-13 10:23',
      };
    });
  });

  const handleCreateSubmit = (newOrder: any) => {
    // Adapter for new orders from modal
    const orderData = {
      id: newOrder.id.replace('PR-', 'POC202601'),
      amount: parseFloat(newOrder.total.replace('¥', '')),
      date: new Date().toISOString().split('T')[0],
      supplierId: '459401871753217',
      type: '样品采购',
      statusText: '待生成采购合同',
      statusColor: 'bg-slate-300',
      creator: '255569025865016',
      createTime: new Date().toLocaleString(),
    };
    setPurchaseOrders([orderData, ...purchaseOrders]);
    setIsModalOpen(false);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'DASHBOARD':
        return <Dashboard />;
      case 'PURCHASE_ORDERS':
        return <PurchaseOrdersView onOpenCreate={() => setIsModalOpen(true)} allOrders={purchaseOrders} />;
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
      <CreatePurchaseOrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateSubmit}
      />
    </Layout>
  );
};

export default App;
