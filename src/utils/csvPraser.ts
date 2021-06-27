import { CsvRow } from '../interfaces/CsvRow';

const csv = require('csvtojson');
import { default as logger } from './../logger';

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

      const slugsOnly = this.rows.map(x => x.slug);


    } catch (e) {
      logger.error({ message: 'get data error' });
      throw Error('get data error');
    }
  }
}

export default new CSVParser();
