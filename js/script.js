document.addEventListener('DOMContentLoaded', () => {

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


});