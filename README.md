# Basmagly | بصمجّلي شكرًا

**Turn the page. See the idea.**

من صفحة لفكرة… ومن فكرة لتجربة.

An English-first study workspace with supporting Egyptian Arabic explanations, source-linked lecture notes, worked practice, and visual experiments. The curriculum follows the supplied lecture decks; reference books provide explicitly identified background, not a claim of complete book coverage.

## Development

```sh
npm ci
npm run dev
```

Vite serves the app on port 3000. Use the in-app course outline or laboratory catalogue; navigation is preserved in the URL hash. Experiments are loaded on demand, and can also be opened alongside lecture notes.

## Verification

```sh
npx tsc --noEmit -p .
npm run build
node scripts/test_curriculum.cjs
```

Check changed interactions in the running app, in light/dark themes and at 375px. Respect reduced motion and test reset and input changes as well as the happy path.

## Sources and continuation

Read `AGENTS.md` and `docs/CONTINUATION.md` before continuing. Subject source maps under `docs/` describe coverage and limitations. Original uploads and raw OCR are private workspace inputs and are not committed.

GitHub Pages: https://the-real-bedo.github.io/Basmagly---/
