
import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, Lightbulb, TrendingDown, Send, MessageSquare } from 'lucide-react';
import { getProcurementInsights, chatWithAssistant } from '../services/geminiService';

const AIInsights: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<any[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const data = await getProcurementInsights("Recent spend: $1.2M, Top category: Electronics, Suppliers: 45 active, Late deliveries: 3%");
      setInsights(data.insights);
      setLoading(false);
    };
    fetchInsights();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMessage = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await chatWithAssistant([], userMessage);
      setChatHistory(prev => [...prev, { role: 'assistant', content: response || '无法获取回复' }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'assistant', content: 'AI 服务暂时不可用。' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="text-indigo-600 w-6 h-6" />
            AI 决策助手
          </h2>
          <p className="text-slate-500">利用生成式 AI 优化您的采购流程并发现潜在的节省空间。</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold">
          <BrainCircuit className="w-4 h-4" />
          正在分析实时数据...
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Auto-Insights */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-900">智能建议</h3>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-slate-200 animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : (
            insights.map((insight, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    insight.impact === 'High' ? 'bg-indigo-100 text-indigo-600' : 
                    insight.impact === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-900">{insight.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                        insight.impact === 'High' ? 'bg-indigo-600 text-white' : 
                        insight.impact === 'Medium' ? 'bg-amber-500 text-white' : 'bg-slate-400 text-white'
                      }`}>
                        影响力: {insight.impact}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{insight.description}</p>
                    <button className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1">
                      应用建议 <TrendingDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: AI Chatbot */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
          <div className="p-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">采购顾问 Chat</h3>
              <p className="text-xs text-emerald-500 flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                在线
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                <p>我是您的 AI 采购顾问。您可以问我：<br/>“哪家办公用品供应商的评价最好？”<br/>“分析一下上个季度的成本支出”</p>
              </div>
            )}
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-slate-100 text-slate-900 rounded-bl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 px-4 py-2 rounded-2xl text-sm rounded-bl-none">
                  AI 正在思考...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100">
            <div className="relative">
              <input 
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="在此输入您的问题..."
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              />
              <button 
                type="submit"
                disabled={isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
