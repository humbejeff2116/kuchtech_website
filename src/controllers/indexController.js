



const path = require('path');


const FileDataWriter  = require('../lib/fileDataWriter');


class IndexController {

    index = async (req, res, next) => {

        res.render('index/home');

    }

    about = (req, res, next) => {

        res.render('about/about');

    }

    getAdmission = (req, res, next) => {

        res.render('admission/admission')

    }

    getEntryRequirements = (req, res, next) => {

        res.render('entry_requirements/entry_requirements')

    }

    getEApplication = (req, res, next) => {

        res.render('e-application/e-application')

    }

    getDepartments = (req, res, next) => {

        res.render('departments/departments')

    }

    contact = (req, res, next) => {

        res.render('contact/contact');

    }

    blog = (req, res, next) => {

        res.render('blog/blog');
        
    }

    getAllBlogPost = async (req, res) => {

        const blogsFilePath = path.join('src/data');

        const blogWriter = new FileDataWriter();


        const posts = await blogWriter.setRelativePath(blogsFilePath, 'blog.json').getAllData();

        return res.status(200).json({ 
            status: 200, 
            message:`Blog posts gotten successfully`, 
            data: posts.data 
        });
        
    }
    
    search = async (req, res) => {

        const queryString = req.query.q;

        const queryType = req.query.t;

        try {

            switch (queryType) {
                case 'search course' :

                    this.searchCourses(queryString, res);

                    break;

                case 'get courses' :

                    this.getAllCourses(res);

                    break;

                default:

                    this.errorSearch(res)

            }
            
            
           
        } catch(err) {

            console.error(err);

            res.json({ error: true, message: 'an error occured while getting products' });

            return res.status(500);
        }

    }

    searchCourses = async (query = "", res) => {
        try {

            const coursesFilePath = path.join('src/data');

            const coursesWriter = new FileDataWriter();

            const coursesResponse = await coursesWriter.setRelativePath(coursesFilePath, 'courses.json').search(query);

            return res.status(200).json({ 
                status: 200, 
                message:`courses gotten successfully`, 
                data: coursesResponse.data 
            });


        } catch (err) {

            console.error(err)
        }
       
    }

    getAllCourses = async (res) => {
        try {

            const coursesFilePath = path.join('src/data');

            const coursesWriter = new FileDataWriter();
    
            const coursesResponse = await coursesWriter.setRelativePath(coursesFilePath, 'courses.json').getAllData()
    
            return res.status(200).json({ 
                status: 200, 
                message:`courses gotten successfully`, 
                data: coursesResponse.data 
            });

        } catch(err) {

        }

    }

    errorSearch = async (res) => {

        return res.status(400).json({ status: 400, message:`bad search query`, data: [] });

    }

}

module.exports = new IndexController();