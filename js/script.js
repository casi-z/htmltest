"use strict"
//!-**********************Глобальные переменные****************************-
let d = document
let body = d.body;
let progressBar = d.querySelector(".points-container__progress-bar-item")
let pointsCounter = d.querySelector(".points-container__points")
let shapka = d.querySelector(".header");
let part = d.querySelector(".header__part");
let endButton = d.querySelector(".header__end-button");
let timer = d.querySelector(".header__timer")
let test = d.querySelector(".test");
let testBody = d.querySelector(".test__body");
let demo = d.querySelector(".test__demo");
let matt = d.querySelector(".end-window");
let endWindow = d.querySelector(".end-window__content");
let endWindowButton = endWindow.querySelector(".end-window__button");
let endScreen = d.querySelector(".end-screen");
console.log(getComputedStyle(endScreen))
//!___________________________________________________________________

let ended = false;
let ql = d.querySelectorAll(".test-question").length
let tr = -80
let num = 0;
let points = 0;
let doQuestionAnswered = false;
progressBar.style.width = "0px"
//!___________________________________________________________________
	
function getMobileVersion() {//!Адаптив
	window.addEventListener("resize", function(e) {
		
		if(window.innerWidth < 767) {
			if (window.innerWidth < window.innerHeight) {
				body.classList.add("_adaptive")
				d.querySelectorAll('.button').forEach(e => e.classList.remove('add-hover'));
			}else{
				body.classList.remove("_adaptive")
				d.querySelectorAll('.button').forEach(e => e.classList.add('add-hover'));
			}
			
		}else{
			body.classList.remove("_adaptive")
			d.querySelectorAll('.button').forEach(e => e.classList.add('add-hover'));
		}
	})
	
}getMobileVersion()

let classChanger = [//!Функции для перебора массивов из DOM элементов если forEach не работает
	function classAdd(element, clas) {
		for(var n = 0; n < element.length; n++){
			element[n].classList.add(clas)
		}
	},
	function classRemove(element, clas) {
		for(var n = 0; n < element.length; n++){
			element[n].classList.remove(clas)
		}
	},
	function classToggle(element, clas) {
		for(var n = 0; n < element.length; n++){
			element[n].classList.toggle(clas)
		}
	},
]


function antiUpdate() { //!ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
	function locStorageGet() {
		testBody.style.transform = localStorage.getItem("progress");
		progressBar.style.width = localStorage.getItem("pb") + "px";
		points = localStorage.getItem("points");
		pointsCounter.innerHTML = points
		num = localStorage.getItem("num");
		if(localStorage.getItem("num") > 0) {
			endButton.classList.add('_active')
			d.querySelector('.points-container').classList.add('_active')
			part.innerHTML = localStorage.getItem("TestPart")
		}
		tr = localStorage.getItem("tr");
		doQuestionAnswered = localStorage.getItem("doQuestionAnswered");
		console.log(doQuestionAnswered)
	}
	if (localStorage.getItem("light") == true) {
		body.classList.add('_light')
	}
	locStorageGet()
	function locStorageSet() {
		localStorage.setItem("progress", testBody.style.transform)
		localStorage.setItem("pb", parseInt(progressBar.style.width))
		localStorage.setItem("points", points)
		localStorage.setItem("num", num)
		localStorage.setItem("tr", tr)
		localStorage.setItem("doQuestionAnswered", doQuestionAnswered)
		localStorage.setItem("TestPart", part.innerHTML)
		
		

	}
	setInterval(() => {
		if (ended == false) {
			locStorageSet()
		}
	}, 1 * 1000);
}//antiUpdate()

function getStartScreen() { //!Стартовый экран
	getTestInfo()

	function getTestInfo() {
		let testQuestionLength = d.querySelector(".start-screen__test-question-length")
		let text = `${ql}`
		let lastSymbol = text[text.length - 1]
		let numberCheck = ql == 11 || ql == 12 || ql == 13 || ql == 14;
		let numberEnd = lastSymbol == 0 || lastSymbol == 5 || lastSymbol == 6 || lastSymbol == 7 || lastSymbol == 8 || lastSymbol == 9;
		if(numberEnd == 1) {
			testQuestionLength.innerHTML = `ТЕСТ СОДЕРЖИТ    <h2>${ql}</h2>   ВОПРОС`
		}
		if(numberCheck == true) {
			testQuestionLength.innerHTML = `ТЕСТ СОДЕРЖИТ    <h2>${ql}</h2>   ВОПРОСОВ`
		} else {
			if(numberEnd == true) {
				testQuestionLength.innerHTML = `ТЕСТ СОДЕРЖИТ    <h2>${ql}</h2>   ВОПРОСОВ`
			} else {
				if(lastSymbol == 1) {
					testQuestionLength.innerHTML = `ТЕСТ СОДЕРЖИТ    <h2>${ql}</h2>   ВОПРОС`
				} else {
					testQuestionLength.innerHTML = `ТЕСТ СОДЕРЖИТ    <h2>${ql}</h2>   ВОПРОСА`
				}
			}
		}
	}
	showStartButton() //!Кнопка старт
	function showStartButton() {
		let start = d.querySelector(".start");
		setTimeout(() => {
			start.classList.add("_active")
		}, 1.5 * 1000);
		start.addEventListener("click", function() {
			startButtonFunction()
		})
		document.addEventListener("keydown", function(e) {
			if(e.code == "Enter") startButtonFunction()
		})

		function startButtonFunction() {
			if(start.classList.contains("_active")) {
				testBody.style.transitionDuration = '2s'
				testBody.style.transform = `translateY(${tr}vh)` //Перелистывается слайд
				setTimeout(() => { //Выводит часть теста с иконкой
					part.innerHTML = `Часть 1: HTML5 <?xml version="1.0" encoding="UTF-8"?> 
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
                    <g id="surface1">
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(89.803922%,30.196078%,14.901961%);fill-opacity:1;" d="M 4 0 L 28 0 C 30.210938 0 32 1.789062 32 4 L 32 28 C 32 30.210938 30.210938 32 28 32 L 4 32 C 1.789062 32 0 30.210938 0 28 L 0 4 C 0 1.789062 1.789062 0 4 0 Z M 4 0 "/>
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(89.803922%,30.196078%,14.901961%);fill-opacity:1;" d="M 22.546875 3.507812 C 22.476562 3.546875 22.464844 3.570312 22.484375 3.539062 C 21.804688 4.683594 21.785156 6.191406 21.484375 7.539062 C 21.484375 7.546875 21.484375 7.558594 21.484375 7.570312 C 21.476562 7.589844 21.488281 7.613281 21.484375 7.632812 C 21.335938 9.078125 20.859375 10.550781 21.203125 11.941406 C 21.214844 11.972656 21.226562 12.003906 21.234375 12.035156 C 21.234375 12.046875 21.230469 12.058594 21.234375 12.066406 C 21.238281 12.074219 21.226562 12.089844 21.234375 12.097656 C 21.238281 12.109375 21.257812 12.089844 21.265625 12.097656 C 21.335938 12.199219 21.425781 12.273438 21.484375 12.285156 C 21.523438 12.292969 21.59375 12.289062 21.734375 12.191406 C 21.882812 12.085938 21.96875 11.875 22.015625 11.597656 C 22.03125 11.566406 22.050781 11.535156 22.078125 11.503906 C 22.078125 11.496094 22.078125 11.484375 22.078125 11.472656 C 22.085938 11.441406 22.09375 11.410156 22.109375 11.378906 C 22.117188 11.371094 22.128906 11.359375 22.140625 11.347656 C 22.738281 8.960938 23.140625 6.457031 22.984375 4.007812 C 22.960938 3.886719 22.941406 3.800781 22.828125 3.664062 C 22.75 3.574219 22.691406 3.519531 22.671875 3.507812 C 22.652344 3.492188 22.675781 3.503906 22.609375 3.507812 C 22.597656 3.507812 22.585938 3.507812 22.578125 3.507812 C 22.550781 3.511719 22.5625 3.507812 22.546875 3.507812 Z M 22.546875 3.507812 "/>
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(89.803922%,30.196078%,14.901961%);fill-opacity:1;" d="M 28.054688 4.675781 C 27.015625 5.179688 26.488281 6.382812 25.773438 7.363281 C 25.765625 7.394531 25.753906 7.425781 25.742188 7.457031 C 25.734375 7.480469 25.722656 7.5 25.710938 7.519531 C 24.804688 9.125 23.648438 10.726562 23.523438 12.582031 C 23.523438 12.589844 23.523438 12.601562 23.523438 12.613281 C 23.535156 12.890625 23.695312 13.042969 23.867188 13.082031 C 24.035156 13.117188 24.339844 13.023438 24.460938 12.832031 C 24.46875 12.820312 24.480469 12.808594 24.492188 12.800781 C 24.492188 12.789062 24.492188 12.777344 24.492188 12.769531 C 24.492188 12.757812 24.492188 12.746094 24.492188 12.738281 C 26.136719 10.476562 27.375 7.8125 28.398438 5.207031 C 28.398438 5.195312 28.398438 5.1875 28.398438 5.175781 C 28.46875 5.003906 28.492188 4.960938 28.429688 4.832031 C 28.410156 4.792969 28.214844 4.664062 28.117188 4.675781 C 28.097656 4.683594 28.070312 4.667969 28.054688 4.675781 Z M 28.054688 4.675781 "/>
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(89.803922%,30.196078%,14.901961%);fill-opacity:1;" d="M 11.925781 5.421875 C 11.761719 5.453125 11.511719 5.601562 11.332031 5.671875 C 10.707031 5.910156 10.359375 6.449219 10.207031 7.078125 C 10.054688 7.722656 10.105469 8.4375 10.207031 9.171875 C 10.3125 9.902344 10.457031 10.65625 10.613281 11.234375 C 10.75 11.730469 10.847656 11.972656 10.894531 12.140625 L 10.894531 12.265625 C 10.894531 12.320312 10.871094 12.316406 10.832031 12.359375 C 10.8125 12.371094 10.855469 12.421875 10.832031 12.421875 C 10.789062 12.457031 10.734375 12.484375 10.675781 12.484375 C 10.566406 12.492188 10.480469 12.449219 10.363281 12.421875 C 10.285156 12.402344 10.183594 12.339844 10.207031 12.359375 C 10.171875 12.335938 10.109375 12.335938 10.082031 12.296875 C 10.082031 12.3125 10.105469 12.308594 10.082031 12.265625 C 10.058594 12.21875 10.03125 12.097656 9.992188 12.015625 C 9.902344 11.824219 9.832031 11.605469 9.710938 11.328125 C 9.464844 10.773438 9.152344 10.089844 8.804688 9.453125 C 8.453125 8.8125 8.039062 8.230469 7.585938 7.828125 C 7.355469 7.628906 7.074219 7.425781 6.804688 7.359375 C 6.542969 7.292969 6.230469 7.347656 5.960938 7.484375 C 5.261719 7.871094 4.863281 8.507812 4.710938 9.171875 C 4.554688 9.84375 4.628906 10.621094 4.742188 11.296875 C 4.855469 11.96875 5.03125 12.527344 5.148438 12.984375 C 5.195312 13.175781 5.257812 13.355469 5.273438 13.453125 C 5.273438 13.546875 5.234375 13.796875 5.210938 13.890625 C 5.089844 14.296875 4.804688 14.984375 4.804688 14.984375 C 4.804688 14.984375 -0.648438 29.464844 11.050781 28.449219 C 11.148438 28.441406 11.367188 28.386719 11.457031 28.386719 C 13.757812 27.925781 15.929688 27.230469 17.863281 26.449219 C 18.242188 26.265625 18.742188 26.085938 19.300781 25.824219 C 20.417969 25.300781 21.824219 24.628906 23.175781 23.886719 C 24.527344 23.144531 25.777344 22.355469 26.738281 21.511719 C 27.695312 20.667969 28.398438 19.746094 28.269531 18.824219 C 28.0625 17.34375 27.078125 16.242188 25.769531 15.390625 C 24.453125 14.535156 22.8125 13.945312 21.175781 13.515625 C 19.539062 13.085938 17.953125 12.734375 16.738281 12.546875 C 16.132812 12.453125 15.5625 12.425781 15.207031 12.359375 C 15.101562 12.339844 15.046875 12.3125 14.988281 12.296875 C 14.957031 12.292969 14.957031 12.28125 14.925781 12.265625 C 14.890625 12.242188 14.824219 12.242188 14.800781 12.203125 C 14.78125 12.167969 14.800781 12.121094 14.800781 12.078125 C 14.800781 12.0625 14.800781 12.035156 14.800781 12.015625 L 14.800781 11.109375 C 14.78125 10.359375 14.738281 9.375 14.582031 8.453125 C 14.425781 7.527344 14.1875 6.644531 13.675781 6.046875 C 13.375 5.691406 12.945312 5.457031 12.425781 5.421875 C 12.269531 5.402344 12.097656 5.390625 11.925781 5.421875 Z M 11.925781 5.421875 "/>
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 4.980469 3.5 L 6.984375 26 L 15.984375 28.5 L 25.011719 25.996094 L 27.019531 3.5 Z M 9.082031 8.097656 C 13.6875 8.097656 18.296875 8.097656 22.902344 8.097656 L 22.835938 8.839844 L 22.710938 10.238281 L 22.65625 10.859375 L 22.648438 10.859375 C 19.128906 10.859375 15.613281 10.859375 12.097656 10.859375 L 12.347656 13.6875 C 15.453125 13.6875 18.558594 13.6875 21.660156 13.6875 L 22.402344 13.6875 L 22.335938 14.425781 L 21.6875 21.691406 L 21.648438 22.15625 L 15.992188 23.722656 L 15.988281 23.726562 L 10.335938 22.15625 L 9.949219 17.824219 L 12.71875 17.824219 L 12.914062 20.023438 L 15.988281 20.855469 L 16 20.851562 L 16 20.855469 L 19.066406 20.023438 L 19.390625 16.445312 C 16.203125 16.445312 13.011719 16.445312 9.824219 16.445312 L 9.148438 8.839844 Z M 9.082031 8.097656 "/>
                    </g>
                    </svg>`
					endButton.classList.add('_active') //Выводит кнопку завершения теста
					testBody.style.transitionDuration = '0s'
					d.querySelector('title').innerHTML = `Тест по HTML. Вопрос ${(num + 1)}`
				}, 2 * 700);
				tr = tr - 80;
				start.classList.remove("_active")
				
				d.querySelector('.points-container').classList.add('_active')
			}
		}
	}
}getStartScreen()


function getTimer(hours, minutes, seconds) { //!ТАЙМЕР
	
	let testTime = d.querySelector(".start-screen__test-time")
	let text = `${minutes}`
	let lastSymbol = text[text.length - 1]
	let numberCheck = minutes == 11 || minutes == 12 || minutes == 13 || minutes == 14;
	let numberEnd = lastSymbol == 0 || lastSymbol == 5 || lastSymbol == 6 || lastSymbol == 7 || lastSymbol == 8 || lastSymbol == 9;
	if(numberEnd == 1) {
		testTime.innerHTML = `НА ТЕСТ ДАЁТСЯ    <h2>${minutes}</h2>   МИНУТА`
	}
	if(numberCheck == true) {
		testTime.innerHTML = `НА ТЕСТ ДАЁТСЯ    <h2>${minutes}</h2>   МИНУТ`
	} else {
		if(numberEnd == true) {
			testTime.innerHTML = `НА ТЕСТ ДАЁТСЯ    <h2>${minutes}</h2>   МИНУТ`
		} else {
			if(lastSymbol == 1) {
				testTime.innerHTML = `НА ТЕСТ ДАЁТСЯ    <h2>${minutes}</h2>   МИНУТА`
			} else {
				testTime.innerHTML = `НА ТЕСТ ДАЁТСЯ    <h2>${minutes}</h2>   МИНУТЫ`
			}
		}
	}

	function timerCount(params) {
		if (hours == 0) {
			setInterval(() => {
				if(seconds == 0) { //Считает секунды и минуты
					minutes--;
					seconds = 60;
					
				}
				seconds--
				if (timer.textContent == '00:00') showEndScreen()
				if(seconds < 10) { //Выводит таймер в шапку теста и добавляет "0" если секунды меньше 10
					timer.querySelector(".header__seconds").innerHTML = `0${seconds}`
				} else {
					timer.querySelector(".header__seconds").innerHTML = `${seconds}`
				}
				if(minutes < 10) { //Выводит таймер в шапку теста и добавляет "0" если минуты меньше 10
					timer.querySelector(".header__minutes").innerHTML = `0${minutes}`
				} else {
					timer.querySelector(".header__minutes").innerHTML = `${minutes}`
				}
				if (timer.textContent == '00:06') timer.classList.add('_end')
					
				
			}, 1000);
		}else{
			timer.innerHTML = '<div class="header__timer"><div class="header__minutes"></div>:<div class="header__seconds"></div></div>'
			setInterval(() => {
				if(seconds == 0) { //Считает секунды и минуты
					if (minutes == 0) {
						hours--;
						
						minutes = 60;
					}
					minutes--;
					seconds = 60;
					
					
				}
				seconds--
				if(seconds == 0) { //Завершает тест при окончании обратного отсчёта
					if(minutes == 0) {
						if (hours == 0) {
							showEndScreen()
						}
						
					}
				}
				if (timer.textContent == '0:00:00') showEndScreen()
				if(seconds < 10) { //Выводит таймер в шапку теста и добавляет "0" если секунды меньше 10
					timer.querySelector(".header__seconds").innerHTML = `0${seconds}`
				} else {
					timer.querySelector(".header__seconds").innerHTML = `${seconds}`
				}
				if(minutes < 10) { //Выводит таймер в шапку теста и добавляет "0" если минуты меньше 10
					timer.querySelector(".header__minutes").innerHTML = `0${minutes}`
				} else {
					timer.querySelector(".header__minutes").innerHTML = `${minutes}`
				}
				timer.querySelector('hours').innerHTML = hours
				if (timer.textContent == '0:00:06') timer.classList.add('_end')
					
				
			}, 1000);
		}
	}
	let start = d.querySelector(".start"); //Запускает обратный отсчёт при клике на кнопку Старт
	start.addEventListener("click", function() {
		setTimeout(() => {
			
			timerCount()
			setTimeout(() => {
				timer.classList.add('_active')
			}, 1000);
			
		}, 500);
	})
}getTimer(0, 20, 0)


function showEndWindow() { //!Диалоговое окно
	let closer = d.querySelector(".close")
	
	endWindow.classList.add("_active") //Выводит диалоговое окно окончания теста при клике на кнопку "завершить тест"
	matt.classList.add("_active") //Накладывает эффект размытости на тест при вызове окна
	closer.classList.add("_active")
	window.addEventListener('mousemove', function(e) { //Заменяет курсор на крестик при наведении на эффект разытости
		closer.style.left = e.clientX + 'px'
		closer.style.top = e.clientY + 'px'
	})
	
	closer.addEventListener("mousedown", function() { //Делает курсор красным при клике
		closer.style.fill = "red"
	})
	closer.addEventListener("click", function() { //Закрывает диалоговое окно
		matt.classList.remove("_active")
		endWindow.classList.remove("_active")
		closer.classList.remove("_active")
		closer.style.fill = "white";
		endWindowButton.classList.remove("_active")
	})
	matt.addEventListener("click", function() { //тоже закрывает диалоговое окно
		matt.classList.remove("_active")
		endWindow.classList.remove("_active")
		closer.classList.remove("_active")
		endWindowButton.classList.remove("_active")
	})
	endWindowButton.addEventListener("click", function() {
		showEndScreen()
		endWindowButton.classList.remove("_active")
		closer.classList.remove("_active")
	})
}
endButton.addEventListener("click", function() {
	showEndWindow()
})

function showEndScreen() { //!ЭКРАН ОКОНЧАНИЯ
	localStorage.clear;
	ended = true;
	if(matt.classList.contains('_active')) { //Закрывает окно
		matt.classList.remove("_active")
	}
	if(endWindow.classList.contains('_active')) { //Убирает эффект размытости
		endWindow.classList.remove("_active")
	}
	timer.style.display = "none" //Убирает таймер
	endButton.style.display = "none" //Убирает кнопку завершения теста
	endScreen.classList.add("_active") //Выводит экран окончания
	testBody.style.opacity = 0; //Закрывает тест
	setTimeout(() => {
		endPointsCount() //Считает баллы
	}, 2100);

	function endPointsCount() {
		let endPointsCounter = document.querySelector(".end-screen__points");
		let endPoints = 0
		setInterval(() => {
			if(points > endPoints) {
				endPoints++
				endPointsCounter.innerHTML = endPoints;
			}
			if(points == endPoints) {
				endStarCount()
			}
		}, 100);
	}

	function endStarCount() {
		let star = document.querySelector(".end-screen__star-container").querySelectorAll(".bi")
		let procents = points / ql * 100;
		setTimeout(() => {
			if(procents > 0) {
				star[0].classList.remove("bi-star")
				star[0].classList.add("bi-star-fill")
			}
		}, 1 * 300);
		setTimeout(() => {
			if(procents > 20) {
				star[1].classList.remove("bi-star")
				star[1].classList.add("bi-star-fill")
			}
		}, 2 * 300);
		setTimeout(() => {
			if(procents > 40) {
				star[2].classList.remove("bi-star")
				star[2].classList.add("bi-star-fill")
			}
		}, 3 * 300);
		setTimeout(() => {
			if(procents > 60) {
				star[3].classList.remove("bi-star")
				star[3].classList.add("bi-star-fill")
			}
		}, 4 * 300);
		setTimeout(() => {
			if(procents > 80) {
				star[4].classList.remove("bi-star")
				star[4].classList.add("bi-star-fill")
			}
		}, 5 * 300);
		setTimeout(() => {
			if(procents == 100) {
				star[5].style.opacity = 1
			}
		}, 6 * 300);
	}

	function getEndScreenButton(){
		let EndScreenButton = d.querySelector(".end-screen__button");
		EndScreenButton.addEventListener("click", function(){
			location.reload()
			localStorage.clear()
		})
	}getEndScreenButton()
}

function progressBarPlus() { //!Прогресс бар
	const progressBarWrapper = d.querySelector(".points-container__progress-bar").clientWidth //mspuz
	const progressBarStep = Math.round(progressBarWrapper / ql) //mspuz

	progressBar.style.width = progressBar.clientWidth + progressBarStep + 'px';
	
}

function getTestProgressInfo(params) {
	let questionAnswered = d.querySelector('.test-progress__question-answered')
	let questionLength = d.querySelector('.test-progress__question-length')
	questionAnswered.textContent = (num + 1)
	questionLength.textContent = ql
}getTestProgressInfo()

function themeChange() { //!Кнопка смены темы
	let lightTheme = d.querySelector(".header__theme-button");
	lightTheme.addEventListener("click", function() {
		body.classList.toggle("_light") //добавляет/удаляет класс
		
		if(body.classList.contains("_light")) { //меняет иконку
			lightTheme.innerHTML = `<i class="bi bi-lightbulb-off"></i>`
			localStorage.setItem("light", true)
		} else {
			lightTheme.innerHTML = `<i class="bi bi-lightbulb"></i>`
			localStorage.setItem("light", false)
		}
	})
}themeChange()

let inputFix = () => d.querySelectorAll('input').forEach(e => e.setAttribute('tabindex', '-1')); inputFix()


function getDevMode() { //!Режим разработчика
	pointsCounter.addEventListener("dblclick", function() {
		// ql = ql * tr
		// testBody.style.transform = `translateY(${ql}vh)`
		// demo.style.display = "block"
		// tr = ql
		// num = (ql - 1)
		// big()
		test.style.overflowY = 'scroll'
		
		
	})
}getDevMode() //TODO: Закоментарить при тесте

let question = d.querySelectorAll(".test-question");
let nextButton = d.querySelectorAll(".test-question__next-button");

function getTheQuestion() {//!Вопросы
	if(ended == false) {
		let button = question[num].getElementsByClassName("button");
		let wrong = question[num].getElementsByClassName("wrong");
		let right = question[num].getElementsByClassName("right");
		let answerButton = question[num].querySelectorAll(".test-question__answer-button");
		// num - номер вопроса видимого на экране
		// ql - количество всех вопросов
        getButtonMixer()
		function answerClick() { //Вызывается при клике на ответ
			if(num == (ql - 1)) { //Меняет вид и функцию кнопки далее при ответе на последний вопрос
				nextButton[num].innerHTML = "Завершить тест"
				nextButton[num].classList.add("_end")
			}
			question[num].classList.add("_answered")
			classChanger[1](button, 'add-hover')
			
			
			nextButton[num].classList.add('_active')
			if(right[0].classList.contains('_clicked')) {
				points++; //Прибавляет 1 балл
				pointsCounter.innerHTML = points;
				progressBarPlus(); //увеличивает прогресс бар
			}
		}
        
		function getButtons(buttonNumber) {
			if(!button[buttonNumber].classList.contains("_clicked")) {
                classChanger[1](button, "_clicked")
                button[buttonNumber].classList.add("_clicked")
                answerButton.forEach(e => e.classList.add('_active'))
                
				
			}
		}
		getScreenButtons()

		function getScreenButtons() {
			button[0].addEventListener("click", function() {
				getButtons(0)
			})
			button[1].addEventListener("click", function() {
				getButtons(1)
			})
			button[2].addEventListener("click", function() {
				getButtons(2)
			})
			button[3].addEventListener("click", function() {
				getButtons(3)
			})
			answerButton[0].addEventListener('click', function() {
				if(answerButton[0].classList.contains("_active")) {
					if(!answerButton[0].classList.contains("_invisible")) {
						doQuestionAnswered = true;
						answerButton[0].classList.add('_invisible')
						answerClick()
						getCssCube()
					}
				}
			})
		}
		getKeyboardButtons()

		function getKeyboardButtons() {
			function keyboardEnter(params) {
				if(answerButton[0].classList.contains("_active")) {
					if(!answerButton[0].classList.contains("_invisible")) {
						doQuestionAnswered = true;
						answerButton[0].classList.add('_invisible')
						answerClick()
						getCssCube()
						
						return
					}
					if(nextButton[num].classList.contains('_active')) {
						if(nextButton[num].classList.contains("_end")) { //Завершает тест, если кнопка находится на последнем вопросе
							showEndScreen()
						} else {
							nextButton[num].classList.remove('_active') //Кнопка исчезает
							num++ //Меняется номер
							testBody.style.transitionDuration = '2s'
							testBody.style.transform = `translateY(${tr}vh)` //Перелистывается слайд
							setTimeout(() => {
								testBody.style.transitionDuration = '0s'
							}, 2100);
							doQuestionAnswered = false;
							tr = tr - 80;
							d.querySelector('title').innerHTML = `Тест по HTML. Вопрос ${(num + 1)}`
							getTheQuestion() //Функция с ответами вызывается
							getTestProgressInfo()
							if(num == 9) demo.style.display = 'block'
						}
					}	
				}
			}
			document.addEventListener('keydown', function(e) {
				if(e.code == 'KeyA') getButtons(0)
				if(e.code == 'KeyB') getButtons(1)
				if(e.code == 'KeyC') getButtons(2)
				if(e.code == 'KeyD') getButtons(3)
				if(e.code == 'KeyZ') getButtons(0)
				if(e.code == 'KeyX') getButtons(1)
				if(e.code == 'KeyV') getButtons(3)
				if(e.code == 'Digit1') getButtons(0)
				if(e.code == 'Digit2') getButtons(1)
				if(e.code == 'Digit3') getButtons(2)
				if(e.code == 'Digit4') getButtons(3)
				if(e.code == 'Numpad1') getButtons(0)
				if(e.code == 'Numpad2') getButtons(1)
				if(e.code == 'Numpad3') getButtons(2)
				if(e.code == 'Numpad4') getButtons(3)
				if(e.code == 'Enter') {
					keyboardEnter()
					
					
				}
				if(e.code == 'Space') keyboardEnter()
				if(e.code == 'Escape') {
					showEndWindow()
				}
			});
		}
        
        function getButtonMixer() {
			
            localStorage.setItem("right", right[0].innerHTML)
            localStorage.setItem("wrong0", wrong[0].innerHTML)
            localStorage.setItem("wrong1", wrong[1].innerHTML)
            localStorage.setItem("wrong2", wrong[2].innerHTML)

			let right0Info = localStorage.getItem("right")
            let wrong1Info = localStorage.getItem("wrong0")
            let wrong2Info = localStorage.getItem("wrong1")
            let wrong3Info = localStorage.getItem("wrong2")

			let randomizer = Math.floor(Math.random() * (5 - 1)) + 1;
			if (randomizer == 5) {
				randomizer = 4
			}
			if (randomizer == 1) {
				button[0].innerHTML = `<div>a)</div>${right0Info}`
				button[1].innerHTML = `<div>b)</div>${wrong1Info}`
				button[2].innerHTML = `<div>c)</div>${wrong3Info}`
				button[3].innerHTML = `<div>d)</div>${wrong2Info}`
				classChanger[0](button, "wrong")
				classChanger[1](button, "right")
				
				button[0].classList.add("right")
				button[0].classList.remove("wrong")
			}
			if (randomizer == 2) {
				button[0].innerHTML = `<div>a)</div>${wrong1Info}`
				button[1].innerHTML = `<div>b)</div>${right0Info}`
				button[2].innerHTML = `<div>c)</div>${wrong3Info}`
				button[3].innerHTML = `<div>d)</div>${wrong2Info}`

				classChanger[0](button, "wrong")
				classChanger[1](button, "right")

				button[1].classList.add("right")
				button[1].classList.remove("wrong")
				
			}
			if (randomizer == 3) {
				button[0].innerHTML = `<div>a)</div>${wrong3Info}`
				button[1].innerHTML = `<div>b)</div>${wrong1Info}`
				button[2].innerHTML = `<div>c)</div>${wrong2Info}`
				button[3].innerHTML = `<div>d)</div>${right0Info}`

				classChanger[0](button, "wrong")
				classChanger[1](button, "right")

				button[3].classList.add("right")
				button[3].classList.remove("wrong")
			}
			if (randomizer == 4) {
				button[0].innerHTML = `<div>a)</div>${wrong1Info}`
				button[1].innerHTML = `<div>b)</div>${wrong3Info}`
				button[2].innerHTML = `<div>c)</div>${right0Info}`
				button[3].innerHTML = `<div>d)</div>${wrong2Info}`

				classChanger[0](button, "wrong")
				classChanger[1](button, "right")

				button[2].classList.add("right")
				button[2].classList.remove("wrong")
			}
            
        }
		function getCssCube(params) {
			let _right = d.getElementsByClassName("right");
			if (_right[10].classList.contains('_clicked')) {
				demo.style.transform = "translateX(0)"
			}
			if (_right[11].classList.contains('_clicked')) {
				demo.style.display = "flex"
				demo.style.justifyContent = "center"
				demo.style.alignItems = "center"
			}
			if (_right[12].classList.contains('_clicked')) {
				demo.style.fontStyle = "italic"
			}
			if (_right[13].classList.contains('_clicked')) {
				demo.style.textDecoration = "underline"
			}
			if (_right[14].classList.contains('_clicked')) {
				demo.style.textDecoration = "line-through"
			}
			if (_right[15].classList.contains('_clicked')) {
				demo.style.border = "5px solid gold"
			}
			if (_right[16].classList.contains('_clicked')) {
				demo.style.border = "5px dashed gold"
			}
			if (_right[17].classList.contains('_clicked')) {
				demo.style.border = "5px dotted gold"
			}
			if (_right[18].classList.contains('_clicked')) {
				demo.style.borderRadius = "20px"
			}
			if (_right[19].classList.contains('_clicked')) {
				demo.style.borderTopLeftRadius = "0px"
				demo.style.borderBottomRightRadius = "0px"
			}
			if (_right[20].classList.contains('_clicked')) {
				demo.style.transform = "translateY(-1vh)"
			}
			if (_right[21].classList.contains('_clicked')) {
				demo.style.transform = "rotate(45deg)"
			}
			if (_right[22].classList.contains('_clicked')) {
				demo.style.display = "flex"
				demo.style.justifyContent = "center"
				demo.style.alignItems = "center"
				demo.querySelector('span').style.transform = "rotate(-45deg)"
			}
			if (_right[23].classList.contains('_clicked')) {
				demo.style.transform = "scale(1.2)"
			}
			if (_right[24].classList.contains('_clicked')) {
				demo.style.transform = "scale(0.9)"
			}
		}
	}		
    
}getTheQuestion()
nextButton.forEach(e => e.addEventListener("click", function() { //!Кнопка "далее"
	if(nextButton[num].classList.contains('_active')) {
		if(nextButton[num].classList.contains("_end")) { //Завершает тест, если кнопка находится на последнем вопросе
			showEndScreen()
		} else {
			nextButton[num].classList.remove('_active') //Кнопка исчезает
			num++ //Меняется номер
			testBody.style.transitionDuration = '2s'
			testBody.style.transform = `translateY(${tr}vh)` //Перелистывается слайд
			setTimeout(() => {
				testBody.style.transitionDuration = '0s'
			}, 2100);
			doQuestionAnswered = false;
			tr = tr - 80;
			d.querySelector('title').innerHTML = `Тест по HTML. Вопрос ${(num + 1)}`
			getTheQuestion() //Функция с ответами вызывается
			getTestProgressInfo()
		}
	}
}))

function cssMode() { //!Режим CSS (Смена фона, новая часть)
	nextButton[9].addEventListener("click", function(params) {
		body.classList.add("_css")
		part.innerHTML = `Часть 2: CSS3 <?xml version="1.0" encoding="UTF-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
        <g id="surface1">
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(12.156863%,38.431373%,68.235294%);fill-opacity:1;" d="M 27.378906 28.890625 L 16 32 L 4.625 28.890625 L 2 0 L 30.003906 0 Z M 27.378906 28.890625 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(20.392157%,49.019608%,77.647059%);fill-opacity:1;" d="M 16 2 L 16 29.75 L 25.230469 27.007812 L 27.6875 2 Z M 16 2 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 24.363281 6 L 7.605469 6 L 8 10 L 16 10 L 8.25 12.988281 L 8.617188 17 L 19.503906 17 L 19.15625 21 L 16 21.988281 L 12.859375 20.984375 L 12.53125 19 L 8.804688 19 L 9.261719 23.988281 L 16 25.988281 L 22.726562 23.984375 L 23.71875 12.988281 L 16.027344 12.988281 L 24 10 Z M 24.363281 6 "/>
        </g>
        </svg>`
		document.querySelector(".link").setAttribute('href', '/img/294692_css3_icon.svg');
		setTimeout(() => {
			demo.style.display = "block"
		}, 1 * 1000);
	})
}cssMode()
