
const categories = require('../Model/catSchema')
// import
exports.addCategory = async (req, res) => {
    console.log('inside the controller');

    const userId = req.payload
    console.log(userId);

    const { category } = req.body
    console.log(`${category}`);

    try {
        const existingUser = await categories.findOne({ category })
        if (existingUser) {
            res.status(406).json("Category Already exists !! Upload Another")
        }
        else {
            const newCategory= new categories({
                category,userId
            })
            await newCategory.save()
            res.status(200).json(newCategory)
        }
    } catch (err) {
        res.status(401).json("Request Failed due to ", err)

    }
}

exports.getCategory = async (req, res) => {

    //get id from the token
    const userId = req.payload
    console.log();

    try {
        const admin = await categories.find({ userId })
        res.status(200).json(admin)
    } catch (err) {
        res.status(401).json(err)
    }

}

exports.getCategories = async (req, res) => {

    //get id from the token
    try {
        const admin = await categories.find({  })
        res.status(200).json(admin)
    } catch (err) {
        res.status(401).json(err)
    }

}

exports.editCategory = async(req,res)=>{

    const { id } = req.params
    console.log(id);
    const userId = req.payload
    console.log(userId);
    const { category } = req.body

    try {
        const updateCategory = await categories.findByIdAndUpdate({ _id: id }, {
          category, userId
        }, { new: true })

        await updateCategory.save()
        res.status(200).json(updateCategory)

    } catch (err) {
        res.status(401).json(err)
    }
}

exports.deletecAtegory = async (req, res) => {
    //get id
    const { id } = req.params

    try {
        const removeCategory = await categories.findByIdAndDelete({ _id: id })
        res.status(200).json(removeCategory)

    } catch (err) {

        res.status(401).json(err)
    }
}

