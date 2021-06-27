import csvParser from './utils/csvPraser';

import { LogoData } from './interfaces/LogoData';

class ImageConverter {
  private csvParser = csvParser;

  private logosData: LogoData[]|null = null;

  public async parse() {
    this.logosData = await this.csvParser.getData();


    console.log(this.logosData);
  }
}

export default ImageConverter;
