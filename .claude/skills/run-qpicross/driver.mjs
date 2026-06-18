#!/usr/bin/env node
/**
 * driver.mjs — qpicross interaction harness
 *
 * Usage:
 *   node .claude/skills/run-qpicross/driver.mjs [command] [args...]
 *
 * Commands:
 *   screenshot [outfile]   Take a screenshot (default: /tmp/qpicross.png)
 *   generate               Click the dice (generate random puzzle)
 *   start                  Click play to start the game
 *   reset                  Click stop/reset
 *   smoke                  Full smoke flow: load → generate → start → screenshot
 */

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const URL = 'http://localhost:5173';
const DEFAULT_SCREENSHOT = '/tmp/qpicross.png';

async function run() {
  const [,, cmd = 'smoke', ...args] = process.argv;

  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => { if (msg.type() === 'error') console.error('[browser error]', msg.text()); });

  await page.goto(URL, { waitUntil: 'networkidle' });

  // Wait for board to be present
  await page.waitForSelector('.board', { timeout: 15000 });

  if (cmd === 'screenshot') {
    const out = args[0] ?? DEFAULT_SCREENSHOT;
    await page.screenshot({ path: out, fullPage: true });
    console.log('screenshot:', out);

  } else if (cmd === 'generate') {
    // Dice button: mdi-dice-multiple
    await page.click('button:has(.mdi-dice-multiple)');
    await page.waitForTimeout(300);
    console.log('generated random puzzle');

  } else if (cmd === 'start') {
    // Play button: mdi-play
    await page.click('button:has(.mdi-play)');
    await page.waitForTimeout(300);
    console.log('game started');

  } else if (cmd === 'reset') {
    // Stop button: mdi-stop (only visible during game)
    await page.click('button:has(.mdi-stop)');
    await page.waitForTimeout(300);
    console.log('game reset');

  } else if (cmd === 'smoke') {
    const out = args[0] ?? DEFAULT_SCREENSHOT;

    // Step 1: initial state screenshot
    await page.screenshot({ path: '/tmp/qpicross-initial.png', fullPage: true });
    console.log('initial screenshot: /tmp/qpicross-initial.png');

    // Step 2: generate random puzzle
    await page.click('button:has(.mdi-dice-multiple)');
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/qpicross-generated.png', fullPage: true });
    console.log('generated puzzle screenshot: /tmp/qpicross-generated.png');

    // Step 3: start game
    await page.click('button:has(.mdi-play)');
    await page.waitForTimeout(500);
    await page.screenshot({ path: out, fullPage: true });
    console.log('game started screenshot:', out);

    // Step 4: check console errors
    console.log('smoke complete — check screenshots above');

  } else {
    console.error('Unknown command:', cmd);
    console.error('Commands: screenshot, generate, start, reset, smoke');
    process.exit(1);
  }

  await browser.close();
}

run().catch(e => { console.error(e); process.exit(1); });
