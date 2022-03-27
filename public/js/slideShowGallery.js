

const slideShowImages = [
    { 
      src:"images/slide1.jpg", 
      alt:"slide1 rove",
      pos: 7
    },
    { 
        src:"images/slide2.jpg", 
        alt:"slide2 two of the rove",
        pos: 8
    },
    { 
    src:"images/slide3.jpg", 
    alt:"slide3 three of the rove",
    pos: 9
    },
]

window.addEventListener('load', function(e) {

    // resizeAndAttachImages(slideShowImages);
    // e.stopPropagation();

})

let slideIndex = 1;

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {

    showSlides(slideIndex += n);

}

// Thumbnail image controls
function currentSlide(n) {

    showSlides(slideIndex = n);

}

function showSlides(n) {

    let i;

    const slides = document.querySelectorAll('.mySlides');

    const dots = document.querySelectorAll('.demo');

    const captionText = document.querySelector('.caption');

    if (n > slides.length) {

        slideIndex = 1 

    }

    if (n < 1) { 

        slideIndex = slides.length 

    }

    for (i = 0; i < slides.length; i++) {

        slides[i].style.display = 'none';

    }

    for (i = 0; i < dots.length; i++) {

        dots[i].className = dots[i].className.replace(' active', '');

    }

    slides[slideIndex-1].style.display = 'block';

    dots[slideIndex-1].className += ' active';

    captionText.innerHTML = dots[slideIndex-1].alt;

}



async function resizeAndAttachImages(images) {

    const mySlidesContainer = document.querySelector('.mySlides-container');

    const slidesRow = document.querySelector('.row');

    let resizedImages = [];

    // TODO... write resizing algorithm here and push resized images into resImages array
    await getResizedImages(images, setResizedImages);

    attachGalleryImages(resizedImages);

    attachThumbnails(images);

    function setResizedImages(images) {

        resizedImages = [...images];

        console.log("resized images are",resizedImages);

    }

    function attachGalleryImages(images) {

        console.log("attaching images", images)

        images.forEach((img, i) => {

            const slideTemplate = (

                `
                <div class="mySlides">
                    <div class="numbertext">1 / 6</div>
                    <img src= ${img.dataurl}  alt= "${img.alt.toString()}"/>
                </div>
                `

            )

            mySlidesContainer.innerHTML += slideTemplate;

        });

    }

    function attachThumbnails(images) {

        console.log("attaching thumbnails", images);

        images.forEach((img, i) => {

                const slideThumbnails = (
                
                `
                <div class="column">
                <img class="demo cursor" src=${img.src}  onclick="currentSlide(${img.pos})" alt= "${img.alt}" >
                    </div>
                `

            )

            slidesRow.innerHTML += slideThumbnails;

        });

    }

}

const getResizedImages = async (imageFiles = [], callback = f =>f) => {

    const imagesDataUrl = [];

    try {

        for (let i = 0; i < imageFiles.length; i++) {

            const dataUrl = await resizeImage(imageFiles[i]);

            imagesDataUrl.push(dataUrl)

        }

        return callback(imagesDataUrl)

    } catch (error) {
        // TODO... handle error

    }

    function resizeImage(imageFile = {}) {

        return new Promise((res, rej) => {

            try {
                
                    const img = document.createElement("img");

                    img.src =  imageFile.src;

                    // resize image once it loads
                    img.addEventListener("load", (evt) => {

                        const canvas = document.createElement("canvas");

                        const ctx = canvas.getContext("2d");

                        let width = img.width;

                        let height = img.height;

                        let dataurl = null;

                        const MAX_WIDTH = 1327;

                        const MAX_HEIGHT = 1327;


                        if (width > height) {

                            if (width > MAX_WIDTH) {

                                height *= MAX_WIDTH / width;

                                width = MAX_WIDTH;

                            }

                        } else {

                            if (height > MAX_HEIGHT) {

                                width *= MAX_HEIGHT / height;

                                height = MAX_HEIGHT;
                            }

                        }

                        canvas.width = width;

                        canvas.height = height;

                        ctx.drawImage(img, 0, 0, width, height);

                        dataurl = canvas.toDataURL();
                        
                        // resolve resized image dataurl
                        res({
                            dataurl,
                            pos: imageFile.pos,
                            alt: imageFile.alt
                        });

                    });
            
                
            } catch(err) {

                rej(err);

            }
        })
    }
}