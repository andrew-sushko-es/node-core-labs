const process = require("node:process");

const version = process.version;
const versionV8 = process.versions.v8;
const versionUV = process.versions.uv;
const platform = process.platform;
const architecture = process.arch;
const processID = process.pid;
const workingDir = process.cwd();
const args = process.argv;
const execPath = process.execPath;

console.log({
  version,
  versionV8,
  versionUV,
  platform,
  architecture,
  processID,
  workingDir,
  args,
  execPath,
});
