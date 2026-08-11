import * as fs from 'fs';
import * as path from 'path';

interface TestResult {
  status: string;
  duration: number;
  startTime: string;
  errors: Array<{ message?: string }>;
}

interface Test {
  projectName: string;
  results: TestResult[];
}

interface Spec {
  title: string;
  file: string;
  tests: Test[];
}

interface Suite {
  title: string;
  file?: string;
  specs: Spec[];
  suites?: Suite[];
}

interface JsonReport {
  suites: Suite[];
}

function extractFeatureName(filePath: string): string {
  return path.basename(filePath).replace('.spec.js', '').replace('.spec.ts', '').replace('.feature', '');
}

function extractTestCaseId(title: string): string {
  const match = title.match(/\[([^\]]+)\]/);
  return match ? match[1] : 'UNKNOWN';
}

function formatTimestamp(isoString: string): string {
  const d = new Date(isoString);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`
  );
}

function collectSpecs(suite: Suite): Spec[] {
  const specs: Spec[] = [...(suite.specs ?? [])];
  for (const child of suite.suites ?? []) {
    specs.push(...collectSpecs(child));
  }
  return specs;
}

const resultsPath = path.join(process.cwd(), 'test-results', 'results.json');
if (!fs.existsSync(resultsPath)) {
  console.error('results.json not found — run playwright test first');
  process.exit(1);
}

const report: JsonReport = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
const outputDir = path.join(process.cwd(), 'test-results');
let written = 0;

for (const topSuite of report.suites ?? []) {
  const specs = collectSpecs(topSuite);

  for (const spec of specs) {
    const featureName = extractFeatureName(spec.file);
    const testCaseId = extractTestCaseId(spec.title);

    for (const test of spec.tests ?? []) {
      for (const result of test.results ?? []) {
        const timestamp = formatTimestamp(result.startTime);
        const browser = test.projectName ?? 'unknown';
        const fileName = `${featureName}_${testCaseId}_${browser}_${timestamp}.json`;

        const record = {
          featureFile: `${featureName}.feature`,
          testCaseId,
          browser,
          title: spec.title,
          status: result.status,
          duration: `${(result.duration / 1000).toFixed(2)}s`,
          startedAt: result.startTime,
          errors: (result.errors ?? []).map(e => e.message ?? String(e)),
        };

        fs.writeFileSync(path.join(outputDir, fileName), JSON.stringify(record, null, 2), 'utf-8');
        written++;
      }
    }
  }
}

console.log(`✔ Wrote ${written} result files to test-results/`);
