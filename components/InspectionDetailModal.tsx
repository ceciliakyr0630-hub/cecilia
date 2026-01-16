
import React, { useState } from 'react';
import { X, Upload, Plus, Trash2, RotateCcw, CheckCircle, Image as ImageIcon, Clock, CheckSquare } from 'lucide-react';
import SelectSKUModal from './SelectSKUModal';

interface PhotoItem {
  id: string;
  url: string;
}

interface BatchProduct {
  sku: string;
  name: string;
  spec: string;
  qty: number;
  price: number;
  amount: number;
  payAmount: number;
  photos: PhotoItem[];
}

interface Batch {
  id: string;
  status: '待提交' | '待审核' | '审核完成';
  settlementStatus: string;
  products: BatchProduct[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  inspection: any;
  onSave: (id: string, batches: Batch[]) => void;
}

const InspectionDetailModal: React.FC<Props> = ({ isOpen, onClose, inspection, onSave }) => {
  const [isSKUModalOpen, setIsSKUModalOpen] = useState(false);
  const [activeBatchId, setActiveBatchId] = useState<string | null>(null);
  
  const [batches, setBatches] = useState<Batch[]>([
    {
      id: '202601061718',
      status: '待提交',
      settlementStatus: '待结算',
      products: [
        {
          sku: 'SKU-PR20231215001-3',
          name: '测试商品 3',
          spec: '',
          qty: 12,
          price: 89.00,
          amount: 1068.00,
          payAmount: 0.00,
          photos: [{ id: '1', url: 'https://picsum.photos/seed/p1/100/100' }],
        }
      ]
    },
    {
      id: '202601061719',
      status: '审核完成',
      settlementStatus: '待结算',
      products: [
        {
          sku: 'SKU-PR20231215001-3',
          name: '测试商品 3',
          spec: '',
          qty: 30,
          price: 89.00,
          amount: 2670.00,
          payAmount: 0.00,
          photos: [
            { id: '2', url: 'https://picsum.photos/seed/p2/100/100' },
            { id: '3', url: 'https://picsum.photos/seed/p3/100/100' },
            { id: '4', url: 'https://picsum.photos/seed/p4/100/100' }
          ],
        }
      ]
    },
    {
      id: '202601091509',
      status: '待提交',
      settlementStatus: '待结算',
      products: [
        {
          sku: 'SKU-PR20231215001-3',
          name: '测试商品 3',
          spec: '',
          qty: 9,
          price: 89.00,
          amount: 801.00,
          payAmount: 0.00,
          photos: [],
        }
      ]
    }
  ]);

  if (!isOpen || !inspection) return null;

  const handleOpenAddProduct = (batchId: string) => {
    setActiveBatchId(batchId);
    setIsSKUModalOpen(true);
  };

  const handleConfirmAddProducts = (selectedSKUs: any[]) => {
    if (!activeBatchId) return;

    const newProducts: BatchProduct[] = selectedSKUs.map(sku => ({
      sku: sku.skuCode,
      name: sku.name,
      spec: sku.spec || '',
      qty: 1,
      price: 89.00,
      amount: 89.00,
      payAmount: 0.00,
      photos: [],
    }));

    setBatches(prev => prev.map(batch => {
      if (batch.id === activeBatchId) {
        return {
          ...batch,
          products: [...batch.products, ...newProducts]
        };
      }
      return batch;
    }));
    
    setIsSKUModalOpen(false);
    setActiveBatchId(null);
  };

  const handleDeleteProduct = (batchId: string, sku: string) => {
    if (confirm('确定要从该批次中删除该产品吗？')) {
      setBatches(prev => prev.map(batch => {
        if (batch.id === batchId) {
          return {
            ...batch,
            products: batch.products.filter(p => p.sku !== sku)
          };
        }
        return batch;
      }));
    }
  };

  const handleSubmitAudit = (batchId: string) => {
    setBatches(prev => prev.map(batch => {
      if (batch.id === batchId) {
        return { ...batch, status: '待审核' as const };
      }
      return batch;
    }));
  };

  // Simulated Audit Completion for demo purposes
  const handleApproveBatch = (batchId: string) => {
    setBatches(prev => prev.map(batch => {
      if (batch.id === batchId) {
        return { ...batch, status: '审核完成' as const };
      }
      return batch;
    }));
  };

  const InfoRow = ({ label, value, isFile }: { label: string; value: string; isFile?: boolean }) => (
    <div className="flex border-b border-r border-slate-100 last:border-r-0">
      <div className="w-32 bg-[#fcfcfc] px-4 py-3 text-[13px] text-slate-500 font-medium shrink-0 flex items-center">
        {label}
      </div>
      <div className="flex-1 px-4 py-3 text-[13px] text-slate-700 flex items-center min-w-0">
        {isFile ? (
          <div className="flex items-center gap-2 overflow-hidden">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 text-[12px] flex items-center gap-1 shrink-0">
              选择文件
            </button>
            <span className="text-slate-400 truncate">未选择任何文件</span>
          </div>
        ) : (
          <span className="truncate">{value}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[1600px] h-[95vh] rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b shrink-0">
          <h2 className="text-[16px] font-bold text-slate-800">采购验货 - {inspection.id}</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Top Summary Info Table */}
          <div className="border border-slate-100 rounded overflow-hidden shadow-sm">
            <div className="grid grid-cols-3">
              <InfoRow label="采购订单号" value={inspection.poId} />
              <InfoRow label="创建时间" value={inspection.createTime} />
              <InfoRow label="商品大类" value="part" />
            </div>
            <div className="grid grid-cols-3 border-t border-slate-100">
              <InfoRow label="供应商名称" value={inspection.supplier} />
              <InfoRow label="供应商地址" value={inspection.address} />
              <InfoRow label="付款方式" value="-" />
            </div>
            <div className="grid grid-cols-3 border-t border-slate-100">
              <InfoRow label="交付方式" value={inspection.delivery} />
              <InfoRow label="发票" value="" isFile />
              <InfoRow label="出库单" value="" isFile />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2">
            <button className="bg-[#82AD00] hover:bg-[#729800] text-white px-4 py-2 rounded text-[13px] font-bold flex items-center gap-1 shadow-sm transition-colors">
              <Plus className="w-4 h-4" />
              添加验货批次
            </button>
            <button className="bg-[#333] hover:bg-black text-white px-4 py-2 rounded text-[13px] font-bold shadow-sm transition-colors">
              结算
            </button>
          </div>

          {/* Batch List */}
          <div className="space-y-4">
            {batches.map((batch) => (
              <div key={batch.id} className="border border-slate-200 rounded overflow-hidden shadow-sm">
                
                {/* Batch Header */}
                <div className="bg-[#fcfcfc] px-4 py-3 flex items-center justify-between border-b">
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-[13px] font-bold text-slate-800">{batch.id}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px] text-slate-500">批次状态：</span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium border flex items-center gap-1 ${
                          batch.status === '审核完成' 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                          : batch.status === '待审核'
                          ? 'bg-amber-50 border-amber-200 text-amber-600'
                          : 'bg-indigo-50 border-indigo-200 text-indigo-600'
                        }`}>
                          {batch.status === '审核完成' && <CheckCircle className="w-3 h-3" />}
                          {batch.status === '待审核' && <Clock className="w-3 h-3" />}
                          {batch.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px] text-slate-500">结算状态：</span>
                        <span className="px-2 py-0.5 bg-lime-50 border border-lime-200 text-[#82AD00] rounded text-[11px] font-medium">
                          {batch.settlementStatus}
                        </span>
                      </div>
                    </div>
                    {batch.status === '待提交' && (
                      <button 
                        onClick={() => handleOpenAddProduct(batch.id)}
                        className="px-2.5 py-1 border border-rose-200 bg-rose-50 text-rose-600 rounded text-[11px] font-bold hover:bg-rose-100 transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <Plus className="w-3 h-3" />
                        增加产品
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {batch.status === '待提交' && (
                      <div className="flex items-center gap-3">
                        <button className="text-[12px] text-indigo-600 hover:underline font-medium">
                          撤回
                        </button>
                        <button className="text-[12px] text-rose-500 hover:underline font-medium">
                          删除批次
                        </button>
                      </div>
                    )}
                    {batch.status === '待审核' && (
                      <button 
                        onClick={() => handleApproveBatch(batch.id)}
                        className="text-[11px] text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded border border-indigo-100 flex items-center gap-1 transition-colors"
                      >
                        <CheckSquare className="w-3 h-3" /> (演示) 模拟审批通过
                      </button>
                    )}
                  </div>
                </div>

                {/* Batch Content Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[12px] border-collapse">
                    <thead className="bg-[#fcfcfc] border-b border-slate-100">
                      <tr>
                        <th className="px-4 py-3 font-medium text-slate-500 text-center">SKU编码</th>
                        <th className="px-4 py-3 font-medium text-slate-500 text-center">产品名称</th>
                        <th className="px-4 py-3 font-medium text-slate-500 text-center">零件号/规格型号</th>
                        <th className="px-4 py-3 font-medium text-slate-500 text-center">入库数量</th>
                        <th className="px-4 py-3 font-medium text-slate-500 text-center">采购单价</th>
                        <th className="px-4 py-3 font-medium text-slate-500 text-center">采购金额</th>
                        <th className="px-4 py-3 font-medium text-slate-500 text-center">付款金额</th>
                        <th className="px-4 py-3 font-medium text-slate-500 text-center">验货照片</th>
                        {batch.status === '待提交' && (
                          <th className="px-4 py-3 font-medium text-slate-500 text-center">操作</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {batch.products.map((prod, idx) => (
                        <tr key={idx} className="border-b last:border-0 hover:bg-slate-50/30">
                          <td className="px-4 py-6 text-center text-slate-600 font-mono">{prod.sku}</td>
                          <td className="px-4 py-6 text-center text-slate-700 font-medium">{prod.name}</td>
                          <td className="px-4 py-6 text-center text-slate-400">{prod.spec || '-'}</td>
                          <td className="px-4 py-6 text-center">
                            <input 
                              type="number" 
                              className={`w-24 text-center border border-slate-200 rounded py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${batch.status !== '待提交' ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : 'bg-white'}`}
                              defaultValue={prod.qty}
                              disabled={batch.status !== '待提交'}
                            />
                          </td>
                          <td className="px-4 py-6 text-center text-[#82AD00] font-bold">¥{prod.price.toFixed(2)}</td>
                          <td className="px-4 py-6 text-center text-slate-700 font-bold">¥{prod.amount.toFixed(2)}</td>
                          <td className="px-4 py-6 text-center text-slate-400">¥{prod.payAmount.toFixed(2)}</td>
                          <td className="px-4 py-6">
                            <div className="flex items-center justify-center gap-2">
                              {prod.photos.map(photo => (
                                <div key={photo.id} className="relative group shrink-0">
                                  <img src={photo.url} className="w-12 h-12 object-cover rounded border border-slate-200" alt="验货" />
                                  {batch.status === '待提交' && (
                                    <button className="absolute -top-1 -right-1 bg-rose-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                      <X className="w-2 h-2" />
                                    </button>
                                  )}
                                </div>
                              ))}
                              {prod.photos.length > 5 && (
                                <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded flex flex-col items-center justify-center text-slate-400 text-[10px]">
                                  <ImageIcon className="w-3 h-3 mb-0.5" />
                                  +{prod.photos.length - 3}
                                </div>
                              )}
                              {batch.status === '待提交' && (
                                <button className="w-12 h-12 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 hover:border-[#82AD00] hover:text-[#82AD00] transition-colors">
                                  <Plus className="w-6 h-6" />
                                </button>
                              )}
                              <div className="text-[11px] text-rose-500 ml-2 whitespace-nowrap hidden md:block">
                                图片限制20张
                              </div>
                            </div>
                          </td>
                          {batch.status === '待提交' && (
                            <td className="px-4 py-6 text-center">
                              <button 
                                onClick={() => handleDeleteProduct(batch.id, prod.sku)}
                                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded transition-colors group"
                                title="删除该行"
                              >
                                <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Batch Footer Actions */}
                {batch.status === '待提交' && (
                  <div className="bg-slate-50/30 px-4 py-3 border-t flex justify-end">
                    <button 
                      onClick={() => handleSubmitAudit(batch.id)}
                      className="bg-[#82AD00] hover:bg-[#729800] text-white px-5 py-1.5 rounded text-[13px] font-bold shadow-sm transition-colors flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      提交审核
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <SelectSKUModal 
        isOpen={isSKUModalOpen} 
        onClose={() => setIsSKUModalOpen(false)} 
        onConfirm={handleConfirmAddProducts}
      />
    </div>
  );
};

export default InspectionDetailModal;
