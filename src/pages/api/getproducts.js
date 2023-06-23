import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  const {category} = JSON.parse(req.body);
  let products;
  if(category){
    products = await Product.find({category: category});
  } else {
      products = await Product.find();
  }
  let product = {}
  let result =[]; 
  if(category){

    for (let item of products) {
      if (item.title in product) {
        
        if (!product[item.title].color.includes(item.color) && item.availableQty > 0) {
          product[item.title].color.push(item.color)
        }
        
        if (!product[item.title].size.includes(item.size) && item.availableQty > 0) {
          product[item.title].size.push(item.size)
        }
        
      } else {
        product[item.title] = JSON.parse(JSON.stringify(item));
        
        if (item.availableQty > 0) {
        product[item.title].color = [item.color]
        product[item.title].size = [item.size]
      }else {
        product[item.title].color = []
        product[item.title].size = []
      }
    }
  }
  Object.keys(product).map((item)=>{
    result.push(product[item])
  })
  let newResult;
  if(req.query.count){
    newResult = result.slice(0,parseInt(req.query.count));
  } else {
    newResult = result;
  }
  
  res.status(200).json(newResult);
  return;
} else { 
   product = await Product.find();
   let newResult;
  if(req.query.count){
    newResult = product.slice(0,parseInt(req.query.count));
  } else {
    newResult = result;
  }
   res.status(200).json(newResult);
}

}

export default connectDb(handler);