import { promises as fs } from 'fs';
import path from 'path';

const currentDirectory = path.basename(process.cwd());
const file = `${currentDirectory}.input`;

const fileToArray = async (file) => {
  const res = await fs.readFile(file, 'utf8');

  return res.split('\n\n');
};

const input = await fileToArray(file);
const [rawNumbers, ...rawBoards] = input;
const numbers = rawNumbers.split(',').map(Number);
const boards = rawBoards.map((line) =>
  line
    .split('\n')
    .map((row) => row.split(/\D/).filter((el) => el !== ''))
    .filter((el) => el.length > 0)
);

const transpose = (arr) => arr[0].map((_col, i) => arr.map((row) => row[i]));
const checkRows = (board, drawn) => board.some((row) => row.every((number) => drawn.includes(number)));
const checkRowsAndColumns = (board, drawn) => checkRows(board, drawn) || checkRows(transpose(board), drawn);

console.log(checkRowsAndColumns(boards[0], numbers));

//console.log('Part 1:', part1res);
//console.log('Part 2:', rating(input) * rating(input, 0));
