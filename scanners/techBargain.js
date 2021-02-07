const fetch = require("node-fetch");
const cheerio = require("cheerio");

const mostRecent = async (category, store) => {
  if (category) {
    url = `https://www.techbargains.com/categories/${category}`;
  } else if (store) {
    url = `https://www.techbargains.com/stores/${store}`;
  } else {
    url = `https://www.techbargains.com/`;
  }

  console.log(url);
  const response = await fetch(url).then((response) => {
    if (response.status === 200) {
      return response.text();
    } else {
      return undefined;
    }
  });
  if (response != undefined) {
    const $ = cheerio.load(response);
    const itemObj = [];
    $("body")
      .find(".row.deal.bg-white.border-gray-darker.border.mb-3.shadow-sm")
      .each((i, el) => {
        const imgEl = $(el).find("img");
        const title = imgEl.attr("alt");
        const json = imgEl.attr("v-image-loader");
        const price = $(el)
          .find(".col-6 > div > .text-red.d-block.font-size-h2")
          .text();
        let link;
        if (json === undefined) {
          link = imgEl.attr("src");
        } else {
          link = json.slice(json.indexOf("'") + 1, json.lastIndexOf("'"));
        }
        var obj = {
          title: title,
          image: link,
          price: price,
        };
        itemObj.push(obj);
      });
    return itemObj;
  }
};

module.exports = {
  mostRecent,
};
