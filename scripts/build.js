const pkg = require("../package.json");
const globby = require("globby");
const execa = require("execa");

async function getPaths() { 
  const paths = await globby(pkg.packages, {
    onlyFiles: false,
    gitignore: true,
  });
  return paths
}
async function extraExec() {
  const args = process.argv.splice(2);
  if (args.includes('--link')) {
    console.log('link npm package')
    await execa("npm ", ["run", "link"])
  }
}


async function build(path) {
  await execa("rollup", ["--config", "rollup.config.js"], {
    preferLocal: true,
    // 查找可执行二进制文件的路径
    localDir: process.cwd(),
    // 指定子进程的工作目录
    cwd: process.cwd(),
    // 指定子进程的env
    env: {
      WORKSPACE: path,
      DEBUG: process.env.DEBUG,
    },
    // 不继承父进程的env
    extendEnv: false,
    stdout: "inherit",
  });
}


async function start() {
  const paths = await getPaths();
  console.log('构建目录', paths);
  for(let i = 0; i < paths.length; i++) {
    const path = paths[i]
    await build(path);
    console.log(`${path}构建成功`)
  }
  await extraExec()
}

start()
