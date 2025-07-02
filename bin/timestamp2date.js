#!/usr/bin/env node
import { init } from '../dist/index.mjs';
import minimist from 'minimist';
import prompts from 'prompts';
import pc from 'picocolors';

const {
  blue,
  blueBright,
  cyan,
  green,
  greenBright,
  magenta,
  red,
  redBright,
  reset,
  yellow,
} = pc;

const argv = minimist(process.argv.slice(2), {
  default: { help: false },
  alias: { h: 'help' },
});

const help = argv.help || argv.h;

//帮助信息
const helpMessage = `\
使用方法: t2d [选项]... 或者 timestamp2date [选项]...

用于转化时间戳为日期格式。

选项:
  -h, --help             显示帮助信息
`;

async function init() {
  if (help) {
    console.log(helpMessage);
    return;
  }
  try {
    const { stampType, timeStamp } = await prompts(
      [
        {
          type: 'select',
          name: 'stampType',
          message: '请选择需要转化的时间戳类型',
          choices: [
            { title: blue('秒级时间戳'), value: 'second' },
            { title: yellow('毫秒级时间戳'), value: 'millisecond' },
          ],
        },
        {
          type: 'text',
          name: 'timeStamp',
          message: (prev) =>
            reset(`${prev === 'second' ? '' : '毫'}秒级时间戳`),
          initial: (prev) =>
            prev === 'second' ? dayjs().unix() : dayjs().valueOf(),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' 操作取消');
        },
      }
    );
    const date = timestamp2date(Number(timeStamp), stampType);
    console.log(cyan('转换后的结果是：'), date);
  } catch (e) {
    console.log(e.message);
    return;
  }
}

init();
