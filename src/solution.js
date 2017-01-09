import fs from 'fs';
import path from 'path';

const countLines = data => data.split('\n').slice(0, -1).length;

const fileData = file =>
  new Promise((resolve, reject) =>
    fs.readFile(file, 'UTF-8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    }),
  );

const fileNames = path1 =>
  new Promise((resolve, reject) =>
    fs.readdir(path1, (err, data) => {
      if (err) reject(err);
      resolve(data);
    }),
  );

const serialCalc = async(dir) => {
  const list = await fileNames(dir);
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    const data = await fileData(path.join(dir, list[i]));
    total += countLines(data);
  }
  console.log(`total amount of lines: ${total}`);
};

export const parallelCalc = async(dir) => {
  const list = await fileNames(dir);
  let total = 0;

  await Promise.all(list.map(async(i) => {
    const data = await fileData(path.join(dir, i));
    return total += countLines(data);
  }));
  console.log(`total amount of lines: ${total}`);
};


export default serialCalc;
