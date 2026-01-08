const ItemList = document.getElementById("items-list");
const EmptyList = document.getElementById("empty-list");
const ItemCount = document.getElementById("item-count");
const ListSort = document.getElementById("list-sort");
let ascendingOrder = false;

// ItemList.style.display = "none";
// ItemCount.style.display = "none";

let itemsListArr = [];
RefreshList();

function addArticle() {
  let product = prompt("Quel produit voulez-vous ajouter ?");
  product = product.trim();

  switch (true) {
    case product === "":
      alert("Vous devez saisir un produit à ajouter");
      return false;
    case itemsListArr.includes(product):
      alert("Ce produit est déja dans la liste");
      return false;
    default:
      itemsListArr = [product, ...itemsListArr];
  }

  RefreshList();
}

function RefreshList() {
  console.log();
  ItemList.innerHTML = "";

  for (let elem of itemsListArr) {
    let item = document.createElement("li");
    item.classList.add("list-item");

    const p = document.createElement("p");
    p.textContent = elem;

    const button = document.createElement("button");
    button.classList.add("action-button");
    button.textContent = "➖";
    button.addEventListener("click", () => {
      if (window.confirm(`Supprimer ${elem} de la liste ?`)) {
        let index = itemsListArr.indexOf(elem);
        itemsListArr.splice(index, 1);
        RefreshList();
      }
    });

    item.append(p, button);
    ItemList.appendChild(item);
  }

  ItemCount.textContent = `Il y a ${itemsListArr.length} articles dans ma liste`;

  // Afficher ou masquer la liste et / ou le texte si la liste est vide.
  ItemList.style.display = itemsListArr.length > 0 ? "flex" : "none";
  EmptyList.style.display = itemsListArr.length > 0 ? "none" : "block";
  ItemCount.style.display = itemsListArr.length === 0 ? "none" : "block";
  ListSort.style.display = itemsListArr.length === 0 ? "none" : "block";
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

function SortList() {
  itemsListArr.sort();
  if (ascendingOrder) {
    itemsListArr.reverse();
  }
  ascendingOrder = !ascendingOrder;
  RefreshList();
}

const BtnAdd = document.getElementById("btnAdd");
const BtnRemove = document.getElementById("btnRemove");
const BtnReset = document.getElementById("btnReset");

BtnAdd.addEventListener("click", addArticle);
BtnReset.addEventListener("click", resetList);
ListSort.addEventListener("click", SortList);
