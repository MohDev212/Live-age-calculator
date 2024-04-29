function calcAge()
{
let minutes = 1000 * 60;
let hours = minutes * 60;
let days = hours * 24;
let years = days * 365;

let d = new Date(document.getElementById("date1").value);
let dt = d.getDate();
let mn = d.getMonth();
mn++;
let yy = d.getFullYear();
let firstDate = new Date(mn + "/" + dt + "/" + yy);
let secondDate = new Date();
let timeDiff = secondDate.getTime() - firstDate.getTime();
let age = (timeDiff / (years));
age = parseFloat(Math.round(age * 100000000000) / 100000000000).toFixed(11);
document.getElementById("age").innerHTML = age;
setTimeout("calcAge()", 100);

}

window.onload = calcAge;

