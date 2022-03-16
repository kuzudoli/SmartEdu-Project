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
        const courseId = req.params.id; 
	    const course = await Course.findById(courseId);
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