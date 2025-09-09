//✨ left category
const leftCategories = document.getElementById('leftCategories');

//💥 all trees
const allPlants = document.getElementById('allPlants');

//🌳 middle Plant
const middlePlants = document.getElementById('middlePlants');

//🍁 plants modal
const plantsModal = document.getElementById('plants-modal');
const modalContainer = document.getElementById('modal-container');

//🧩 right cards
const cardContainer = document.getElementById('card-container');
let cardAdd = [];

//🧩 total tk
const totalTk = document.getElementById('total-tk');
let total = 0;

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
    showLoading();
    e.target.classList.add('bg-green-600', 'text-white');
    loadPlantsByCategories(e.target.id);
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
};

//💥 all trees
const loadPlants = () => {
  fetch('https://openapi.programming-hero.com/api/plants')
    .then((res) => res.json())
    .then((data) => {
      const plantsData = data.plants;
      showPlants(plantsData);
    })
    .catch((err) => {
      console.log('Error:', err);
    });
};

//💥 show all trees
const showPlants = (plantsData) => {
  allPlants.innerHTML = '';
  plantsData.forEach((plan) => {
    allPlants.innerHTML += `
        <div id="${plan.id}" class=" bg-white p-3 h-full shadow-lg rounded-xl">
            <img class="bg-gray-200 rounded-lg w-full h-52 object-cover" src="${plan.image}" alt="">
            <h4 id="${plan.id}" onclick="handlePlantsModal(event)" class="text-xl font-semibold my-3">${plan.name}</h4>
            <p>${plan.description}</p>
            <div class="flex justify-between items-center my-3">
                <button
                    class="p-1 px-3 rounded-full bg-[#dcfce7] text-green-700 font-medium cursor-pointer">${plan.category}</button>
                <h6 class="font-semibold"><span>৳</span>${plan.price}</h6>
            </div>
            <button id="${plan.id}" class="p-2 px-5 rounded-full w-full bg-[#15803d] text-white font-medium cursor-pointer">Add
                to Cart</button>
        </div>
    `;
  });
};

//🍁 plants modal

const handlePlantsModal = (e) => {
  const id = e.target.parentNode.id;
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.plants);
      showDetailsPlants(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};

//🍁 Modal --> plants details show
const showDetailsPlants = (plants) => {
  plantsModal.showModal();
  modalContainer.innerHTML = `
    <h1 class="text-xl font-semibold mb-3">${plants.name}</h1>
    <img class="rounded-lg w-full h-80 object-cover" src="${plants.image}" />
    <p><span class="text-lg font-semibold">Category:</span> ${plants.category}</p>
    <p><span class="text-lg font-semibold">Price: ৳</span>${plants.price}</p>
    <p><span class="text-lg font-semibold">Description:</span> ${plants.description}</p>
  `;
};

//🧩 right cards addEventListener
middlePlants.addEventListener('click', (e) => {
  // console.log(e.target.innerText);

  if (e.target.innerText === 'Add to Cart') {
    handleCard(e);
  }
});

//🧩 right cards function
const handleCard = (e) => {
  const title = e.target.parentNode.children[1].innerText;
  const price = e.target.parentNode.children[3].children[1].innerText;
  const id = e.target.parentNode.id;
  cardAdd.push({
    title: title,
    price: price,
    id: id + '-' + Date.now(), // ✅ unique id বানানো
  });

  // 🎯 get total price
  let amount = parseFloat(price.replace('৳', '').trim());
  total += amount;
  // console.log('Total', total);
  showCard(cardAdd);
};

//🧩 right cards show
const showCard = (cardAdd) => {
  // console.log(cardAdd);
  cardContainer.innerHTML = '';
  cardAdd.forEach((card) => {
    cardContainer.innerHTML += `
        <div>
            <div class="bg-[#f0fdf4] p-2 m-3 rounded-md flex justify-between items-center">
                <div>
                    <h5 class="font-semibold">${card.title}</h5>
                    <p class="text-gray-500">${card.price}</p>
                </div>
                <div onclick='handleRemoveCard("${card.id}")' id="remove-card" class="cursor-pointer">❌</div>
            </div>
        </div>
    `;
  });

  // 🎯 show total price
  totalTk.innerText = total;
};

//🧩 right cards function for remove card
const handleRemoveCard = (cardId) => {
  const removeCard = cardAdd.find((card) => card.id === cardId);
  if (removeCard) {
    let amount = parseFloat(removeCard.price.replace('৳', '').trim());
    total -= amount;
  }

  cardAdd = cardAdd.filter((card) => card.id !== cardId);

  // last call
  showCard(cardAdd);
};

//🔃 show loading... function
const showLoading = () => {
  middlePlants.innerHTML = `
  <span class="loading loading-bars loading-xl mt-7 ml-15"></span>
`;
};

loadCategory();
loadPlants();
