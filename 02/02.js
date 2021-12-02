import { promises as fs } from 'fs';
import path from 'path';

const currentDirectory = path.basename(process.cwd());
const file = `${currentDirectory}.input`;

const fileToArray = async (file) => {
  const res = await fs.readFile(file, 'utf8');

  return res
    .split('\n')
    .filter((line) => line)
    .map((line) => line.split(' '));
};

const input = await fileToArray(file);

const part1 = (input) =>
  input.reduce(
    (acc, cur) => {
      if (cur[0] === 'forward') return { ...acc, x: acc.x + Number(cur[1]) };
      if (cur[0] === 'down') return { ...acc, y: acc.y + Number(cur[1]) };
      if (cur[0] === 'up') return { ...acc, y: acc.y - Number(cur[1]) };
    },
    {
      x: 0,
      y: 0,
    }
  );

const part2 = (input) =>
  input.reduce(
    (acc, cur) => {
      const amount = Number(cur[1]);

      if (cur[0] === 'forward') return { ...acc, x: acc.x + amount, y: acc.y + acc.aim * amount };
      if (cur[0] === 'down') return { ...acc, aim: acc.aim + amount };
      if (cur[0] === 'up') return { ...acc, aim: acc.aim - amount };
    },
    { x: 0, y: 0, aim: 0 }
  );

const part1res = part1(input);
const part2res = part2(input);

console.log('Part 1:', part1res.x * part1res.y);
console.log('Part 2:', part2res.x * part2res.y);
