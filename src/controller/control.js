const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Appointment = require('../models/appointment')
exports.addUser = async (req, res, next) => {
   
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.send('User already registered. Please log in.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstname, lastname, email, password: hashedPassword });
        await newUser.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred. Please try again later.');
    }
}







exports.getregister = (req, res, next) => {
  
    const navItems = [
        { title: 'Home', link: '/' },
        { title: 'About', link: '/about' },
        { title: 'Services', link: '/services' },
        { title: 'Contact', link: '/contact' }
    ];

    res.render('register', {
        title: 'Register',
        hospitalEmail: 'contact@hospital.com',
        hospitalPhone: '123-456-7890',
        navItems: navItems, // Make sure this is passed
        pageTitle: 'Register a New Account',
        footerDescription: 'Your trusted healthcare provider.',
        latestPosts: [/* latest posts */],
        usefulLinks: [/* useful links */],
        address: '123 Hospital St, City, Country'
    });
}






exports.mainpage = (req, res, next) => {

    res.render('index'); // This should match the name of your .pug file

}



exports.getlogin = (req, res, next) => {
    res.render('login', {
        title: 'Unity Hospital | Login',
        navbar: [
            { title: 'Home', link: '/' },
            { title: 'Register', link: '/register' }
        ],
        loginAction: '/login',
        forgotPasswordLink: '/forgot-password'
    });
};


exports.postlogin = async (req, res, next) => {
    const { userid: email, usrpsw: password } = req.body;

    try {

        const user = await User.findOne({ email });


        if (!user) {
            return res.status(401).send('Invalid email or password.');
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.send('Login successful!');
        } else {
            res.status(401).send('Invalid email or password.');
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred. Please try again later.');
    }
};

// controllers/doctorsController.js



exports.getdoctors = (req, res, next) => {

    res.render('doctors'); // This should match the name of your .pug file

}



exports.getblogs = (req, res, next) => {
    const blogs = [
        {
            title: "How to maintain bone and joint health during winters?",
            image: "/assets/img/blogs/1.jpg",
            content: `It is usually due to restricted absorption of Vitamin D (sunlight) in your body during winter or due to decreased blood flow to bones to increase body temperature or due to restricted mobility to conserve energy which allows accumulation of inflammatory markers or toxins in joints. This leads to stiffness and pain in joints. Ignoring problems related to bones and joints which can lead to further deterioration.`,
            author: "Dr. Ramneek Mahajan",
            date: "December 31, 2020",
            inverted: false
        },
        {
            title: "Robot Assisted Kidney Transplant in France",
            image: "/assets/img/blogs/2.jpg",
            content: "First robot assisted kidney transplant (RAKT) was performed in France in 2002. Since then, it is gradually gaining foothold in transplant arena. Majority of work is being done in India, Europe and few centres in USA. World wide experience has established its functional outcomes comparable to open transplant.",
            author: "Dr. Anant Kumar",
            date: "January 30, 2021",
            inverted: true
        }
    ];

    const contactEmail = "unityhospital@gmail.com";  // Set this dynamically or fetch from config if necessary
    const contactNumber = "88666 00555";            // Same as above

    // Render the 'blog' template with blogs and contact info
    res.render('blog', {
        blogs: blogs,
        contactEmail: contactEmail,
        contactNumber: contactNumber,
        pageTitle: 'Unity Hospital | Blog',
        homeLink: 'index.html',
        aboutLink: 'about.html',
        doctorsLink: 'doctors.html',
        galleryLink: 'gallery.html',
        blogLink: 'blog.html',
        contactLink: 'contact.html',
        registrationLink: 'registration.html',
        loginLink: 'login.html',
        appointmentLink: 'appointment.html'
    });
};

exports.getabout = (req, res) => {
    // Define services array
    const services = [
        "24/7 Emergency Care",
        "Medical Checkups",
        "Surgical Services",
        "Pediatric Care",
        "Diagnostic Services"
    ];

    // Define CEO name
    const ceoName = "Harshil Patel";

    // Define video URL
    const videoURL = 'https://player.vimeo.com/video/33787650';

    // Define latest posts
    const latestPosts = [
        { title: "Unity Hospital Achievements", link: "/blog/unity-hospital-achievements", date: "2024-11-20" },
        { title: "Health Tips for Winter", link: "/blog/health-tips-for-winter", date: "2024-11-15" },
        { title: "Upcoming Medical Conferences", link: "/blog/upcoming-medical-conferences", date: "2024-11-10" }
    ];

    // Render the 'about' view and pass the data
    res.render('about', {
        title: 'About Us - Unity Hospital',  // Title of the page
        email: 'unityhospital@gmail.com',   // Contact email
        contact: '88666 00555',             // Contact phone number
        services: services,                // List of services
        ceoName: ceoName,                  // CEO name
        videoURL: videoURL,                // Video URL
        latestPosts: latestPosts           // Latest posts for footer
    });
};

exports.getappointment = (req, res, next) => {
    // Data to be passed to the EJS template
    const data = {
        pathToAssets: '/assets', // Path to static assets
        hospitalEmail: 'info@unityhospital.com', // Hospital email
        hospitalPhone: '+1-234-567-890', // Hospital phone
        departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine'], // Departments dropdown
        availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'] // Available time slots dropdown
    };

    // Render the EJS template
    res.render('appointment', data); // This should match the name of your .ejs file
};



exports.postAppointment = (req, res, next) => {
   
  console.log(req.body);
    const { name, email, subject, number, department, doctor, appointmentDate, appointmentTime } = req.body;

  
    const newAppointment = new Appointment({
        name,
        email,
        subject,
        number,
        department,
        doctor,
        appointmentDate: new Date(appointmentDate), 
        appointmentTime
    });


    
    newAppointment
        .save()
        .then(result => {
            // Send a success response
            res.status(201).json({
                message: 'Appointment booked successfully!',
                appointment: result
            });
        })
        .catch(err => {
            // Handle errors
            console.error('Error saving appointment:', err);
            res.status(500).json({
                message: 'Failed to book the appointment. Please try again later.',
                error: err.message
            });
        });
};

// const nodemailer = require('nodemailer');

// exports.postAppointment = (req, res, next) => {
//     // Extract data from the request body
//     const { name, email, subject, number, department, doctor, appointmentDate, appointmentTime } = req.body;

//     // Create a new appointment instance
//     const newAppointment = new Appointment({
//         name,
//         email,
//         subject,
//         number,
//         department,
//         doctor,
//         appointmentDate: new Date(appointmentDate), // Ensure the date is a valid Date object
//         appointmentTime
//     });

//     // Save the appointment to the database
//     newAppointment
//         .save()
//         .then(result => {
//             // Send confirmation email
//             const transporter = nodemailer.createTransport({
//                 service: 'gmail', // Use your email service
//                 auth: {
//                     user: '@gmail.com', // Replace with your email
//                     pass: 'your-email-password' // Replace with your email password or app-specific password
//                 }
//             });

//             const mailOptions = {
//                 from: 'parthokghosh420@gmail.com',
//                 to: email,
//                 subject: `Appointment Confirmation - Unity Hospital`,
//                 html: `
//                     <h2>Appointment Confirmation</h2>
//                     <p>Dear ${name},</p>
//                     <p>Thank you for booking an appointment at Unity Hospital.</p>
//                     <p><strong>Details:</strong></p>
//                     <ul>
//                         <li><strong>Department:</strong> ${department}</li>
//                         <li><strong>Doctor:</strong> ${doctor}</li>
//                         <li><strong>Date:</strong> ${appointmentDate}</li>
//                         <li><strong>Time:</strong> ${appointmentTime}</li>
//                     </ul>
//                     <p>We look forward to serving you.</p>
//                     <p>Best Regards,</p>
//                     <p><strong>Unity Hospital Team</strong></p>
//                 `
//             };

//             return transporter.sendMail(mailOptions);
//         })
//         .then(info => {
//             console.log('Email sent: ' + info.response);
//             res.status(201).json({
//                 message: 'Appointment booked successfully, and confirmation email sent!',
//             });
//         })
//         .catch(err => {
//             console.error('Error:', err);
//             res.status(500).json({
//                 message: 'Failed to book the appointment or send the email. Please try again later.',
//                 error: err.message
//             });
//         });
// };

