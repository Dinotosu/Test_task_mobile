const languages = ["en", "es", "ja", "pt", "fr", "de"];
let langDocument = {};
let nowLanguage = "";

languages.map((lang) => {
  if (window.location.href.split("?lang=")[1] === lang) {
    console.log(window.location.href.split("?lang=")[1]);
    nowLanguage = lang;
    switchLanguage(lang);
  } else {
    // switchLanguage("en");
  }
});

function switchLanguage(language) {
  fetch(`i18n/${language}.json`)
    .then((response) => response.json())
    .then((data) => {
      langDocument = data;
      processLangDocument();
    });
}

function processLangDocument() {
  const tags = document.querySelectorAll(
    "span,img,a,label,li,option,p,h1,h2,h3,h4,h5,h6",
  );

  for (const tag of tags) {
    const key = tag.dataset.langkey;
    if (langDocument[key]) {
      tag.innerHTML = langDocument[key];
      tag.setAttribute("lang", nowLanguage);
    }
  }
}
