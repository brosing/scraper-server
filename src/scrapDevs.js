const SELECTOR = '.explore-content > ol > li';

const scrapDevs = async function (page, query) {
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
  
  const result = await page.evaluate(function(el) {
    const collections = document.querySelectorAll(el);
    let devs = [];

    collections.forEach(function(item) {
      const link = item.querySelector('.f3.text-normal > a').getAttribute('href');
      const title = item.querySelector('.f3.text-normal > a').innerText;

      const anyItemName = item.querySelector('.repo-snipit .repo-snipit-name');
      const itemName = anyItemName ? anyItemName.innerText : null;

      const anyItemDesc = item.querySelector('.repo-snipit .repo-snipit-description');
      const itemDesc = anyItemDesc ? anyItemDesc.innerText : null;

      const anyAvatar = item.querySelector('.d-flex > .mx-2 > a > img');
      const avatar = anyAvatar ? anyAvatar.src : null;

      devs.push({
        link,
        title,
        itemName,
        itemDesc,
        avatar,
      });
    })

    return devs;
  }, SELECTOR);

  return result;
}

module.exports = scrapDevs;
