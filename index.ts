// @ts-ignore
import dotenv from 'dotenv';
dotenv.config();

import ImageConverter from './src/imageConverter';

(async () => {
  const converter = new ImageConverter();

  await converter.parse();
})();
