





window.addEventListener('load', function(e) {

    return slideInAdvertContainer();

})

let timer = null;

function slideInAdvertContainer() {

    const advertContainer = document.querySelector('.index-advert-container');

    const advertCloseButton = document.querySelector('.advert-close');

    timer = setTimeout(()=> {

        advertContainer.style.top = '8vh';

    }, 3000);

    attachSlideOutAdvertContainerEvent(advertContainer, advertCloseButton);
 
}

function attachSlideOutAdvertContainerEvent(advertContainer, advertCloseButton) {

    advertCloseButton.addEventListener('click', function(e) {

        advertContainer.style.top = '-180px';

    })


}