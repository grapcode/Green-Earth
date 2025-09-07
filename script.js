//✨ left category
const leftCategories = document.getElementById('leftCategories');

//🌳 middle Plant
const middlePlants = document.getElementById('middlePlants');

//✨ left category
const loadCategory = () => {
  fetch('https://openapi.programming-hero.com/api/categories')
    .then((res) => res.json())
    .then((data) => {
      const allCategories = data.categories;
      showCategory(allCategories);
    })
    .catch((err) => {
      console.log('Error:', err);
    });
};

//✨ show left categories
const showCategory = (allCategories) => {
  allCategories.forEach((cat) => {
    // console.log(cat);
    leftCategories.innerHTML += `
        <li id="${cat.id}" class="hover:bg-green-200 p-2 rounded-md my-2 cursor-pointer list-none">${cat.category_name}</li>
    `;
  });
};

//✨ selector/indicator left categories
leftCategories.addEventListener('click', (e) => {
  const allLi = document.querySelectorAll('li');
  //  remove
  allLi.forEach((li) => {
    li.classList.remove('bg-green-400');
  });
  //  add
  if (e.target.localName === 'li') {
    e.target.classList.add('bg-green-400');
    loadPlantsByCategories(e.target.id);
  }
});

//🌳 middle Plant
const loadPlantsByCategories = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.plants);
    })
    .catch((err) => {
      console.log('Error', err);
    });
};

loadCategory();
