// কার্ট লিস্ট আর টোটাল এলিমেন্ট ধরি
const cartList = document.getElementById('cart-list');
const totalEl = document.getElementById('total');
const addButtons = document.querySelectorAll('.add-btn');

let totalPrice = 0;

// দাম থেকে সংখ্যা বের করার হেল্পার ফাংশন
function parsePrice(priceText) {
  // যেমন "৳500" -> 500
  return parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;
}

// টাকা সুন্দরভাবে দেখানোর জন্য
function formatPrice(price) {
  return `৳${price}`;
}

// Add to Cart বাটনে ইভেন্ট অ্যাড করি
addButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    const title = card.querySelector('.title').innerText;
    const priceText = card.querySelector('.price').innerText;
    const price = parsePrice(priceText);

    // li আইটেম বানাই
    const li = document.createElement('li');
    li.dataset.price = price;
    li.innerHTML = `
      ${title} - ${formatPrice(price)}
      <button class="remove-btn">❌</button>
    `;

    // কার্টে যোগ করি
    cartList.appendChild(li);

    // টোটাল আপডেট করি
    totalPrice += price;
    totalEl.innerText = formatPrice(totalPrice);
  });
});

// রিমুভ হ্যান্ডলার (event delegation)
cartList.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const li = e.target.closest('li');
    const price = parseFloat(li.dataset.price) || 0;

    // li মুছে ফেলি
    li.remove();

    // টোটাল থেকে বাদ দিই
    totalPrice -= price;
    if (totalPrice < 0) totalPrice = 0;

    totalEl.innerText = formatPrice(totalPrice);
  }
});
