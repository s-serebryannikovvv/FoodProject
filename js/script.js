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

	const deadline = '2021-04-21'; //Дата дедлайна

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

	function getZero(num) { //добавляем 0 если цифра однозначная
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) { //получаем id элементов 
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock(); // функцию вызываем вручную, что бы корректно отображалась, а не ждала 1сек. (выше)

		function updateClock() {
			const t = getTimeRemaining(endtime); // получаем оставшееся время

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


	//modal

	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalCloseBtn = document.querySelector('[data-close]');


	function openModal() { // открытие модального окна
		modal.classList.add('show');
		modal.classList.remove('hide');
		// modal.classList.toggle('show');
		document.body.style.overflow = 'hidden';
		// clearInterval(modalTimerId); // не открывать модальное окно по таймеру если оно уже было отккрыто
	}

	function closeModal() { // закрытие модального окна
		modal.classList.add('hide');
		modal.classList.remove('show');
		// modal.classList.toggle('show');
		document.body.style.overflow = '';
	}

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	})

	modalCloseBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => { //при клике вне модального окна, закрывать модальное окно
		if (e.target === modal) {
			closeModal();
		}
	});
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	// const modalTimerId = setTimeout(openModal, 5000); //запуск модального окна через 5 секунд

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { //проверка, до листал ли пользователь до конца
			console.log('HI');
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);

	//классы

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) { // применение rest оператора
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 71;
			this.changeToRU();
		}

		changeToRU() {
			this.price = this.price * this.transfer
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className))
			}
			element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
				</div>
			`;
			this.parent.append(element); //добавление элемента
		}
	}

	new MenuCard( //получение атрибутов для формирования карточек товаров
		"img/tabs/vegy.jpg",
		"vegy",
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		'.menu .container',
	).render(); //вызов объекта один раз, без записи в переменную

	new MenuCard( //получение атрибутов для формирования карточек товаров
		"img/tabs/elite.jpg",
		"elite",
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и	качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в	ресторан!',
		14,
		'.menu .container',
		'menu__item'
	).render(); //вызов объекта один раз, без записи в переменную

	new MenuCard( //получение атрибутов для формирования карточек товаров
		"img/tabs/post.jpg",
		"post",
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество	белков за счет тофу и импортных вегетарианских стейков.',
		21,
		'.menu .container',
		'menu__item'
	).render(); //вызов объекта один раз, без записи в переменную

});