const baseURL = 'https://github.com/';
const postfixURL = '/blob/master/README.md';
const readmeSelector = '.readme.blob';

const scrapReadme = async (page, link) => {
  const sliceLink = link.split(':').join('/');
  const url = `${baseURL}${sliceLink}${postfixURL}`;

  await page.goto(url);

  const result = await page.evaluate((el) => {
    const html = document.querySelector(el).innerHTML;
    // relink all images in github source code
    return html.split(`src="/`).join(`src="https://github.com/`);
  }, readmeSelector);

  // page.close();
  return result;
}

module.exports = scrapReadme;
