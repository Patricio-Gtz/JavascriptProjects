const currencyElementOne = document.getElementById('currency-one');
const currencyElementTwo = document.getElementById('currency-two');
const amountElementOne = document.getElementById('amount-one');
const amountElementTwo = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fecth exchange rates and update DOM
const calculate = async () => {
  const currencyOne = currencyElementOne.value;
  const currencyTwo = currencyElementTwo.value;
  const response = await fetch(
    `https://api.exchangeratesapi.io/latest?base=${currencyOne}`
  );
  const data = await response.json();
  const rate = data.rates[currencyTwo];

  rateEl.innerText = `1 ${currencyOne} =  ${rate} ${currencyTwo}`;

  amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
};

// Evente listeners
currencyElementOne.addEventListener('change', calculate);
amountElementOne.addEventListener('input', calculate);
currencyElementTwo.addEventListener('change', calculate);
amountElementTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyElementOne.value;
  currencyElementOne.value = currencyElementTwo.value;
  currencyElementTwo.value = temp;
  calculate();
});

calculate();
