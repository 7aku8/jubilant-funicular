import csv from 'csvtojson';
import { codes } from 'currency-codes';
import { getCodes } from 'country-list';

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

      const countryCodes = getCodes();

      let priceIndex = null;

      for (const slug of namesOnly) {
        const temp: LogoData = {
          name: null,
          price: {
            amount: null,
            currency: null
          },
          country: null
        };

        const split = slug.split('-');

        for (const word of split) {
          // search currency
          if (codes().includes(word.toUpperCase())) {
            const index = split.indexOf(word);

            temp.price.amount = parseInt(split[index - 1], 10);
            temp.price.currency = word.toLowerCase();
          }

          // search country
          if (countryCodes.includes(word.toUpperCase())) {
            temp.country = word.toLowerCase();
          }

          if (!isNaN(word as any)) {
            priceIndex = split.indexOf(word);
          }
        }

        // search for name
        const name = split.slice(0, priceIndex).join(' ');
        temp.name = name;

        if (temp.name && temp.price.amount && temp.price.amount) {
          logosData.push(temp);
        } else {
           invalidEntries.push(slug);
        }
      }

      let counter = 0;
      logosData.forEach(x => { if (!x.country) { counter++; } });

      return logosData;
    } catch (e) {
      console.log(e);
      logger.error({ message: 'get data error' });
      throw Error('get data error');
    }
  }
}

export default new CSVParser();
