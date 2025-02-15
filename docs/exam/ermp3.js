const { ermp3 } = require('@er-npm/scraper')(
  //import { ermp3 }

  async () => {
    //panggil fungsi
    const url = 'https://www.youtube.com/watch?v=vx2u5uUu3DE'
    const aud = await ermp3(url)

    console.log('Done✅:', aud)
  }
)() //resultnya berbentuk strings
