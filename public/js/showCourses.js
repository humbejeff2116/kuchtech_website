
window.addEventListener('load', function(e) {

    return runScriptOnDocumentLoad();

})

function runScriptOnDocumentLoad() {

    viewAllCourses();

}

async function viewAllCourses() {

    const loader = (
        `
       <div class="index-blog-writeup-loader" >
           <div class="loader"></div>
       </div>
       `  
    )

    try {

        const indexCoursesContainer = document.querySelector('.index-courses-container');

        const viewMoreCoursesButton = document.querySelector('.view-more-courses');

        const viewLessCoursesButton = document.querySelector('.view-less-courses');

        const chachedCourses = sessionStorage.getItem('courses') ? JSON.parse(sessionStorage.getItem('courses')) : null;

        let allCourses;

        if (!chachedCourses) {

            indexCoursesContainer.innerHTML = loader;
           
           allCourses = await getAllCourses();
          
           sessionStorage.setItem('courses', JSON.stringify(allCourses))
           
        } else {

            allCourses = chachedCourses;

        }
        
        showMinimalCourses(allCourses.data, indexCoursesContainer);

        showMoreCourses(viewMoreCoursesButton, viewLessCoursesButton, allCourses.data, indexCoursesContainer);

        showLessCourses(viewLessCoursesButton, viewMoreCoursesButton, allCourses.data, indexCoursesContainer);

    } catch (err) {

        
    }

}

function showMinimalCourses(allCourses, indexCoursesContainer) {
    
    indexCoursesContainer.innerHTML = ``;

    allCourses.slice(0, 4).forEach(course => {

        const indexCourseTemplate = setCourseTemplate(course)
    
        indexCoursesContainer.innerHTML += indexCourseTemplate;

    })

    attachViewCourseDetailsEventListener();
}

function showMoreCourses(viewMoreCoursesButton, viewLessCoursesButton, allCourses, indexCoursesContainer) {

    viewMoreCoursesButton.addEventListener('click', async function(e) {
           
        viewMoreCoursesButton.setAttribute('disabled', 'true');

        indexCoursesContainer.innerHTML = ``

        allCourses.forEach(course => {

            const indexCourseTemplate = setCourseTemplate(course)
           
            indexCoursesContainer.innerHTML += indexCourseTemplate;
                
        })

        viewMoreCoursesButton.style.display ='none';

        viewLessCoursesButton.style.display = 'block';

        viewMoreCoursesButton.removeAttribute('disabled');

        attachViewCourseDetailsEventListener();

        e.stopPropagation();
       
    })

}

function showLessCourses(viewLessCoursesButton, viewMoreCoursesButton, allCourses, indexCoursesContainer) {
   
    viewLessCoursesButton.addEventListener('click', function(e) {
       
        viewLessCoursesButton.setAttribute('disabled', 'true');

        indexCoursesContainer.innerHTML = ``;

        allCourses.slice(0, 4).forEach(course => {

            const indexCourseTemplate = setCourseTemplate(course)
        
            indexCoursesContainer.innerHTML += indexCourseTemplate;

        })

        viewLessCoursesButton.style.display = 'none';

        viewMoreCoursesButton.style.display ='block';

        viewLessCoursesButton.removeAttribute('disabled');

        attachViewCourseDetailsEventListener();

        e.stopPropagation();

    })
    
}

function attachViewCourseDetailsEventListener() {

    const viewCourseDetails = document.querySelectorAll('.index-course-button-wrapper button');

    const modalContainerWrapper = document.querySelector('.modal-container-wrapper');

    const modalContainer = document.querySelector('.modal-container-wrapper');

    const modalContent = document.querySelector('.modal-container');

    viewCourseDetails.forEach( node => {

        node.addEventListener('click', async function(e) {
           
            const courseTitle = node.nextElementSibling.value;

            const { id, title, courseDepartment, courseBrief, courseDetails } = await getCourse(courseTitle)[0];

            modalContent.innerHTML = (

                `<div class="index-course view-course">

                <div class="index-course-title">
                    <h3>
                        ${ title }
                    </h3>
                
                </div>

                <div class="index-course-department">
                    <i>tag</i>:<span> ${ courseDepartment } </span>
                </div>

                <div class="index-course-details">
                <p>
                    ${ courseDetails }
                </p>
                </div>

                <div class="index-course-button-container view-course">
                    <div class="index-course-button-wrapper view-course">
                    <a href="/e-application"><button>Apply</button></a>
                        <input type="text" value="${ title  }"  hidden />
                    </div>
                </div>

                </div> `

            )
           
            modalContainerWrapper.style.display = 'flex';

            modalContainer.scrollTo(0, 0);

            attachRemoveModalListener(modalContainerWrapper);

            e.stopPropagation();

        })

    })
    
}

function attachRemoveModalListener(modalContainer) {
   
    const closeButton = document.querySelector('.modal-bttn-wrapper');

    closeButton.addEventListener('click', function(e) {

        modalContainer.style.display = 'none';
        
    })
}

function getCourse(title) {

    const courses = sessionStorage.getItem('courses') ? JSON.parse(sessionStorage.getItem('courses')) : null;

    if (courses.data.length > 0) {

        return courses.data.filter(course => course.title.toString().toLowerCase() === title.toString().toLowerCase())

    }

   return null;

}


function setCourseTemplate({ id, title, courseDepartment, courseBrief, courseDetails }) {

    return (

        `<div class="index-course">

        <div class="index-course-title">
            <h3>
                ${ title }
            </h3>
        
        </div>

        <div class="index-course-department">
            <i>tag</i>:<span> ${ courseDepartment } </span>
        </div>

        <div class="index-course-details">
        <p>
            ${ courseBrief }
        </p>
        </div>

        <div class="index-course-button-container">
            <div class="index-course-button-wrapper">
                <button>view more details</button>
                <input type="text" value="${ title }"  hidden />
            </div>
        </div>

        </div> `

    )

}

async function getAllCourses(query = "") {

    const BASE_URL = window.location.origin;

    try {
       
        const fetchCoursesResponse = await fetch(`${BASE_URL}/search?q=${query}&t=${"get courses"}`);
       
        const extractJSON = await fetchCoursesResponse.json();

        return extractJSON;
        
    } catch (err) {

        throw err
        
    }

}