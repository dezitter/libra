import fs from 'fs';

const moduleWrap   = fs.readFileSync(`${__dirname}/module.hbs`,   { encoding: 'utf8' });
const templateWrap = fs.readFileSync(`${__dirname}/template.hbs`, { encoding: 'utf8' });

export { moduleWrap, templateWrap };
