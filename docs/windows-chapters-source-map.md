# Windows Programming Chapters 1–2: source and answer map

This map covers the end-of-chapter exercises transcribed into the two Windows Programming course sheets. Problem numbers match the book; course IDs use win-ch1-ex-01…win-ch1-ex-35 and win-ch2-ex-01…win-ch2-ex-35. Each sheet includes a generated full and concise study answer. The textbook does not publish worked solutions for these exercises; the answers are study aids grounded in the sections below, not official publisher solutions.

## Page convention and source scope

“PDF p.” means the page’s position in the original PDF, not its printed footer number. The footer is one page lower in the relevant ranges. The source is the attached WindowsProgramming book in Sem1-data.zip; the repository receives only this page map and the authored study content.

Chapter 1 is sourced from §§1.1–1.9, PDF pp. 4–21; its exercises appear on PDF pp. 21–25. Chapter 2 is sourced from §§2.1–2.6, PDF pp. 26–40; its exercises appear on PDF pp. 41–45.

## Chapter 1 — Foundation of Windows Programming

| Problem | Exercise page | Answer source |
|---:|---:|---|
| 1 | 21 | §1.1, pp. 4–5 |
| 2 | 21 | §1.1, pp. 4–5 |
| 3 | 21 | §1.1, p. 4 |
| 4 | 21 | §1.1, p. 5 |
| 5 | 21 | §1.2, pp. 6–8 |
| 6 | 21 | §1.2, p. 7 |
| 7 | 22 | §1.3, p. 8 |
| 8 | 22 | §1.4, pp. 8–10 |
| 9 | 22 | §1.5, pp. 12–14 |
| 10 | 22 | §1.5, pp. 13–15 |
| 11 | 22 | §1.5, pp. 13–14 |
| 12 | 22 | §1.6, pp. 15–16 |
| 13 | 22 | §1.7, pp. 16–17 |
| 14 | 22 | §1.7, pp. 17–18 |
| 15 | 22 | §1.9, pp. 19–21 |
| 16 | 22 | §1.1, pp. 4–5 |
| 17 | 22 | §1.1, pp. 4–5 |
| 18 | 23 | §1.5, pp. 12–14 |
| 19 | 23 | §1.5, pp. 13–15 |
| 20 | 23 | §1.7, pp. 17–18 |
| 21 | 23 | §1.6, pp. 15–16 |
| 22 | 24 | §1.2, p. 7 |
| 23 | 24 | §1.5, p. 13 |
| 24 | 24 | §1.4, pp. 10–11 |
| 25 | 24 | §1.9, pp. 19–21 |
| 26 | 25 | §§1.1 and 1.4, pp. 4–5 and 8–10 |
| 27 | 25 | §1.1, p. 4 |
| 28 | 25 | §1.2, pp. 6–7 |
| 29 | 25 | §§1.2–1.3, pp. 6–8 |
| 30 | 25 | §1.4, pp. 9–10 |
| 31 | 25 | §1.5, p. 12 |
| 32 | 25 | §§1.5–1.6, pp. 13–16 |
| 33 | 25 | §1.7, pp. 16–18 |
| 34 | 25 | §1.5, pp. 13–14 |
| 35 | 25 | §1.9, pp. 19–21 |

## Chapter 2 — Software Development Kit (SDK)

| Problem | Exercise page | Answer source |
|---:|---:|---|
| 1 | 41 | §§2.1–2.2, pp. 26–27 |
| 2 | 41 | §2.3, p. 28 |
| 3 | 41 | §2.5, pp. 29–30 |
| 4 | 41 | §2.5, p. 30 |
| 5 | 41 | §2.5, pp. 30–31 |
| 6 | 41 | §2.5, pp. 30–31 |
| 7 | 41 | §2.5, pp. 31–32 |
| 8 | 41 | §2.5, pp. 31–32 |
| 9 | 41 | §2.5, p. 33 |
| 10 | 41 | §2.5, pp. 33–34 |
| 11 | 41 | §2.5, p. 34 |
| 12 | 41 | §2.4, p. 29 |
| 13 | 41 | §2.3, p. 28 |
| 14 | 41 | Chapter 1, §1.6, pp. 15–16; Chapter 2, §2.6, pp. 38–40 |
| 15 | 41 | §2.6, pp. 35–38 |
| 16 | 42 | §§2.1–2.2, pp. 26–27 |
| 17 | 42 | §2.3, p. 28 |
| 18 | 42 | §2.5, pp. 29–30 |
| 19 | 42–43 | §2.5, pp. 30–31 |
| 20 | 43 | §2.3, pp. 27–28 |
| 21 | 43 | §2.5, p. 30 |
| 22 | 43 | §2.6, pp. 39–40 |
| 23 | 43 | §2.5, pp. 31–32 |
| 24 | 44 | §2.5, pp. 33–34 |
| 25 | 44 | §2.6, p. 39 |
| 26 | 44 | §§2.1–2.3, pp. 26–28 |
| 27 | 44 | §2.3, p. 28 |
| 28 | 44 | §2.5, pp. 29–30 |
| 29 | 44 | §2.5, pp. 30–31 |
| 30 | 45 | §2.5, pp. 31–32 |
| 31 | 45 | §2.5, pp. 33–34 |
| 32 | 45 | §2.6, p. 39 |
| 33 | 45 | §2.6, pp. 39–40 |
| 34 | 45 | §2.4, p. 29 |
| 35 | 45 | §2.6, pp. 37–39 |

## Code example proof and clarifications

The book’s SDK example is Figure 2.1, §2.6, PDF pp. 35–37 (printed footer pp. 34–36). The source is an image rather than searchable code. Visual inspection of the original figure confirmed:

- The example includes windows.h, tchar.h, a WNDCLASSEX, RegisterClassEx, CreateWindowEx, ShowWindow, UpdateWindow, and a GetMessage / TranslateMessage / DispatchMessage loop.
- Its WndProc draws text under WM_PAINT, shows a message box for WM_LBUTTONDOWN, calls PostQuitMessage for WM_DESTROY, destroys the window for WM_CLOSE, and delegates other messages to DefWindowProc.
- The course’s full Unicode sample keeps the same lifecycle and paints in WM_PAINT, but uses explicit W-suffixed APIs and checks GetMessageW for -1 (error), 0 (quit), or a positive message. The pictured book loop only tests for a positive message; the course sample handles the error case separately.
- TranslateMessage does not dispatch a message or replace WM_KEYDOWN: when applicable it posts a character message such as WM_CHAR for a later loop iteration.
- WPARAM / LPARAM meanings are message-specific; they are not always mouse coordinates. DWORD remains 32-bit, while pointer-sized types such as UINT_PTR and LONG_PTR follow the target architecture.
- The textbook’s “ASCII vs. Unicode” description is simplified: char is a narrow code unit whose encoding need not be ASCII; wchar_t is 16-bit on Windows and represents UTF-16 code units.
- Window handles such as HWND are opaque identifiers, not application-dereferenceable resource addresses. Failure sentinel conventions vary by API function.

The complete sample is included in Chapter 2 section 8 of the course data. Its compiler note names the Windows SDK and MSVC; it is an example, not a substitute for the project’s normal build verification.
