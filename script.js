//✨ left category
const leftCategories = document.getElementById('leftCategories');

//💥 all trees
const allPlants = document.getElementById('allPlants');

//🌳 middle Plant
const middlePlants = document.getElementById('middlePlants');

//🍁 plants modal
const plantsModal = document.getElementById('plants-modal');
const modalContainer = document.getElementById('modal-container');

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
        <li id="${cat.id}" class="hover:bg-green-200  p-2 rounded-md my-2 cursor-pointer list-none">${cat.category_name}</li>
    `;
  });
};

//✨ selector/indicator left categories
leftCategories.addEventListener('click', (e) => {
  const allLi = document.querySelectorAll('li');
  //  remove
  allLi.forEach((li) => {
    li.classList.remove('bg-green-600', 'text-white');
  });
  //  add
  if (e.target.localName === 'li') {
    e.target.classList.add('bg-green-600', 'text-white');
    loadPlantsByCategories(e.target.id);
  }
  console.log(e.target.parentNode.parentNode.children[1]);
  // 🍁 modal call
  if (e.target.innerText === 'id') {
    handlePlantsModal(e);
  }
});

//🌳 middle Plant
const loadPlantsByCategories = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showPlantsByCategories(data.plants);
    })
    .catch((err) => {
      console.log('Error', err);
    });
};

//🌳 show middle Plant
const showPlantsByCategories = (plants) => {
  middlePlants.innerHTML = '';
  plants.forEach((plant) => {
    // console.log(plant);
    middlePlants.innerHTML += `
        <div id="${plant.id}" class=" bg-white p-3 max-h-fit shadow-lg rounded-xl">
            <img class="bg-gray-200 rounded-lg w-full h-52 object-cover" src="${plant.image}" alt="">
            <h4 onclick="handlePlantsModal(event)" class="text-xl font-semibold my-3">${plant.name}</h4>
            <p>${plant.description}</p>
            <div class="flex justify-between items-center my-3">
                <button
                    class="p-1 px-3 rounded-full bg-[#dcfce7] text-green-700 font-medium cursor-pointer">${plant.category}</button>
                <h6 class="font-semibold"><span>৳</span>${plant.price}</h6>
            </div>
            <button class="p-2 px-5 rounded-full w-full bg-[#15803d] text-white font-medium cursor-pointer">Add
                to Cart</button>
        </div>
    `;
  });
  // handlePlantsModal(e);
};

//💥 all trees
const loadPlants = () => {
  fetch('https://openapi.programming-hero.com/api/plants')
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      const plantsData = data.plants;
      showPlants(plantsData);
    })
    .catch((err) => {
      console.log('Error:', err);
    });
};

//💥 show all trees
const showPlants = (plantsData) => {
  plantsData.forEach((plan) => {
    allPlants.innerHTML += `
        <div class=" bg-white p-3 max-h-fit shadow-lg rounded-xl">
            <img class="bg-gray-200 rounded-lg w-full h-52 object-cover" src="${plan.image}" alt="">
            <h4 class="text-xl font-semibold my-3">${plan.name}</h4>
            <p>${plan.description}</p>
            <div class="flex justify-between items-center my-3">
                <button
                    class="p-1 px-3 rounded-full bg-[#dcfce7] text-green-700 font-medium cursor-pointer">${plan.category}</button>
                <h6 class="font-semibold"><span>৳</span>${plan.price}</h6>
            </div>
            <button class="p-2 px-5 rounded-full w-full bg-[#15803d] text-white font-medium cursor-pointer">Add
                to Cart</button>
        </div>
    `;
  });
};

//🍁 plants modal

const handlePlantsModal = (e) => {
  const id = e.target.parentNode.id;
  // console.log(id);

  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.plants);
      showDetailsNews(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Modal এ plants details দেখানো
const showDetailsNews = (plants) => {
  console.log(plants);
  plantsModal.showModal();
  modalContainer.innerHTML = `
    <h1 class="text-xl font-semibold mb-3">${plants.name}</h1>
    <img class="rounded-lg w-full h-80 object-cover" src="${plants.image}" />
    <p><span class="text-lg font-semibold">Category:</span> ${plants.category}</p>
    <p><span class="text-lg font-semibold">Price: ৳</span>${plants.price}</p>
    <p><span class="text-lg font-semibold">Description:</span> ${plants.description}</p>
  `;
};

// handlePlantsModal();
loadPlants();
loadCategory();
