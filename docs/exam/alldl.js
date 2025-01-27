const { alldl } = require('@er-npm/scraper');
//import { alldl } = require("@er-npm/scraper");

(async () => {
  const url = 'https://vm.tiktok.com/ZMkNpBFjX/'; //valid url tiktok or any
  const nya = await alldl(url);

  for (download of nya) {
    console.log(`Download ${nya.type} selesai:`, nya.src); //result data from alldl
  }
})();
