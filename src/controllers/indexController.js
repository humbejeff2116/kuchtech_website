



const path = require('path');


const FileDataWriter  = require('../lib/fileDataWriter');


class IndexController {

    constructor() {
        
        this.index = this.index.bind(this);
        this.about = this.about.bind(this);
        this.getAdmission = this.getAdmission.bind(this);
        this.getEntryRequirements = this.getEntryRequirements.bind(this);
        this.getEApplication = this.getEApplication.bind(this);
        this.getDepartments = this.getDepartments.bind(this);
        this.contact = this.contact.bind(this);
        this.blog = this.blog.bind(this);
        this.getAllBlogPost = this.getAllBlogPost.bind(this);
        this.search = this.search.bind(this);
        this.searchCourses = this.searchCourses.bind(this);
        this.getAllCourses = this.getAllCourses.bind(this);
        this.errorSearch = this.errorSearch.bind(this);

    }

    async index(req, res, next) {

        res.render('index/home');

    }

    about (req, res, next) {

        res.render('about/about');

    }

    getAdmission(req, res, next) {

        res.render('admission/admission')

    }

    getEntryRequirements (req, res, next) {

        res.render('entry_requirements/entry_requirements')

    }

    getEApplication (req, res, next)  {

        res.render('e-application/e-application')

    }

    getDepartments (req, res, next) {

        res.render('departments/departments')

    }

    contact  (req, res, next)  {

        res.render('contact/contact');

    }

    blog (req, res, next)  {

        res.render('blog/blog');
        
    }

    async getAllBlogPost(req, res)  {

        const blogsFilePath = path.join('src/data');

        const blogWriter = new FileDataWriter();


        const posts = await blogWriter.setRelativePath(blogsFilePath, 'blog.json').getAllData();

        return res.status(200).json({ 
            status: 200, 
            message:`Blog posts gotten successfully`, 
            data: posts.data 
        });
        
    }
    
    async search (req, res) {

        const queryString = req.query.q;

        const queryType = req.query.t;

        try {

            switch (queryType) {
                case 'search course' :

                    this.searchCourses( res, queryString);

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

    async searchCourses  (res, query = "") {

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

    async getAllCourses(res) {
        
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

    async errorSearch(res) {

        return res.status(400).json({ status: 400, message:`bad search query`, data: [] });

    }

}

module.exports = new IndexController();