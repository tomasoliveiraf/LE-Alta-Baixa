   var navArticles = document.querySelector('.nav-articles');
   var navAbout = document.querySelector('.nav-about');

   var navArticlesContent = document.querySelector('.nav-articles-content');
   var navAboutContent = document.querySelector('.nav-about-content');

   navArticles.addEventListener('click', function() {
     toggleVisibility(navArticlesContent);
   });

   navAbout.addEventListener('click', function() {
     toggleVisibility(navAboutContent);
   });

   function toggleVisibility(element) {
     if (element.style.display === 'none') {
       element.style.display = 'inline-flex';
     } else {
       element.style.display = 'none';
     }
   }