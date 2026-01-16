
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const data = [
  { name: '1月', value: 4000, spend: 2400 },
  { name: '2月', value: 3000, spend: 1398 },
  { name: '3月', value: 2000, spend: 9800 },
  { name: '4月', value: 2780, spend: 3908 },
  { name: '5月', value: 1890, spend: 4800 },
  { name: '6月', value: 2390, spend: 3800 },
  { name: '7月', value: 3490, spend: 4300 },
];

const StatCard = ({ title, value, trend, trendType, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2">
      {trendType === 'up' ? (
        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
      ) : (
        <ArrowDownRight className="w-4 h-4 text-rose-500" />
      )}
      <span className={`text-sm font-medium ${trendType === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend}
      </span>
      <span className="text-sm text-slate-400">较上月</span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">数据总览</h2>
        <p className="text-slate-500">欢迎回来，这是您当前的采购系统运行状态。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="总采购支出" 
          value="¥1,284,500" 
          trend="12.5%" 
          trendType="up" 
          icon={TrendingUp} 
          color="bg-indigo-600"
        />
        <StatCard 
          title="待处理申请" 
          value="24" 
          trend="8.2%" 
          trendType="down" 
          icon={Clock} 
          color="bg-amber-500"
        />
        <StatCard 
          title="已完成订单" 
          value="482" 
          trend="24.1%" 
          trendType="up" 
          icon={CheckCircle2} 
          color="bg-emerald-500"
        />
        <StatCard 
          title="库存预警" 
          value="5" 
          trend="2.4%" 
          trendType="down" 
          icon={AlertCircle} 
          color="bg-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">采购支出趋势</h3>
            <select className="text-sm border-slate-200 rounded-lg focus:ring-indigo-500">
              <option>最近 6 个月</option>
              <option>最近 12 个月</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="spend" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">待办任务</h3>
          <div className="space-y-4">
            {[
              { id: 1, text: '审批 办公家具 采购申请', type: 'approval', date: '10分钟前' },
              { id: 2, text: '更新 联想电脑 供应商合同', type: 'contract', date: '2小时前' },
              { id: 3, text: '库存预警：打印纸不足 50 包', type: 'inventory', date: '4小时前' },
              { id: 4, text: '确认 顺丰快递 订单状态', type: 'shipping', date: '昨天' },
            ].map(task => (
              <div key={task.id} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                <div className={`w-2 h-10 rounded-full shrink-0 ${
                  task.type === 'approval' ? 'bg-amber-400' :
                  task.type === 'contract' ? 'bg-indigo-400' :
                  task.type === 'inventory' ? 'bg-rose-400' : 'bg-slate-300'
                }`}></div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {task.text}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{task.date}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
            查看全部任务
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
