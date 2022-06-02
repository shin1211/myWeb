'use strict';
const app = {};

app.navBgColor = () => {
	const navBar = document.querySelector('.nav-bar');
	window.addEventListener('scroll', () => {
		if (document.documentElement.scrollTop > 740) {
			navBar.style.backgroundColor = 'white'
		} else {
			navBar.style.backgroundColor = 'inherit'
		}
	})
}
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
				current = section.getAttribute('id');
			}
		})
		horizontalMenus.forEach(item => {
			if (item.href.includes(`#${current}`)) {
				horizontalUnderline.style.left = item.offsetLeft + 'px';
				horizontalUnderline.style.width = item.offsetWidth + 'px';
				horizontalUnderline.style.top = item.offsetTop + item.offsetHeight + 'px';
				// console.log(item.offsetLeft);
				// console.log(item.offsetWidth);
				// console.log(item.offsetTop + item.offsetHeight)

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
// image slide
//===================
app.circleSlide = (animationBtn = true) => {
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
	let wheelRadius = 350;
	let angle = 0;
	let currentIdx = 0;



	// Need to fix this part. interacting with animation on/off btn
	window.addEventListener('scroll', () => {

		projects[currentIdx].classList.add('selected');
		if (window.scrollY > 1800) {
			projects.forEach((project, index) => {
				newTheta = theta * (index + 6);
				newX = Math.cos(newTheta) * wheelRadius;
				newY = -1 * Math.sin(newTheta) * wheelRadius;
				project.style.left = `${initialPos.x + newX}px`
				project.style.top = `${initialPos.y + newY}px`
			});

		} else {
			projects.forEach((project, index) => {
				project.classList.remove('selected');
				project.style.left = '0px';
				project.style.top = '0px';
			});
		}

	});


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

}

//===================
// svg scroll event
//===================

app.svgAnimate = (animationBtn = true) => {
	const aboutText = document.querySelector('.text-container');
	const content = document.querySelector('.svg-container');
	const path1 = document.querySelector('.path1');
	const path1Length = path1.getTotalLength();


	const calcDashoffset = (scrollY, element, length) => {
		const ratio = (scrollY - element.offsetTop) / element.offsetHeight;
		const value = length - (length * ratio);
		return value < 0 ? 0 : value > length ? length : value;
	}

	path1.style.strokeDasharray = animationBtn ? path1Length : path1Length + '' + path1Length;
	path1.style.strokeDashoffset = calcDashoffset(window.innerHeight * 0.8, content, path1Length);

	const scrollHandler = (animationBtn) => {

		const scrollY = window.scrollY + (window.innerHeight * 0.8);
		if (!animationBtn) {
			aboutText.classList.add('fade-in');

		} else {

			if (calcDashoffset(scrollY, content, path1Length) < 3000) {
				aboutText.classList.add('fade-in');
			} else {
				aboutText.classList.remove('fade-in');

			}
			path1.style.strokeDashoffset = calcDashoffset(scrollY, content, path1Length);
		}

	}


	window.addEventListener('scroll', () => {
		scrollHandler(animationBtn);
	});


}

//===================
// animationHandler       
// need to refacotor textAnimation, circleSlide, and svgAnimate function.
//===================
app.animationHandler = () => {
	const animationBtn = document.querySelector('.animation-btn');
	let isAnimating = true
	animationBtn.addEventListener('click', () => {
		if (isAnimating) {
			isAnimating = !isAnimating;
			app.svgAnimate(isAnimating);

			console.log('off')
		} else {
			isAnimating = !isAnimating;
			app.svgAnimate(isAnimating);
			console.log('on')
		}
	})
}

app.init = () => {
	app.navBgColor();
	app.burgerMenu();
	app.toggleSection();
	app.movingSlideNav();
	app.scrollUpBtn();
	app.textAnimation();
	app.circleSlide();

	app.svgAnimate();
	app.animationHandler();

}

app.init();
