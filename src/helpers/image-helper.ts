const fs = require('fs');
const PNG = require('pngjs').PNG;
const resemble = require('node-resemble-js');
import {browser} from 'protractor';

class ImageHelper {
  private readonly screenshotsTargetPath: string;

  constructor(screenshotsPath) {
    resemble.outputSettings({
      errorColor: {
        red: 155,
        green: 100,
        blue: 155
      },
      errorType: 'movement',
      transparency: 0.6
    });
    this.screenshotsTargetPath = screenshotsPath || './target/screenshots/';
  }

  /**
   * Compare two images and return object with results.
   * @param {string} img1 - Path to first file.
   * @param {string} img2 - Path to second file.
   * @param {string} [outFile] - The string containing two comma-separated numbers.
   * @return {Object} - object with comparison result
   * {
   * misMatchPercentage : 100, // %
   * isSameDimensions: true, // or false
   * dimensionDifference: { width: 0, height: -1 }, // defined if dimensions are not the same
   * getImageDataUrl: function(){}
   * }
   */
  public compare(img1, img2, outFile) {
    return new Promise((resolve, reject) => {
      try {
        resemble(img1).compareTo(img2).onComplete((diff) => {
          try {
            if (outFile) {
              fs.writeFileSync(outFile, diff.getDiffImageAsJPEG());
            }
            resolve(diff);
          } catch (e) {
            reject(e);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Take screenshot and save it to the folder
   * @param {ElementFinder} element - Protractor element to be screenshoted.
   * @param {string} fileName - Path to save the screenshot.
   * Resolution: .png
   * @return {Object} - object with size parameters
   */
  public async takeScreenshotOfTheElement(element, fileName) {
    const elementLocation = await element.getLocation();
    const elementSize = await element.getSize();
    const screenshot = await browser.takeScreenshot();

    const src = PNG.sync.read(Buffer.from(screenshot, 'base64'));
    const dst = new PNG({width: elementSize.width, height: elementSize.height});
    PNG.bitblt(src, dst, elementLocation.x, elementLocation.y, dst.width, dst.height, 0, 0);
    if (!fs.existsSync(this.screenshotsTargetPath)) {
      fs.mkdirSync(this.screenshotsTargetPath);
    }
    fs.writeFileSync(`${this.screenshotsTargetPath}${fileName}.png`, PNG.sync.write(dst));
    return elementSize;
  }
}

module.exports = ImageHelper;
