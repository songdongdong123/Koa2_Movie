const puppeteer = require('puppeteer');
const url = 'https://ssl.gongyi.qq.com/m/weixin/yqj_rank.html?id=12771&et=h5detl&gt=h5detl&et=h5detl&gt=h5detl'
const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil:'networkidle2'
  });
  await sleep(3000)
  for(let i = 0; i < 10; i++) {
    await sleep(3000)
    await page.evaluate((scrollStep)=>{
      let scrollTop = document.scrollingElement.scrollTop;
      document.scrollingElement.scrollTop = scrollTop + scrollStep;
    }, 5000);
  }
  const result = await page.evaluate(() => {
    var $ = window.$
    var items = $('.cells-list li')
    var links = []
    // console.log(items)
    if (items.length >= 1) {
      items.each((index, item) => {
        let it = $(item)
        let length = items.length
        let avater = it.find('img').attr('src')
        let nickname = it.find('h2').text()
        let time = it.find('.li-msg').text()
        // let title = it.find('.title').text()
        // let rate = Number(it.find('.rate').text())
        // let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')

        links.push({
          avater,
          nickname,
          time,
          length
        })
      })
    }
    return links
  })
  await browser.close();
  console.log(result)
})();