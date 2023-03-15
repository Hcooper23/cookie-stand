'use strict';

let times = ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM'];
// console.log(times);
let randomnums = [];
let cookieHours = [];

function generateBetween(min, max) {
  return Math.ceil(Math.random() * (max - min)) + min;
}

const sales = [];
// const tableBodyEl = document.getElementById('cookieData');
const thead = document.getElementById('thead');
const tbody = document.getElementById('tbody');
const tfoot = document.getElementById('tfoot');

function tableCookie(name, min, max, avg) {
  this.city = name;
  this.minHourly = min;
  this.maxHourly = max;
  this.avgPurchase = avg;
  this.customerPerHour = [];
  this.cookiesPerHour = [];
  this.totalCookiePerStore = 0;
  sales.push(this);
}
tableCookie.prototype.drawRow = function () {
  const tableRow = document.createElement('tr');
  tbody.appendChild(tableRow);
  const tableData1 = document.createElement('td');
  tableData1.textContent = this.city;
  tableRow.appendChild(tableData1);
  for (let i = 0; i < times.length; i++) {
    const tableData2 = document.createElement('td');
    tableData2.textContent = this.cookiesPerHour[i];
    tableRow.appendChild(tableData2);
  }
  const tablesum = document.createElement('td');
  tablesum.textContent = this.totalCookiePerStore;
  tableRow.appendChild(tablesum);
};
tableCookie.prototype.generateCustomersPerHour = function () {
  for (let i = 0; i < times.length; i++) {
    this.customerPerHour.push(generateBetween(this.minHourly, this.maxHourly));
  }
};
tableCookie.prototype.generateCookiesPerHour = function () {
  this.generateCustomersPerHour();
  for (let i = 0; i < times.length; i++) {
    let hourlyCookies = Math.ceil(this.customerPerHour[i] * this.avgPurchase);
    this.cookiesPerHour.push(hourlyCookies);
    this.totalCookiePerStore += hourlyCookies;
  }
};
tableCookie.prototype.dailyLocationTotal = function () {
  for (let i = 0; i < this.cookiesPerHour.length; i++) {
    this.totalCookiePerStore += this.cookiesPerHour[i];
  }
};

function drawHeader() {
  let row = document.createElement('tr');
  let headerCell = document.createElement('th');
  headerCell.textContent = 'Times';
  row.appendChild(headerCell);

  for (let i = 0; i < times.length; i++) {
    let headerCell = document.createElement('th');
    headerCell.textContent = times[i];
    row.appendChild(headerCell);
  }
  let totalheader = document.createElement('th');
  totalheader.textContent = 'Daily Total';
  row.appendChild(totalheader);
  thead.appendChild(row);
}

drawHeader()

// Total Function
tableCookie.prototype.drawFooter = function () {
  const totalRow = document.createElement('tr');
  tbody.appendChild(totalRow);
  const totalCell1 = document.createElement('td');
  totalCell1.textContent = 'Total';
  totalRow.appendChild(totalCell1);
  let grandtotal = 0;
  for (let i = 0; i < times.length; i++) {
    const totalCell2 = document.createElement('td');
    let totalCookies = 0;
    for (let j = 0; j < sales.length; j++) {
      totalCookies += sales[j].cookiesPerHour[i];
      grandtotal += sales[j].cookiesPerHour[i];
    }
    totalCell2.textContent = totalCookies;
    totalRow.appendChild(totalCell2);
  }
  const totalCell3 = document.createElement('td');
  totalCell3.textContent = grandtotal;
  totalRow.appendChild(totalCell3);
};


const seattle = new tableCookie('Seattle', 23, 65, 6.3);
seattle.generateCookiesPerHour();
seattle.drawRow();

const tokyo = new tableCookie('Tokyo', 3, 24, 1.2);
tokyo.generateCookiesPerHour();
tokyo.drawRow();

const dubai = new tableCookie('Dubai', 11, 38, 3.7);
dubai.generateCookiesPerHour();
dubai.drawRow();

const paris = new tableCookie('Paris', 20, 38, 2.3);
paris.generateCookiesPerHour();
paris.drawRow();

const lima = new tableCookie('Lima', 2, 16, 4.);
lima.generateCookiesPerHour();
lima.drawRow();
lima.drawFooter();
// This above Calls the total for all times????

// let operatingHours = function(){
//   let headerRow = document.createElement('tr');
//   tableBodyEl.appendChild(headerRow);
//   let blankCell = document.createElement('th');
//   headerRow.appendChild(blankCell);

//   for (let i = 0; i < times.length; i++){
//     let timeOpen = document.createElement('th');
//     timeOpen.textContent = `${times[i]}`;
//     headerRow.appendChild(cookieHours);
//   }
//   let totalCell = document.createElement('th');
//   totalCell.textContent = 'Daily Location Totals';
//   headerRow.appendChild(totalCell);
// };

// operatingHours();

// let seattleList = document.getElementById("seattleData");
// let tokyoList = document.getElementById("tokyoData");
// let dubaiList = document.getElementById("dubaiData");
// let parisList = document.getElementById("parisData");
// let limaList = document.getElementById("limaData");

// const seattle = {
//   city: "seattle",
//   minHourly: 23,
//   maxHourly: 65,
//   avgPurchase: 6.3,
//   customerPerHour: [],
//   cookiesPerHour: [],
//   totalCookiePerStore: 0,

//   generateCustomersPerHour: function () {
//     for (let i = 0; i < times.length; i++) {
//       this.customerPerHour.push(generateBetween(this.minHourly, this.maxHourly))
//     }
//   },
//   generateCookiesPerHour: function () {
//     this.generateCustomersPerHour();
//     for (let i = 0; i < times.length; i++) {
//       let hourlyCookies = Math.ceil(this.customerPerHour[i] * this.avgPurchase);
//       this.cookiesPerHour.push(hourlyCookies);
//       this.totalCookiePerStore += hourlyCookies
//     }
//   },
//   renderList: function () {
//     this.generateCookiesPerHour()
//     for (let i = 0; i < times.length; i++) {
//       let li = document.createElement("li");
//       li.textContent = `${times[i]}: ${this.cookiesPerHour[i]} cookies`;
//       seattleList.appendChild(li)
//     }
//     let li = document.createElement("li");
//     li.textContent = `Total: ${this.totalCookiePerStore} cookies`;
//     seattleList.appendChild(li)
//   }
// }

// seattle.renderList();
// console.log(seattle.customerPerHour)
// console.log(seattle.cookiesPerHour)
// console.log(seattle.totalCookiePerStore)

// const tokyo = {
//   city: "tokyo",
//   minHourly: 3,
//   maxHourly: 24,
//   avgPurchase: 1.2,
//   customerPerHour: [],
//   cookiesPerHour: [],
//   totalCookiePerStore: 0,

//   generateCustomersPerHour: function () {
//     for (let i = 0; i < times.length; i++) {
//       this.customerPerHour.push(generateBetween(this.minHourly, this.maxHourly))
//     }
//   },
//   generateCookiesPerHour: function () {
//     this.generateCustomersPerHour();
//     for (let i = 0; i < times.length; i++) {
//       let hourlyCookies = Math.ceil(this.customerPerHour[i] * this.avgPurchase);
//       this.cookiesPerHour.push(hourlyCookies);
//       this.totalCookiePerStore += hourlyCookies
//     }
//   },
//   renderList: function () {
//     this.generateCookiesPerHour()
//     for (let i = 0; i < times.length; i++) {
//       let li = document.createElement("li");
//       li.textContent = `${times[i]}: ${this.cookiesPerHour[i]} cookies`;
//       tokyoList.appendChild(li)
//     }
//     let li = document.createElement("li");
//     li.textContent = `Total: ${this.totalCookiePerStore} cookies`;
//     tokyoList.appendChild(li)
//   }
// }

// tokyo.renderList();
// console.log(tokyo.customerPerHour)
// console.log(tokyo.cookiesPerHour)
// console.log(tokyo.totalCookiePerStore)

// const dubai = {
//   city: "dubai",
//   minHourly: 11,
//   maxHourly: 28,
//   avgPurchase: 3.7,
//   customerPerHour: [],
//   cookiesPerHour: [],
//   totalCookiePerStore: 0,

//   generateCustomersPerHour: function () {
//     for (let i = 0; i < times.length; i++) {
//       this.customerPerHour.push(generateBetween(this.minHourly, this.maxHourly))
//     }
//   },
//   generateCookiesPerHour: function () {
//     this.generateCustomersPerHour();
//     for (let i = 0; i < times.length; i++) {
//       let hourlyCookies = Math.ceil(this.customerPerHour[i] * this.avgPurchase);
//       this.cookiesPerHour.push(hourlyCookies);
//       this.totalCookiePerStore += hourlyCookies
//     }
//   },
//   renderList: function () {
//     this.generateCookiesPerHour()
//     for (let i = 0; i < times.length; i++) {
//       let li = document.createElement("li");
//       li.textContent = `${times[i]}: ${this.cookiesPerHour[i]} cookies`;
//       dubaiList.appendChild(li)
//     }
//     let li = document.createElement("li");
//     li.textContent = `Total: ${this.totalCookiePerStore} cookies`;
//     dubaiList.appendChild(li)
//   }
// }

// dubai.renderList();
// console.log(dubai.customerPerHour)
// console.log(dubai.cookiesPerHour)
// console.log(dubai.totalCookiePerStore)

// const paris = {
//   city: "paris",
//   minHourly: 20,
//   maxHourly: 38,
//   avgPurchase: 2.3,
//   customerPerHour: [],
//   cookiesPerHour: [],
//   totalCookiePerStore: 0,

//   generateCustomersPerHour: function () {
//     for (let i = 0; i < times.length; i++) {
//       this.customerPerHour.push(generateBetween(this.minHourly, this.maxHourly))
//     }
//   },
//   generateCookiesPerHour: function () {
//     this.generateCustomersPerHour();
//     for (let i = 0; i < times.length; i++) {
//       let hourlyCookies = Math.ceil(this.customerPerHour[i] * this.avgPurchase);
//       this.cookiesPerHour.push(hourlyCookies);
//       this.totalCookiePerStore += hourlyCookies
//     }
//   },
//   renderList: function () {
//     this.generateCookiesPerHour()
//     for (let i = 0; i < times.length; i++) {
//       let li = document.createElement("li");
//       li.textContent = `${times[i]}: ${this.cookiesPerHour[i]} cookies`;
//       parisList.appendChild(li)
//     }
//     let li = document.createElement("li");
//     li.textContent = `Total: ${this.totalCookiePerStore} cookies`;
//     parisList.appendChild(li)
//   }
// }

// paris.renderList();
// console.log(paris.customerPerHour)
// console.log(paris.cookiesPerHour)
// console.log(paris.totalCookiePerStore)

// const lima = {
//   city: "lima",
//   minHourly: 2,
//   maxHourly: 16,
//   avgPurchase: 4.6,
//   customerPerHour: [],
//   cookiesPerHour: [],
//   totalCookiePerStore: 0,

//   generateCustomersPerHour: function () {
//     for (let i = 0; i < times.length; i++) {
//       this.customerPerHour.push(generateBetween(this.minHourly, this.maxHourly))
//     }
//   },
//   generateCookiesPerHour: function () {
//     this.generateCustomersPerHour();
//     for (let i = 0; i < times.length; i++) {
//       let hourlyCookies = Math.ceil(this.customerPerHour[i] * this.avgPurchase);
//       this.cookiesPerHour.push(hourlyCookies);
//       this.totalCookiePerStore += hourlyCookies
//     }
//   },
//   renderList: function () {
//     this.generateCookiesPerHour()
//     for (let i = 0; i < times.length; i++) {
//       let li = document.createElement("li");
//       li.textContent = `${times[i]}: ${this.cookiesPerHour[i]} cookies`;
//       limaList.appendChild(li)
//     }
//     let li = document.createElement("li");
//     li.textContent = `Total: ${this.totalCookiePerStore} cookies`;
//     limaList.appendChild(li)
//   }
// }

// lima.renderList();
// console.log(lima.customerPerHour)
// console.log(lima.cookiesPerHour)
// console.log(lima.totalCookiePerStore)