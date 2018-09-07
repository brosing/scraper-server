const SELECTOR = '.repo-list > li';

const scrapRepos = async (page, query) => {
  let url = 'https://github.com/trending';

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
    let repos = [];

    collections.forEach((item) => {
      const title = item.querySelector('h3 > a').innerText;
      const link = item.querySelector('h3 > a').getAttribute('href');
      const description = item.querySelector('.py-1 > p').innerText;

      const anyLang = item.querySelector('[itemprop="programmingLanguage"]');
      const lang = anyLang ? anyLang.innerText : null;

      const anyStars = item.querySelector('.muted-link > .octicon-star');
      const stars = anyStars ? anyStars.nextSibling.textContent.trim() : '0';

      const anyForks = item.querySelector('.muted-link > .octicon-repo-forked');
      const forks = anyForks ? anyForks.nextSibling.textContent.trim() : '0';

      repos.push({
        title,
        link,
        description,
        lang,
        stars,
        forks
      });
    });

    return repos;
  }, SELECTOR);

  return result;
}

module.exports = scrapRepos;
