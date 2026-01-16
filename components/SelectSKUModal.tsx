
import React, { useState, useMemo } from 'react';
import { X, Search, Trash2 } from 'lucide-react';

interface SKU {
  id: string;
  name: string;
  skuCode: string;
  spec: string;
  image: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selected: SKU[]) => void;
  initialSelected?: string[];
}

const mockSKUs: SKU[] = [
  { id: '1', name: '测试产品8', skuCode: 'THP4662124137', spec: '', image: 'https://picsum.photos/seed/p8/40/40' },
  { id: '2', name: '测试产品7', skuCode: 'THP4414531785', spec: '', image: 'https://picsum.photos/seed/p7/40/40' },
  { id: '3', name: '打捆绳（复制）', skuCode: 'THP8787054415', spec: '', image: 'https://picsum.photos/seed/p3/40/40' },
  { id: '4', name: '打捆绳', skuCode: 'THP1317877406', spec: '', image: 'https://picsum.photos/seed/p4/40/40' },
  { id: '5', name: '打捆绳', skuCode: 'THP6245230774', spec: '', image: 'https://picsum.photos/seed/p5/40/40' },
  { id: '6', name: '打捆绳', skuCode: 'THP4221601860', spec: '', image: 'https://picsum.photos/seed/p6/40/40' },
  { id: '7', name: '捆草网', skuCode: 'THP7017351182', spec: '', image: 'https://picsum.photos/seed/p1/40/40' },
];

const SelectSKUModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, initialSelected = [] }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelected);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredSKUs = mockSKUs.filter(sku => 
    sku.name.includes(searchQuery) || sku.skuCode.includes(searchQuery)
  );

  const selectedItems = mockSKUs.filter(sku => selectedIds.includes(sku.id));

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleClear = () => setSelectedIds([]);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl flex flex-col h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-slate-800">选择SKU</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel: Search and List */}
          <div className="flex-1 border-r flex flex-col p-4 overflow-hidden">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="请输入商品名称或SKU编码"
                className="w-full pl-3 pr-10 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>

            <div className="flex-1 overflow-y-auto border rounded">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-[#fcfcfc] sticky top-0 border-b">
                  <tr>
                    <th className="p-3 w-10">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        checked={selectedIds.length === filteredSKUs.length && filteredSKUs.length > 0}
                        onChange={() => {
                          if (selectedIds.length === filteredSKUs.length) setSelectedIds([]);
                          else setSelectedIds(filteredSKUs.map(s => s.id));
                        }}
                      />
                    </th>
                    <th className="p-3 font-medium text-slate-600">商品名称</th>
                    <th className="p-3 font-medium text-slate-600">SKU编码</th>
                    <th className="p-3 font-medium text-slate-600">规格/零件号</th>
                    <th className="p-3 font-medium text-slate-600">产品图片</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredSKUs.map(sku => (
                    <tr 
                      key={sku.id} 
                      className={`hover:bg-slate-50 cursor-pointer ${selectedIds.includes(sku.id) ? 'bg-yellow-50/50' : ''}`}
                      onClick={() => toggleSelect(sku.id)}
                    >
                      <td className="p-3" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          checked={selectedIds.includes(sku.id)}
                          onChange={() => toggleSelect(sku.id)}
                        />
                      </td>
                      <td className="p-3 text-slate-700">{sku.name}</td>
                      <td className="p-3 text-slate-500">{sku.skuCode}</td>
                      <td className="p-3 text-slate-500">{sku.spec || '-'}</td>
                      <td className="p-3">
                        <img src={sku.image} className="w-10 h-10 object-cover rounded border" alt="" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Panel: Selection Summary */}
          <div className="w-80 bg-slate-50/50 flex flex-col p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-700 text-sm">已选 {selectedIds.length} 项</h3>
              <button onClick={handleClear} className="text-xs text-blue-500 hover:underline">清空</button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2">
              <table className="w-full text-xs text-left">
                <thead className="text-slate-500">
                  <tr className="border-b">
                    <th className="pb-2 font-medium">商品名称</th>
                    <th className="pb-2 font-medium">SKU编码</th>
                    <th className="pb-2 font-medium text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedItems.map(item => (
                    <tr key={item.id} className="group">
                      <td className="py-3 text-slate-700 font-medium">{item.name}</td>
                      <td className="py-3 text-slate-400 break-all">{item.skuCode}</td>
                      <td className="py-3 text-right">
                        <button 
                          onClick={() => toggleSelect(item.id)}
                          className="text-rose-500 hover:text-rose-700 font-medium whitespace-nowrap"
                        >
                          移除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-3 bg-white">
          <button 
            onClick={onClose}
            className="px-6 py-1.5 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-50"
          >
            取消
          </button>
          <button 
            onClick={() => onConfirm(selectedItems)}
            className="px-6 py-1.5 bg-[#A5CC32] hover:bg-[#92b52b] text-white font-bold rounded text-sm transition-colors"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectSKUModal;
