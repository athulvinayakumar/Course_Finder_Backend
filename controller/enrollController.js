

const enrolls = require('../Model/enrollSchema')

exports.enrollNow = async (req, res) => {
    console.log('inside the controller');

    const { name, email, date, number, message, courseid } = req.body;
    console.log(`${name},${email},${date},${number},${message},${courseid}`);

    try {
        const newEnroll = new enrolls({
            name, email, date, number, message, courseid
        });
        await newEnroll.save();
        res.status(200).json(newEnroll);
    } catch (err) {
        res.status(401).json(err )
    }
}

exports.getEnrolledUsers = async(req,res)=>{

    const id = req.params.id
    console.log(id);
     try{
      const enrollUsers = await enrolls.find({courseid:id})
      res.status(200).json(enrollUsers)
     }catch(err){
         res.status(401).json(`Request failed due to ${err}`)
     }
     }

     exports.deleteEnrolled = async (req, res) => {
        //get id
        const { id } = req.params
    
        try {
            const removeEnrolled = await enrolls.findByIdAndDelete({ _id: id })
            res.status(200).json(removeEnrolled)
    
        } catch (err) {
    
            res.status(401).json(err)
        }
    }
    