
window.addEventListener('load', function(e) {

    return runScriptOnDocumentLoad();

})


function runScriptOnDocumentLoad() {

    let searchFormValue = {};

    handleInputChange();

    submitSearchCoursesForm();

    closeSearchReport();

    function handleInputChange() {

        const searchCourses = document.querySelector('#searchCourses');

        searchCourses.value = '';

        searchCourses.addEventListener('change', function(e) {

            searchFormValue = { [e.target.name]: e.target.value }

            e.stopPropagation();
    
        })

    }

    function submitSearchCoursesForm() {

        const searchForm = document.querySelector('.searchForm');

        searchForm.addEventListener('submit', (e) => {

            e.preventDefault();

            const searchQuery = searchFormValue;

            if (!searchQuery.searchCourseQuery) {

                return;

            }

            searchCourses(searchQuery);

            e.stopPropagation();
    
        })

    }

}

async function searchCourses({ searchCourseQuery }) {
   
    try {

        const searchResultsContainer = document.querySelector('.index-courses-search-bar-report-container'); 

        const searchResults = document.querySelector('.index-courses-search-bar-report-result');

        const searchFormButton = document.querySelector('.searchForm button');

        function generateSearchResultTemp(child) {

            return (

                `<div class="index-courses-search-bar-report-success-result">
                ${ child } 
                </div>`

            )

        }

        function generateLoaderTemp() {

            return (
                `
                <div class="index-blog-writeup-loader" >
                    <div class="index-search-loader"></div>
                </div>
                `  
            )

        } 
        // change search button text content
        searchFormButton.textContent = 'Searching...'; 
        // display searchResults UI 
        searchResultsContainer.style.display = 'flex';
        // create an anim effect with loader
        searchResults.innerHTML = generateLoaderTemp()

        // get courses 
        const searchedCourses = await fetchCourses(searchCourseQuery);
        
        // display results after 2000ms
        if (!searchedCourses?.status === 200 || searchedCourses?.data.length < 1 ) {
           
            const notfoundTemplate = (

                `<div class="index-courses-search-bar-report-error-result">
                <p> No result match your search</p>
                </div>`

            )

            searchFormButton.textContent = 'Search';

            searchResultsContainer.style.display = 'flex';

            return searchResults.innerHTML = notfoundTemplate; 

        }

        searchResults.innerHTML = ``

        searchedCourses.data.forEach(course => {

            const  { id, title, courseDepartment, courseBrief, courseDetails } = course;
            
            searchResults.innerHTML += generateSearchResultTemp(

                `
                <input type="text" value="${ title }"  hidden />
                <span> ${ title }</span>
                
                `

            )
           
        })

        searchFormButton.textContent = 'Search';
        // display search results component after attaching search results
        searchResultsContainer.style.display = 'flex';

        attachViewCourseDetailsEventListener()
        
    } catch(err) {

        const searchFormButton = document.querySelector('.searchForm button');

        searchFormButton.textContent = 'Search';

        console.error(err)

    }
    
}


function attachViewCourseDetailsEventListener() {

    const searchResult = document.querySelectorAll('.index-courses-search-bar-report-success-result');

    const modalContainerWrapper = document.querySelector('.modal-container-wrapper');

    const modalContainer = document.querySelector('.modal-container-wrapper');

    const modalContent = document.querySelector('.modal-container');

    searchResult.forEach( node => {

        node.addEventListener('click', async function(e) {
           
            const courseTitle = node.firstElementChild.value;

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

async function fetchCourses(query) {

    const BASE_URL = window.location.origin;

    try {

        const searchedCoursesResponse = await fetch(`${BASE_URL}/search?q=${query}&t=${"search course"}`)
  
        const extractJSON = await searchedCoursesResponse.json();

        return extractJSON;
        
     
    } catch (err) {

        throw err
        
    }

}

function closeSearchReport() {

    const searchResultsContainer = document.querySelector('.index-courses-search-bar-report-container');

    const searchForm = document.querySelector('.searchForm input');

    const modalContainerWrapper = document.querySelector('.modal-container-wrapper');

    window.addEventListener('click', closeSearchResults)

    function closeSearchResults(e) {

        if (

            searchResultsContainer.style.display !== '' && 
            !searchResultsContainer.contains(e.target) && 
            !searchForm.contains(e.target) &&
            !modalContainerWrapper.contains(e.target)
            
        ) {

            searchResultsContainer.style.display = 'none'

            e.stopPropagation()
        } 

    }

}