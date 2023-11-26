var currentAccordion = null;
var accordions = document.querySelectorAll('.accordion');

function toggleAccordion(header) {
  var content = header.nextElementSibling;
  var parentElement = header.parentNode;
  var headerText = header.children[1];
  var img = header.querySelector('img');

  if (parentElement === currentAccordion) {
    return;
  }

  if (currentAccordion) {
    var currentContent = currentAccordion.children[1];
    currentContent.style.maxHeight = null;
    currentAccordion.style.backgroundColor = "";
    currentAccordion.children[0].style.marginBottom = "";
    currentAccordion.children[0].children[1].style.fontWeight = "";
  }

  content.style.maxHeight = content.scrollHeight + "px";
  parentElement.style.backgroundColor = "#f1f1f1";
  header.style.marginBottom = "16px";
  headerText.style.fontWeight = "bold";

  currentAccordion = parentElement;
}

var svgContainers = document.querySelectorAll('.svg-container');

for (var i = 0; i < svgContainers.length; i++) {
  var img = svgContainers[i].querySelector('img');

  img.addEventListener('click', function() {
    this.src = './assets/03.png';
    var accordion = this.closest('.accordion');
    accordion.classList.add('completed');
    var nextAccordion = accordions[i+1];
    if (nextAccordion) {
      toggleAccordion(nextAccordion.querySelector('.accordion-header'));
    }
  });
}

window.onload = function() {
  var firstHeader = document.querySelector('.accordion-header');
  toggleAccordion(firstHeader);
};

var modalAlerts = document.querySelector('.alerts');
var notif = document.querySelector('.notif');
var modalStores = document.querySelector('.stores');
var store = document.querySelector('.store');

notif.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    notif.click();
  }
});

store.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    store.click();
  }
});

function closeModals() {
  modalAlerts.style.display = "none";
  modalStores.style.display = "none";
}

notif.onclick = function(event) {
  event.stopPropagation();
  if (modalAlerts.style.display === "block") {
    modalAlerts.style.display = "none";
  } else {
    closeModals();
    modalAlerts.style.display = "block";
  }
}

store.onclick = function(event) {
  event.stopPropagation();
  if (modalStores.style.display === "block") {
    modalStores.style.display = "none";
  } else {
    closeModals();
    modalStores.style.display = "block";
  }
}

var dropdown = document.querySelector('.dropdown');
var accordion = document.querySelector('.accordion');

dropdown.onclick = function() {
  if (accordion.style.display === "none") {
    accordion.style.display = "block";
    dropdown.style.transform = "rotate(180deg)";
  } else {
    accordion.style.display = "none";
    dropdown.style.transform = "rotate(0deg)";
  }
}

var svgClose = document.querySelector('.svg-close');
var trialAd = document.querySelector('.trial-ad');

svgClose.onclick = function() {
  trialAd.style.display = "none";
}

var storeText = document.querySelector('.store-text');

function updateTextContent() {
  if (window.matchMedia('(max-width: 600px)').matches) {
    storeText.childNodes[0].nodeValue = "";
    storeText.style.padding = "0";
  } else {
    storeText.childNodes[0].nodeValue = "Davii Collections ";
  }
}

updateTextContent();

window.addEventListener('resize', updateTextContent);

window.onload = function() {
  var checkboxes = document.querySelectorAll('.step-checkbox');
  var accordionItems = document.querySelectorAll('.accordion-item');

  var completedSpan = document.getElementById('completed');
  var progressBar = document.querySelector('progress');

  function updateProgress() {
    var completedCount = document.querySelectorAll('.step-checkbox:checked').length;
    completedSpan.textContent = completedCount;
    progressBar.value = (completedCount / checkboxes.length) * 100;
  }

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', function() {
      var svg = this.parentElement.querySelector('img');

      if (this.checked) {
        svg.src = 'https://crushingit.tech/hackathon-assets/icon-checkmark-circle.svg';
        svg.style.width = '24px';

        var nextAccordion = accordionItems[i+1];
        if (nextAccordion) {
          toggleAccordion(nextAccordion.querySelector('.accordion-header'));
        }
      } else {
        svg.src = './assets/01.svg';
      }

      updateProgress();
    });
  }

  updateProgress();
};