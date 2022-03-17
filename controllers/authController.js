const bcrypt = require("bcrypt");
const User = require('../models/User');

exports.createUser = async (req, res) => {
	try {
	    const user = await User.create(req.body);
		res.status(201).json({
			status: 'Success',
			user
		});
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
						res.status(200).send("SELAM");
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