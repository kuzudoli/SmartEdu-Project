const bcrypt = require("bcrypt");
const User = require('../models/User');
const Category = require('../models/Category');

exports.createUser = async (req, res) => {
	try {
	    const user = await User.create(req.body);
		res.redirect("/login");
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
			 		}
				});
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
	const user = await User.findOne({_id:req.session.userID})
	const categories = await Category.find();
	if(user){
		res.status(200).render("dashboard",{
			page_name:"dashboard",
			user,
			categories
		});
	}else{
		res.redirect("/");
	}
}