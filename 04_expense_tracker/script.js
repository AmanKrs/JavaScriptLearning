document.addEventListener("DOMContentLoaded", () => {
  const formValue = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmntInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalExpDiv = document.getElementById("total");
  const totalAmnt = document.getElementById("total-amount");

  let expenseArr = JSON.parse(localStorage.getItem("expense")) || [];

  renderExpense();

  formValue.addEventListener("submit", (e) => {
    e.preventDefault();
    const expnsName = expenseNameInput.value.trim();
    const expnsAmnt = parseFloat(expenseAmntInput.value);
    if (expnsName !== "" && !isNaN(expnsAmnt) && expnsAmnt > 0) {
      const expense = {
        id: Date.now(),
        name: expnsName,
        amount: expnsAmnt,
      };
      expenseArr.push(expense);
      renderExpense();
      saveToLocal();
    }
    //clearing Input
    expenseNameInput.value = "";
    expenseAmntInput.value = "";
  });

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const deleteExpns = parseInt(e.target.getAttribute("data-id"));

      expenseArr = expenseArr.filter((elem) => elem.id !== deleteExpns);
      saveToLocal();
      renderExpense();
      showTotalExpense();
    }
  });

  function renderExpense() {
    expenseList.innerHTML = "";
    expenseArr.forEach((expense) => {
      const expenseValue = document.createElement("li");

      expenseValue.innerHTML = `
    <span>${expense.name} - $${expense.amount}</span>
    <button data-id=${expense.id}>Delete</button>
    `;
      showTotalExpense();
      expenseList.appendChild(expenseValue);
    });
  }
  function showTotalExpense() {
    const totalExpense = calculateExpense();
    console.log(totalExpense);
    totalAmnt.textContent = totalExpense.toFixed(2);
  }

  function calculateExpense() {
    const totalExpns = expenseArr.reduce((acc, curr) => {
      acc += curr.amount;
      return acc;
    }, 0);
    return totalExpns;
  }

  function saveToLocal() {
    localStorage.setItem("expense", JSON.stringify(expenseArr));
  }
});
