const nodemailer = require("nodemailer");

exports.getIndexPage = (req,res) => {
    res.status(200).render("index",{
        page_name:"index"
    });
}

exports.getAboutPage = (req,res) => {
    res.status(200).render("about",{
        page_name:"about"
    });
}

exports.getRegisterPage = (req,res) => {
    res.status(200).render("register",{
        page_name:"register"
    });
}

exports.getLoginPage = (req,res) => {
    res.status(200).render("login",{
        page_name:"login"
    });
}

exports.getContactPage = (req,res) => {
    res.status(200).render("contact",{
        page_name:"contact"
    });
}

exports.sendMail = async(req,res) => {
    try{
        const outputMessage  = `
        <h1>Mail Details:</h1>
            <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h1>Message</h1>
        <p>${req.body.comment}</p>
        `
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'pilavlivar5@gmail.com', // generated ethereal user
                pass: 'pqavjuyvpnilrpwz', // generated ethereal password
            },
        });
        
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <pilavlivar5@gmail.com>', // sender address
            to: "enescakkr@windowslive.com", // list of receivers
            subject: "Test Mail", // Subject line
            html: outputMessage, // html body
        });
        
        req.flash("success","Email successfully sent!");
        res.status(200).redirect("/contact")
    }catch(err){
        req.flash("error",`Something gone wrong! ${err}`);
        res.status(200).redirect("/contact")
    }
}