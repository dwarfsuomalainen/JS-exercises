/*
1. Fix the bugs in the codes below, to make the console print out different numbers
from 0 to 100
 */

const printNum = () => {
  for (let i = 0; i <= 100; i++) {
    setTimeout(() => console.log(i), 1000);
  }
};

printNum();

/*
2. Given the array below:
myArr = ['12-24-2014', '09-2022-23', '12-30-2021', '08-02-2021', '07-15-2018', '2019-12-14', '2022-14-12']
the array above has serveral dates, written in order month-day-year
Write the code inside function fixDate(array) below to transform the array to new
format dates day-month-year
expected result: ['24-12-2014', '23-09-2022', '30-12-2021', '08-02-2021', '15-07-2018', '14-12-2019', '14-12-2022'] .
You only need to produce the same array as expected result, no need to consider other
possibility.
 */

let myArr = [
  "12-24-2014",
  "09-2022-23",
  "12-30-2021",
  "08-02-2021",
  "07-15-2018",
  "2019-12-14",
  "2022-14-12",
];

const fixDate = (array) => {
  return array.map((date) => {
    const dateArr = date.split("-").sort((a, b) => {
      return a - b;
    });
    const datesArr = [dateArr[1], dateArr[0], dateArr[2]].join("-");
    return datesArr;
  });
};

let newArr = fixDate(myArr);
console.log(newArr);

/*
3. Counter function
Write a counter funtion to print out in console the time difference between 2 given date
Expected result in the console: 11 days - 13 hours - 38 minutes - 20 seconds
*/
const dateFrom = new Date(500000);
const dateTo = new Date(1000000000);
const counter = (from, to) => {
  let difference = dateTo.getTime() - dateFrom.getTime();
  let days = difference / (1000 * 3600 * 24);
  let mod = difference % (1000 * 3600 * 24);
  let hours = mod / (1000 * 3600);
  let mod1 = mod % (1000 * 3600);
  let mins = mod1 / (1000 * 60);
  let mod2 = mod1 % (1000 * 60);
  let secs = mod2 / 1000;
  return `${Math.floor(days)} days - ${Math.floor(hours)} hours - ${Math.floor(
    mins
  )} minutes - ${Math.floor(secs)} seconds`;
};
const timer = counter();
console.log(timer);

/* 
4. Check the url and read documentation: https://restcountries.com
- Write a function to get all countries, sorted in alphabetical order
- Write a function to find one country based on the search input
The data fetched from url should be displayed in index.html.
*/

let url = "https://restcountries.com/v3.1/all";

async function getAllCountries(url) {
  const response = await fetch(url);
  let data = await response.json();
  console.log(data);
  let sorted = data.sort((a, b) => {
    return a.name.common.localeCompare(b.name.common);
  });
  let container = document.querySelector(".container");
  for (i = 0; i < sorted.length; i++) {
    let countryCard = document.createElement("div");

    countryCard.classList.add("countrycard");
    container.appendChild(countryCard);
    let countryName = document.createElement("h3");
    countryCard.appendChild(countryName);
    countryName.innerHTML = sorted[i].name.common;
    let countryCapital = document.createElement("h3");
    countryCard.appendChild(countryCapital);
    countryCapital.innerHTML = "capital: " + sorted[i].capital;
    let countryPopulation = document.createElement("h3");
    countryCard.appendChild(countryPopulation);
    countryPopulation.innerHTML = "population: " + sorted[i].population;
    let countryRegion = document.createElement("h4");
    countryCard.appendChild(countryRegion);
    countryRegion.innerHTML = "region: " + sorted[i].region;
    let countryFlag = document.createElement("div");
    countryCard.appendChild(countryFlag);
    countryFlag.innerHTML =
      "<img src=" + sorted[i].flags.svg + " width='100px' height='50px'/>";
  }
}

const getSingleCountry = async () => {
  const input = document.getElementById("search_input");
  const text = input.value;
  console.log(text);
  const jsondata = await fetch(`https://restcountries.com/v3.1/name/${text}`);
  const data = await jsondata.json();
  if (data.message) {
    console.log(data);
  } else {
    let output = document.createElement("div");
    output.classList.add("output");
    let display = document.querySelector(".display");
    display.appendChild(output);
    let countryName = document.createElement("h3");
    output.appendChild(countryName);
    countryName.innerHTML = data[0].name.common;
    let countryCapital = document.createElement("h3");
    output.appendChild(countryCapital);
    countryCapital.innerHTML = "capital: " + data[0].capital;
    let countryPopulation = document.createElement("h3");
    output.appendChild(countryPopulation);
    countryPopulation.innerHTML = "population: " + data[0].population;
    let countryRegion = document.createElement("h4");
    output.appendChild(countryRegion);
    countryRegion.innerHTML = "region: " + data[0].region;
    let countryFlag = document.createElement("div");
    output.appendChild(countryFlag);
    countryFlag.innerHTML =
      "<img src=" + data[0].flags.svg + " width='100px' height='50px'/>";
  }
};

getAllCountries(url);

/*
5. Provide logic for function generateNewFolderName, which receive an array as argument. Everytime the function gets called,
it should check for folder name. If the folder named 'New Folder' does not exist, it should add the name 'New Folder' to array.
If folder 'New Folder' exists, it should add 'New Folder (1)' to array. If 'New Folder (1)' exists, it should add 'New Folder (2)'
to array, and so on.
*/

const generateNewFolderName = (existingFolders) => {
  /*  provide your code here */
  if (existingFolders.length) {
    existingFolders.push(`New folder (${existingFolders.length})`);
  } else {
    existingFolders.push("New Folder");
  }
};

let folder = [];
generateNewFolderName(folder);
generateNewFolderName(folder);
generateNewFolderName(folder);
generateNewFolderName(folder);
console.log(folder); //expect to see ['New Folder', 'New Folder (1)', 'New Folder (2)', 'New Folder (3)']

/*
6. Complete class Book:
- class Book should have 3 properties: title (read-only, must be a string but cannot be empty), cost (private, must be positive number) and profit (private, positive number > 0 and =< 0.5)
(error should be thrown if data is not valid)
- give the logic to get book's price and profit separately.
- give the logics to increase and decrease the cost with a certain amount
- give the logic to calculate price based on cost and profit. For example: cost 14, profit 0.3 => expected price is 20.

Complete class TaxableBook:
- inherit Book, but have 1 more private parameter in the constructor: taxRate.
- give the logic to calculate price with taxRate. For example:
cost 14, profit 0.3 , tax 24% => expected price is 30.43*/

class Book {
  #title;
  #cost;
  #profit;
  constructor(title, cost, profit) {
    if (title || cost <= 0 || (profit > 0 && profit < 0.5)) {
      this.#profit = profit;
      this.#title = title;
      this.#cost = cost;
    } else {
      throw new Error("Data is not valid");
    }
  }
  get getTitle() {
    return this.#title;
  }
  get getCost() {
    return this.#cost;
  }
  get getProfit() {
    return this.#profit;
  }

  changeCost(amount) {
    if (this.#cost + amount <= 0) {
      throw new Error("Cost should be greater than zero");
    } else {
      this.#cost += amount;
    }
  }

  calculatePrice() {
    return this.#cost / (1 - this.profit);
  }
}

class TaxableBook extends Book {
  #taxRate;
  constructor(title, cost, profit, taxRate) {
    super(title, cost, profit);
    if (taxRate <= 0 || taxRate + profit > 1) {
      throw new Error("Invalid data");
    }
    this.#taxRate = taxRate;
  }
  calculatePrice() {
    return this.getCost / (1 - this.getProfit - this.#taxRate);
  }
}
const book1 = new Book("The Power of Habits", 14, 0.3);
const book2 = new TaxableBook("The Power of Habits", 14, 0.3, 0.24);
