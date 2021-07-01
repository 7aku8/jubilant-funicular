import Jimp from 'jimp';
import { readdirSync, rename } from 'fs';
import { resolve } from 'path';
import { getNameList } from 'country-list';

import { default as logger } from './../logger';
import { resourceLimits } from 'worker_threads';

class CombineImages {
  private image;

  constructor() {
    try {
      console.log('jeszcze nie wiem co tu bedzie');
    } catch (e) {
      logger.error({ message: `combine images initialize ERROR => ${e}` });
      throw Error('combine images initialize ERROR');
    }
  }

  public async readImage() {
    try {
      this.image = await Jimp.read(`${__dirname}/../../templates/cover.jpeg`);


      const imageDirPath = resolve(`${__dirname}/../../templates/flags`);
      const files = readdirSync(imageDirPath);


      console.log(this.image);
    } catch (e) {
      logger.error({ message: `read image ERROR => ${e}` });
      throw Error('read image ERROR');
    }
  }
}

export default new CombineImages();


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

