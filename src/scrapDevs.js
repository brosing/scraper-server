const SELECTOR = '.explore-content > ol > li';

const scrapDevs = async (page, query) => {
  let url = 'https://github.com/trending/developers';

  if (query.since && query.since === 'weekly') {
    url += '?since=weekly';
  } else if (query.since && query.since === 'monthly') {
    url += '?since=monthly';
  }

  try {
    await page.goto(url);
  }
  catch (error) {
    console.log(error.stack);
    return error.message;
  }
  
  const result = await page.evaluate((el) => {
    const collections = document.querySelectorAll(el);
    let devs = [];

    collections.forEach((item) => {
      const link = item.querySelector('.f3.text-normal > a').getAttribute('href');
      const title = item.querySelector('.f3.text-normal > a').innerText;
      const snipitName = item.querySelector('.repo-snipit .repo-snipit-name').innerText;
      const snipitDesc = item.querySelector('.repo-snipit .repo-snipit-description').innerText;
      const avatar = item.querySelector('.d-flex > .mx-2 > a > img').src;

      devs.push({
        link,
        title,
        snipitName,
        snipitDesc,
        avatar,
      });
    })

    return devs;
  }, SELECTOR);

  return result;
}

module.exports = scrapDevs;
