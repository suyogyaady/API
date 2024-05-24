const path = require('path')

const createProduct = async (req, res) => {

    //check incoming data
    console.log(req.body)
    console.log(req.files)

    //destructuring the body data (json)
    const {productName,
        productPrice,
        productCategory,
        productDescription
    } = req.body;

    //Validation (task)
    if(!productName || !productPrice || !productCategory || !productDescription) {
        return res.status(400).json({
            "success" : false,
            "message" : "Please enter all fields"
        })

       
    }
     //validate if there is image
     if(!req.files || !req.files.productImage) {
        return res.status(400).json({
            "success" : false,
            "message" : "Image not found"
        })
    }

    const {productImage} = req.files;

    //upload image
    // 1. Generate new image name (abc.png) -> (21324-abc.png)
    const imageName = `${Date.now()}-${productImage.name}`;

    // 2. Make a upload path(/path/upload- directory)
    const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`)

    // 3. Move to that directory (await, try-catch)
    try{
        await productImage.mv(imageUploadPath)
        res.send("Image uploaded")

    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success" : false,
            "message" : "Internal Server Error",
            "error" : error
        })
    }
    
};

module.exports = {
    createProduct
};