



window.addEventListener('load', function(e) {

    return runScriptOnDocumentLoad();

})


function runScriptOnDocumentLoad() {

    removeModal();

}



// const modalTemplate = (

//     `
//     <div className="modal-container-wrapper">
//         <div className="modal-container">
//             <div className="modal-comment-product-comment-bttn-container">
//                 <div className="modal-comment-product-comment-bttn-wrapper">
//                 <RiCloseFill className="nav-icon"  onClick={ props.handleModal }/>
//                 </div>
//             </div>
           
//         </div>
//     </div>

//     `
// )

function removeModal() {
    const modalContainer = document.querySelector('.modal-container-wrapper')
    const closeButton = document.querySelector('.modal-comment-product-comment-bttn-wrapper');
    closeButton.addEventListener('click', function(e) {
        modalContainer.style.display = 'none'
    })
}