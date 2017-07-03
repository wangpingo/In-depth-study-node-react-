## Node.js的进程通信模块 child_process
nodejs是单线程有他的优雅性，但是遇见复杂的cpu密集型计算不适合，所以就需要child_progress创建子进程
child_process提供衍生单线程的能力,这个能力主要由child_progress.spwan()提供
```
    const {spawn} =require('child_process');
    const ls =spwan('1s',['-1h','/usr'])
    const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});
```

child_process.spawn() 方法会异步地衍生子进程，且不会阻塞 Node.js 的事件循环。 child_process.spawnSync() 函数则以同步的方式提供了同样的功能，但会阻塞事件循环，直到衍生的子进程退出或终止。

为了方便起见，child_process 模块提供了一些同步和异步的替代方法用于 child_process.spawn() 和 child_process.spawnSync()。 注意，每个替代方法都是在 child_process.spawn() 或 child_process.spawnSync() 的基础上实现的。

child_process.exec(): 衍生一个 shell 并在 shell 上运行一个命令，当完成时会传入 stdout 和 stderr 到一个回调。
child_process.execFile(): 和 child_process.exec() 类似，除了它直接衍生命令，且不用先衍生一个 shell。
child_process.fork(): 衍生一个新的 Node.js 进程，并通过建立一个允许父进程和子进程之间相互发送信息的 IPC 通讯通道来调用一个指定的模块。
child_process.execSync(): child_process.exec() 的一个同步版本，它会阻塞 Node.js 的事件循环。
child_process.execFileSync(): child_process.execFile() 的一个同步版本，它会阻塞 Node.js 的事件循环。
对于某些用例，如自动化的 shell 脚本，同步的版本可能更方便。 大多数情况下，同步的方法会显著地影响性能，因为它拖延了事件循环直到衍生进程完成。

