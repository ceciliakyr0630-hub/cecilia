
import React from 'react';
import { X, Calendar, Upload, PackageSearch, Trash2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePurchaseOrderModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
            <FormItem label="包装设计图">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                <Upload className="w-4 h-4" /> 选择文件
              </button>
            </FormItem>
          </div>

          {/* Purchase Info Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-l-4 border-indigo-600 pl-3">
              <h3 className="font-bold text-slate-800">采购信息</h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold">选择SKU</button>
            </div>
            <div className="border border-slate-100 rounded-lg overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 font-medium text-slate-500">产品名称</th>
                    <th className="px-4 py-3 font-medium text-slate-500">SKU编码</th>
                    <th className="px-4 py-3 font-medium text-slate-500">规格型号</th>
                    <th className="px-4 py-3 font-medium text-slate-500">图片</th>
                    <th className="px-4 py-3 font-medium text-slate-500">采购数量</th>
                    <th className="px-4 py-3 font-medium text-slate-500">采购单价(元)</th>
                    <th className="px-4 py-3 font-medium text-slate-500">采购金额(元)</th>
                    <th className="px-4 py-3 font-medium text-slate-500">备注</th>
                    <th className="px-4 py-3 font-medium text-slate-500">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={9} className="py-20 text-center text-slate-300">
                      <div className="flex flex-col items-center">
                        <PackageSearch className="w-12 h-12 mb-2 opacity-20" />
                        <p>暂无数据</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Summary Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormItem label="总数量">
              <input type="number" className="form-input-custom" readOnly />
            </FormItem>
            <FormItem label="采购总金额">
              <input type="text" className="form-input-custom" readOnly />
            </FormItem>
            <FormItem label="预付金额">
              <input type="text" className="form-input-custom" readOnly />
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
            <textarea className="form-input-custom h-32 py-3 resize-none" />
          </FormItem>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 shrink-0 bg-slate-50/50">
          <button className="px-6 py-2.5 bg-[#A5CC32] hover:bg-[#92b52b] text-white font-bold rounded shadow-sm transition-colors">
            生成采购合同
          </button>
          <button onClick={onClose} className="px-8 py-2.5 bg-[#82AD00] hover:bg-[#6f9400] text-white font-bold rounded shadow-sm transition-colors">
            保存
          </button>
        </div>
      </div>

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

// Internal component for form layout, with children prop marked optional to satisfy TypeScript's JSX element check.
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
