var navArticles = document.querySelector('.nav-articles');
var navAbout = document.querySelector('.nav-about');
var navTitle = document.querySelector('.nav-title');
var articleLink = document.querySelector('.article-link'); // Corrigi o nome da variável

var navArticlesContent = document.querySelector('.nav-articles-content');
var navAboutContent = document.querySelector('.nav-about-content');

navArticles.addEventListener('click', function () {
  toggleVisibility(navArticlesContent);
  updateNavTitleVisibility();
});

navAbout.addEventListener('click', function () {
  toggleVisibility(navAboutContent);
  updateNavTitleVisibility();
});

articleLink.addEventListener('click', function () {
  hideAllNavsExcept(navTitle);
});

function toggleVisibility(element) {
  if (element.style.display === 'none') {
    element.style.display = 'inline-flex';
  } else {
    element.style.display = 'none';
  }
}

function hideAllNavsExcept(exceptElement) {
  var allNavs = [navArticlesContent, navAboutContent, navTitle];
  
  for (var i = 0; i < allNavs.length; i++) {
    if (allNavs[i] !== exceptElement) {
      allNavs[i].style.display = 'none';
    }
  }
}

function updateNavTitleVisibility() {
  var navArticlesVisible = navArticlesContent.style.display === 'inline-flex';
  var navAboutVisible = navAboutContent.style.display === 'inline-flex';

  if (navArticlesVisible && navAboutVisible) {
    navTitle.style.display = 'inline-flex';
  } else {
    navTitle.style.display = 'none';
  }
}
