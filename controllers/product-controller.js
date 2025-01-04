const Product = require("../models/Product");

const insertSample = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "laptops",
        catgeory: "Electronics",
        price: 99,
        inStock: true,
        tags: ["computer", "tech"],
      },
      {
        name: "smartphone",
        catgeory: "Electronics",
        price: 199,
        inStock: false,
        tags: ["computer", "phones"],
      },
      {
        name: "iphonse",
        catgeory: "Electronics",
        price: 399,
        inStock: true,
        tags: ["ios", "tech"],
      },
      {
        name: "samsungs",
        catgeory: "Electronics",
        price: 399,
        inStock: true,
        tags: ["ios", "sndroid"],
      },
    ];
    const result = await Product.insertMany(sampleProducts);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error occured",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          inStock: true,
          price: {
            $gte: 100,
          },
        },
      },
      {
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price"
          },
          count: {
            $sum : 1
          }
        }
      }
    ]);
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error",
    });
  }
};

const getProductAnalysis = async(req, res)=> {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: "Electronics"
        }
      }, 
      {
        $group: {
          _id: 1,
          totalRevenue: {
            $sum: "$price"
          },
          averagePrice: {
            $avg: "$price"
          },
          maxProdictPrice: {
            $max: "price"
          }
        }
         }
    ])
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed'
    })
  }
}

module.exports = { insertSample, getProducts, getProductAnalysis };
