const app = {};
// burger menu
app.burgerBtn = document.querySelector('.burger-menu');
app.navBar = document.querySelector('.nav-bar')
app.burgerBtn.addEventListener('click', () => {
	app.navBar.classList.toggle('active');
})
// ======================================
// text animation 
app.subHeading = document.querySelector('.sub-heading');
app.strSubHeading = app.subHeading.textContent;
app.textDisplayed = false;
app.count = 0
console.log(app.strSubHeading);

app.animateText = () => {
	app.subHeading.innerHTML = '';
	const splitText = app.strSubHeading.split('');
	for (let i = 0; i < splitText.length; i++) {
		app.subHeading.innerHTML += '<span>' + splitText[i] + '</span>';
	}
	app.classTimer();
}

app.classTimer = () => {
	const letters = Array.prototype.slice.call(app.subHeading.querySelectorAll('span'));
	if (app.textDisplayed === false) {
		app.addingClass(letters, app.count);

	}
	if (app.textDisplayed === true) {
		setTimeout(() => app.removingClass(letters, app.count), 2000);
	}
}
app.addingClass = (letters, count) => {
	letters.forEach((indi, index) => {
		setTimeout(() => {
			indi.classList.add('animate');
		}, index * 50);
		app.count++;
	});

	if (letters.length === app.count) {
		app.textDisplayed = true;
	}
}

app.removingClass = (letters, count) => {
	const reversAry = letters.reverse();
	reversAry.forEach((indi, index) => {
		setTimeout(() => {
			indi.classList.remove('animate');
		}, index * 50);
		app.count--;
		console.log(app.count)
	});

	if (app.count === 0) {
		setTimeout(() => {
			app.textDisplayed = false;
		}, 3000);
		console.log(app.textDisplayed)
	}

}

//=======================================
// slide funtion
app.slideContainer = document.querySelector('.image-slide');
app.slides = document.querySelectorAll('.image-slide li');
app.prevBtn = document.querySelector('.prev');
app.nextBtn = document.querySelector('.next');

// app.projectsImg = document.querySelectorAll('.project img');

app.currentIndex = 0;
app.slideCount = app.slides.length;
app.slideWidth = 400;
app.slideMargin = 20;
app.oldTimeStamp = null;


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

	// app.clickEvent();
	app.updateWidth();
	app.setInitialPos();

	setTimeout(() => {
		app.slideContainer.classList.add('animated');
	}, 100);
}


// function that grab current slide-container width (included all clones)and set new width.
app.updateWidth = () => {
	const currentSlides = document.querySelectorAll('.image-slide li');
	const currentSlideCount = currentSlides.length;
	const currentSlideWidth = (app.slideWidth + app.slideMargin) * currentSlideCount - app.slideMargin + 'px';

	app.slideContainer.style.width = currentSlideWidth;

}

// Now the slides has all clones and it will begin with clone 'li'. need to re-position to start with original image slides which can make go forward and back by click event.
app.setInitialPos = () => {
	const initialSlideWidth = -(app.slideWidth + app.slideMargin) * app.slideCount;
	app.slideContainer.style.transform = `translateX(${initialSlideWidth}px)`;
}

app.moveSlide = (currentIndex) => {
	app.slideContainer.style.left = -currentIndex * (app.slideWidth + app.slideMargin) + 'px';
	app.currentIndex = currentIndex;

	// console.log(app.currentIndex, app.slideCount);

	if (app.currentIndex === app.slideCount || app.currentIndex === -app.slideCount) {

		// need to wait til .animate action is done. 
		setTimeout(() => {
			app.slideContainer.classList.remove('animated');
			app.slideContainer.style.left = '0px';
			app.currentIndex = 0;
		}, 500);

		setTimeout(() => {
			app.slideContainer.classList.add('animated')
		}, 550);

	}
}

app.prevBtn.addEventListener('click', (e) => {
	if (app.oldTimeStamp === null || app.oldTimeStamp + 550 < e.timeStamp) {
		app.moveSlide(app.currentIndex - 1);
		app.oldTimeStamp = e.timeStamp;
	}

});

app.nextBtn.addEventListener('click', (e) => {
	if (app.oldTimeStamp === null || app.oldTimeStamp + 550 < e.timeStamp) {
		app.moveSlide(app.currentIndex + 1);
		app.oldTimeStamp = e.timeStamp;
	}
});





app.init = () => {
	app.makeClone();
	app.animateText();
}


app.init();