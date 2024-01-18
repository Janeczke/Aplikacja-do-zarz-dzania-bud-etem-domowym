"use strict";

const errorMesgEl = document.querySelector(".error_message");
const budgetInputEl = document.querySelector(".budget_input");
const expenseDesEl = document.querySelector(".expensess_input");
const expenseAmountEl = document.querySelector(".expensess_amount");
const tblRecordEl = document.querySelector(".tbl_data");
const cardsContainer = document.querySelector(".cards");

// cards content
const budgetCardEl = document.querySelector(".budget_card");
const expensesCardEl = document.querySelector(".expenses_card");
const balanceCardEl = document.querySelector(".balance_card");

let itemList = [];
let itemId = 0;

// button events
function btnEvents() {
  const btnBudgetCal = document.querySelector("#btn_budget");
  const btnExpensesCal = document.querySelector("#btn_expenses");

  //budget event
  btnBudgetCal.addEventListener("click", (e) => {
    e.preventDefault();
    budgetFun();
  });

  btnExpensesCal.addEventListener("click", (e) => {
    e.preventDefault();
    expensesFun();
  });
}

// calling btns event
document.addEventListener("DOMContentLoaded", btnEvents);

// expenses function
function expensesFun() {
  let expensesDescValue = expenseDesEl.value;
  let expenseAmountValue = expenseAmountEl.value;

  if (
    expensesDescValue === "" ||
    expenseAmountValue === "" ||
    budgetInputEl < 0
  ) {
    errorMessage("Proszę wprowadzić opis oraz wartość wydatków");
  } else {
    let amount = parseInt(expenseAmountValue);

    expenseAmountEl.value = "";
    expenseDesEl.value = "";

    //store value inside the object
    let expenses = {
      id: itemId,
      title: expensesDescValue,
      amount: amount,
    };
    itemId++;
    itemList.push(expenses);

    //add expenses inside the html page
    addExpenses(expenses);
    showBalance();
  }
}

//add expenses
function addExpenses(expensesPara) {
  const html = `<ul class="tbl_tr_content">
                        <li data-id=${expensesPara.id}>${expensesPara.id}</li>
                        <li>${expensesPara.title}</li>
                        <li><span>zł</span>${expensesPara.amount}</li>
                        <li>
                            <button type="button" class="btn_delete">Delete</button>
                        </li>
                    </ul>`;

  tblRecordEl.insertAdjacentHTML("beforeend", html);

  //edit button
  const btnEdit = document.querySelectorAll(".btn_edit");
  const btnDel = document.querySelectorAll(".btn_delete");
  const content_id = document.querySelectorAll(".tbl_tr_content");

  //button delete
  btnDel.forEach((btnDel) => {
    btnDel.addEventListener("click", (el) => {
      let id;

      content_id.forEach((ids) => {
        id = ids.firstElementChild.dataset.id;
      });

      let element = el.target.parentElement.parentElement;
      element.remove();

      let temp_list = itemList.filter(function (item) {
        return item.id != id;
      });

      itemList = temp_list;
      showBalance();
    });
  });
}

// budget functions
function budgetFun() {
  const budgetValue = budgetInputEl.value;

  if (budgetValue === "" || budgetValue < 0) {
    errorMessage("Prosze podać twój budżet. Należy podać więcej niż 0");
  } else {
    budgetCardEl.textContent = budgetValue;
    budgetInputEl.value = "";
    showBalance();
  }
}

// show balance
function showBalance() {
  const expenses = totalExpenses();
  const total = parseInt(budgetCardEl.textContent) - expenses;
  balanceCardEl.textContent = total;
}

// total expenses
function totalExpenses() {
  let total = 0;

  if (itemList.length > 0) {
    total = itemList.reduce(function (acc, curr) {
      acc += curr.amount;
      return acc;
    }, 0);
  }

  expensesCardEl.textContent = total;
  return total;
}

// error message function
function errorMessage(message) {
  errorMesgEl.innerHTML = `<p>${message}</p>`;
  errorMesgEl.classList.add("error");
  setTimeout(() => {
    errorMesgEl.classList.remove("error");
  }, 2500);
}

// KOD ODPOWIEDZIALNY ZA CELE OSZCZĘDNOŚCIOWE

window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;

    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly");

    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerText = "Edytuj";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerText = "Usuń";

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    list_el.appendChild(task_el);

    input.value = "";

    task_edit_el.addEventListener("click", () => {
      if (task_edit_el.innerText.toLowerCase() == "edytuj") {
        task_edit_el.innerText = "Zapisz";
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
      } else {
        task_edit_el.innerText = "Edytuj";
        task_input_el.setAttribute("readonly", "readonly");
      }
    });

    task_delete_el.addEventListener("click", (e) => {
      list_el.removeChild(task_el);
    });
  });
});

// KOD ODPOWIEDZIALNY ZA FORMULARZ LOGOWANIA

$(document).ready(function () {
  $(".cta").click(function () {
    toggleAdditionalContent();
  });

  $("#close-btn").click(function () {
    toggleAdditionalContent();
  });

  function toggleAdditionalContent() {
    const additionalContent = $("#additional-content");
    const rightValue = additionalContent.css("right");

    if (rightValue === "0px") {
      additionalContent.css("right", "-300px");
    } else {
      additionalContent.css("right", "0");
    }
  }
});

$(document).ready(function () {
  $("#loginBtn").click(function () {
    $(".loginDrawer").toggleClass("open");
  });

  $("#submitLogin").click(function () {
    // Tutaj dodaj logikę logowania
    alert("Login clicked!");
  });
});

$(document).ready(function () {
  // Obsługa kliknięcia przycisku rejestracji
  $("#registerBtn").click(function () {
    // Tutaj możesz dodać kod do obsługi rejestracji, np. używając Ajax
    // W tym przykładzie używam prostego komunikatu alert
    alert("Rejestracja kliknięta!");
  });

  // Obsługa formularza rejestracji
  $("#registerForm").submit(function (event) {
    event.preventDefault(); // Zatrzymaj domyślną akcję wysyłania formularza

    // Tutaj możesz dodać kod obsługi rejestracji, np. z użyciem Ajax
    alert("Rejestracja wysłana!");
  });
});

// KOD ODPOWIEDZIALNY ZA RODZINA.HTML

let familyMembers = [];
let totalCost = 0;

function addFamilyMember() {
  const nameInput = document.getElementById("familyMemberName");
  const name = nameInput.value.trim();

  if (name) {
    const memberId = familyMembers.length; // nowy identyfikator dla rodziny
    familyMembers.push({ id: memberId, name, expenses: [] });
    updateFamilyMembersList();
    nameInput.value = "";
  }
}

function addExpense(familyMemberIndex) {
  const expenseInput = document.getElementById(
    `expenseInput_${familyMemberIndex}`
  );
  const expense = parseFloat(expenseInput.value);

  if (!isNaN(expense)) {
    familyMembers[familyMemberIndex].expenses.push(expense);
    updateExpensesList(familyMemberIndex);
    expenseInput.value = "";
  }
}

function calculateTotalCost() {
  totalCost = familyMembers.reduce((acc, member) => {
    const memberCost = member.expenses.reduce(
      (sum, expense) => sum + expense,
      0
    );
    return acc + memberCost;
  }, 0);

  const totalCostElement = document.getElementById("totalCost");
  totalCostElement.textContent = `Całkowity koszt: ${totalCost.toFixed(2)} zł`;
}

function updateFamilyMembersList() {
  const familyMembersList = document.getElementById("familyMembersList");
  familyMembersList.innerHTML = "";

  familyMembers.forEach((member, index) => {
    const memberContainer = document.createElement("div");
    memberContainer.classList.add("family-member");
    memberContainer.textContent = member.name;

    const expenseInput = document.createElement("input");
    expenseInput.type = "number";
    expenseInput.placeholder = "Dodaj koszt";
    expenseInput.id = `expenseInput_${index}`;

    const addExpenseButton = document.createElement("button");
    addExpenseButton.textContent = "Dodaj koszt";
    addExpenseButton.addEventListener("click", () => addExpense(index));

    memberContainer.appendChild(expenseInput);
    memberContainer.appendChild(addExpenseButton);

    // Tworzenie nowego diva dla każdego członka rodziny
    const expensesList = document.createElement("div");
    expensesList.id = `expensesList_${index}`;
    memberContainer.appendChild(expensesList);

    familyMembersList.appendChild(memberContainer);
  });
}

function updateExpensesList(familyMemberIndex) {
  const expensesList = document.getElementById(
    `expensesList_${familyMemberIndex}`
  );
  expensesList.innerHTML = "";

  const member = familyMembers[familyMemberIndex];

  const memberContainer = document.createElement("div");
  memberContainer.classList.add("expense");
  memberContainer.textContent = member.name;

  member.expenses.forEach((expense, index) => {
    const expenseItem = document.createElement("div");
    expenseItem.textContent = `Koszt ${index + 1}: ${expense.toFixed(2)} zł`;
    memberContainer.appendChild(expenseItem);
  });

  expensesList.appendChild(memberContainer);
}

// KOD ODPOWIEDZIALNY ZA LISTA.HTML

document.addEventListener("DOMContentLoaded", function () {
  const inputElement = document.querySelector(".submission-line__input");
  const addButton = document.querySelector(".submission-line__btn");
  const listElement = document.querySelector(".list");

  addButton.addEventListener("click", function () {
    addItem();
  });

  inputElement.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addItem();
    }
  });

  listElement.addEventListener("click", function (e) {
    const target = e.target;

    if (target.classList.contains("list__delete-btn")) {
      deleteItem(target.parentElement);
    } else if (target.classList.contains("list__check-btn")) {
      toggleItem(target.parentElement);
    }
  });

  function addItem() {
    const inputValue = inputElement.value.trim();

    if (inputValue !== "") {
      const listItem = document.createElement("li");
      listItem.classList.add("list__item");
      listItem.innerHTML = `<a class="list__delete-btn">X</a>${inputValue}<a class="list__check-btn">✔</a>`;
      listElement.appendChild(listItem);

      inputElement.value = "";
    }
  }

  function deleteItem(item) {
    listElement.removeChild(item);
  }

  function toggleItem(item) {
    item.classList.toggle("list__item--checked");
  }
});
