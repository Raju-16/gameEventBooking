const d1 = "12/25/2022 11:00:00";
const d2 = "12/30/2022 12:00:00";

const date1 = new Date(d1).getTime();
const date2 = new Date(d2).getTime();
const diffTime = (date2 - date1) / (1000 * 60 * 60);

const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
console.log(diffTime % 24);
console.log(Math.floor(diffTime / 24) + " days");


