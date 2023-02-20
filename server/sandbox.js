/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./eshops/dedicatedbrand');
//https://www.dedicatedbrand.com/en/men/all-men
//https://www.dedicatedbrand.com/en/loadfilter

const montlimar_brand = require('./eshops/montlimar_brand');

//https://www.montlimart.com/99-vetements

const circlebrand=require('./eshops/circlebrand');
//https://shop.circlesportswear.com/collections/collection-homme


async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/loadfilter') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    //const products = await montlimar_brand.scrapeAndSave(eshop, 'montlimar.json');
    //const products = await dedicatedbrand.scrapeAndSave(eshop,'dedicated.json');
    //const products = await circlebrand.scrapeAndSave(eshop,'circle.json');
    const products = await dedicatedbrand.getProducts()

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
