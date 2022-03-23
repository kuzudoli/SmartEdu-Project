const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
	try {
	    const category = await Category.create(req.body);
		res.status(201).redirect("/users/dashboard");
	} catch(error){
		res.status(400).json({
            status: "Failed",
            error
        })
	}
};

exports.getAllCourses = async (req, res) => {
	try {
	    const courses = await Course.find();
		res.status(200).render("courses",{
            courses,
            page_name:'courses'
        });
	} catch(error){
		res.status(400).json({
            status: "Failed",
            error
        })
	}
};

exports.getCourse = async (req, res) => {
	try {
        const courseSlug = req.params.slug; 
	    const course = await Course.findOne({slug:courseSlug});
		res.status(200).render("course",{
            course,
            page_name:'courses'
        });
	} catch(error){
		res.status(400).json({
            status: "Failed",
            error
        })
	}
};

exports.deleteCategory = async (req, res) => {
	try {
        await Category.findByIdAndRemove(req.params.id);
		//await Course.deleteMany({category:req.params.id});//Removes deleted user's courses if it is teacher
		res.status(200).redirect("/users/dashboard");
	} catch(error){
		res.status(400).json({
            status: "Failed",
            error
        })
	}
};