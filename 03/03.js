import { promises as fs } from 'fs';
import path from 'path';

const currentDirectory = path.basename(process.cwd());
const file = `${currentDirectory}.input`;

const fileToArray = async (file) => {
  const res = await fs.readFile(file, 'utf8');

  return res
    .split('\n')
    .filter((line) => line)
    .map((line) => line.split(''));
};

const inverseBits = (bits) =>
  bits
    .split('')
    .map((bit) => (Number(bit) ^ 1).toString())
    .join('');

const transpose = (arr) => arr[0].map((_col, i) => arr.map((row) => row[i]));

const mostPresentBit = (arr) => (arr.filter((el) => el === '1').length >= arr.length / 2 ? '1' : '0');

const input = await fileToArray(file);
const transposedInput = transpose(input);

const part1bin = transposedInput.map((row) => mostPresentBit(row)).join('');
const part1gamma = parseInt(part1bin, 2);
const part1epsilon = parseInt(inverseBits(part1bin), 2);
const part1res = part1gamma * part1epsilon;

console.log('Part 1:', part1res);

const rating = (numbers, keep = 1, pos = 0) => {
  if (numbers.length === 1) return parseInt(numbers[0].join(''), 2);

  const bit =
    keep === 1 ? mostPresentBit(transpose(numbers)[pos]) : inverseBits(mostPresentBit(transpose(numbers)[pos]));
  const remaining = numbers.filter((el) => el[pos] === bit);

  return rating(remaining, keep, pos + 1);
};

console.log('Part 2:', rating(input) * rating(input, 0));
