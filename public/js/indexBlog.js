
window.addEventListener('load', function(e) {

    return runScriptOnDocumentLoad();

})

function runScriptOnDocumentLoad() {

    getAllBlogPost();

}

async function getAllBlogPost() {

    try {
        // const indexBlogPostsContainer = document.querySelector('.index-blog-posts-container');

        const indexBlogPostHighlitsContainer = document.querySelector('.index-blog-post-container');

        const blogPostWriteupContainer = document.querySelector('.index-blog-post-writeup-container');

        const blogLoader = document.querySelector('.index-blog-posts-loader');

        const blogContent = document.querySelector('.index-blog-content');
        
        const chachedBlogPosts = sessionStorage.getItem('blogPosts') ? JSON.parse(sessionStorage.getItem('blogPosts')) : null;

        let blogPosts;
        blogLoader.style.display = 'flex';
        blogContent.style.display = 'none';
       
        if (!chachedBlogPosts) {
           
            blogPosts = await fetchBlogPosts();
          
            // save blogposts
             sessionStorage.setItem('blogPosts', JSON.stringify(blogPosts));
           
        } else {

            blogPosts = chachedBlogPosts;

        }

        setTimeout(() => {

            displayHighlight(blogPosts.data, indexBlogPostHighlitsContainer);
    
            displayBlogPostWriteup(blogPosts.data, blogPostWriteupContainer);
            //  remove loader
            blogLoader.style.display = 'none';
             // display blog content
            blogContent.style.display = 'flex';
            // attach view post event listener after blog content has been displayed
            attachViewPostListener();
           
        }, 2000)
          
    } catch (err) {

        
    }

}

function displayHighlight(blogPosts, indexBlogPostHighlitsContainer) {
   
    indexBlogPostHighlitsContainer.innerHTML = (
        
        `
       
        `

    )

    blogPosts.forEach( post => {

        const  { id, title,imageSrc, date, tag, } = post;
        
        const blogHighlightTemplate = (
            `
            <div class="index-blog-post">
            <input type="text" value=${ id } hidden /> 
           
            <div class="index-blog-post-title">
                <span>${ title }</span>
            </div>
            <div class="index-blog-post-tag">
            <span>Date: ${ new Date(date).toDateString() }</span>
            <span>Tag: ${ tag }</span>
            </div>
            </div>`
        )
       
        indexBlogPostHighlitsContainer.innerHTML += blogHighlightTemplate;

    })

}

function displayBlogPostWriteup(blogPosts, blogPostWriteupContainer) {
    
    blogPostWriteupContainer.innerHTML = ` ` 

    const blogPostWriteupTemplate = generateBlogWriteupTemplate(blogPosts[0]);
    
    blogPostWriteupContainer.innerHTML += blogPostWriteupTemplate;

}

function attachViewPostListener() {

    const indexBlogPostHighlight = document.querySelectorAll('.index-blog-post');

    const blogPostWriteupContainer = document.querySelector('.index-blog-post-writeup-container');

    indexBlogPostHighlight.forEach( node => {

        node.addEventListener('click', function(e) {
           
            const postId = node.firstChild.nextSibling.value

            viewBlogPost(postId, blogPostWriteupContainer);
    
            e.stopPropagation()
    
        })

    })

}

async function viewBlogPost(blogPostId, blogPostWriteupContainer) {

    const screenWidth = window.screen.width;

    const screenHeight = window.screen.height

    const blogPostWrapper  = document.querySelector('.index-blog-post-writeup-wrapper');

    let blogWriteupCloseButton ;

    const loader = (
        `
        <div class="index-blog-writeup-loader" >
            <div class="loader"></div>
        </div>
        `
    )

    if (screenWidth <= 600) {

       blogPostWrapper.style.display = 'none';

       blogPostWriteupContainer.style.display = 'flex'

        blogPostWriteupContainer.innerHTML = loader;

        const post = await getBlogPost(blogPostId);
    
        const blogPostWriteupTemplate = generateBlogWriteupTemplate(post[0])

        setTimeout(()=> {

            blogPostWriteupContainer.innerHTML =  `
                <div class="blog-post-modal-bttn-wrapper">
                <span> X </span>
                </div>
                `

            

            blogPostWriteupContainer.innerHTML += blogPostWriteupTemplate;

            blogPostWrapper.style.display = 'flex'

            blogPostWriteupContainer.scrollTo(0, 0)

            blogWriteupCloseButton = document.querySelector('.blog-post-modal-bttn-wrapper');


            attachCloseModal(blogWriteupCloseButton, blogPostWriteupContainer)
            
        }, 1000)

        
        
        return ;
        
    }

    blogPostWrapper.style.display = 'none';

    blogPostWriteupContainer.innerHTML = loader;

    const post = await getBlogPost(blogPostId);
   
    const blogPostWriteupTemplate = generateBlogWriteupTemplate(post[0])

    setTimeout(()=> {

        blogPostWriteupContainer.innerHTML = blogPostWriteupTemplate;

        blogPostWrapper.style.display = 'flex'

        blogPostWriteupContainer.scrollTo(0, 0)
        
    }, 1000)
   
}

function attachCloseModal(modalCloseButton, modalContainer) {

    modalCloseButton.addEventListener('click', function(e) {

        modalContainer.style.display = 'none'

    })
    
}

function generateBlogWriteupTemplate({ id, title, imageSrc, date, tag, details }) {

    return (

        ` <div class="index-blog-post-writeup-wrapper">
        <div class="index-blog-post-writeup-image-container">
            <img src = ${ imageSrc } alt = "provost img" />
        </div>

        <div class="index-blog-post-writeup-title">
           <h3>${ title }</h3> 
        </div>
        <div class="index-blog-post-writeup-tags">

            <div>
            <i>date:</i> <span>${ new Date(date).toDateString() }</span>
            </div>
            <div>
                <i>tag:</i> <span>${ tag }</span>
            </div>

        </div>
        <div class="index-blog-post-writeup">
           ${ details }
        </div>

        </div>`

    )

}

function getBlogPost(id) {

    const blogPosts = sessionStorage.getItem('blogPosts') ? JSON.parse(sessionStorage.getItem('blogPosts')) : null;

   if (blogPosts) {

    return blogPosts.data.filter(post => post.id.toString() === id.toString())

   }

   return null;

}

async function fetchBlogPosts() {

    const BASE_URL = window.location.origin;
    
    try {

        const BlogPostResponse = await fetch(`${BASE_URL}/blog-posts`);
       
        const extractJSON = await BlogPostResponse.json();
        
        return extractJSON;     
       
    } catch (err) {

        throw err
        
    }

}