const User = require('../models/userModel');
exports.addUser = (async (req, res) => {
    try {        
        const userJson = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            profile:`http://localhost:3000/profile/${req.file.filename}`
        };
        await User.add(userJson);
        res.status(200).json({
            status: "success",
            message:"user added.."           
        });
    } catch (error) {
        res.send(error);
    }
})

exports.getAllUser=(async(req,res)=>{
    try {        
        const response=await User.get();
        let resArr = [];
        response.forEach(doc => {
            resArr.push(doc.data());
        });
        res.status(200).json({
            status: "success",
            resArr           
        });
    } catch (error) {
        res.send(error);
    }
})

exports.findById=(async(req,res)=>{
    try {
        console.log(req.params.id);
        const userRef = User.doc(req.params.id);
        const response = await userRef.get();
        const data=response.data();
        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        console.log(error);
    }
})

exports.updateUser=(async(req,res)=>{
    try {
        const id = req.body.id;
        await User.doc(id)
        .update({
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName
        })
        res.status(200).json({
            status: "success",
            message:"user update..."
        });
    } catch (error) {
        console.log(error);
    }
})

exports.deleteUser=(async(req,res)=>{
    try {
        await User.doc(req.params.id).delete();
        res.status(200).json({
            status: "success",
            message:"user delete..."
        });
    } catch (error) {
        console.log(error);
    }
})