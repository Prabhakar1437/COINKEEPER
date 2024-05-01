
let transactions = [];
let balance = 0;

const balanceAmount = document.getElementById('balance-amount');
const transactionList = document.getElementById('transaction-list');
const transactionForm = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description-input');
const amountInput = document.getElementById('amount-input');
const typeSelect = document.getElementById('type-select');

// Function to add a transaction
function addTransaction(e) {
  e.preventDefault();

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const type = typeSelect.value;

  if (description.trim() === '' || isNaN(amount)) {
    alert('Please enter a valid description and amount.');
    return;
  }

  const transaction = {
    id: Date.now(),
    description,
    amount,
    type
  };

  transactions.push(transaction);
  updateBalance();
  updateTransactionList();
  resetForm();
}

// Function to delete a transaction
function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateBalance();
  updateTransactionList();
}

const balanceIcon = document.getElementById('balance-icon');
const body = document.body;

function updateBalance() {
  balance = transactions.reduce((total, transaction) => {
    return transaction.type === 'income' ? total + transaction.amount : total - transaction.amount;
  }, 0);

  balanceAmount.textContent = balance.toFixed(2);

  // Update the balance icon based on the balance value
  if (balance > 0) {
    balanceIcon.className = 'fas fa-arrow-up fa-bounce';
    balanceIcon.style.setProperty('--fa-primary-color', '#42ec36');
    balanceIcon.style.setProperty('--fa-secondary-color', '#ace7ac');
    body.classList.remove('default-balance', 'negative-balance');
    body.classList.add('positive-balance');
  } else if (balance < 0) {
    balanceIcon.className = 'fas fa-arrow-down fa-bounce';
    balanceIcon.style.setProperty('--fa-primary-color', '#ff0026');
    balanceIcon.style.setProperty('--fa-secondary-color', '#ff0026');
    body.classList.remove('default-balance', 'positive-balance');
    body.classList.add('negative-balance');
  } else {
    // No balance, remove the icon
    balanceIcon.className = '';
    balanceIcon.style.removeProperty('--fa-primary-color');
    balanceIcon.style.removeProperty('--fa-secondary-color');
    body.classList.remove('positive-balance', 'negative-balance');
    body.classList.add('default-balance');
  }
}

// Call the updateBalance function initially to set the initial background image
updateBalance();


// Function to update the transaction list

function updateTransactionList() {
  transactionList.innerHTML = '';

  transactions.forEach(transaction => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${transaction.description}</span>
      <span>: ${transaction.type === 'income' ? '+' : '-'}₹${transaction.amount.toFixed(2)}</span>
      <button class="delete-button" onclick="deleteTransaction(${transaction.id})">Delete</button>
    `;

    transactionList.appendChild(listItem);
  });
}

// Function to reset the form
function resetForm() {
  descriptionInput.value = '';
  amountInput.value = '';
  typeSelect.value = 'income';
}

// Event listener for form submission
transactionForm.addEventListener('submit', addTransaction);

//typewriter effect
document.addEventListener('DOMContentLoaded', function () {
  let title = document.querySelector('.typewriter');
  let names = "Small savings today can lead to big financial achievements tomorrow!!";
  let index = 1;

  const typeWriter = () => {
    let new_title = names.slice(0, index);
    title.innerText = new_title;
    index >= names.length ? (index = 1) : index++;
    setTimeout(typeWriter, 80);
  };

  typeWriter();
});


