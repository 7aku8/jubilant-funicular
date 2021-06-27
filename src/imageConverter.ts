import csvParser from './utils/csvPraser';

class ImageConverter {
  private csvParser = csvParser;

  constructor() {

  }

  public async parse() {
    console.log(await this.csvParser.getData());
  }
}

export default ImageConverter;
