document.addEventListener("DOMContentLoaded", () => {
  const formValue = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmntInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalExpDiv = document.getElementById("total");
  const totalAmnt = document.getElementById("total-amount");

  let expenseTotalArr = [];
  formValue.addEventListener("submit", (e) => {
    e.preventDefault();
    const expnsName = expenseNameInput.value.trim();
    const expnsAmnt = expenseAmntInput.value.trim();
    expenseTotalArr.push(parseInt(expnsAmnt));
    console.log("formvalue  ", expnsName, expnsAmnt);
    const expenseValue = document.createElement("li");
   
    expenseValue.innerHTML = `
    <span>${expnsName} - $${expnsAmnt}</span>
    <button data-id=${expnsAmnt}>Delete</button>
    `;
    showTotalExpense();
    expenseList.appendChild(expenseValue);
  });

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const deleteExpnsValue = parseInt(e.target.getAttribute("data-id"));
      console.log(deleteExpnsValue);
      expenseTotalArr = expenseTotalArr.filter(
        (elem) => elem !== deleteExpnsValue
      );

      showTotalExpense();
    }
  });

  function showTotalExpense() {
    const totalExpense = calculateExpense();
    console.log(totalExpense);
    totalAmnt.textContent = totalExpense;
  }

  function calculateExpense() {
    const totalExpns = expenseTotalArr.reduce((acc, curr) => {
      acc += curr;
      return acc;
    }, 0);
    return totalExpns;
  }

  function deleteExpense(params) {}
});
