'use strict';
const app = {};
//============
// burger menu 
//============
app.burgerMenu = () => {
	const burgerBtn = document.querySelector('.burger-menu');
	const navBar = document.querySelector('.nav-bar');

	burgerBtn.addEventListener('click', () => {
		navBar.classList.toggle('active');
	});

	window.addEventListener('resize', () => {
		if (this.window.innerWidth > 940) {
			navBar.classList.remove('active');
		}
	})
}
//============
// section toggle button
//============
app.toggleSection = () => {
	const filterBtns = document.querySelectorAll('[data-target]');
	const contents = document.querySelectorAll('[data-content]');
	const btnMotion = document.querySelector('.btn-container .active-box');
	filterBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			btnIndicator(e);
			const target = document.querySelector(btn.dataset.target)
			contents.forEach((content) => {
				content.classList.remove('active')
			})
			target.classList.add('active');
			filterBtns.forEach((btn) => {
				btn.classList.remove('active-btn')
			})
			btn.classList.add('active-btn')
		})
	})

	function btnIndicator(e) {
		btnMotion.style.left = e.currentTarget.offsetLeft + 'px';
	}
}
//============
//Menu slide animation
//============
app.movingSlideNav = () => {
	const horizontalMenus = document.querySelectorAll('.nav-container li a');
	const horizontalUnderline = document.querySelector('.nav-container .horizontal-underline');
	const sections = document.querySelectorAll('section');

	const slideMenu = () => {
		let current = '';
		sections.forEach(section => {
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
		horizontalMenus.forEach(item => {
			if (item.href.includes(`#${current}`)) {
				horizontalUnderline.style.left = item.offsetLeft + 'px';
				horizontalUnderline.style.width = item.offsetWidth + 'px';
				horizontalUnderline.style.top = item.offsetTop + item.offsetHeight + 'px'
			}
		})
	}

	window.addEventListener('resize', () => {
		slideMenu();
	});
	window.addEventListener('scroll', () => {
		slideMenu();
	});
}
//============
// scroll up btn 
//============
app.scrollUpBtn = () => {
	const btn = document.querySelector('.scroll-up-btn');
	const visibilityScrollBtn = () => {
		if (document.documentElement.scrollTop <= 550) {
			btn.style.display = 'none';
		} else {
			btn.style.display = 'block';
		}
	}
	btn.addEventListener('click', () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	})

	document.addEventListener('scroll', () => {
		visibilityScrollBtn();
	})
}
// ==================
// text animation 
//===================
app.textAnimation = () => {
	const subHeading = document.querySelector('.sub-heading');
	const sentences = ['Front-End Developer', 'Dog Dad', 'Avid Gamer', 'Tech Savvy'];
	let currentSentence = [];
	let count = 0;
	let letterCount = 0;
	let isDeleting = false;
	let isEnd = false;
	let isOn = false;

	const animationBtn = document.querySelector('.animation-btn');
	const btnText = animationBtn.querySelector('.btn-text')
	animationBtn.addEventListener('click', () => {
		isOn = !isOn;
		currentSentence = [];
		isEnd = false;
		isDeleting = false;
		count = 0;
		letterCount = 0;
		subHeading.innerHTML = sentences[0];
		if (isOn) {
			animationBtn.classList.remove('animate');
			btnText.innerHTML = 'OFF';
			AOS.init({ disable: true });
		} else {
			animationBtn.classList.add('animate');
			btnText.innerHTML = 'ON'
			AOS.init({ disable: false });
			location.reload();
		}
	})

	const textLoop = () => {
		isEnd = false;
		subHeading.setAttribute('aria-label', sentences[count]);
		if (!isOn && count < sentences.length) {
			if (!isDeleting && letterCount <= sentences[count].length) {
				currentSentence.push(sentences[count][letterCount]);
				letterCount++;
				subHeading.innerHTML = currentSentence.join('');
			}

			if (isDeleting && letterCount <= sentences[count].length) {
				currentSentence.pop(sentences[count][letterCount]);
				letterCount--;
				subHeading.innerHTML = currentSentence.join('');
			}

			if (letterCount === sentences[count].length) {
				isDeleting = true;
				isEnd = true;
			}

			if (isDeleting && letterCount === 0) {
				currentSentence = [];
				isDeleting = false;
				count++;
			}

			if (!isDeleting && count === sentences.length) {
				count = 0;
			}
		}
		const textAnimationSpeed = isEnd ? 1000 : isDeleting ? 50 : 50;
		setTimeout(textLoop, textAnimationSpeed);
	}

	textLoop();
}
//===================
// slide funtion
//===================
app.circleSlide = () => {
	app.makeClone();
	const wheelContainer = document.querySelector('.wheel-container');
	const projects = document.querySelectorAll('.projects-container .wheel-container .project');
	const prevBtn = document.querySelector('.prev');
	const nextBtn = document.querySelector('.next');
	const theta = Math.PI / 4;
	const initialPos = {
		x: parseFloat(getComputedStyle(projects[0]).left),
		y: parseFloat(getComputedStyle(projects[0]).top)
	};
	let newTheta = 0;
	let newX = 0;
	let newY = 0;
	let wheelRadius = 300;
	//wheelRadius = 200;
	let angle = 0;
	let currentIdx = 0;

	projects.forEach((project, index) => {
		newTheta = theta * (index + 6);
		// newTheta = theta * (index);
		newX = Math.cos(newTheta) * wheelRadius;
		newY = -1 * Math.sin(newTheta) * wheelRadius;
		project.style.left = `${initialPos.x + newX}px`
		project.style.top = `${initialPos.y + newY}px`
	})

	prevBtn.addEventListener('click', (e) => {
		if (currentIdx === 0) {
			currentIdx = 7
		} else {
			currentIdx -= 1
		}
		angle -= 45
		wheelContainer.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`
		projects.forEach((project) => {
			project.classList.remove('selected')
			project.style.transform = `translate(-50%, -50%) rotate(${-angle}deg)`
		})
		projects[currentIdx].classList.add('selected')
	});

	nextBtn.addEventListener('click', (e) => {
		if (currentIdx === 7) {
			currentIdx = 0
		} else {
			currentIdx += 1
		}
		angle += 45
		wheelContainer.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`
		projects.forEach((project) => {
			project.classList.remove('selected')
			project.style.transform = `translate(-50%, -50%) rotate(${-angle}deg)`
		})
		projects[currentIdx].classList.add('selected')
	});
}

app.makeClone = () => {
	// Looping slides and clone every single slides(li) to add to slideContainer at the end.
	const wheelContainer = document.querySelector('.wheel-container');
	const projects = document.querySelectorAll('.projects-container .wheel-container .project');
	const projectsCount = projects.length
	for (let i = 0; i < projectsCount; i++) {
		const cloneSlide = projects[i].cloneNode(true);
		cloneSlide.classList.add('clone');
		wheelContainer.appendChild(cloneSlide);
	}

	// for (let i = projectsCount - 1; i >= 0; i--) {
	// 	const cloneSlide = projects[i].cloneNode(true);
	// 	cloneSlide.classList.add('clone');
	// 	wheelContainer.prepend(cloneSlide);
	// }

	setTimeout(() => {
		// app.slideContainer.classList.add('animated');
	}, 100);
}

app.init = () => {
	app.burgerMenu();
	app.toggleSection();
	app.movingSlideNav();
	app.scrollUpBtn();
	app.textAnimation();
	app.circleSlide();
}

let a = ['a', 'b', 'c'];
let b = a.shift();
console.log(a);
a.push(b);
console.log(a);

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
