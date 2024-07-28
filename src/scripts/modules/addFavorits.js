export default function addFavorits() {
	const blockClass = document.querySelectorAll('.js-toggle-class');
	const favorites = document.querySelector('.js-count-fav');

	if (!blockClass && !favorites) return;

	let count = 0;

	blockClass.forEach((block) => {

		if (block.classList.contains('active')){
			count++
			favorites.innerHTML = count
		}

		block.addEventListener('click', (event) => {

			block.classList.toggle('active')

			if (block.classList.contains('active')){
				count++
			} else {
				count--
			}

			favorites.innerHTML = count;

			if(count > 0){
				favorites.classList.add('active')
			} else {
				favorites.classList.remove('active')
			}

		});

	});

	if(count > 0){
		favorites.classList.add('active')
	} else {
		favorites.classList.remove('active')
	}

}
