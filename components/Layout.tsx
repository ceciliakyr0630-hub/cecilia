
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Package, 
  Sparkles, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronRight,
  ClipboardList,
  ShieldCheck
} from 'lucide-react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'DASHBOARD', label: '控制台', icon: LayoutDashboard },
    { id: 'PURCHASE_ORDERS', label: '采购订单管理', icon: ClipboardList },
    { id: 'INSPECTION_MANAGEMENT', label: '采购验货管理', icon: ShieldCheck },
    { id: 'SUPPLIERS', label: '供应商管理', icon: Users },
    { id: 'INVENTORY', label: '库存查询', icon: Package },
    { id: 'AI_INSIGHTS', label: 'AI 决策助手', icon: Sparkles },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <ShoppingCart className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">ProcureSmart</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as ViewType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#82AD00] text-white font-semibold shadow-md shadow-[#82AD00]/20' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">当前账号</p>
            <div className="flex items-center gap-3">
              <img src="https://picsum.photos/seed/admin/40/40" className="w-8 h-8 rounded-full" alt="avatar" />
              <div>
                <p className="text-sm font-semibold text-slate-900">管理员</p>
                <p className="text-xs text-slate-500">采购部总监</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-slate-500"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="搜索订单、供应商或产品..."
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 rounded-lg transition-colors">
              <span className="text-sm font-medium text-slate-700">系统设置</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="absolute inset-y-0 left-0 w-64 bg-white flex flex-col shadow-2xl">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="text-white w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">ProcureSmart</h1>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-2 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id as ViewType);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive ? 'bg-[#82AD00] text-white' : 'text-slate-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Layout;
