const csv = require('csvtojson');

import { default as logger } from './../logger';

import { CsvRow } from '../interfaces/CsvRow';
import { LogoData } from '../interfaces/LogoData';


class CSVParser {
  private readonly path: string = '';
  private rows: CsvRow[] = [];

  constructor() {
    const fileName = process.env.CVS_FILE_NAME;

    if (fileName) {
      this.path = `${__dirname}/../../input/${fileName}.csv`;

      console.log(this.path)
    } else {
      logger.error({ message: 'file name has not been provided!' });
    }
  }

  private async readFile() {
    try {
      this.rows = await csv().fromFile(this.path);
    } catch (e) {
      console.log(e);
      logger.error({ message: 'read file error' });
      throw Error('read file error');
    }
  }

  public async getData() {
    try {
      await this.readFile();

      const namesOnly = this.rows.map(x => x.sku);
      const logosData: LogoData[] = [];
      const invalidEntries: string[] = [];

      for (const slug of namesOnly) {
        const temp: LogoData = {
          name: null,
          price: {
            amount: null,
            currency: null
          }
        };

        const split = slug.split('-').reverse();

        if (split[0].length === 2) {
          temp.country = (split.shift() as string).toLowerCase();
        }
        if (split[0].length === 3) {
          temp.price.currency = (split.shift() as string).toLowerCase();

          temp.price.amount = parseInt((split.shift() as string), 10);
        }
        temp.name = split.reverse().join(' ');

        if (temp.name && temp.price.amount && temp.price.amount) {
          logosData.push(temp);
        } else {
           invalidEntries.push(slug);
        }
      }

      console.log(logosData);
      console.log(invalidEntries);

    } catch (e) {
      console.log(e);
      logger.error({ message: 'get data error' });
      throw Error('get data error');
    }
  }
}

export default new CSVParser();
