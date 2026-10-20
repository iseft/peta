import { readFileSync } from 'node:fs';

// Node 24 segfaults jest workers under the concurrency of a full test run
// (seen in pitchworthy), so the test run refuses any major but the pinned one.
const wanted = readFileSync(new URL('../.nvmrc', import.meta.url), 'utf8').trim();
const [wantedMajor] = wanted.split('.');
const [major] = process.versions.node.split('.');

if (major !== wantedMajor) {
  console.error(
    `\nThis repo runs its tests on Node ${wanted} — you are on ${process.versions.node}.\n` +
      `Run \`nvm use\` (or install ${wanted}) and try again.\n`,
  );
  process.exit(1);
}
