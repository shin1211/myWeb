const app = {};

app.slideContainer = document.querySelector('.image-slide');
app.slides = document.querySelectorAll('.image-slide li');
app.prevBtn = document.querySelector('.prev');
app.nextBtn = document.querySelector('.next');


app.currentIndex = 0;
app.slideCount = app.slides.length;
app.slideWidth = 400;
app.slideMargin = 20;

app.makeClone = () => {
	// Looping slides and clone every single slides(li) to add to slideContainer at the end.
	for (let i = 0; i < app.slideCount; i++) {
		const cloneSlide = app.slides[i].cloneNode(true);
		cloneSlide.classList.add('clone');
		app.slideContainer.appendChild(cloneSlide);
	}

	for (let i = app.slideCount - 1; i >= 0; i--) {
		const cloneSlide = app.slides[i].cloneNode(true);
		cloneSlide.classList.add('clone');
		app.slideContainer.prepend(cloneSlide);
	}
	app.updateWidth();
	app.setInitialPos();
	app.slideContainer.classList.add('animated');
}

// function that grab current slide-container width (included all clones)and set new width.
app.updateWidth = () => {
	const currentSlides = document.querySelectorAll('.image-slide li');
	const currentSlideCount = currentSlides.length;
	const currentSlideWidth = (app.slideWidth + app.slideMargin) * currentSlideCount - app.slideMargin + 'px';

	app.slideContainer.style.width = currentSlideWidth;


	console.log(currentSlideWidth);

	console.log(currentSlides);
}

// Now the slides has all clones and it will begin with clone 'li'. need to re-position to start with original image slides which can make go forward and back by click event.
app.setInitialPos = () => {
	const initialSlideWidth = -(app.slideWidth + app.slideMargin) * app.slideCount;
	app.slideContainer.style.transform = `translateX(${initialSlideWidth}px)`;
}



app.init = () => {
	app.makeClone();
}


app.init();