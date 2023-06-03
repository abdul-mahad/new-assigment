let monthlyBudget = 0;
let expenses = [];
const budgetForm = document.getElementById("budgetForm");
const expenseForm = document.getElementById("expenseForm");
const expenseTableBody = document.querySelector("#expenseTable tbody");
const remainingBudgetSpan = document.getElementById("remainingBudget");
function addBudget(event) {
  event.preventDefault();
  const budgetInput = document.getElementById("budgetInput");
  if (budgetInput.value.trim() === "") {
    alert("Please enter a valid monthly budget.");
    return;
  }
  monthlyBudget = parseFloat(budgetInput.value);
  budgetInput.value = "";
  updateRemainingBudget();
}
function addExpense(event) {
  event.preventDefault();
  const expenseDescription = document
    .getElementById("expenseDescription")
    .value.trim();
  const expenseAmount = parseFloat(
    document.getElementById("expenseAmount").value
  );
  const expenseDate = document.getElementById("expenseDate").value;
  if (expenseDescription === "" || isNaN(expenseAmount) || expenseDate === "") {
    alert("Please enter valid expense details.");
    return;
  }
  const expense = {
    description: expenseDescription,
    amount: expenseAmount,
    date: expenseDate,
  };
  expenses.push(expense);
  document.getElementById("expenseDescription").value = "";
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseDate").value = "";
  updateExpenseTable();
  updateRemainingBudget();
}
function updateExpenseTable() {
  expenseTableBody.innerHTML = "";
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const row = document.createElement("tr");
    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = expense.description;
    const amountCell = document.createElement("td");
    amountCell.textContent = expense.amount;
    const dateCell = document.createElement("td");
    dateCell.textContent = expense.date;

    row.appendChild(descriptionCell);
    row.appendChild(amountCell);
    row.appendChild(dateCell);

    expenseTableBody.appendChild(row);
  }
}
function updateRemainingBudget() {
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const remainingBudget = monthlyBudget - totalExpenses;
  remainingBudgetSpan.textContent = remainingBudget.toFixed(2);
}
budgetForm.addEventListener("submit", addBudget);
expenseForm.addEventListener("submit", addExpense);
