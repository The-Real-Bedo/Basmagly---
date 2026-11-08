import { useState } from 'react';
import { Binary, Braces, Cpu, Fingerprint, Type, Waypoints } from 'lucide-react';
import ArabicText from '../ArabicText';

type Architecture = 'x86' | 'x64';
type TextMode = 'narrow' | 'unicode';
type GroupId = 'numbers' | 'handles' | 'text' | 'messages' | 'structures';

interface TypeInfo {
  name: string;
  meaning: string;
  meaningAr: string;
  bits?: number;
  pointer?: boolean;
  character?: boolean;
  structure?: boolean;
}

const groups: { id: GroupId; title: string; titleAr: string; icon: typeof Binary; types: TypeInfo[] }[] = [
  {
    id: 'numbers', title: 'Numeric types', titleAr: 'أنواع الأعداد', icon: Binary,
    types: [
      { name: 'BYTE', meaning: 'Unsigned 8-bit integer; raw byte data.', meaningAr: 'عدد unsigned حجمه 8-bit؛ للبيانات الخام.', bits: 8 },
      { name: 'WORD', meaning: 'Unsigned 16-bit integer.', meaningAr: 'عدد unsigned حجمه 16-bit.', bits: 16 },
      { name: 'DWORD', meaning: 'Unsigned 32-bit integer; stays 32-bit on x64.', meaningAr: 'عدد unsigned حجمه 32-bit؛ وبيفضل 32-bit على x64.', bits: 32 },
      { name: 'LONG', meaning: 'Signed 32-bit Windows integer.', meaningAr: 'عدد Windows signed حجمه 32-bit.', bits: 32 },
      { name: 'LONGLONG', meaning: 'Signed 64-bit integer.', meaningAr: 'عدد signed حجمه 64-bit.', bits: 64 },
      { name: 'BOOL', meaning: '32-bit Windows Boolean convention; TRUE is nonzero, FALSE is zero.', meaningAr: 'Boolean في Windows بحجم 32-bit؛ TRUE غير صفرية وFALSE تساوي صفرًا.', bits: 32 },
    ],
  },
  {
    id: 'handles', title: 'Handles', titleAr: 'الـ Handles', icon: Fingerprint,
    types: [
      { name: 'HWND', meaning: 'Opaque handle that identifies a window.', meaningAr: 'Handle مبهم بيعرّف نافذة.', pointer: true },
      { name: 'HINSTANCE', meaning: 'Handle to the running module instance.', meaningAr: 'Handle لنسخة الـ module اللي شغالة.', pointer: true },
      { name: 'HDC', meaning: 'Handle to a drawing device context.', meaningAr: 'Handle لسياق جهاز الرسم.', pointer: true },
      { name: 'HANDLE', meaning: 'Generic opaque handle used for resources such as files or threads.', meaningAr: 'Handle عام ومبهم لموارد زي الملفات أو الـ threads.', pointer: true },
    ],
  },
  {
    id: 'text', title: 'Strings and text', titleAr: 'النصوص والـ Strings', icon: Type,
    types: [
      { name: 'char', meaning: 'Narrow code unit; its encoding is not always ASCII.', meaningAr: 'وحدة نصية narrow؛ وترميزها مش دايمًا ASCII.', character: true },
      { name: 'wchar_t', meaning: '16-bit UTF-16 code unit on Windows.', meaningAr: 'وحدة UTF-16 حجمها 16-bit على Windows.', bits: 16 },
      { name: 'LPSTR / LPCSTR', meaning: 'Mutable / constant narrow-string pointer.', meaningAr: 'مؤشر نص narrow قابل للتعديل / ثابت.', pointer: true },
      { name: 'LPWSTR / LPCWSTR', meaning: 'Mutable / constant wide-string pointer.', meaningAr: 'مؤشر نص wide قابل للتعديل / ثابت.', pointer: true },
      { name: 'TCHAR', meaning: 'Generic character: char or wchar_t according to the UNICODE build setting.', meaningAr: 'حرف عام: char أو wchar_t حسب إعداد UNICODE في الـ build.', character: true },
      { name: 'LPTSTR / LPCTSTR', meaning: 'Mutable / constant pointer to generic text; pointer-sized, not character-sized.', meaningAr: 'مؤشر قابل للتعديل / ثابت لنص عام؛ حجمه حجم المؤشر مش حجم الحرف.', pointer: true },
    ],
  },
  {
    id: 'messages', title: 'Message parameters', titleAr: 'Parameters الرسائل', icon: Waypoints,
    types: [
      { name: 'UINT_PTR', meaning: 'Unsigned integer wide enough to hold a pointer.', meaningAr: 'عدد unsigned يكفي لحمل pointer.', pointer: true },
      { name: 'LONG_PTR', meaning: 'Signed integer wide enough to hold a pointer.', meaningAr: 'عدد signed يكفي لحمل pointer.', pointer: true },
      { name: 'WPARAM', meaning: 'Alias of UINT_PTR; meaning depends on the message.', meaningAr: 'اسم بديل لـ UINT_PTR؛ ومعناه بيعتمد على الرسالة.', pointer: true },
      { name: 'LPARAM', meaning: 'Alias of LONG_PTR; meaning depends on the message.', meaningAr: 'اسم بديل لـ LONG_PTR؛ ومعناه بيعتمد على الرسالة.', pointer: true },
      { name: 'LRESULT', meaning: 'Pointer-sized result returned by a window procedure.', meaningAr: 'نتيجة بحجم المؤشر بترجعها Window Procedure.', pointer: true },
    ],
  },
  {
    id: 'structures', title: 'Structures', titleAr: 'الـ Structures', icon: Braces,
    types: [
      { name: 'WNDCLASSEXW', meaning: 'Window-class description; its pointer fields and alignment affect its size.', meaningAr: 'وصف للـ window class؛ والـ pointer fields والمحاذاة بيأثروا على حجمها.', structure: true },
      { name: 'MSG', meaning: 'Retrieved message record containing HWND, message ID, and parameters.', meaningAr: 'سجل الرسالة المسترجعة، وفيه HWND ورقم الرسالة والـ parameters.', structure: true },
      { name: 'POINT', meaning: 'Two-dimensional x and y coordinates.', meaningAr: 'إحداثيات ثنائية الأبعاد x وy.', structure: true },
      { name: 'RECT', meaning: 'Rectangle edges: left, top, right, and bottom.', meaningAr: 'حدود مستطيل: left وtop وright وbottom.', structure: true },
    ],
  },
];

const pointerBits: Record<Architecture, number> = { x86: 32, x64: 64 };

export function Win32TypesLab() {
  const [architecture, setArchitecture] = useState<Architecture>('x64');
  const [textMode, setTextMode] = useState<TextMode>('unicode');
  const [groupId, setGroupId] = useState<GroupId>('numbers');
  const [selectedName, setSelectedName] = useState('DWORD');
  const [pointerChoice, setPointerChoice] = useState<string | null>(null);
  const activeGroup = groups.find((group) => group.id === groupId) ?? groups[0];
  const selectedType = activeGroup.types.find((type) => type.name === selectedName) ?? activeGroup.types[0];
  const selectedBits = selectedType.pointer
    ? pointerBits[architecture]
    : selectedType.character
      ? textMode === 'unicode' ? 16 : 8
      : selectedType.bits;
  const pointerWidth = pointerBits[architecture];
  const choiceBits = pointerChoice === 'DWORD' ? 32 : pointerChoice === 'WORD' ? 16 : pointerWidth;
  const choiceFits = choiceBits >= pointerWidth;
  const choiceSafe = pointerChoice === 'UINT_PTR';

  const selectGroup = (next: GroupId) => {
    const group = groups.find((item) => item.id === next) ?? groups[0];
    setGroupId(next);
    setSelectedName(group.types[0].name);
  };
  const selectArchitecture = (next: Architecture) => {
    setArchitecture(next);
    setPointerChoice(null);
  };

  return (
    <section id="win32-types-lab" className="rounded-3xl border border-beige-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
      <header className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"><Cpu size={20} /></span>
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Win32 Type &amp; Width Explorer</h3>
          <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">استكشف أنواع Win32 وأحجامها</ArabicText>
        </div>
      </header>

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
          <p className="mb-2 text-sm font-semibold text-stone-800 dark:text-stone-200">Target build · إعداد الـ Build</p>
          <div className="flex flex-wrap gap-2">
            {(['x86', 'x64'] as const).map((target) => (
              <button key={target} type="button" aria-pressed={architecture === target} onClick={() => selectArchitecture(target)}
                className={'min-h-11 rounded-xl border px-4 py-2 font-mono text-sm ' + (architecture === target ? 'border-amber-400 bg-amber-100 text-amber-950 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-200' : 'border-beige-300 bg-white text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800')}>
                {target}
              </button>
            ))}
            <span className="self-center text-sm text-stone-600 dark:text-zinc-400">Pointer width: {pointerWidth} bits</span>
          </div>
        </div>
        <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
          <p className="mb-2 text-sm font-semibold text-stone-800 dark:text-stone-200">Generic text · نوع النص العام</p>
          <div className="flex flex-wrap gap-2">
            {(['narrow', 'unicode'] as const).map((mode) => (
              <button key={mode} type="button" aria-pressed={textMode === mode} onClick={() => setTextMode(mode)}
                className={'min-h-11 rounded-xl border px-3 py-2 text-sm ' + (textMode === mode ? 'border-amber-400 bg-amber-100 text-amber-950 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-200' : 'border-beige-300 bg-white text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800')}>
                {mode === 'unicode' ? 'Unicode build · ترجمة Unicode' : 'Narrow build · ترجمة narrow'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {groups.map(({ id, title, titleAr, icon: Icon }) => (
          <button key={id} type="button" aria-pressed={groupId === id} onClick={() => selectGroup(id)}
            className={'inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-sm ' + (groupId === id ? 'border-amber-400 bg-amber-100 text-amber-950 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-200' : 'border-beige-300 bg-white text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800')}>
            <Icon size={16} /><span>{title}</span><ArabicText as="span" className="text-xs text-current">{titleAr}</ArabicText>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
          <h4 className="mb-3 font-semibold text-stone-900 dark:text-stone-100">Choose a type · اختار نوع</h4>
          <div className="flex flex-wrap gap-2">
            {activeGroup.types.map((type) => (
              <button key={type.name} type="button" aria-pressed={selectedName === type.name} onClick={() => setSelectedName(type.name)}
                className={'min-h-10 rounded-lg border px-3 py-2 font-mono text-xs ' + (selectedName === type.name ? 'border-amber-400 bg-amber-100 text-amber-950 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-200' : 'border-beige-300 bg-white text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800')}>
                {type.name}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-beige-300 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
            <p className="font-mono text-lg font-bold text-stone-900 dark:text-stone-100">{selectedType.name}</p>
            <p className="mt-2 text-sm leading-6 text-stone-700 dark:text-stone-300">{selectedType.meaning}</p>
            <ArabicText className="mt-1 text-sm leading-6 text-stone-600 dark:text-zinc-400">{selectedType.meaningAr}</ArabicText>
            <p className="mt-3 text-sm font-semibold text-stone-800 dark:text-stone-200">
              {selectedType.structure ? 'Layout varies by fields, architecture, and compiler alignment.' : selectedType.character ? 'Code unit width: ' + selectedBits + ' bits' : 'Width: ' + selectedBits + ' bits (' + (selectedBits ? selectedBits / 8 : 0) + ' bytes)'}
            </p>
            <ArabicText className="text-sm text-stone-600 dark:text-zinc-400">
              {selectedType.structure ? 'الحجم بيتغير حسب الحقول والمعمارية ومحاذاة الـ compiler.' : selectedType.character ? 'حجم وحدة النص: ' + selectedBits + ' bit' : 'الحجم: ' + selectedBits + ' bit (' + (selectedBits ? selectedBits / 8 : 0) + ' bytes)'}
            </ArabicText>
            {selectedBits && !selectedType.structure && (
              <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8" aria-label={selectedBits + ' bit width'}>
                {Array.from({ length: selectedBits / 8 }, (_, index) => (
                  <div key={index} className="rounded-lg border border-sky-300 bg-sky-100 px-2 py-2 text-center font-mono text-xs text-sky-900 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-200">
                    B{index + 1}
                  </div>
                ))}
              </div>
            )}
          </div>
          {groupId === 'text' && (
            <div className="mt-3 overflow-x-auto rounded-xl border border-stone-800 bg-stone-950 p-3">
              <p className="font-mono text-sm text-stone-100">TCHAR label[] = _T(&quot;Windows&quot;);</p>
              <p className="mt-2 text-xs text-zinc-300">Maps to {textMode === 'unicode' ? 'wchar_t[] = L&quot;Windows&quot;' : 'char[] = &quot;Windows&quot;'}</p>
              <p className="mt-2 font-mono text-xs text-zinc-400">LPCTSTR → {textMode === 'unicode' ? 'LPCWSTR' : 'LPCSTR'}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-beige-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
            <div className="mb-3 flex items-center gap-2"><Fingerprint size={18} className="text-stone-600 dark:text-zinc-400" /><h4 className="font-semibold text-stone-900 dark:text-stone-100">Pointer-width safety · أمان حجم المؤشر</h4></div>
            <p className="text-sm leading-6 text-stone-700 dark:text-stone-300">Choose a Win32 type for a value that must safely hold a pointer on both targets.</p>
            <ArabicText className="text-sm leading-6 text-stone-600 dark:text-zinc-400">اختار نوع Win32 لقيمة لازم تشيل pointer بأمان على المعماريتين.</ArabicText>
            <div className="my-3 flex flex-wrap gap-2">
              {['DWORD', 'UINT_PTR', 'WORD'].map((candidate) => (
                <button key={candidate} type="button" aria-pressed={pointerChoice === candidate} onClick={() => setPointerChoice(candidate)}
                  className={'min-h-11 rounded-xl border px-3 py-2 font-mono text-sm ' + (pointerChoice === candidate ? 'border-amber-400 bg-amber-100 text-amber-950 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-200' : 'border-beige-300 bg-white text-stone-700 hover:bg-beige-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800')}>
                  {candidate}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8" aria-label="Pointer width visualization">
              {Array.from({ length: pointerWidth / 8 }, (_, index) => (
                <div key={index} className="rounded-lg border border-amber-300 bg-amber-100 px-2 py-2 text-center font-mono text-xs text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">P{index + 1}</div>
              ))}
            </div>
            {pointerChoice && (
              <div className={'mt-3 rounded-xl border p-3 ' + (choiceSafe ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200' : choiceFits ? 'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200' : 'border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-200')}>
                <p className="text-sm font-semibold">{choiceSafe ? 'Width-safe choice: UINT_PTR.' : choiceFits ? pointerChoice + ' fits this target width, but is not the portable pointer-sized type.' : pointerChoice + ' is only ' + choiceBits + ' bits; it cannot hold a ' + pointerWidth + '-bit pointer.'}</p>
                <ArabicText className="mt-1 text-sm">{choiceSafe ? 'اختيار آمن لحجم المؤشر: UINT_PTR.' : choiceFits ? pointerChoice + ' مناسب لحجم الهدف الحالي، لكنه مش النوع العام المخصص لحجم المؤشر.' : pointerChoice + ' حجمه ' + choiceBits + ' bit؛ ومايقدرش يشيل pointer بحجم ' + pointerWidth + ' bit.'}</ArabicText>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-beige-300 bg-[#FAF7F2] p-4 dark:border-stone-800 dark:bg-stone-950">
            <h4 className="font-semibold text-stone-900 dark:text-stone-100">Read the widths · اقرا الأحجام</h4>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-stone-700 dark:text-stone-300">
              <li><span className="font-mono">DWORD</span> stays 32-bit; <span className="font-mono">UINT_PTR</span> follows the target pointer width.</li>
              <li><span className="font-mono">HWND</span> is opaque: pass it to the matching API, never dereference it.</li>
              <li><span className="font-mono">WPARAM</span>, <span className="font-mono">LPARAM</span>, and <span className="font-mono">LRESULT</span> are pointer-sized.</li>
            </ul>
            <ArabicText className="mt-2 text-sm leading-6 text-stone-600 dark:text-zinc-400">DWORD بيفضل 32-bit؛ وUINT_PTR بيتبع حجم المؤشر. HWND مُعرّف مبهم؛ وWPARAM وLPARAM وLRESULT أحجامهم بتتبع المؤشر.</ArabicText>
          </div>
        </div>
      </div>
    </section>
  );
}
