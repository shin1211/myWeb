'use strict';
const app = {};
//============
// burger menu 
//============
app.burgerBtn = document.querySelector('.burger-menu');
app.navBar = document.querySelector('.nav-bar');

app.burgerBtn.addEventListener('click', () => {
	app.navBar.classList.toggle('active');
})

//============
// section toggle button
//============

app.filterBtns = document.querySelectorAll('[data-target]');
app.contents = document.querySelectorAll('[data-content]');
app.btnMotion = document.querySelector('.btn-container .active-box');
app.filterBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		btnIndicator(e);
		const target = document.querySelector(btn.dataset.target)
		app.contents.forEach((content) => {
			content.classList.remove('active')
		})
		target.classList.add('active');
		app.filterBtns.forEach((btn) => {
			btn.classList.remove('active-btn')
		})
		btn.classList.add('active-btn')
	})
})

function btnIndicator(e) {
	app.btnMotion.style.left = e.currentTarget.offsetLeft + 'px';
	// app.btnMotion.style.width = e.currentTarget.offsetWidth + 'px';
	// app.btnMotion.style.height = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 'px';
}

//============
//Menu slide animation
//============

app.horizontalMenus = document.querySelectorAll('.nav-container li a');
app.horizontalUnderline = document.querySelector('.nav-container .horizontal-underline');
app.sections = document.querySelectorAll('section');
app.currentStatus = true;

app.slideMenu = () => {
	let current = '';
	app.sections.forEach(section => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.clientHeight;
		if (scrollY < 942 - sectionHeight / 3) {
			current = 'home';
		}
		if (scrollY >= (sectionTop - sectionHeight / 3)) {
			// if current section is skills section (returning null id value since this section is part of about), retrun 'about'
			current = section.getAttribute('id') === null ? 'about' : section.getAttribute('id');
		}
	})
	app.horizontalMenus.forEach(item => {
		if (item.href.includes(`#${current}`)) {
			app.horizontalUnderline.style.left = item.offsetLeft + 'px';
			app.horizontalUnderline.style.width = item.offsetWidth + 'px';
			app.horizontalUnderline.style.top = item.offsetTop + item.offsetHeight + 'px'
		}
	})
}

window.addEventListener('resize', function (event) {
	app.slideMenu();

	if (this.window.innerWidth > 940) {
		app.navBar.classList.remove('active');
	}
});
window.addEventListener('scroll', () => {
	app.slideMenu();
});


//============
// scroll up btn 
//============
app.scrollUpBtn = document.querySelector('.scroll-up-btn');
app.visibilityScrollBtn = () => {
	if (document.documentElement.scrollTop <= 550) {
		app.scrollUpBtn.style.display = 'none';
	} else {
		app.scrollUpBtn.style.display = 'block';
	}
}
app.scrollUpBtn.addEventListener('click', () => {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
})

document.addEventListener('scroll', () => {
	app.visibilityScrollBtn();
})

// ==================
// text animation 
//===================

app.subHeading = document.querySelector('.sub-heading');
app.currentSentence = [];
app.count = 0;
app.letterCount = 0;
app.isDeleting = false;
app.isEnd = false;
app.sentences = ['Front-End Developer', 'Dog Dad', 'Avid Gamer', 'Tech Savvy'];
app.switch = false;

app.animationBtn = document.querySelector('.animation-btn');
app.btnText = app.animationBtn.querySelector('.btn-text')
app.animationBtn.addEventListener('click', () => {
	app.switch = !app.switch;
	app.currentSentence = [];
	app.isEnd = false;
	app.isDeleting = false;
	app.count = 0;
	app.letterCount = 0;
	app.subHeading.innerHTML = app.sentences[0];
	if (app.switch) {
		app.animationBtn.classList.remove('animate');
		app.btnText.innerHTML = 'OFF';
		AOS.init({ disable: true });
	} else {
		app.animationBtn.classList.add('animate');
		app.btnText.innerHTML = 'ON'
		AOS.init({ disable: false });
		location.reload();

	}
})

app.textLoop = () => {
	app.isEnd = false;
	app.subHeading.setAttribute('aria-label', app.sentences[app.count]);
	if (!app.switch && app.count < app.sentences.length) {
		if (!app.isDeleting && app.letterCount <= app.sentences[app.count].length) {
			app.currentSentence.push(app.sentences[app.count][app.letterCount]);
			app.letterCount++;
			app.subHeading.innerHTML = app.currentSentence.join('');
		}

		if (app.isDeleting && app.letterCount <= app.sentences[app.count].length) {
			app.currentSentence.pop(app.sentences[app.count][app.letterCount]);
			app.letterCount--;
			app.subHeading.innerHTML = app.currentSentence.join('');
		}

		if (app.letterCount === app.sentences[app.count].length) {
			app.isDeleting = true;
			app.isEnd = true;
		}

		if (app.isDeleting && app.letterCount === 0) {
			app.currentSentence = [];
			app.isDeleting = false;
			app.count++;
		}

		if (!app.isDeleting && app.count === app.sentences.length) {
			app.count = 0;
		}
	}
	const textAnimationSpeed = app.isEnd ? 1000 : app.isDeleting ? 50 : 50;
	setTimeout(app.textLoop, textAnimationSpeed);
}

//===================
// slide funtion
//===================
app.wheelContainer = document.querySelector('.wheel-container');
app.projects = document.querySelectorAll('.projects-container .wheel-container .project');
app.prevBtn = document.querySelector('.prev');
app.nextBtn = document.querySelector('.next');

app.theta = Math.PI / 4;
app.newTheta = 0;
app.newX = 0;
app.newY = 0;
app.wheelRadius = 300;
app.initialPos = {
	x: parseFloat(getComputedStyle(app.projects[0]).left),
	y: parseFloat(getComputedStyle(app.projects[0]).top)

};
app.angle = 0;
app.currentIdx = 0;
app.oldTimeStamp = null;

app.projects.forEach((project, index) => {
	app.newTheta = app.theta * (index + 4);
	app.newX = Math.cos(app.newTheta) * app.wheelRadius;
	app.newY = -1 * Math.sin(app.newTheta) * app.wheelRadius;
	console.log(app.newTheta)
	project.style.left = `${app.initialPos.x + app.newX}px`
	project.style.top = `${app.initialPos.y + app.newY}px`
})




app.prevBtn.addEventListener('click', (e) => {
	if (app.currentIdx === 0) {
		app.currentIdx = 7
	} else {
		app.currentIdx -= 1
	}
	app.angle -= 45
	app.wheelContainer.style.transform = `translate(-50%, -50%) rotate(${app.angle}deg)`
	app.projects.forEach((project) => {
		project.classList.remove('selected')
		project.style.transform = `translate(-50%, -50%) rotate(${-app.angle}deg)`
	})
	app.projects[app.currentIdx].classList.add('selected')

});

app.nextBtn.addEventListener('click', (e) => {
	if (app.currentIdx === 7) {
		app.currentIdx = 0
	} else {
		app.currentIdx += 1
	}
	app.angle += 45
	app.wheelContainer.style.transform = `translate(-50%, -50%) rotate(${app.angle}deg)`
	app.projects.forEach((project) => {
		project.classList.remove('selected')
		project.style.transform = `translate(-50%, -50%) rotate(${-app.angle}deg)`
	})
	app.projects[app.currentIdx].classList.add('selected')
});




app.init = () => {
	app.visibilityScrollBtn();
	app.textLoop();
}


app.init();



// app.slideContainer = document.querySelector('.image-slide');
// app.slides = document.querySelectorAll('.image-slide li');
// app.prevBtn = document.querySelector('.prev');
// app.nextBtn = document.querySelector('.next');


// app.currentIndex = 0;
// app.slideCount = app.slides.length;
// app.slideWidth = 400;
// app.slideMargin = 20;
// app.oldTimeStamp = null;


// app.makeClone = () => {
// 	// Looping slides and clone every single slides(li) to add to slideContainer at the end.
// 	for (let i = 0; i < app.slideCount; i++) {
// 		const cloneSlide = app.slides[i].cloneNode(true);
// 		cloneSlide.classList.add('clone');
// 		app.slideContainer.appendChild(cloneSlide);
// 	}

// 	for (let i = app.slideCount - 1; i >= 0; i--) {
// 		const cloneSlide = app.slides[i].cloneNode(true);
// 		cloneSlide.classList.add('clone');
// 		app.slideContainer.prepend(cloneSlide);
// 	}

// 	app.updateWidth();
// 	app.setInitialPos();

// 	setTimeout(() => {
// 		app.slideContainer.classList.add('animated');
// 	}, 100);
// }


// // function that grab current slide-container width (included all clones)and set new width.
// app.updateWidth = () => {
// 	const currentSlides = document.querySelectorAll('.image-slide li');
// 	const currentSlideCount = currentSlides.length;
// 	const currentSlideWidth = (app.slideWidth + app.slideMargin) * currentSlideCount - app.slideMargin + 'px';

// 	app.slideContainer.style.width = currentSlideWidth;

// }

// // Now the slides has all clones and it will begin with clone 'li'. need to re-position to start with original image slides which can make go forward and back by click event.
// app.setInitialPos = () => {
// 	const initialSlideWidth = -(app.slideWidth + app.slideMargin) * app.slideCount;
// 	app.slideContainer.style.transform = `translateX(${initialSlideWidth}px)`;
// }

// app.moveSlide = (currentIndex) => {
// 	app.slideContainer.style.left = -currentIndex * (app.slideWidth + app.slideMargin) + 'px';
// 	app.currentIndex = currentIndex;

// 	// console.log(app.currentIndex, app.slideCount);

// 	if (app.currentIndex === app.slideCount || app.currentIndex === -app.slideCount) {

// 		// need to wait til .animate action is done. 
// 		setTimeout(() => {
// 			app.slideContainer.classList.remove('animated');
// 			app.slideContainer.style.left = '0px';
// 			app.currentIndex = 0;
// 		}, 500);

// 		setTimeout(() => {
// 			app.slideContainer.classList.add('animated')
// 		}, 550);

// 	}
// }

// app.prevBtn.addEventListener('click', (e) => {
// 	if (app.oldTimeStamp === null || app.oldTimeStamp + 550 < e.timeStamp) {
// 		app.moveSlide(app.currentIndex - 1);
// 		app.oldTimeStamp = e.timeStamp;
// 	}

// });

// app.nextBtn.addEventListener('click', (e) => {
// 	if (app.oldTimeStamp === null || app.oldTimeStamp + 550 < e.timeStamp) {
// 		app.moveSlide(app.currentIndex + 1);
// 		app.oldTimeStamp = e.timeStamp;
// 	}
// });
