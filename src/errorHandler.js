const errorHandler = async (url, page, evaluate) => {
  console.log('url', url)
  try {
    const thePage = await page.goto(url);

    return (thePage.status() === 404)
      ? {
        errorCode: 404,
        errorMessage: 'The page you are looking for is not found.'
      }
      : evaluate();

  } catch (err) {
    console.log('ERROR', err);

    return {
      errorCode: 500,
      errorMessage: err.message
    }
  }
}

module.exports = errorHandler;
