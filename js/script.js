document.addEventListener('DOMContentLoaded', () => {

	// Tabs

	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');


	function hideTabContent() { //функция скрывает все картинки(content items)
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active'); //удаляем класс active 
		});
	}

	function showTabContent(i = 0) { //показать tabs content, по умолчанию с первого элемента
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (item == target) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	// tabsParent.addEventListener('click', (event) => { //навешиваем отслеживание события на родительский элемент
	// 	const target = event.target; // присваиваем в переменную значение куда был клик
	// 	if (target && target.classList.contains('tabheader__item')) { // проверяем есть ли у события target и есть ли класс 
	// 		tabs.forEach((item, i) => {// перебираем пункты в родителе
	// 			if (item == target) {// проверяем и если значение какого то пункта равно target то вызываем функции
	// 				hideTabContent();
	// 				showTabContent(i);
	// 			}
	// 		});
	// 	}
	// });

	//Timer 

	const deadline = '2021-03-19'; //Дата дедлайна

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()), //парсим строчное значение даты в миллисекунды и вычитаем из даты в данный момент времени (получаем разницу)
			days = Math.floor(t / (1000 * 60 * 60 * 24)), //делим миллисек. до дедлайна на  миллисекунды в сутках
			hours = Math.floor((t / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

		return { //возвращаем объект
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);


			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}

	}

	setClock('.timer', deadline);

});