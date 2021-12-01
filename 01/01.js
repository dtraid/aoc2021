import { promises as fs } from 'fs';
import path from 'path';

const currentDirectory = path.basename(process.cwd());
const file = `${currentDirectory}.input`;

const fileToArray = async (file) => {
  const res = await fs.readFile(file, 'utf8');

  return res
    .split('\n')
    .filter((line) => line)
    .map(Number);
};

const input = await fileToArray(file);

const part1 = (input) =>
  input.reduce((acc, cur, i, arr) => (cur > arr[i - 1] ? acc + 1 : acc), 0);

const input2 = input.map((num, i, src) =>
  src[i + 2] ? [num, src[i + 1], src[i + 2]] : undefined
);

console.log('Part 1:', part1(input));

const sum = (arr) => arr.reduce((acc, cur) => acc + cur, 0);

const part2 = (input) =>
  input.reduce(
    (acc, cur, i, arr) =>
      cur && i > 0 && sum(cur) > sum(arr[i - 1]) ? acc + 1 : acc,
    0
  );

console.log('Part 2:', part2(input2));
