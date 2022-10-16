var page_title = document.getElementById("title").innerHTML;
var logged_in = JSON.parse(localStorage.getItem("logged_in"));
var c_container = document.getElementById("container");
var card_index = 0;
user_logged_in = logged_in[0].user_email;

window.addEventListener("load", () => {
  var savedCardsArray =
    JSON.parse(
      localStorage.getItem(user_logged_in + " " + page_title + " cardStorage")
    ) || [];
  var savedCardText =
    JSON.parse(
      localStorage.getItem(user_logged_in + " " + page_title + " cardText")
    ) || [];
  var savedCardTag =
    JSON.parse(
      localStorage.getItem(user_logged_in + " " + page_title + " cardTag")
    ) || [];

  var loadedCardArray = [];
  if (savedCardsArray.length > 0) {
    for (var i = 0; i < savedCardsArray.length; i++) {
      var doc = new DOMParser().parseFromString(
        savedCardsArray[i],
        "text/html"
      );
      loadedCardArray.push(doc);
    }
  }
  var updated_card_storage = [];
  var updated_card_text = [];
  var updated_card_tag = [];
  for (var k = 0; k < savedCardsArray.length; k++) {
    loadedCardArray[k].body.firstChild.id = "card" + k;
    //textarea
    loadedCardArray[k].body.firstChild.children[0].id = "card_text" + k;
    //tagbox
    loadedCardArray[k].body.firstChild.children[1].id = "card_tag" + k;
    //cardnumber
    loadedCardArray[k].body.firstChild.children[2].innerHTML = "#" + (k + 1);
    //colorpicker
    loadedCardArray[k].body.firstChild.children[3].setAttribute(
      "list",
      "color_choices" + k
    );

    //checkbox
    loadedCardArray[k].body.firstChild.children[4].id = "card_checkbox" + k;

    loadedCardArray[k].getElementById("card_text" + k).value =
      savedCardText[k] || "";
    loadedCardArray[k].getElementById("card_tag" + k).value =
      savedCardTag[k] || "";

    savedCardsArray[k] = loadedCardArray[k].body.firstChild.outerHTML;

    updated_card_storage.push(loadedCardArray[k].body.firstChild.outerHTML);
    updated_card_text.push(
      loadedCardArray[k].getElementById("card_text" + k).value
    );
    updated_card_tag.push(
      loadedCardArray[k].getElementById("card_tag" + k).value
    );
    console.log(loadedCardArray[k].body.firstChild);
  }
  var card_container = document.getElementById("container");
  var controller = document.getElementById("controller");

  for (var j = 0; j < loadedCardArray.length; j++) {
    console.log(doc.body.children.length);
    loadedCardArray[j].body.firstChild.style.visibility = "visible";
    card_container.insertBefore(loadedCardArray[j].body.firstChild, controller);
  }

  if (loadedCardArray.length > 0) {
    card_index = loadedCardArray.length;
  } else {
    card_index = 0;
  }

  localStorage.setItem(
    user_logged_in + " " + page_title + " cardStorage",
    JSON.stringify(updated_card_storage)
  );
  localStorage.setItem(
    user_logged_in + " " + page_title + " cardText",
    JSON.stringify(updated_card_text)
  );
  localStorage.setItem(
    user_logged_in + " " + page_title + " cardTag",
    JSON.stringify(updated_card_tag)
  );
});

var color_list = [
  "#FF0000",
  "#FFE400",
  "#32FF00",
  "#00FFB2",
  "#0049FF",
  "#9B00FF",
  "#FF00D4",
  "#FF0070",
  "#735e3b",
  "#000000",
  "#6C7176",
  "#0d075b",
];

function changeColor(el) {
  el.parentNode.style.backgroundColor = el.value;
}

function addFlashCard() {
  var card_div = document.createElement("div");

  var flashcard_text = document.createElement("textarea");
  flashcard_text.id = "card_text" + card_index;
  flashcard_text.classList.add("card_text");
  flashcard_text.name = "card_text";
  flashcard_text.placeholder = "Type your question";

  var flashcard_tag = document.createElement("input");
  flashcard_tag.id = "card_tag" + card_index;
  flashcard_tag.name = "card_tag";
  flashcard_tag.type = "text";
  flashcard_tag.classList.add("card_tag_box");
  flashcard_tag.placeholder = "#Tags";

  var color_choices = document.createElement("datalist");
  color_choices.id = "color_choices" + card_index;

  for (var j = 0; j < color_list.length; j++) {
    var option = document.createElement("option");
    option.value = color_list[j];
    color_choices.appendChild(option);
  }

  var flash_card_color = document.createElement("input");
  flash_card_color.classList.add("color_picker");
  flash_card_color.type = "color";
  flash_card_color.name = "color_picker";
  flash_card_color.defaultValue = "#FF0000";
  flash_card_color.setAttribute("list", "color_choices" + card_index);
  flash_card_color.setAttribute("onchange", "changeColor(this)");
  flash_card_color.appendChild(color_choices);

  var flash_card_check = document.createElement("input");
  flash_card_check.type = "checkbox";
  flash_card_check.name = "card_checkbox";
  flash_card_check.id = "card_checkbox" + card_index;
  flash_card_check.classList.add("card_checkbox");

  var flash_card_number = document.createElement("h2");
  flash_card_number.innerHTML = "#" + (card_index + 1);

  var card_container = document.getElementById("container");
  var controller = document.getElementById("controller");

  card_div.id = "card" + card_index;
  card_div.classList.add("flash_card");
  card_div.appendChild(flashcard_text);
  card_div.appendChild(flashcard_tag);
  card_div.appendChild(flash_card_number);
  card_div.appendChild(flash_card_color);
  card_div.appendChild(flash_card_check);

  console.log("card div");
  console.log(card_div);

  card_container.insertBefore(card_div, controller);

  card_index++;
}

function saveCards() {
  allCards = document.getElementsByClassName("flash_card");
  let card_storage =
    JSON.parse(
      localStorage.getItem(user_logged_in + " " + page_title + " cardStorage")
    ) || [];
  let card_storage_text =
    JSON.parse(
      localStorage.getItem(user_logged_in + " " + page_title + " cardText")
    ) || [];
  let card_storage_tag =
    JSON.parse(
      localStorage.getItem(user_logged_in + " " + page_title + " cardTag")
    ) || [];
  for (let j = 0; j < allCards.length; j++) {
    var complete_card = allCards[j].outerHTML;
    var complete_card_text = document.getElementById("card_text" + j).value;
    var complete_card_tag = document.getElementById("card_tag" + j).value;

    var cardAlreadySaved = false;
    console.log(complete_card_text);
    console.log(card_storage_text);

    if (card_storage.length > 0) {
      for (let k = 0; k < card_storage.length; k++) {
        if (
          card_storage[k] === complete_card &&
          card_storage_text[k] === complete_card_text &&
          card_storage_tag[k] === complete_card_tag
        ) {
          cardAlreadySaved = true;
          break;
        } else if (
          complete_card.includes('div id="card' + [k]) &&
          card_storage[k].includes('div id="card' + [k])
        ) {
          cardAlreadySaved = true;
          card_storage[k] = complete_card;
          card_storage_text[k] = complete_card_text;
          card_storage_tag[k] = complete_card_tag;

          console.log(card_storage_text[k]);

          localStorage.setItem(
            user_logged_in + " " + page_title + " cardStorage",
            JSON.stringify(card_storage[k])
          );
          localStorage.setItem(
            user_logged_in + " " + page_title + " cardText",
            card_storage_text[k]
          );
          localStorage.setItem(
            user_logged_in + " " + page_title + " cardTag",
            card_storage_tag[k]
          );
          break;
        } else {
          cardAlreadySaved = false;
        }
      }
    }
    if (!cardAlreadySaved) {
      card_storage.push(complete_card);
      card_storage_text.push(complete_card_text);
      card_storage_tag.push(complete_card_tag);
    }
  }
  localStorage.setItem(
    user_logged_in + " " + page_title + " cardStorage",
    JSON.stringify(card_storage)
  );
  localStorage.setItem(
    user_logged_in + " " + page_title + " cardText",
    JSON.stringify(card_storage_text)
  );
  localStorage.setItem(
    user_logged_in + " " + page_title + " cardTag",
    JSON.stringify(card_storage_tag)
  );
}

function deleteCards() {
  var allCards = document.getElementsByClassName("flash_card");
  let card_storage = JSON.parse(
    localStorage.getItem(user_logged_in + " " + page_title + " cardStorage")
  );
  let card_storage_text = JSON.parse(
    localStorage.getItem(user_logged_in + " " + page_title + " cardText")
  );
  let card_storage_tag = JSON.parse(
    localStorage.getItem(user_logged_in + " " + page_title + " cardTag")
  );

  for (var j = 0; j < allCards.length; j++) {
    var cardCheckbox = document.getElementById("card_checkbox" + j);
    if (cardCheckbox.checked == true) {
      card_storage.splice(j, 1);
      card_storage_text.splice(j, 1);
      card_storage_tag.splice(j, 1);
    }
  }

  var confirm_text = "Are you sure you want to delete?";
  if (confirm(confirm_text)) {
    localStorage.setItem(
      user_logged_in + " " + page_title + " cardStorage",
      JSON.stringify(card_storage)
    );
    localStorage.setItem(
      user_logged_in + " " + page_title + " cardText",
      JSON.stringify(card_storage_text)
    );
    localStorage.setItem(
      user_logged_in + " " + page_title + " cardTag",
      JSON.stringify(card_storage_tag)
    );
  }
}

function searchTags() {
  var search_input = document.getElementById("card_search").value;
  var allCards = document.getElementsByClassName("flash_card");
  if (search_input == "") {
    for (var j = 0; j < allCards.length; j++) {
      allCards[j].style.filter = "none";
    }
  } else {
    for (var k = 0; k < allCards.length; k++) {
      var check_card_tag = document.getElementById("card_tag" + k).value;
      if (search_input !== check_card_tag) {
        allCards[k].style.filter = "brightness(40%)";
      }
    }
  }
}
