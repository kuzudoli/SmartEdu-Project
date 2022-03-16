const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
	try {
	    const course = await Course.create(req.body);
		res.status(201).json({
			status: 'Success',
			course
		});
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