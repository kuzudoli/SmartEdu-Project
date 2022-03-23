const bcrypt = require("bcrypt");
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require("../models/Course");

exports.createUser = async (req, res) => {
	try {
		const email = req.body.email;
		const findUser = await User.findOne({email});
		console.log(findUser);
		if(!findUser){
			const user = await User.create(req.body);
			res.redirect("/login");
		}else{
		 	res.redirect("/");
		}
	} catch(error){
		res.status(400).json({
            status: "Failed",
            error
        })
	}
};

exports.loginUser = async (req, res) => {
	try {
		const {email,password} = req.body;

	    await User.findOne({email}).then((user) => {
			if(user){
				bcrypt.compare(password, user.password,(err,same) => {
					if(same){
						req.session.userID = user._id;
						res.redirect("/users/dashboard");
					}else{
						res.redirect("/login")
					}
				});
		  	}else{
				  res.redirect("/login")
			  }
		})
	} catch(error){
		res.status(400).json({
            status: "Failed",
            error
        })
	}
};

exports.logoutUser = async (req, res) => {
	req.session.destroy(() => {
	  res.redirect("/");
	})
};

exports.getDashboard = async(req,res) => {
	const user = await User.findOne({_id:req.session.userID}).populate("courses")//Student
	const users = await User.find()//for Admin
	const categories = await Category.find();
	const courses = await Course.find({user:req.session.userID}).populate("category")//Teacher
	//console.log(courses[0].category.name + ":" + categories[0].name);
	if(user){
		res.status(200).render("dashboard",{
			page_name:"dashboard",
			user,
			categories,
			courses,
			users
		});
	}else{
		res.redirect("/");
	}
}

exports.deleteUser = async (req, res) => {
	try {
        await User.findByIdAndRemove(req.params.id);
		await Course.deleteMany({user:req.params.id});//Removes deleted user's courses if it is teacher
		res.status(200).redirect("/users/dashboard");
	} catch(error){
		res.status(400).json({
            status: "Failed",
            error
        })
	}
};