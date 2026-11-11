import React, { useId, useState } from 'react';
import { Calculator, Binary, Lightbulb } from 'lucide-react';
import { ArabicText } from '../ArabicText';
import { LabChallenge, challengeFeedback as feedback, type ChallengeMission } from './LabChallenge';

type Scope = 'private' | 'public' | 'loopback' | 'linkLocal' | 'multicast' | 'reserved';

const SCOPE_LABEL: Record<Scope, string> = {
  private: 'عنوان خاص بالشبكة المحلية (Private IP)',
  public: 'عنوان عام على الإنترنت (Public IP)',
  loopback: 'عنوان الجهاز لنفسه (Loopback)',
  linkLocal: 'عنوان تلقائي لما مفيش DHCP (APIPA)',
  multicast: 'بث لمجموعة أجهزة (Multicast)',
  reserved: 'عنوان محجوز (Reserved)',
};

const OCTET_STARTS = [0, 8, 16, 24];
const EMPTY = '—';

const parseIPv4 = (raw: string): number[] | null => {
  const parts = raw.trim().split('.');
  if (parts.length !== 4) return null;
  const nums = parts.map(p => (/^\d{1,3}$/.test(p) ? parseInt(p, 10) : NaN));
  return nums.every(n => n >= 0 && n <= 255) ? nums : null;
};

// `<< 32` wraps around in JS, so /0 is special-cased.
const maskFor = (prefix: number) => (prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0);

const numToIp = (num: number) =>
  [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.');

const toBin32 = (num: number) => (num >>> 0).toString(2).padStart(32, '0');

const classify = (first: number): { name: string; hint: string } => {
  if (first === 0) return { name: 'Reserved', hint: '0.0.0.0/8' };
  if (first === 127) return { name: 'Loopback', hint: '127.0.0.0/8' };
  if (first <= 126) return { name: 'Class A', hint: 'Default /8' };
  if (first <= 191) return { name: 'Class B', hint: 'Default /16' };
  if (first <= 223) return { name: 'Class C', hint: 'Default /24' };
  if (first <= 239) return { name: 'Class D', hint: 'Multicast' };
  return { name: 'Class E', hint: 'Reserved' };
};

const scopeOf = ([a, b]: number[]): Scope => {
  if (a === 127) return 'loopback';
  if (a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)) return 'private';
  if (a === 169 && b === 254) return 'linkLocal';
  if (a >= 224 && a <= 239) return 'multicast';
  if (a === 0 || a >= 240) return 'reserved';
  return 'public';
};

const calculateSubnet = (octets: number[] | null, prefix: number) => {
  const mask = maskFor(prefix);
  const wildcard = (~mask) >>> 0;
  const hostBits = 32 - prefix;
  const total = 2 ** hostBits;
  // RFC 3021: /31 has two usable addresses, /32 is a single host.
  const usable = prefix === 32 ? 1 : prefix === 31 ? 2 : total - 2;

  const base = {
    maskStr: numToIp(mask),
    wildcardStr: numToIp(wildcard),
    maskBin: toBin32(mask),
    hostBits,
    total,
    usable,
  };

  if (!octets) return { ...base, addr: null };

  const ipNum = ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
  const net = (ipNum & mask) >>> 0;
  const broadcast = (net | wildcard) >>> 0;
  const first = prefix >= 31 ? net : net + 1;
  const last = prefix >= 31 ? broadcast : broadcast - 1;

  return {
    ...base,
    addr: {
      ipBin: toBin32(ipNum),
      netBin: toBin32(net),
      netStr: numToIp(net),
      broadcastStr: numToIp(broadcast),
      firstStr: numToIp(first),
      lastStr: numToIp(last),
      cls: classify(octets[0]),
      scope: scopeOf(octets),
    },
  };
};

const PRESETS = [
  { ar: 'شبكة منزلية', en: 'Home LAN', ip: '192.168.1.50', p: 24 },
  { ar: 'شبكة شركة متوسطة', en: 'Medium Office', ip: '172.16.20.10', p: 16 },
  { ar: 'شبكة كبيرة', en: 'Enterprise', ip: '10.50.100.1', p: 8 },
  { ar: 'وصلة بين راوترين', en: 'Point-to-Point', ip: '10.0.0.1', p: 30 },
  { ar: 'جهاز واحد', en: 'Single Host', ip: '10.1.1.1', p: 32 },
];

const Prefix: React.FC<{ n: number }> = ({ n }) => (
  <bdi dir="ltr" className="font-mono font-semibold text-stone-900 dark:text-stone-100">/{n}</bdi>
);

type BitTone = 'ip' | 'mask' | 'net';

const BIT_TONE: Record<BitTone, { on: string; box: string; label: string; value: string }> = {
  ip: {
    on: 'text-zinc-100',
    box: 'bg-stone-950 border-stone-800',
    label: 'text-zinc-400',
    value: 'text-zinc-400',
  },
  mask: {
    on: 'text-amber-300 font-semibold',
    box: 'bg-stone-950 border-stone-800',
    label: 'text-zinc-400',
    value: 'text-zinc-400',
  },
  net: {
    on: 'text-emerald-300 font-bold',
    box: 'bg-emerald-950/50 border-emerald-800',
    label: 'text-emerald-400 font-bold',
    value: 'text-emerald-400 font-bold',
  },
};

interface BitRowProps {
  label: string;
  bits: string | null;
  value: string;
  prefix: number;
  tone: BitTone;
}

// Network bits are bright, host bits are dimmed.
const BitRow: React.FC<BitRowProps> = ({ label, bits, value, prefix, tone }) => {
  const t = BIT_TONE[tone];
  const bin = bits ?? '·'.repeat(32);
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 sm:contents">
        <span dir="rtl" className={`font-arabic text-sm sm:w-60 shrink-0 ${t.label}`}>{label}</span>
        <span className={`font-mono text-sm whitespace-nowrap sm:order-3 ${t.value}`}>({value})</span>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:order-2">
        {OCTET_STARTS.map(start => (
          <div key={start} className={`px-2 py-1 rounded border tracking-wider ${t.box}`}>
            {bin.split('').slice(start, start + 8).map((bit, i) => (
              <span key={i} className={bits && start + i < prefix ? t.on : 'text-zinc-400'}>{bit}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const CARD = 'p-4 rounded-2xl bg-[#FAF7F2] dark:bg-stone-950 border border-beige-300 dark:border-stone-800 space-y-1.5';
const CardLabel: React.FC<{ children: string }> = ({ children }) => (
  <div>
    <ArabicText as="span" className="text-xs font-bold text-stone-600 dark:text-zinc-400">{children}</ArabicText>
  </div>
);

const CARD_NOTE = 'text-xs text-stone-600 dark:text-zinc-400';
const VALUE = 'font-mono text-base font-bold text-stone-900 dark:text-stone-100 break-all';

export const SubnetCalculatorVisualizer: React.FC = () => {
  const [ipInput, setIpInput] = useState<string>('192.168.1.100');
  const [prefixInput, setPrefixInput] = useState<number>(24);
  const ipId = useId();
  const prefixId = useId();

  const octets = parseIPv4(ipInput);
  const data = calculateSubnet(octets, prefixInput);
  const addr = data.addr;
  const ipInvalid = octets === null;
  const missions: ChallengeMission[] = [
    { id: 'office-50', title: 'Plan a subnet for 50 hosts', titleAr: 'خطّط Subnet لـ 50 جهاز', goal: 'Keep host 192.168.1.130. Choose the smallest traditional subnet with at least 50 usable host addresses, then inspect its network and broadcast boundaries.', goalAr: 'خلّي عنوان الجهاز 192.168.1.130. اختار أصغر Subnet تقليدية فيها 50 عنوان جهاز صالح على الأقل، وبعدها افحص حدود الشبكة والـ Broadcast.', hint: 'Reserve the network and broadcast addresses. Compare the usable count before and after one prefix step.', hintAr: 'احجز عنواني الشبكة والـ Broadcast. قارن عدد الأجهزة الصالحة قبل خطوة في الـ Prefix وبعدها.', start: () => { setIpInput('192.168.1.130'); setPrefixInput(28); },
      evaluate: () => !addr || ipInput.trim() !== '192.168.1.130' ? feedback('retry', 'Use the required host address 192.168.1.130.', 'استخدم عنوان الجهاز المطلوب 192.168.1.130.') : data.usable < 50 ? feedback('retry', `Only ${data.usable} hosts fit. Allocate more host bits.`, `المتاح ${data.usable} جهاز بس. خصّص بتات أجهزة أكتر.`) : prefixInput !== 26 ? feedback('retry', 'The subnet fits, but a smaller address block also fits. Increase the prefix.', 'الـ Subnet كفاية، بس فيه بلوك عناوين أصغر يكفي برضه. زوّد الـ Prefix.') : feedback('success', 'Smallest fit: /26, 62 usable hosts. Network 192.168.1.128; broadcast 192.168.1.191.', 'أصغر حجم مناسب: /26، وفيه 62 جهاز صالح. عنوان الشبكة 192.168.1.128؛ والـ Broadcast هو 192.168.1.191.') },
    { id: 'router-pair', title: 'Use both point-to-point addresses', titleAr: 'استخدم عنواني وصلة Point-to-Point', goal: 'Keep 10.0.0.1 on a point-to-point link. Choose the smallest subnet with two usable addresses under RFC 3021; avoid a traditional broadcast reservation.', goalAr: 'خلّي 10.0.0.1 على وصلة Point-to-Point. اختار أصغر Subnet فيها عنوانين صالحين حسب الـ RFC 3021؛ من غير حجز Broadcast تقليدي.', hint: 'Compare /30, /31 and /32. A /32 names one host; RFC 3021 changes /31 usability.', hintAr: 'قارن /30 و/31 و/32. الـ /32 بتحدّد جهاز واحد؛ والـ RFC 3021 بيغيّر استخدام /31.', start: () => { setIpInput('10.0.0.1'); setPrefixInput(30); },
      evaluate: () => !addr || ipInput.trim() !== '10.0.0.1' ? feedback('retry', 'Keep the required endpoint 10.0.0.1.', 'خلّي عنوان الطرف المطلوب 10.0.0.1.') : prefixInput === 31 && data.usable === 2 ? feedback('success', 'RFC 3021 fit: /31 uses 10.0.0.0 and 10.0.0.1 as the two endpoints.', 'الحجم المناسب حسب الـ RFC 3021: /31 بتستخدم 10.0.0.0 و10.0.0.1 لطرفي الوصلة.') : feedback('retry', prefixInput === 32 ? 'A /32 has only one endpoint. Add one host bit.' : 'Both endpoints fit, but the allocation can be smaller under RFC 3021.', prefixInput === 32 ? 'الـ /32 فيها طرف واحد بس. زوّد بت أجهزة واحد.' : 'الطرفين كفاية، بس ممكن تصغّر المساحة حسب الـ RFC 3021.') },
  ];

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-beige-300 dark:border-stone-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              <Calculator className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                IPv4 Subnet Calculator &amp; Bitwise AND Engine
              </h3>
              <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
                حاسبة الـ Subnetting: اكتب أي عنوان IP واختار القناع، وشوف عنوان الشبكة والـ Broadcast وعدد الأجهزة مع تمثيل البتات الثنائية
              </ArabicText>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          {PRESETS.map(preset => {
            const active = ipInput.trim() === preset.ip && prefixInput === preset.p;
            return (
              <button
                key={preset.en}
                onClick={() => {
                  setIpInput(preset.ip);
                  setPrefixInput(preset.p);
                }}
                aria-pressed={active}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-semibold border transition-colors ${
                  active
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100 shadow-sm'
                    : 'bg-beige-100 dark:bg-stone-800 hover:bg-beige-200 dark:hover:bg-stone-700 text-stone-700 dark:text-zinc-300 border-beige-300 dark:border-stone-700'
                }`}
              >
                <span dir="rtl" className="font-arabic">{preset.ar} ({preset.en})</span>
                <span className="font-mono">/{preset.p}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Controls */}
      <LabChallenge missions={missions} />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-[#FAF7F2] dark:bg-stone-950 p-5 rounded-2xl border border-beige-300 dark:border-stone-800">
        <div className="md:col-span-5 space-y-2">
          <label htmlFor={ipId} className="block">
            <ArabicText as="span" className="text-sm font-bold text-stone-800 dark:text-zinc-200">
              عنوان الـ IP (IPv4 Address)
            </ArabicText>
          </label>
          <input
            id={ipId}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            spellCheck={false}
            dir="ltr"
            value={ipInput}
            onChange={(e) => setIpInput(e.target.value)}
            aria-invalid={ipInvalid}
            className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-stone-900 font-mono text-base font-bold text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 ${
              ipInvalid
                ? 'border-rose-400 dark:border-rose-500/70 focus:ring-rose-300 dark:focus:ring-rose-500/50'
                : 'border-beige-300 dark:border-stone-700 focus:ring-stone-400 dark:focus:ring-stone-500'
            }`}
            placeholder="192.168.10.1"
          />
          {ipInvalid && (
            <span
              role="alert"
              dir="rtl"
              className="font-arabic block text-sm font-semibold text-rose-700 dark:text-rose-300"
            >
              العنوان مش صحيح: اكتب 4 أرقام من 0 لـ 255 بينهم نقط (مثال: 192.168.1.10)
            </span>
          )}
        </div>

        <div className="md:col-span-7 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor={prefixId}>
              <ArabicText as="span" className="text-sm font-bold text-stone-800 dark:text-zinc-200">
                طول البريفكس (Prefix Length)
              </ArabicText>
            </label>
            <span className="font-mono text-sm font-bold text-stone-900 dark:text-zinc-100 bg-white dark:bg-stone-900 px-3 py-1 rounded-md border border-beige-300 dark:border-stone-700">
              /{prefixInput} ({data.maskStr})
            </span>
          </div>
          <input
            id={prefixId}
            type="range"
            min={0}
            max={32}
            value={prefixInput}
            onChange={(e) => setPrefixInput(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-stone-700 dark:accent-zinc-300"
          />
          <div className="flex justify-between text-xs text-stone-600 dark:text-zinc-400 font-mono font-medium">
            <span>/0</span>
            <span>/8</span>
            <span>/16</span>
            <span>/24</span>
            <span>/32</span>
          </div>
          <ArabicText className="text-xs text-stone-600 dark:text-zinc-400">
            حرّك السلايدر عشان تغيّر القناع (Subnet Mask)
          </ArabicText>
        </div>
      </div>

      {/* Bitwise Table */}
      <div data-lab-scene className="bg-stone-900 text-stone-100 rounded-2xl p-5 border border-stone-800 text-sm overflow-x-auto space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-zinc-300 border-b border-stone-800 pb-2.5 gap-2">
          <span className="font-bold text-zinc-200 text-sm flex items-center gap-2">
            <Binary className="w-4 h-4 text-amber-400 shrink-0" />
            <span dir="rtl" className="font-arabic">عملية الـ AND على مستوى البت (Bitwise AND)</span>
          </span>
          <span className="flex flex-wrap items-center gap-x-2 text-xs text-zinc-400">
            <span dir="rtl" className="font-arabic">قاعدة الامتحان:</span>
            <code className="font-mono text-amber-300">1 AND 1 = 1</code>
            <span dir="rtl" className="font-arabic">وأي حاجة مع 0 بتنزل صفر</span>
          </span>
        </div>

        <div className="space-y-2.5 font-mono">
          <BitRow
            label="عنوان الجهاز (Host IP)"
            bits={addr?.ipBin ?? null}
            value={addr ? ipInput.trim() : EMPTY}
            prefix={prefixInput}
            tone="ip"
          />
          <BitRow
            label="قناع الشبكة (Subnet Mask)"
            bits={data.maskBin}
            value={data.maskStr}
            prefix={prefixInput}
            tone="mask"
          />

          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono" aria-hidden="true">
            <span className="h-px flex-1 bg-stone-800" />
            AND
            <span className="h-px flex-1 bg-stone-800" />
          </div>

          <BitRow
            label="عنوان الشبكة (Network Address)"
            bits={addr?.netBin ?? null}
            value={addr?.netStr ?? EMPTY}
            prefix={prefixInput}
            tone="net"
          />
        </div>

        <span dir="rtl" className="font-arabic block text-xs text-zinc-400 border-t border-stone-800 pt-2.5">
          الأرقام الواضحة هي بتات الشبكة (Network Bits)، والأرقام الرمادية هي بتات الأجهزة (Host Bits).
        </span>
      </div>

      {/* Step-by-step subnet explanation */}
      <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/25 border border-amber-300 dark:border-amber-700/60 space-y-2">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
          <Lightbulb className="w-4 h-4 shrink-0" />
          <span className="text-sm font-bold">Step-by-step subnet calculation</span>
          <ArabicText as="span" className="text-sm font-normal">خطوات حساب الـSubnet</ArabicText>
        </div>
        <p dir="ltr" className="text-sm text-stone-800 dark:text-zinc-200 font-medium leading-relaxed">
          {addr
            ? `Apply bitwise AND between ${ipInput.trim()} and ${data.maskStr} to get ${addr.netStr}. A mask octet of 255 keeps the matching IP octet; 0 clears it. In a traditional subnet, set every host bit to 1 for the broadcast address and calculate usable hosts as 2^${data.hostBits} − 2; /31 and /32 use the special cases shown below.`
            : 'Enter a valid IPv4 address to apply the subnet mask and calculate the network address.'}
        </p>
        <ArabicText className="text-sm text-stone-800 dark:text-zinc-200 font-medium">
          بص يا هندسة: لما تلاقي 255 في القناع، انزل الرقم بتاع الـ IP زي ما هو (يعني 192 تنزل 192، و168 تنزل 168). ولما تلاقي 0 في القناع، صفّر الخانة دي خالص. كده طلع معاك عنوان الشبكة (Network Address). وعشان تجيب عنوان البث (Broadcast)، حوّل كل الأصفار دي لـ 255. وعدد الأجهزة المتاحة هو عدد احتمالات خانات الأجهزة ناقص اتنين (واحد للشبكة وواحد للبث).
        </ArabicText>
        <ArabicText className="text-sm text-stone-800 dark:text-zinc-200 font-medium">
          ولو القناع فيه رقم غير 255 و0 (زي 192 أو 224)، اعتمد على جدول الـ AND بالبت اللي فوق. استثناء مهم: الوصلة <Prefix n={31} /> فيها جهازين، والـ <Prefix n={32} /> جهاز واحد.
        </ArabicText>
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        <div className={CARD}>
          <CardLabel>عنوان الشبكة (Network Address)</CardLabel>
          <div className={VALUE}>{addr?.netStr ?? EMPTY}</div>
          <ArabicText className={CARD_NOTE}>
            {prefixInput === 32
              ? 'جهاز واحد بس (Host Route)'
              : prefixInput === 31
                ? 'وصلة Point-to-Point (RFC 3021): العنوانين الاتنين أجهزة صالحة'
                : 'عنوان الشبكة نفسها، مينفعش تديه لجهاز'}
          </ArabicText>
        </div>

        <div className={CARD}>
          <CardLabel>عنوان البث (Broadcast Address)</CardLabel>
          <div className={VALUE}>{addr && prefixInput !== 32 ? addr.broadcastStr : EMPTY}</div>
          <ArabicText className={CARD_NOTE}>
            {prefixInput === 32
              ? 'مفيش Broadcast، العنوان ده هو الجهاز نفسه'
              : prefixInput === 31
                ? 'مفيش Broadcast تقليدي، العنوان ده جهاز تاني في الوصلة'
                : 'أي رسالة بتتبعت للعنوان ده بتوصل لكل الأجهزة في الشبكة'}
          </ArabicText>
        </div>

        <div className={CARD}>
          <CardLabel>نطاق الأجهزة الصالحة (Usable Host Range)</CardLabel>
          <div className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100 flex flex-wrap items-center gap-x-1.5">
            <span>{addr?.firstStr ?? EMPTY}</span>
            <span aria-hidden="true">–</span>
            <span>{addr?.lastStr ?? EMPTY}</span>
          </div>
          <ArabicText className={CARD_NOTE}>
            الأجهزة الصالحة: <strong>{data.usable.toLocaleString('en-US')}</strong>
          </ArabicText>
        </div>

        <div className={CARD}>
          <CardLabel>القناع (Subnet Mask)</CardLabel>
          <div className={VALUE}>{data.maskStr}</div>
          <div className="font-mono text-sm font-semibold text-stone-700 dark:text-zinc-300 break-all">
            Wildcard: {data.wildcardStr}
          </div>
          <ArabicText className={CARD_NOTE}>
            الـ Wildcard هو عكس القناع (Inverse Mask)، وبيتستخدم في الـ ACL وبروتوكول OSPF
          </ArabicText>
        </div>

        <div className={CARD}>
          <CardLabel>إجمالي العناوين (Total Addresses)</CardLabel>
          <div className={VALUE}>{data.total.toLocaleString('en-US')}</div>
          <div className="font-mono text-sm font-semibold text-stone-700 dark:text-zinc-300">
            2^{data.hostBits}
          </div>
          <ArabicText className={CARD_NOTE}>
            إجمالي العناوين = 2 أس عدد بتات الأجهزة (Host Bits)
          </ArabicText>
        </div>

        <div className={CARD}>
          <CardLabel>النوع والنطاق (Class &amp; Scope)</CardLabel>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">
              {addr?.cls.name ?? EMPTY}
            </span>
            {addr && (
              <span className="font-mono text-xs font-semibold text-stone-600 dark:text-zinc-400">
                {addr.cls.hint}
              </span>
            )}
          </div>
          <ArabicText className={CARD_NOTE}>
            {addr ? SCOPE_LABEL[addr.scope] : 'اكتب عنوان IP صحيح عشان تشوف النوع'}
          </ArabicText>
        </div>
      </div>
    </div>
  );
};

export default SubnetCalculatorVisualizer;
