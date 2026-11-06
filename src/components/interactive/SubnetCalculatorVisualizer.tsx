import React, { useState } from 'react';
import { Calculator, Binary, Lightbulb } from 'lucide-react';
import { ArabicText } from '../ArabicText';

export const SubnetCalculatorVisualizer: React.FC = () => {
  const [ipInput, setIpInput] = useState<string>('192.168.1.100');
  const [prefixInput, setPrefixInput] = useState<number>(24);

  // Parse IP
  const octets = ipInput.split('.').map(o => parseInt(o, 10));
  const isValidIp = octets.length === 4 && octets.every(o => !isNaN(o) && o >= 0 && o <= 255);

  const calculateSubnet = () => {
    if (!isValidIp) {
      return {
        prefix: prefixInput,
        maskStr: '255.255.255.0',
        netStr: '192.168.1.0',
        broadcastStr: '192.168.1.255',
        firstHostStr: '192.168.1.1',
        lastHostStr: '192.168.1.254',
        totalHosts: 256,
        usableHosts: 254,
        ipBin32: '11000000101010000000000101100100',
        maskBin32: '11111111111111111111111100000000',
        netBin32: '11000000101010000000000100000000',
        ipClass: 'Class C',
        isPrivate: true,
      };
    }

    const ipNum = (octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3];
    const maskNum = prefixInput === 0 ? 0 : (~0 << (32 - prefixInput)) >>> 0;
    const netNum = (ipNum & maskNum) >>> 0;
    const wildCard = (~maskNum) >>> 0;
    const broadcastNum = (netNum | wildCard) >>> 0;

    const numToIp = (num: number) => [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join('.');

    const toBin32 = (num: number) => (num >>> 0).toString(2).padStart(32, '0');

    const total = Math.pow(2, 32 - prefixInput);
    const usable = prefixInput >= 31 ? 0 : total - 2;

    const first = prefixInput >= 31 ? netNum : netNum + 1;
    const last = prefixInput >= 31 ? broadcastNum : broadcastNum - 1;

    // IP Class detection
    let cls = 'Classless / CIDR';
    const firstOct = octets[0];
    if (firstOct >= 1 && firstOct <= 126) cls = 'Class A (افتراضي /8)';
    else if (firstOct >= 128 && firstOct <= 191) cls = 'Class B (افتراضي /16)';
    else if (firstOct >= 192 && firstOct <= 223) cls = 'Class C (افتراضي /24)';
    else if (firstOct >= 224 && firstOct <= 239) cls = 'Class D (Multicast)';

    // Private IP detection
    const isPriv =
      (octets[0] === 10) ||
      (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
      (octets[0] === 192 && octets[1] === 168);

    return {
      prefix: prefixInput,
      maskStr: numToIp(maskNum),
      netStr: numToIp(netNum),
      broadcastStr: numToIp(broadcastNum),
      firstHostStr: numToIp(first),
      lastHostStr: numToIp(last),
      totalHosts: total,
      usableHosts: usable,
      ipBin32: toBin32(ipNum),
      maskBin32: toBin32(maskNum),
      netBin32: toBin32(netNum),
      ipClass: cls,
      isPrivate: isPriv,
    };
  };

  const subnetData = calculateSubnet();

  const presets = [
    { label: 'LAN منزلي (/24)', ip: '192.168.1.50', p: 24 },
    { label: 'شبكة شركة متوسطة (/16)', ip: '172.16.20.10', p: 16 },
    { label: 'شبكة كبرى Enterprise (/8)', ip: '10.50.100.1', p: 8 },
    { label: 'Point-to-Point Link (/30)', ip: '10.0.0.1', p: 30 },
  ];

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-beige-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
            <Calculator className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              IPv4 Subnet Calculator & Bitwise AND Engine
            </h3>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-300">
              حاسبة تقسيم الشبكات وعناوين البث وعدد الأجهزة الصالحة مع تمثيل البتات الثنائية
            </ArabicText>
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          {presets.map(preset => (
            <button
              key={preset.label}
              onClick={() => {
                setIpInput(preset.ip);
                setPrefixInput(preset.p);
              }}
              className="px-3 py-1.5 text-[13px] rounded-lg font-semibold bg-beige-100 dark:bg-stone-800 hover:bg-beige-200 dark:hover:bg-stone-700 text-stone-800 dark:text-zinc-200 border border-beige-300 dark:border-stone-700 transition-colors shadow-2xs"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-[#FAF7F2] dark:bg-stone-950 p-5 rounded-2xl border border-beige-300 dark:border-stone-800">
        <div className="md:col-span-5 space-y-2">
          <label className="text-sm font-bold text-stone-800 dark:text-zinc-200 block">
            اكتب أي عنوان IP:
          </label>
          <input
            type="text"
            value={ipInput}
            onChange={(e) => setIpInput(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-beige-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-mono text-base font-bold text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400"
            placeholder="192.168.10.1"
          />
        </div>

        <div className="md:col-span-7 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-stone-800 dark:text-zinc-200">
              Prefix Length (حرك السلايدر لتغيير القناع):
            </label>
            <span className="font-mono text-sm font-bold text-stone-900 dark:text-zinc-100 bg-white dark:bg-stone-900 px-3 py-1 rounded-md border border-beige-300 dark:border-stone-700">
              /{subnetData.prefix} ({subnetData.maskStr})
            </span>
          </div>
          <input
            type="range"
            min={8}
            max={30}
            value={prefixInput}
            onChange={(e) => setPrefixInput(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-stone-700 dark:accent-zinc-300"
          />
          <div className="flex justify-between text-[13px] text-stone-600 dark:text-zinc-400 font-mono font-medium">
            <span>/8</span>
            <span>/16</span>
            <span>/24</span>
            <span>/30</span>
          </div>
        </div>
      </div>

      {/* Bitwise Table */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 border border-stone-800 font-mono text-sm overflow-x-auto space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-zinc-300 border-b border-stone-800 pb-2.5 gap-2">
          <span className="font-sans font-bold text-zinc-200 text-sm flex items-center gap-2">
            <Binary className="w-4 h-4 text-amber-400" />
            Live Bitwise AND Operation:
          </span>
          <span className="text-[13px] text-zinc-400">قاعدة الامتحان: 1 AND 1 = 1 | أي حاجة مع 0 بتنزل صفر</span>
        </div>

        <div className="space-y-2.5">
          {/* IP */}
          <div className="flex items-center gap-3">
            <span className="w-28 text-zinc-400 shrink-0 font-sans text-right">Host IP:</span>
            <div className="flex gap-2 text-zinc-200">
              {[0, 8, 16, 24].map((start, idx) => (
                <div key={idx} className="bg-stone-950 px-2.5 py-1 rounded border border-stone-800 tracking-wider">
                  {subnetData.ipBin32.slice(start, start + 8)}
                </div>
              ))}
            </div>
            <span className="text-zinc-400">({octets.join('.')})</span>
          </div>

          {/* Mask */}
          <div className="flex items-center gap-3">
            <span className="w-28 text-zinc-400 shrink-0 font-sans text-right">Subnet Mask:</span>
            <div className="flex gap-2 text-amber-300 font-semibold">
              {[0, 8, 16, 24].map((start, idx) => (
                <div key={idx} className="bg-stone-950 px-2.5 py-1 rounded border border-stone-800 tracking-wider">
                  {subnetData.maskBin32.slice(start, start + 8)}
                </div>
              ))}
            </div>
            <span className="text-zinc-400">({subnetData.maskStr})</span>
          </div>

          <div className="border-t border-stone-800 my-1" />

          {/* Result Network IP */}
          <div className="flex items-center gap-3">
            <span className="w-28 text-emerald-400 shrink-0 font-sans font-bold text-right">Network IP:</span>
            <div className="flex gap-2 text-emerald-300 font-bold">
              {[0, 8, 16, 24].map((start, idx) => (
                <div key={idx} className="bg-emerald-950/50 px-2.5 py-1 rounded border border-emerald-800 tracking-wider">
                  {subnetData.netBin32.slice(start, start + 8)}
                </div>
              ))}
            </div>
            <span className="text-emerald-400 font-bold">({subnetData.netStr})</span>
          </div>
        </div>
      </div>

      {/* Egyptian Slang Explanation Box */}
      <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/25 border border-amber-300 dark:border-amber-700/60 space-y-2">
        <div className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-200">
          <Lightbulb className="w-4 h-4" />
          <span>إزاي تحسبها في ورقة الامتحان في دقيقة؟</span>
        </div>
        <ArabicText className="text-sm text-stone-800 dark:text-zinc-200 leading-[1.75] font-medium">
          بص يا سيدي: لما تلاقي قناع الشبكة 255، نزل الرقم بتاع الـ IP زي ما هو! (يعني 192 بتنزل 192، و 168 بتنزل 168). لكن لما تلاقي 0 في القناع، صفره تماماً! كدة طلعت عنوان الشبكة (Network Address).
          وعشان تجيب عنوان البث (Broadcast)، اقلب كل الأصفار لـ 255! وعدد الأجهزة المتاحة هو عدد احتمالات الأصفار ناقص اتنين (واحد للشبكة وواحد للبث).
        </ArabicText>
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-1.5">
          <span className="text-[13px] font-mono font-bold text-stone-600 dark:text-zinc-400 uppercase block">Network Address</span>
          <div className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">
            {subnetData.netStr}
          </div>
          <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-300">عنوان الشبكة بالكامل (محدش بياخده كـ IP شخصي)</ArabicText>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-1.5">
          <span className="text-[13px] font-mono font-bold text-stone-600 dark:text-zinc-400 uppercase block">Usable Host Range</span>
          <div className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100">
            {subnetData.firstHostStr} - {subnetData.lastHostStr}
          </div>
          <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-300">
            الأجهزة المتاحة: <strong>{subnetData.usableHosts.toLocaleString()}</strong> جهاز يقدروا يشتغلوا
          </ArabicText>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-1.5">
          <span className="text-[13px] font-mono font-bold text-stone-600 dark:text-zinc-400 uppercase block">Broadcast Address</span>
          <div className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">
            {subnetData.broadcastStr}
          </div>
          <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-300">عنوان البث لكل الأجهزة في الشبكة</ArabicText>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-1.5">
          <span className="text-[13px] font-mono font-bold text-stone-600 dark:text-zinc-400 uppercase block">Class & Scope</span>
          <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
            {subnetData.ipClass}
          </div>
          <ArabicText className="text-[13px] text-stone-600 dark:text-zinc-300">
            {subnetData.isPrivate ? 'آي بي برايفت محلي (Private IP)' : 'آي بي بابليك ع النت (Public IP)'}
          </ArabicText>
        </div>
      </div>
    </div>
  );
};

export default SubnetCalculatorVisualizer;
