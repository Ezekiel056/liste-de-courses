// DÉFINITION DES CLASSES
class Article {
  constructor(name, checked = false) {
    this.name = name;
    this.checked = checked;
  }

  toString() {
    return this.name;
  }
}

// DECLARATION DES VARIABLES & CONSTANTES
const ItemList = document.getElementById("items-list");
const EmptyList = document.getElementById("empty-list");
const ItemCount = document.getElementById("item-count");
const ListSort = document.getElementById("list-sort");

const BtnAdd = document.getElementById("btnAdd");
const BtnRemove = document.getElementById("btnRemove");
const BtnReset = document.getElementById("btnReset");
const btnDeleteSelection = document.getElementById("btnDeleteSelection");

let ascendingOrder = false;
let itemsListArr = [
  new Article("Tomate"),
  new Article("Beurre"),
  new Article("Fromage"),
  new Article("Lait"),
  new Article("Pain"),
];

// EVENTS LISTENERS
BtnAdd.addEventListener("click", addArticle);
BtnReset.addEventListener("click", resetList);
ListSort.addEventListener("click", sortList);
btnDeleteSelection.addEventListener("click", deleteSelection);

// DEBUT DU SCRIPT
RefreshList();

// FONCTIONS & METHODES
function addArticle() {
  let product = prompt("Quel produit voulez-vous ajouter ?");
  product = product.trim();

  switch (true) {
    case product === "":
      alert("Vous devez saisir un produit à ajouter");
      return false;
    case itemsListArr.find((item) => item.name === product):
      alert("Ce produit est déja dans la liste");
      return false;
    default:
      let article = new Article(product);
      itemsListArr = [article, ...itemsListArr];
  }

  RefreshList();
}

function RefreshList() {
  console.log();
  ItemList.innerHTML = "";
  let showDeleteCheked = false;

  for (const [index, elem] of itemsListArr.entries()) {
    let item = document.createElement("li");
    item.classList.add("list-item");

    const checkbox = document.createElement("input");
    checkbox.addEventListener("change", () => {
      itemsListArr[index].checked = !elem.checked;
      RefreshList();
    });
    checkbox.type = "checkbox";
    checkbox.checked = itemsListArr[index].checked;

    const p = document.createElement("p");
    p.textContent = elem.name;

    const button = document.createElement("button");
    button.title = "Supprimer l'article";
    button.classList.add("action-button");
    button.textContent = "➖";
    button.addEventListener("click", () => {
      if (window.confirm(`Supprimer ${elem.name} de la liste ?`)) {
        itemsListArr.splice(index, 1);
        RefreshList();
      }
    });

    item.append(checkbox, p, button);
    ItemList.appendChild(item);

    if (elem.checked) {
      showDeleteCheked = true;
    }
  }

  ItemCount.textContent = `Il y a ${itemsListArr.length} articles dans ma liste`;

  if (itemsListArr.length > 0) {
    ItemList.style.display = "flex";
    EmptyList.style.display = "none";
    ItemCount.style.display = "block";
    ListSort.style.display = "block";
  } else {
    ItemList.style.display = "none";
    EmptyList.style.display = "block";
    ItemCount.style.display = "none";
    ListSort.style.display = "none";
  }

  btnDeleteSelection.style.display = showDeleteCheked ? "block" : "none";
}

function resetList() {
  if (
    itemsListArr.length > 0 &&
    window.confirm(`Vider entièrement la liste ?`)
  ) {
    itemsListArr = [];
    RefreshList();
  }
}

function sortList() {
  itemsListArr.sort();
  if (ascendingOrder) {
    itemsListArr.reverse();
  }
  ascendingOrder = !ascendingOrder;
  RefreshList();
}

function deleteSelection() {
  if (window.confirm("Supprimer la sélection ?")) {
    itemsListArr = itemsListArr.filter((elem) => elem.checked === false);
    RefreshList();
  }
}
