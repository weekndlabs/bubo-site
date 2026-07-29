// Asserts the accent tokens clear WCAG AA (4.5:1) for normal text, in both themes.
// Values are read out of the .astro sources, so editing a token re-runs the maths.
// Run: npm run check:contrast
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const AA = 4.5;

const luminance = (hex) => {
  const h = hex.trim().replace('#', '');
  const [r, g, b] = [0, 2, 4]
    .map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (fg, bg) => {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
};

/** `--name: light-dark(#light, #dark);` -> { name: { light, dark } } */
const readThemedTokens = (css) =>
  Object.fromEntries(
    [...css.matchAll(/--([\w-]+):\s*light-dark\((#[0-9a-fA-F]{6}),\s*(#[0-9a-fA-F]{6})\)/g)]
      .map(([, name, light, dark]) => [name, { light, dark }]),
  );

/** one `@keyframes panelTheme` stop -> { 'p-bg': '#...', ... } */
const readKeyframeStop = (css, stop) => {
  const body = new RegExp(`${stop}\\s*\\{([^}]*)\\}`).exec(css)[1];
  return Object.fromEntries(
    [...body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map(([, k, v]) => [k, v]),
  );
};

const failures = [];
const check = (label, fg, bg) => {
  const r = ratio(fg, bg);
  const line = `${label}: ${fg} on ${bg} = ${r.toFixed(2)}:1`;
  if (r < AA) failures.push(line);
  console.log(`${r < AA ? 'FAIL' : 'ok  '}  ${line}`);
};

// Accents used as text sit on the page background or on a card. Every page
// reads the same token file, so checking it once covers all of them.
const tokens = readThemedTokens(readFileSync('src/styles/tokens.css', 'utf8'));
for (const accent of ['sage', 'clay', 'amber']) {
  for (const surface of ['night', 'night-2', 'card']) {
    for (const theme of ['light', 'dark']) {
      check(`--${accent} on --${surface} (${theme})`,
        tokens[accent][theme], tokens[surface][theme]);
    }
  }
}

// The dashboard reads real values off its own panels, so the inks it is allowed
// to use for them are checked too. --faint is deliberately not in this list: it
// measures 2.40:1 on a dark card and is only ever decoration.
for (const ink of ['text', 'muted']) {
  for (const surface of ['night', 'night-2', 'card']) {
    for (const theme of ['light', 'dark']) {
      check(`--${ink} on --${surface} (${theme})`,
        tokens[ink][theme], tokens[surface][theme]);
    }
  }
}

// The hero panel animates its own palette, so each phase is its own theme —
// independent of the OS. Under prefers-reduced-motion it rests on the dark phase.
const index = readFileSync('src/pages/index.astro', 'utf8');
for (const stop of ['0%, 42%', '58%, 100%']) {
  const phase = readKeyframeStop(index, stop);
  for (const accent of ['p-sage', 'p-clay', 'p-amber', 'p-text']) {
    check(`panel --${accent} on --p-bg (${stop})`, phase[accent], phase['p-bg']);
  }
}

assert.deepEqual(failures, [], `${failures.length} pair(s) below ${AA}:1`);
console.log(`\nall pairs clear ${AA}:1`);
