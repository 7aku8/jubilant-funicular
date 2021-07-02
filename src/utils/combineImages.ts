import Jimp from 'jimp';
// import { readdirSync, rename } from 'fs';
// import { resolve } from 'path';
// import { getNameList } from 'country-list';

import { default as logger } from './../logger';
import { LogoData } from '../interfaces/LogoData';
import getSymbolFromCurrency from 'currency-symbol-map'
// import { resourceLimits } from 'worker_threads';

class CombineImages {
  private readonly logoData;
  private image;
  private flag;
  private fontName;
  private fontPrice;

  constructor(data: { info: LogoData }) {
    try {
      const { info } = data;

      this.logoData = info;
    } catch (e) {
      logger.error({ message: `combine images initialize ERROR => ${e}` });
      throw Error('combine images initialize ERROR');
    }
  }

  public async readImage() {
    try {
      this.image = await Jimp.read(`${__dirname}/../../templates/cover.jpeg`);

      // add flag to image
      if (this.logoData.country) {
        this.flag = await Jimp.read(`${ __dirname }/../../templates/flags/${ this.logoData.country }.png`);
        this.flag.resize(50, 50);
        this.image.composite(this.flag, 10, 10);
      }

      // add payment method name to image
      this.fontName = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
      this.image.print(this.fontName, 10, 80, this.logoData.name);

      // add price to image
      this.fontPrice = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
      const price = `${this.logoData.price.amount} ${getSymbolFromCurrency(this.logoData.price.currency)}`;
      this.image.print(this.fontPrice, 10, 110, price);
    } catch (e) {
      logger.error({ message: `read image ERROR => ${e}` });
      throw Error('read image ERROR');
    }
  }

  public async saveImage() {
    try {
      this.image.write(`results/${this.logoData.nameToBeSaved}.png`);
    } catch (e) {
      logger.error({ message: `save image ERROR => ${e}` });
      throw Error('save image ERROR');
    }
  }
}

export default CombineImages;


// const imageDirPath = resolve(`${__dirname}/../../templates/flags`);
// const files = readdirSync(imageDirPath);
// const getFileName = (data: { name: string }) => {
//   const { name } = data;
//
//   const countryWithExt = name.split('-')[1];
//   const country = countryWithExt.split('.')[0];
//
//   console.log(country);
//
//   const code = getNameList()[country.toLowerCase()];
//
//   return code ? `${code.toLowerCase()}.png` : name;
// };
//
// files.forEach(file => rename(
//   imageDirPath + `/${file}`,
//   imageDirPath + `/${getFileName({ name: file })}`,
//   err => { console.log(err) }
// ));

