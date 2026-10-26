/**
 * หมาล่าทั่ง สาขา บุรีรัมย์ - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
  initMobileMenu();
  initDeliveryModal();
  initScrollHeader();
});

/* ==========================================================================
   1. Interactive Price Calculator
   ========================================================================== */
const PRICE_PER_GRAM = 0.24; // 24 บาท ต่อ 100 กรัม (ขีดละ 24.-)

function initCalculator() {
  const slider = document.getElementById('weight-range');
  if (!slider) return;

  slider.addEventListener('input', (e) => {
    updatePrice(parseInt(e.target.value, 10));
  });
}

function setWeight(grams) {
  const slider = document.getElementById('weight-range');
  if (slider) {
    slider.value = grams;
    updatePrice(grams);
  }

  // Update quick pills active class
  const pills = document.querySelectorAll('.quick-pill');
  pills.forEach((pill) => {
    if (pill.getAttribute('onclick')?.includes(String(grams))) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
}

function updatePrice(grams) {
  const price = Math.round(grams * PRICE_PER_GRAM);
  const khid = (grams / 100).toFixed(grams % 100 === 0 ? 0 : 1);

  // Update DOM elements
  const weightDisplay = document.getElementById('weight-display');
  const priceDisplay = document.getElementById('price-display');
  const gramsLabel = document.getElementById('grams-label');
  const itemCost = document.getElementById('item-cost');
  const bowlDesc = document.getElementById('bowl-description');

  if (weightDisplay) weightDisplay.textContent = `${grams} กรัม (${khid} ขีด)`;
  if (priceDisplay) priceDisplay.textContent = price;
  if (gramsLabel) gramsLabel.textContent = grams;
  if (itemCost) itemCost.textContent = `${price}.-`;

  if (bowlDesc) {
    if (grams <= 200) {
      bowlDesc.textContent = `"ไซส์เบาๆ กรุบกริบ (${khid} ขีด): สบายกระเป๋าเพียง ${price} บาท คีบผักสดกรอบฟรีได้ไม่อั้น คุ้มสุดๆ"`;
    } else if (grams <= 350) {
      bowlDesc.textContent = `"ไซส์มาตรฐาน อิ่มกำลังดี (${khid} ขีด): ยอดนิยมที่สุด! ได้เนื้อสัตว์ ซีฟู้ด ลูกชิ้นชีส พร้อมผักฟรีล้นชาม อิ่มฟินจบในชามเดียว"`;
    } else if (grams <= 500) {
      bowlDesc.textContent = `"ไซส์สายกินจุ จัดเต็ม (${khid} ขีด): เครื่องแน่นเต็มคาราเบล เนื้อสไลด์จุกๆ เส้นมันหนึบ ผักฟรีพูนชาม อิ่มคุ้มเกินราคา"`;
    } else {
      bowlDesc.textContent = `"ไซส์ชามยักษ์ / ทานคู่กัน 2 คน (${khid} ขีด): ชามใหญ่บิ๊กไซส์ จัดหนักวัตถุดิบพรีเมียมทุกชนิด ซดน้ำซุปหมาล่านมสดสะใจ!"`;
    }
  }

  // Update quick pills if slider moved manually
  const pills = document.querySelectorAll('.quick-pill');
  pills.forEach((pill) => {
    if (pill.getAttribute('onclick')?.includes(`setWeight(${grams})`)) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
}

// Make setWeight globally available for onclick handlers
window.setWeight = setWeight;

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      drawer.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close when clicking mobile links
  const links = drawer.querySelectorAll('.mobile-link, .btn');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   3. Native <dialog> Delivery Modal
   ========================================================================== */
function initDeliveryModal() {
  const modal = document.getElementById('delivery-modal');
  const openHeaderBtn = document.getElementById('open-delivery-header');

  if (openHeaderBtn) {
    openHeaderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openDeliveryModal();
    });
  }

  if (modal) {
    // Close modal when clicking outside the modal-card (backdrop click)
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeDeliveryModal();
      }
    });
  }
}

function openDeliveryModal() {
  const modal = document.getElementById('delivery-modal');
  if (modal && typeof modal.showModal === 'function') {
    modal.showModal();
  }
}

function closeDeliveryModal() {
  const modal = document.getElementById('delivery-modal');
  if (modal && typeof modal.close === 'function') {
    modal.close();
  }
}

window.openDeliveryModal = openDeliveryModal;
window.closeDeliveryModal = closeDeliveryModal;

/* ==========================================================================
   4. Header Scroll Shadow
   ========================================================================== */
function initScrollHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });
}
