class PageChanger {
  constructor(form) {
    this.form = form;
  }
  getValue(inputName) {
    return this.form.elements[inputName].value;
  }

  changeText(selectorToChange, sourceInputName) {
    document.querySelector(selectorToChange).textContent =
      this.getValue(sourceInputName);
  }

  changeAttr(selectorToChange, attrToChange, sourceInputName) {
    const selector = document.querySelector(selectorToChange);
    if (selector.getAttribute("href").includes("mailto:")) {
      selector.setAttribute(
        attrToChange,
        `mailto:${this.getValue(sourceInputName)}`
      );
    } else {
      selector.setAttribute(attrToChange, this.getValue(sourceInputName));
    }
  }

  changeStyle(selectorToChange, styleToChange, value) {
    document.querySelector(selectorToChange).style[styleToChange] = value;
  }

  changeDate(selectorToChange, sourceInputName) {
    document.querySelector(selectorToChange).textContent = this.getValue(
      sourceInputName
    )
      .split("-")
      .reverse()
      .join(".");
  }
}

const photos = {
  bombardier: {
    photoName: "Bombardier CSeries CS300 HB-JCA",
    photoAuthor: "Hans-Peter Gauster",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/html-forms/moved_BOMBARDIER.jpg",
    photoYear: "2017",
    creditLink: "https://www.flickr.com/photos/sloppyperfectionist/",
    ccLink: "https://creativecommons.org/licenses/by/2.0/legalcode",
    ccType: "CC BY-SA 2.0",
    ccImg:
      "https://practicum-content.s3.us-west-1.amazonaws.com/html-forms/moved_BOMBARDIER_CC.svg",
    ccHeight: "10px",
  },
  hobbit: {
    photoName: "Smaug!",
    photoAuthor: "Alan Wilson",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/html-forms/moved_HOBBIT.jpg",
    photoYear: "2014",
    creditLink: "https://www.flickr.com/photos/ajw1970/14323036295/",
    ccLink: "https://creativecommons.org/licenses/by/2.0/legalcode",
    ccType: "CC BY-SA 2.0",
    ccImg:
      "https://practicum-content.s3.us-west-1.amazonaws.com/html-forms/moved_HOBBIT_CC.svg",
    ccHeight: "10px",
  },
  tiger: {
    photoName: "EI-XLD",
    photoAuthor: "Papas Dos",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/html-forms/moved_TIGER.jpg",
    creditLink: "https://www.flickr.com/photos/papasdos/34150356073/",
    photoYear: "2017",
    ccLink: "https://creativecommons.org/licenses/by/2.0/legalcode",
    ccType: "CC BY 2.0",
    ccImg:
      "https://practicum-content.s3.us-west-1.amazonaws.com/html-forms/moved_TIGER_CC.svg",
    ccHeight: "18px",
  },
  connected: {
    photoName: "N709JB Fly-Fi",
    photoAuthor: "Dave Montiverdi",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/html-forms/moved_CONNECTED.jpg",
    photoYear: "2018",
    creditLink: "https://www.flickr.com/photos/fordaveesss/42120982611/",
    ccLink: "https://creativecommons.org/licenses/by-nc-nd/2.0/legalcode",
    ccType: "CC BY-NC-ND 2.0",
    ccImg:
      "https://practicum-content.s3.us-west-1.amazonaws.com/html-forms/moved_CONNECTED_CC.svg",
    ccHeight: "10px",
  },
};

function createCredit({
  creditLink,
  photoAuthor,
  photoName,
  photoYear,
  ccLink,
  ccType,
  ccImg,
  ccHeight,
}) {
  return `Photo by <a class="content__link" href="${creditLink}" target="_blank">${photoAuthor}</a> "${photoName}" © ${photoYear}, &nbsp;&nbsp; <a class="content__link" href="${ccLink} target="_blank">${ccType}</a> &nbsp;&nbsp; <img src=${ccImg} height=${ccHeight}px alt=${photoName}>`;
}

const page = new PageChanger(document.querySelector(".form__admin"));

document.querySelector(".form__admin").addEventListener("submit", function (e) {
  e.preventDefault();
  page.changeText(".content__heading", "heading");
  page.changeText(".content__subheading", "subheading");
  page.changeText(".content__text", "main-text");
  page.changeText(".content__link_type_email", "email");
  page.changeAttr(".content__link_type_email", "href", "email");

  let fontFamilyToApply;

  switch (page.getValue("font-family")) {
    case "ibm":
      fontFamilyToApply = "IBM Plex Serif";
      break;
    case "ubuntu":
      fontFamilyToApply = "Ubuntu";
      break;
    case "istok":
      fontFamilyToApply = "Istok Web";
      break;
    default:
      fontFamilyToApply = "IBM Plex Serif";
  }
  page.changeStyle(".content", "font-family", fontFamilyToApply);
  page.changeStyle(
    ".content__heading",
    "font-size",
    page.getValue("heading-font-size") + "px"
  );
  page.changeStyle(
    ".content__text",
    "font-size",
    page.getValue("text-font-size") + "px"
  );
  page.changeDate(".content__date", "pub-date");

  const imgOnPageToChange = document.querySelector(".content__image-item");
  const captionToChange = document.querySelector(".content__image-copyright");
  switch (page.getValue("image")) {
    case "bombardier":
      imgOnPageToChange.setAttribute("src", photos.bombardier.imageUrl);
      imgOnPageToChange.setAttribute("alt", photos.bombardier.photoName);
      captionToChange.innerHTML = createCredit(photos.bombardier);
      break;
    case "hobbit":
      imgOnPageToChange.setAttribute("src", photos.hobbit.imageUrl);
      imgOnPageToChange.setAttribute("alt", photos.hobbit.photoName);
      captionToChange.innerHTML =
        "Dragon just landed in Los Angeles. " + createCredit(photos.hobbit);
      break;
    case "tiger":
      imgOnPageToChange.setAttribute("src", photos.tiger.imageUrl);
      imgOnPageToChange.setAttribute("alt", photos.tiger.photoName);
      captionToChange.innerHTML =
        "Amur Tiger Boeing 747 over the Vnukovo international airport. " +
        createCredit(photos.tiger);
      break;
    case "connected":
      imgOnPageToChange.setAttribute("src", photos.connected.imageUrl);
      imgOnPageToChange.setAttribute("alt", photos.connected.photoName);
      captionToChange.innerHTML =
        "At the Westchester, NY airport. " + createCredit(photos.connected);
      break;
    default:
      imgOnPageToChange.setAttribute("src", photos.bombardier.imageUrl);
      imgOnPageToChange.setAttribute("alt", photos.bombardier.photoName);
      captionToChange.innerHTML = createCredit(photos.bombardier);
  }
  if (page.getValue("number-of-columns") === "one-column") {
    page.changeStyle(".content__text", "column-count", "1");
  }
  if (page.getValue("number-of-columns") === "two-columns") {
    page.changeStyle(".content__text", "column-count", "2");
  }

  page.changeStyle(".content", "color", page.getValue("text-color"));

  document
    .querySelectorAll(".content__link")
    .forEach((item) => (item.style.color = page.getValue("text-color")));

  page.changeStyle(
    ".content__text",
    "width",
    page.getValue("content-width") + "%"
  );

  if (document.querySelector("#black-background").checked) {
    page.changeStyle(".page", "background-color", "black");
  } else {
    page.changeStyle(".page", "background-color", "white");
  }

  if (document.querySelector("#bold-heading").checked) {
    page.changeStyle(".content__heading", "font-weight", "bold");
  } else {
    page.changeStyle(".content__heading", "font-weight", "normal");
  }
});

document.querySelector(".form__toggle").onclick = () => {
  document.querySelector(".form").classList.toggle("form_is-closed");
};
