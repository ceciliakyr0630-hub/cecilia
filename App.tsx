
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
  ChevronDown,
  ChevronUp,
  Package
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

// Inspection Management View matching the user's latest screenshot
const InspectionManagementView = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const mockInspections = useMemo(() => [
    { id: 'INS464288540000258', poId: 'PO462273682341889', createTime: '2026-01-06 17:13:49', supplier: '测试供应商', address: 'rweerwew', payment: '', delivery: '快递到付', status: '进行中' },
    { id: 'INS462835016531970', poId: 'POC202512294107', createTime: '2025-12-29 16:42:15', supplier: '测试供应商', address: 'rweerwew', payment: '', delivery: '快递到付', status: '进行中' },
    { id: 'INS462833271701506', poId: 'POC202512292705', createTime: '2025-12-29 16:28:23', supplier: '测试供应商', address: 'rweerwew', payment: '', delivery: '工厂自提', status: '进行中' },
    { id: 'INS462244471111682', poId: 'POC202512256631', createTime: '2025-12-26 10:29:01', supplier: '测试供应商', address: 'rweerwew', payment: '提货后付款', delivery: '工厂自提', status: '进行中' },
  ], []);

  const toggleAll = () => {
    if (selectedIds.length === mockInspections.length) setSelectedIds([]);
    else setSelectedIds(mockInspections.map(i => i.id));
  };

  const toggleOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Filter Bar */}
      <div className="bg-white p-4 rounded border border-slate-200 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <label className="font-medium text-slate-600">关键词：</label>
          <input 
            type="text" 
            placeholder="采购单号/验货单号/供..."
            className="border border-slate-200 px-3 py-1.5 rounded w-56 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium text-slate-600">状态：</label>
          <select className="border border-slate-200 px-3 py-1.5 rounded w-32 focus:outline-none text-slate-400">
            <option value="">状态筛选</option>
            <option value="1">进行中</option>
            <option value="2">已完成</option>
          </select>
        </div>
        <button className="bg-[#A5CC32] hover:bg-[#92b52b] text-white px-5 py-1.5 rounded font-medium transition-colors">
          查询
        </button>
        <button className="bg-white border border-slate-200 text-slate-600 px-5 py-1.5 rounded font-medium hover:bg-slate-50 transition-colors">
          重置
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-[13px] border-collapse">
          <thead className="bg-[#fcfcfc] border-b border-slate-100">
            <tr>
              <th className="px-4 py-3 w-10">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 border-slate-300 rounded focus:ring-indigo-500"
                  checked={selectedIds.length === mockInspections.length && mockInspections.length > 0}
                  onChange={toggleAll}
                />
              </th>
              <th className="px-4 py-3 font-semibold text-slate-700">验货单号</th>
              <th className="px-4 py-3 font-semibold text-slate-700">采购单号</th>
              <th className="px-4 py-3 font-semibold text-slate-700">创建时间</th>
              <th className="px-4 py-3 font-semibold text-slate-700">供应商名称</th>
              <th className="px-4 py-3 font-semibold text-slate-700">供应商地址</th>
              <th className="px-4 py-3 font-semibold text-slate-700">付款方式</th>
              <th className="px-4 py-3 font-semibold text-slate-700">交付方式</th>
              <th className="px-4 py-3 font-semibold text-slate-700 text-center">状态</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockInspections.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-4">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 border-slate-300 rounded focus:ring-indigo-500"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => toggleOne(item.id)}
                  />
                </td>
                <td className="px-4 py-4 text-[#1890ff] cursor-pointer hover:underline">{item.id}</td>
                <td className="px-4 py-4 text-slate-600">{item.poId}</td>
                <td className="px-4 py-4 text-slate-600 font-mono">{item.createTime}</td>
                <td className="px-4 py-4 text-slate-600">{item.supplier}</td>
                <td className="px-4 py-4 text-slate-600">{item.address}</td>
                <td className="px-4 py-4 text-slate-600">{item.payment || ''}</td>
                <td className="px-4 py-4 text-slate-600">{item.delivery}</td>
                <td className="px-4 py-4 text-center">
                  <span className="px-2 py-0.5 border border-[#1890ff] text-[#1890ff] rounded text-[11px] bg-blue-50/30">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Purchase Order Management View
const PurchaseOrdersView = ({ onOpenCreate, allOrders }: { onOpenCreate: () => void, allOrders: any[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

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

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
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
          <table className="w-full text-left text-[13px] border-collapse">
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
                <React.Fragment key={order.id}>
                  <tr className={`hover:bg-slate-50/50 transition-colors ${expandedOrderId === order.id ? 'bg-slate-50/30' : ''}`}>
                    <td className="px-4 py-3">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 border-slate-300 rounded focus:ring-indigo-500"
                        checked={selectedIds.includes(order.id)}
                        onChange={() => toggleSelect(order.id)}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-[#1890ff] cursor-pointer hover:underline">{order.id}</span>
                        <button 
                          onClick={() => toggleExpand(order.id)}
                          className="p-0.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          title="查看产品详情"
                        >
                          {expandedOrderId === order.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
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
                    <td className="px-4 py-3 text-slate-600 text-center font-mono text-[12px]">{order.createTime}</td>
                  </tr>
                  {/* Expanded Detail Row */}
                  {expandedOrderId === order.id && (
                    <tr className="bg-slate-50/80">
                      <td colSpan={9} className="px-8 py-4">
                        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden animate-in slide-in-from-top-2 duration-200">
                          <div className="bg-slate-50/50 px-4 py-2 border-b flex items-center gap-2">
                            <Package className="w-4 h-4 text-indigo-500" />
                            <span className="text-sm font-bold text-slate-700">采购产品明细</span>
                          </div>
                          <table className="w-full text-[12px] text-left">
                            <thead className="bg-slate-50">
                              <tr>
                                <th className="px-4 py-2 font-medium text-slate-500">产品名称</th>
                                <th className="px-4 py-2 font-medium text-slate-500">SKU编码</th>
                                <th className="px-4 py-2 font-medium text-slate-500">规格型号</th>
                                <th className="px-4 py-2 font-medium text-slate-500">数量</th>
                                <th className="px-4 py-2 font-medium text-slate-500">单价</th>
                                <th className="px-4 py-2 font-medium text-slate-500">金额</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {order.items.map((item: any, idx: number) => (
                                <tr key={idx} className="hover:bg-slate-50/50">
                                  <td className="px-4 py-2 text-slate-700">{item.name}</td>
                                  <td className="px-4 py-2 text-slate-500 font-mono">{item.sku}</td>
                                  <td className="px-4 py-2 text-slate-500">{item.spec || '-'}</td>
                                  <td className="px-4 py-2 text-slate-700">{item.qty}</td>
                                  <td className="px-4 py-2 text-slate-700">¥{item.price.toFixed(2)}</td>
                                  <td className="px-4 py-2 font-semibold text-slate-900">¥{(item.qty * item.price).toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Custom Pagination matching screenshot */}
        <div className="px-4 py-3 flex items-center justify-end gap-4 bg-white border-t border-slate-50">
          <div className="flex items-center gap-1 text-slate-400">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => (
              <button 
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-6 h-6 flex items-center justify-center border rounded text-sm transition-colors ${
                  currentPage === i + 1 ? 'border-indigo-500 text-indigo-500 bg-indigo-50/50 font-bold' : 'border-transparent text-slate-500 hover:bg-slate-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>跳至</span>
            <input 
              type="text" 
              className="w-10 border border-slate-200 rounded px-1 text-center py-0.5" 
              onBlur={(e) => {
                const val = parseInt(e.target.value);
                if (val > 0 && val <= totalPages) setCurrentPage(val);
              }}
            />
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
        createTime: `2026-01-13 ${10 + (i % 8)}:${(10 + (i * 3) % 45).toString().padStart(2, '0')}`,
        items: [
          { name: '测试产品8', sku: 'THP4662124137', spec: 'A-201', qty: 10, price: 15.5 },
          { name: '测试产品7', sku: 'THP4414531785', spec: 'B-302', qty: 5, price: 120.0 }
        ]
      };
    });
  });

  const handleCreateSubmit = (newOrder: any) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${formattedDate} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const orderData = {
      id: newOrder.id.replace('PR-', 'POC202601'),
      amount: parseFloat(newOrder.total.replace('¥', '')),
      date: formattedDate,
      supplierId: '459401871753217',
      type: '样品采购',
      statusText: '待生成采购合同',
      statusColor: 'bg-slate-300',
      creator: '255569025865016',
      createTime: formattedTime,
      items: [
        { name: newOrder.title || '新增产品', sku: 'THP' + Math.floor(Math.random() * 1000000), spec: '-', qty: 1, price: parseFloat(newOrder.total.replace('¥', '')) }
      ]
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
      case 'INSPECTION_MANAGEMENT':
        return <InspectionManagementView />;
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
