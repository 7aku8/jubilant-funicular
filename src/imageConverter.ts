import csvParser from './utils/csvPraser';
import combineImages from './utils/combineImages';

import { LogoData } from './interfaces/LogoData';

class ImageConverter {
  private csvParser = csvParser;
  private combineImages = combineImages;

  private logosData: LogoData[]|null = null;

  public async parse() {
    this.logosData = await this.csvParser.getData();

    await this.combineImages.readImage();
    console.log(this.logosData);
  }
}

export default ImageConverter;
