import React, { useState } from 'react';
import { Cpu, Cloud, AlertTriangle, ShieldCheck, Flame, WifiOff, Wifi, Play, RotateCcw } from 'lucide-react';
import { ArabicText } from '../ArabicText';

export const EdgeVsCloudLab: React.FC = () => {
  const [mode, setMode] = useState<'edge' | 'cloud'>('edge');
  const [temperature, setTemperature] = useState<number>(30);
  const [internetConnected, setInternetConnected] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [sprinklerActive, setSprinklerActive] = useState<boolean>(false);
  const [latencyMs, setLatencyMs] = useState<number>(2);
  const [narrative, setNarrative] = useState<string>('الحالة طبيعية. جرب ترفع الحرارة عشان يحصل إنذار حريق وشوف سرعة الاستجابة.');

  const triggerEmergency = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setSprinklerActive(false);

    if (mode === 'edge') {
      // Instant local edge processing
      setLatencyMs(3);
      setNarrative('⚡ استجابة فورية من معالج الـ Edge المحلي (3ms)! السنسور لقى حرارة عالية، المعالج فتح الرشاش في جزء من الثانية بدون ما يحتاج إنترنت أصلاً!');
      setTimeout(() => {
        setSprinklerActive(true);
        setIsProcessing(false);
      }, 350);
    } else {
      // Cloud processing depends on internet
      if (!internetConnected) {
        setLatencyMs(0);
        setNarrative('❌ كارثة وفشل كامل في النظام! الإنترنت فاصل، الباكيت معرفتش تسافر للسحابة عشان تاخد الإذن! المصنع بيولع والسحابة مش عارفة! دي خطورة الاعتماد على الكلاود في حاجات الـ Real-time!');
        setTimeout(() => {
          setIsProcessing(false);
        }, 1500);
      } else {
        setLatencyMs(240);
        setNarrative('🌐 الباكيت طالعة للسحابة (AWS/Azure)... راوتنج + تشفير + سيرفر يحلل البيانات + يرجع أمر الإطفاء... استغرقت 240ms!');
        setTimeout(() => {
          setSprinklerActive(true);
          setIsProcessing(false);
          setNarrative('✅ استلم أمر الإطفاء من الكلاود بعد تأخير ملحوظ (240ms) مقارنة بالـ Edge!');
        }, 1600);
      }
    }
  };

  const handleReset = () => {
    setTemperature(28);
    setSprinklerActive(false);
    setIsProcessing(false);
    setNarrative('تم التصفير ورجعت الحرارة طبيعية.');
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              <Cpu className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Edge vs Cloud Computing Tradeoff Lab
              </h3>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
                محاكي المقارنة الحاسمة بين المعالجة الطرفية (Edge) والحوسبة السحابية (Cloud) في إنترنت الأشياء
              </ArabicText>
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="bg-beige-100 dark:bg-stone-800/80 p-1.5 rounded-2xl flex items-center text-xs font-bold border border-beige-300 dark:border-stone-700">
          <button
            onClick={() => { setMode('edge'); setSprinklerActive(false); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              mode === 'edge'
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            معالجة محلية (Edge Processing) ⚡
          </button>
          <button
            onClick={() => { setMode('cloud'); setSprinklerActive(false); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              mode === 'cloud'
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            معالجة سحابية (Cloud Processing) ☁️
          </button>
        </div>
      </div>

      {/* Control Strip */}
      <div className="bg-[#FAF7F2] dark:bg-stone-950 p-4 rounded-2xl border border-beige-300 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 text-sm">
        {/* Temperature Slider */}
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-stone-700 dark:text-zinc-300 text-xs">درجة الحرارة (Sensor Reading):</span>
              <span className={`font-mono font-bold text-xs ${temperature >= 60 ? 'text-rose-600 animate-pulse' : 'text-stone-800 dark:text-stone-200'}`}>
                {temperature}°C {temperature >= 60 && '🔥 (حريق!)'}
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-48 accent-amber-600"
            />
          </div>

          {/* Internet Toggle (Cloud mode only) */}
          {mode === 'cloud' && (
            <button
              onClick={() => setInternetConnected(!internetConnected)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold border transition-all text-xs ${
                internetConnected
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-200 animate-pulse'
              }`}
            >
              {internetConnected ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              <span>{internetConnected ? 'الإنترنت متصل 🟢' : 'فصل كابل الإنترنت 🔴'}</span>
            </button>
          )}
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-2">
          <button
            onClick={triggerEmergency}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-sm transition-all disabled:opacity-40 text-xs"
          >
            <Flame className="w-4 h-4" />
            <span>تشغيل سيناريو الحريق 🔥</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-beige-100 dark:bg-stone-800 hover:bg-beige-200 text-stone-700 dark:text-stone-300 border border-beige-300 dark:border-stone-700"
            title="تصفير"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Simulation Architecture */}
      <div className="bg-[#FAF8F5] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 rounded-3xl p-8 min-h-[280px] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Step 1: Physical Sensor Unit */}
        <div className={`p-4 rounded-2xl border-2 transition-all text-center min-w-[150px] space-y-1.5 ${
          temperature >= 60 ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40' : 'border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900'
        }`}>
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center mx-auto text-amber-700">
            <Flame className="w-5 h-5" />
          </div>
          <span className="font-mono text-xs font-bold block text-stone-900 dark:text-stone-100">DHT22 Temp Sensor</span>
          <ArabicText className="text-xs text-stone-600 dark:text-zinc-400 block">سنسور الحرارة في المصنع</ArabicText>
          <span className="font-mono text-xs font-bold text-amber-800 dark:text-amber-300 block">{temperature}°C</span>
        </div>

        {/* Path Indicator */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-1.5 px-4">
          <span className="text-xs font-mono text-stone-600 dark:text-zinc-400">
            {mode === 'edge' ? 'SPI/I2C Direct Bus (0.5ms)' : 'WAN / Cellular / Cloud API'}
          </span>
          <div className="w-full h-1.5 bg-beige-200 dark:bg-stone-800 rounded-full relative overflow-hidden">
            {isProcessing && (
              <div className="h-full bg-amber-500 rounded-full animate-[packetMove_1.2s_infinite]" />
            )}
          </div>
          <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400">
            Latency: ~{latencyMs}ms
          </span>
        </div>

        {/* Step 2: Processing Engine (Edge or Cloud) */}
        <div className={`p-5 rounded-2xl border-2 transition-all text-center min-w-[170px] space-y-1.5 ${
          mode === 'edge'
            ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/40'
            : internetConnected
            ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/40'
            : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40'
        }`}>
          <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto">
            {mode === 'edge' ? <Cpu className="w-5 h-5 text-emerald-600" /> : <Cloud className="w-5 h-5 text-blue-600" />}
          </div>
          <span className="font-mono text-xs font-bold block text-stone-900 dark:text-stone-100">
            {mode === 'edge' ? 'EDGE GATEWAY' : 'CLOUD DATA CENTER'}
          </span>
          <ArabicText className="text-xs text-stone-600 dark:text-zinc-400 block">
            {mode === 'edge' ? 'ميكروكنترولر محلي (ESP32/Pi)' : 'سيرفر في ألمانيا أو أمريكا'}
          </ArabicText>
          <span className="px-2.5 py-1 rounded text-xs font-bold font-mono inline-block bg-white dark:bg-stone-900 border border-beige-300 dark:border-stone-700 text-stone-800 dark:text-zinc-200">
            {mode === 'edge' ? 'Local Logic' : internetConnected ? 'Heavy AI Model' : 'Offline / Unreachable'}
          </span>
        </div>

        {/* Path to Actuator */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-1.5 px-4">
          <span className="text-xs font-mono text-stone-600 dark:text-zinc-400">Relay Control Line</span>
          <div className="w-full h-1.5 bg-beige-200 dark:bg-stone-800 rounded-full relative overflow-hidden">
            {sprinklerActive && (
              <div className="h-full bg-emerald-500 rounded-full" />
            )}
          </div>
        </div>

        {/* Step 3: Actuator / Water Sprinkler */}
        <div className={`p-4 rounded-2xl border-2 transition-all text-center min-w-[150px] space-y-1.5 ${
          sprinklerActive ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950/50 shadow-lg' : 'border-beige-300 dark:border-stone-800 bg-white dark:bg-stone-900'
        }`}>
          <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto">
            <ShieldCheck className={`w-5 h-5 ${sprinklerActive ? 'text-emerald-600 animate-bounce' : 'text-stone-400'}`} />
          </div>
          <span className="font-mono text-xs font-bold block text-stone-900 dark:text-stone-100">Fire Sprinkler Relay</span>
          <ArabicText className="text-xs text-stone-600 dark:text-zinc-400 block">رشاش مياه الإطفاء الآلي</ArabicText>
          <span className={`text-xs font-bold block ${sprinklerActive ? 'text-emerald-700 dark:text-emerald-300' : 'text-stone-500 dark:text-zinc-400'}`}>
            {sprinklerActive ? '💧 رشاش المياه شغال!' : '⏸️ مغلق وفي الانتظار'}
          </span>
        </div>
      </div>

      {/* Egyptian Narrative Box */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-sm space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300">
          <span>⚡</span>
          <span>الفرق الجوهري بين الحالتين:</span>
        </div>
        <ArabicText className="font-arabic leading-relaxed text-stone-800 dark:text-zinc-200 font-medium">
          {narrative}
        </ArabicText>
      </div>

      {/* Comparison Exam Table */}
      <div className="border border-beige-300 dark:border-stone-800 rounded-2xl overflow-hidden text-sm">
        <div className="bg-beige-100 dark:bg-stone-800 p-3 font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between">
          <span>مقارنة امتحان الـ IoT: Edge Computing vs Cloud Computing</span>
          <span className="text-xs font-normal text-stone-600 dark:text-zinc-400 font-arabic">سؤال مقالي بيتكرر في امتحانات الدكتورة</span>
        </div>

        <div className="divide-y divide-beige-200 dark:divide-stone-800">
          <div className="grid grid-cols-1 md:grid-cols-4 p-3 bg-white dark:bg-stone-900 gap-2 items-center">
            <span className="font-bold text-stone-900 dark:text-stone-100 font-mono text-xs">Edge Computing (الطرفية)</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-arabic text-xs">Latency منعدم تقريباً (مللي ثانية)</span>
            <span className="text-stone-700 dark:text-zinc-300 font-arabic text-xs">بتشتغل بدون إنترنت (High Reliability)</span>
            <ArabicText className="text-xs text-stone-600 dark:text-zinc-400">مثالية للـ Mission-Critical زي الحريق والفرامل</ArabicText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 p-3 bg-[#FAF7F2] dark:bg-stone-950 gap-2 items-center">
            <span className="font-bold text-stone-900 dark:text-stone-100 font-mono text-xs">Cloud Computing (السحابية)</span>
            <span className="text-amber-700 dark:text-amber-400 font-semibold font-arabic text-xs">Latency أعلى (حسب سرعة النت)</span>
            <span className="text-rose-600 dark:text-rose-400 font-arabic text-xs">لو النت قطع السيستم يقف!</span>
            <ArabicText className="text-xs text-stone-600 dark:text-zinc-400">مثالية لتحليل الداتا الضخمة (Big Data & Heavy AI)</ArabicText>
          </div>
        </div>
      </div>
    </div>
  );
};
