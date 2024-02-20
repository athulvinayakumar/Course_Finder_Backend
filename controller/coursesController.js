
const coursses = require('../Model/coursesSchema')
const coursers = require('../Model/courseSchema')

exports.addcourse = async (req, res) => {

    console.log('inside the controller');
    const userId = req.payload
    console.log(userId);
    const courseimage = req.files['courseimage'][0].filename;
    console.log(courseimage);
    const coursevideo = req.files['coursevideo'][0].filename;
    console.log(coursevideo);

    const { coursename, description, category } = req.body

    console.log(`${coursename},${description},${category},${courseimage},${coursevideo},${userId}`);
    try {
        const existingUser = await coursses.findOne({ coursename })
        if (existingUser) {
            res.status(406).json("Course Already Exist !! Upload Another")
        }
        else {
            const newCategory = new coursses({
                coursename, description, category, courseimage, coursevideo, userId
            })
            await newCategory.save()
            res.status(200).json(newCategory)
        }
    } catch (err) {
        res.status(401).json("Request Failed due to ", err)

    }
}

exports.getCourses = async (req, res) => {
    //get id from the token
    const userId = req.payload
    console.log(userId);

    try {
        const userCourse = await coursses.find({ userId })
        res.status(200).json(userCourse)
    } catch (err) {
        res.status(401).json(err)
    }

}

exports.getAllCourses = async (req, res) => {
    const searchKey = req.query.search;
    console.log(searchKey);
    const query = {
        coursename: {
            // Regular expression, $options means to remove case sensitivity
            $regex: searchKey, $options: "i"
        }
    }
    try {
        const userCourse = await coursses.find(query)
        res.status(200).json(userCourse)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.getAllCourses1 = async (req, res) => {
 
    try {
        const userCourse = await coursses.find()
        res.status(200).json(userCourse)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.editCourses = async (req, res) => {
    const { id } = req.params;
    const userId = req.payload;
    const { coursename, description, category, courseimage, coursevideo } = req.body;
    // const uploadcourseimage = req.files['courseimage'] ? req.files['courseimage'][0].filename : courseimage;
    // const uploadcoursevideo = req.files['coursevideo'] ? req.files['coursevideo'][0].filename : coursevideo;
    const uploadcourseimage = req.files && req.files['courseimage'] ? req.files['courseimage'][0].filename : courseimage;
    const uploadcoursevideo = req.files && req.files['coursevideo'] ? req.files['coursevideo'][0].filename : coursevideo;

    try {
        const updateCourse = await coursses.findByIdAndUpdate(
            { _id: id },
            {
                coursename,
                description,
                category,
                courseimage: uploadcourseimage,
                coursevideo: uploadcoursevideo,
                userId
            },
            { new: true }
        );
        await updateCourse.save()
        res.status(200).json(updateCourse);
    } catch (err) {
        res.status(401).json(err);
    }
}

exports.deleteCourse = async (req, res) => {
    //get id
    const { id } = req.params

    try {
        const removeCourse = await coursses.findByIdAndDelete({ _id: id })
        res.status(200).json(removeCourse)

    } catch (err) {

        res.status(401).json(err)
    }
}

exports.getCombinedData = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const course = await coursses.find({ userId: id });

        const user = await coursers.find({ _id: id });

        res.status(200).json({ user, course });
    } catch (err) {
        res.status(401).json(err);
    }
}
