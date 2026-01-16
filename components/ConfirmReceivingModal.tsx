
import React, { useState, useMemo } from 'react';
import { X, CheckCircle, Search, Filter } from 'lucide-react';

interface BatchProduct {
  sku: string;
  name: string;
  spec: string;
  qty: number;
  price: number;
  amount: number;
  photos: { id: string, url: string }[];
}

interface Batch {
  id: string;
  status: string;
  supplier: string;
  products: BatchProduct[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmReceivingModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [selectedSupplier, setSelectedSupplier] = useState<string>('all');
  
  const [batches, setBatches] = useState<Batch[]>([
    {
      id: '202601061719',
      status: '审核完成',
      supplier: '晨光文具股份有限公司',
      products: [
        {
          sku: 'SKU-PR20231215001-3',
          name: '测试商品 3',
          spec: 'A-101',
          qty: 30,
          price: 89.00,
          amount: 2670.00,
          photos: [
            { id: '2', url: 'https://picsum.photos/seed/p2/100/100' },
            { id: '3', url: 'https://picsum.photos/seed/p3/100/100' }
          ],
        },
        {
          sku: 'SKU-PR20231215001-5',
          name: '配套耗材 A',
          spec: '通用',
          qty: 100,
          price: 5.50,
          amount: 550.00,
          photos: [],
        }
      ]
    },
    {
      id: '202601061805',
      status: '审核完成',
      supplier: '联想（北京）有限公司',
      products: [
        {
          sku: 'SKU-PR20231215001-4',
          name: '测试商品 4',
          spec: 'B-202',
          qty: 15,
          price: 120.00,
          amount: 1800.00,
          photos: [
            { id: '4', url: 'https://picsum.photos/seed/p4/100/100' }
          ],
        }
      ]
    },
    {
      id: '202601061912',
      status: '审核完成',
      supplier: '晨光文具股份有限公司',
      products: [
        {
          sku: 'SKU-PR20231215001-9',
          name: '修正带 (10装)',
          spec: '蓝色',
          qty: 50,
          price: 45.00,
          amount: 2250.00,
          photos: [],
        }
      ]
    }
  ]);

  const suppliers = useMemo(() => {
    const set = new Set(batches.map(b => b.supplier));
    return Array.from(set);
  }, [batches]);

  const filteredBatches = useMemo(() => {
    if (selectedSupplier === 'all') return batches;
    return batches.filter(b => b.supplier === selectedSupplier);
  }, [batches, selectedSupplier]);

  if (!isOpen) return null;

  const handleQtyChange = (batchId: string, sku: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setBatches(prev => prev.map(batch => {
      if (batch.id === batchId) {
        return {
          ...batch,
          products: batch.products.map(p => 
            p.sku === sku ? { ...p, qty: numValue, amount: numValue * p.price } : p
          )
        };
      }
      return batch;
    }));
  };

  const handleComplete = () => {
    alert(`收货入库成功！已更新供应商 ${selectedSupplier === 'all' ? '所有' : selectedSupplier} 的库存。`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-slate-50 w-full max-w-[1400px] h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white flex items-center justify-between border-b shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800">确认收货入库</h2>
            <p className="text-sm text-slate-500">显示待收货的已验货产品批次</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                <Filter className="w-4 h-4" /> 供应商筛选:
              </label>
              <select 
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
              >
                <option value="all">全部供应商</option>
                {suppliers.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {filteredBatches.length > 0 ? (
            filteredBatches.map((batch) => (
              <div key={batch.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Batch Header */}
                <div className="bg-[#fcfcfc] px-6 py-3.5 flex items-center justify-between border-b">
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-slate-800">批次号：{batch.id}</span>
                      <span className="text-[11px] text-slate-400 font-medium">供应商：{batch.supplier}</span>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded text-[11px] font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {batch.status}
                    </span>
                  </div>
                </div>

                {/* Product Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px] border-collapse">
                    <thead className="bg-[#fcfcfc] border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-slate-500">SKU编码</th>
                        <th className="px-6 py-4 font-semibold text-slate-500">产品名称</th>
                        <th className="px-6 py-4 font-semibold text-slate-500">规格型号</th>
                        <th className="px-6 py-4 font-semibold text-slate-500 text-center">入库数量(可编辑)</th>
                        <th className="px-6 py-4 font-semibold text-slate-500 text-center">采购单价</th>
                        <th className="px-6 py-4 font-semibold text-slate-500 text-center">采购金额</th>
                        <th className="px-6 py-4 font-semibold text-slate-500 text-center">验货照片</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batch.products.map((prod, idx) => (
                        <tr key={idx} className="border-b last:border-0 hover:bg-slate-50/30 transition-colors">
                          <td className="px-6 py-5 text-slate-600 font-mono">{prod.sku}</td>
                          <td className="px-6 py-5 text-slate-800 font-bold">{prod.name}</td>
                          <td className="px-6 py-5 text-slate-500">{prod.spec}</td>
                          <td className="px-6 py-5 text-center">
                            <div className="flex items-center justify-center">
                              <input 
                                type="number"
                                className="w-24 text-center border border-slate-200 rounded-lg py-1.5 font-bold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30"
                                value={prod.qty}
                                onChange={(e) => handleQtyChange(batch.id, prod.sku, e.target.value)}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-5 text-center text-[#82AD00] font-bold">¥{prod.price.toFixed(2)}</td>
                          <td className="px-6 py-5 text-center text-slate-800 font-bold">¥{prod.amount.toFixed(2)}</td>
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-center gap-2">
                              {prod.photos.map(photo => (
                                <img key={photo.id} src={photo.url} className="w-10 h-10 object-cover rounded border border-slate-200 shadow-sm hover:scale-110 transition-transform cursor-pointer" alt="验货" />
                              ))}
                              {prod.photos.length === 0 && <span className="text-slate-300">-</span>}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
              <Search className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-lg">该供应商名下暂无待收货产品批次</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-white border-t flex justify-end gap-4 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            取消
          </button>
          <button 
            onClick={handleComplete}
            disabled={filteredBatches.length === 0}
            className="bg-[#82AD00] hover:bg-[#729800] disabled:opacity-50 disabled:cursor-not-allowed text-white px-10 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#82AD00]/20"
          >
            <CheckCircle className="w-5 h-5" />
            完成收货入库
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmReceivingModal;
