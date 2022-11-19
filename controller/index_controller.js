const NewsAPI = require("newsapi");

API_KEY = '4bfaa7ce565d4d15b106d3b902982160'
const newsapi = new NewsAPI(`${API_KEY}`);

const getTopHeadlinesof = (field) => {
  return newsapi.v2.topHeadlines({
    category: field,
    language: "en",
  });
};
const getEverything = (query) => {
  return newsapi.v2.everything({
    q: query,
    language: "en",
  });
};

// Index page headlines
const HeadLineGet = async (req, res) => {
    try {
        const generalNews = await getTopHeadlinesof('general')
        const sportsNews = await getTopHeadlinesof('sports')
        const techNews = await getTopHeadlinesof('technology')
        const businessNews = await getTopHeadlinesof('business')
        const healthNews = await getTopHeadlinesof('health')
        res.render('index', {
          general: generalNews.articles.slice(0, 10),
          sports: sportsNews.articles.slice(0, 10),
          tech: techNews.articles.slice(0, 10),
          business: businessNews.articles.slice(0, 10),
          health: healthNews.articles.slice(0, 10)
        })
      } catch (err) {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
          res.render('index', {
            government: null,
            environment: null,
            tech: null,
            business: null,
            health: null
        })
    }
}

// Search post page
const SearchPost = async (req, res) => {
    let search = req.body.search
  try {
    const searchResult = await getEverything(search)
    res.render('', {
      articles: searchResult.articles
    })
  } catch (err) {
    res.render('', {
        articles: null
      })
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)
  }
}

module.exports = {
    HeadLineGet,
    SearchPost
}