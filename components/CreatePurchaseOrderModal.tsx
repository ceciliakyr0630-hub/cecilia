
import React, { useState } from 'react';
import { X, Calendar, Upload, PackageSearch, Trash2, Plus } from 'lucide-react';
import SelectSKUModal from './SelectSKUModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newOrder: any) => void;
}

interface ProcurementItem {
  id: string;
  productName: string;
  skuCode: string;
  spec: string;
  image: string;
  quantity: number | '';
  unitPrice: number | '';
  totalPrice: number;
  remark: string;
}

const CreatePurchaseOrderModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [isSKUModalOpen, setIsSKUModalOpen] = useState(false);
  const [items, setItems] = useState<ProcurementItem[]>([
    { id: 'initial-row', productName: '', skuCode: '', spec: '', image: '', quantity: '', unitPrice: '', totalPrice: 0, remark: '' }
  ]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    const newItem: ProcurementItem = {
      id: `row-${Date.now()}`,
      productName: '',
      skuCode: '',
      spec: '',
      image: '',
      quantity: '',
      unitPrice: '',
      totalPrice: 0,
      remark: ''
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length === 1) {
      setItems([{ id: 'initial-row', productName: '', skuCode: '', spec: '', image: '', quantity: '', unitPrice: '', totalPrice: 0, remark: '' }]);
    } else {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleUpdateItem = (id: string, field: keyof ProcurementItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        // Recalculate total
        if (field === 'quantity' || field === 'unitPrice') {
          const q = field === 'quantity' ? value : item.quantity;
          const p = field === 'unitPrice' ? value : item.unitPrice;
          updated.totalPrice = (Number(q) || 0) * (Number(p) || 0);
        }
        return updated;
      }
      return item;
    }));
  };

  const handleSKUConfirm = (selectedSKUs: any[]) => {
    const newItems = selectedSKUs.map(sku => ({
      id: `sku-${sku.id}-${Date.now()}`,
      productName: sku.name,
      skuCode: sku.skuCode,
      spec: sku.spec,
      image: sku.image,
      quantity: '',
      unitPrice: '',
      totalPrice: 0,
      remark: ''
    }));

    // Replace the initial empty row if it's there and empty
    const filteredItems = items.filter(item => item.productName !== '' || item.skuCode !== '');
    setItems([...filteredItems, ...newItems]);
    setIsSKUModalOpen(false);
  };

  const totalQuantity = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const grandTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder = {
      id: `PR-${new Date().getTime().toString().slice(-8)}`,
      title: items[0]?.productName || '手动新增采购订单',
      user: '当前管理员',
      total: `¥${grandTotal.toFixed(2)}`,
      status: '待审批',
      statusCol: 'text-amber-500',
      statusBg: 'bg-amber-50',
    };
    onSubmit(newOrder);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-900/40 backdrop-blur-sm p-4 md:p-8">
      <div className="bg-white w-full max-w-7xl rounded-lg shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
          <h2 className="text-xl font-bold text-slate-800">发起采购订单</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Main Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <FormItem label="采购日期" required>
              <div className="relative">
                <input type="text" placeholder="请选择日期" className="form-input-custom" readOnly />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </FormItem>
            <FormItem label="采购订单号" required>
              <input type="text" value="POC202601164879" className="form-input-custom bg-slate-50" readOnly />
            </FormItem>
            <FormItem label="采购类型">
              <select className="form-input-custom appearance-none">
                <option>样品采购</option>
                <option>正式采购</option>
              </select>
            </FormItem>

            <FormItem label="商品大类" required>
              <select className="form-input-custom appearance-none">
                <option value="">请选择</option>
              </select>
            </FormItem>
            <FormItem label="公司名称" required>
              <select className="form-input-custom appearance-none">
                <option value="">请选择</option>
              </select>
            </FormItem>
            <FormItem label="供应商名称" required>
              <select className="form-input-custom appearance-none">
                <option value="">请选择</option>
              </select>
            </FormItem>

            <FormItem label="币种" required>
              <select className="form-input-custom appearance-none">
                <option value="">CNY</option>
                <option value="">USD</option>
              </select>
            </FormItem>
            <FormItem label="付款方式" required>
              <select className="form-input-custom appearance-none">
                <option value="">请选择</option>
              </select>
            </FormItem>
            <FormItem label="预付比例">
              <select className="form-input-custom appearance-none">
                <option value="">0%</option>
                <option value="">30%</option>
                <option value="">50%</option>
                <option value="">100%</option>
              </select>
            </FormItem>

            <FormItem label="交货方式" required>
              <select className="form-input-custom appearance-none">
                <option value="">请选择</option>
              </select>
            </FormItem>
            <FormItem label="提货地址" required>
              <input type="text" className="form-input-custom" />
            </FormItem>
            <FormItem label="是否含票" required>
              <select className="form-input-custom appearance-none">
                <option value="">是</option>
                <option value="">否</option>
              </select>
            </FormItem>

            <FormItem label="发票类型" required>
              <select className="form-input-custom appearance-none">
                <option value="">增值税专用发票</option>
              </select>
            </FormItem>
            
            <div className="grid grid-cols-2 gap-4">
              <FormItem label="包装设计图">
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 w-full justify-center">
                  <Upload className="w-4 h-4" /> 选择文件
                </button>
              </FormItem>
              <FormItem label="上传合同附件">
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 w-full justify-center">
                  <Upload className="w-4 h-4" /> 上传合同
                </button>
              </FormItem>
            </div>
          </div>

          {/* Purchase Info Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-l-4 border-indigo-600 pl-3">
              <h3 className="font-bold text-slate-800">采购信息</h3>
              <div className="flex gap-4">
                <button 
                  onClick={handleAddItem}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> 新增行
                </button>
                <button 
                  onClick={() => setIsSKUModalOpen(true)}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  选择SKU
                </button>
              </div>
            </div>
            <div className="border border-slate-100 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[1000px]">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 font-medium text-slate-500 w-48">产品名称</th>
                    <th className="px-4 py-3 font-medium text-slate-500">SKU编码</th>
                    <th className="px-4 py-3 font-medium text-slate-500">规格型号</th>
                    <th className="px-4 py-3 font-medium text-slate-500 w-16">图片</th>
                    <th className="px-4 py-3 font-medium text-slate-500 w-24">采购数量</th>
                    <th className="px-4 py-3 font-medium text-slate-500 w-32">采购单价(元)</th>
                    <th className="px-4 py-3 font-medium text-slate-500 w-32">采购金额(元)</th>
                    <th className="px-4 py-3 font-medium text-slate-500">备注</th>
                    <th className="px-4 py-3 font-medium text-slate-500 w-16">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-2">
                        <input 
                          type="text" 
                          className="w-full bg-transparent border-b border-transparent focus:border-indigo-300 focus:outline-none py-1"
                          value={item.productName}
                          onChange={(e) => handleUpdateItem(item.id, 'productName', e.target.value)}
                          placeholder="请输入名称"
                        />
                      </td>
                      <td className="px-4 py-2 text-slate-500">{item.skuCode || '-'}</td>
                      <td className="px-4 py-2 text-slate-500">{item.spec || '-'}</td>
                      <td className="px-4 py-2">
                        {item.image ? <img src={item.image} className="w-8 h-8 rounded border" /> : '-'}
                      </td>
                      <td className="px-4 py-2">
                        <input 
                          type="number" 
                          className="w-full bg-transparent border-b border-transparent focus:border-indigo-300 focus:outline-none py-1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateItem(item.id, 'quantity', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input 
                          type="number" 
                          className="w-full bg-transparent border-b border-transparent focus:border-indigo-300 focus:outline-none py-1"
                          value={item.unitPrice}
                          onChange={(e) => handleUpdateItem(item.id, 'unitPrice', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-2 font-medium text-slate-900">
                        {item.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        <input 
                          type="text" 
                          className="w-full bg-transparent border-b border-transparent focus:border-indigo-300 focus:outline-none py-1"
                          value={item.remark}
                          onChange={(e) => handleUpdateItem(item.id, 'remark', e.target.value)}
                          placeholder="填写备注"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Summary Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormItem label="总数量">
              <input type="number" className="form-input-custom bg-slate-50" value={totalQuantity} readOnly />
            </FormItem>
            <FormItem label="采购总金额">
              <input type="text" className="form-input-custom bg-slate-50" value={`¥${grandTotal.toFixed(2)}`} readOnly />
            </FormItem>
            <FormItem label="预付金额">
              <input type="text" className="form-input-custom" placeholder="¥0.00" />
            </FormItem>
            <div className="md:col-span-1">
              <FormItem label="付款时间" required>
                <div className="relative">
                  <input type="text" placeholder="请选择日期" className="form-input-custom" readOnly />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </FormItem>
            </div>
          </div>

          <FormItem label="交货时间/合同条款" required>
            <textarea className="form-input-custom h-32 py-3 resize-none" placeholder="请输入具体条款信息" />
          </FormItem>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 shrink-0 bg-slate-50/50">
          <button className="px-6 py-2.5 bg-[#A5CC32] hover:bg-[#92b52b] text-white font-bold rounded shadow-sm transition-colors">
            生成采购合同
          </button>
          <button onClick={handleSubmit} className="px-8 py-2.5 bg-[#82AD00] hover:bg-[#6f9400] text-white font-bold rounded shadow-sm transition-colors">
            提交
          </button>
        </div>
      </div>

      <SelectSKUModal 
        isOpen={isSKUModalOpen} 
        onClose={() => setIsSKUModalOpen(false)} 
        onConfirm={handleSKUConfirm}
      />

      <style>{`
        .form-input-custom {
          width: 100%;
          padding: 0.625rem 0.75rem;
          background-color: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .form-input-custom:focus {
          outline: none;
          border-color: #4f46e5;
          ring: 2px;
          ring-color: #4f46e5;
        }
      `}</style>
    </div>
  );
};

const FormItem = ({ label, required, children }: { label: string; required?: boolean; children?: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-slate-600 flex gap-1">
      {required && <span className="text-rose-500">*</span>}
      {label}
    </label>
    {children}
  </div>
);

export default CreatePurchaseOrderModal;
