import CsvParser from './utils/csvPraser';
import CombineImages from './utils/combineImages';

import { LogoData } from './interfaces/LogoData';

class ImageConverter {
  private csvParser = CsvParser;

  private logosData: LogoData[]|null = null;

  public async parse() {
    this.logosData = await this.csvParser.getData();

    console.log(`Images to be generated: ${this.logosData.length}`);
    let counter = 0;

    for (const data of this.logosData) {
      const combine = new CombineImages({ info: data });

      await combine.readImage();
      await combine.saveImage();

      counter++;
      console.log(`Done ${counter} / ${this.logosData.length}`);
    }

    console.log('==== GENERATING FINISHED ====');
  }
}

export default ImageConverter;
