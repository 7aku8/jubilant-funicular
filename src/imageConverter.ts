import CsvParser from './utils/csvPraser';
import CombineImages from './utils/combineImages';

import { LogoData } from './interfaces/LogoData';

class ImageConverter {
  private csvParser = CsvParser;

  private logosData: LogoData[]|null = null;

  public async parse() {
    this.logosData = await this.csvParser.getData();

    for (const data of this.logosData) {
      const combine = new CombineImages({ info: data });

      await combine.readImage();
    }
  }
}

export default ImageConverter;
