const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = day * 365;

var wpProperties = {
    eventDate: "12/31/2099 23:59:59",
    eventName: "Special Event",
    showYears: true,
    showMonths: true,
    showWeeks: true,
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
    showZeroes: false,
};

// TODO: Custom Date Locales, No Time Left String, Background, Colour Prefs

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.eventdate) wpProperties.eventDate = properties.eventdate.value;
        if (properties.eventname) wpProperties.eventName = properties.eventname.value;
        if (properties.showyears) wpProperties.showYears = properties.showyears.value;
        if (properties.showmonths) wpProperties.showMonths = properties.showmonths.value;
        if (properties.showweeks) wpProperties.showWeeks = properties.showweeks.value;
        if (properties.showdays) wpProperties.showDays = properties.showdays.value;
        if (properties.showhours) wpProperties.showHours = properties.showhours.value;
        if (properties.showminutes) wpProperties.showMinutes = properties.showminutes.value;
        if (properties.showseconds) wpProperties.showSeconds = properties.showseconds.value;
        if (properties.showzeroes) wpProperties.showZeroes = properties.showzeroes.value;
    },
};

var timeUntilElement = document.getElementById("timeUntil");
var untilEventName = document.getElementById("untilEventName");
var untilEventDate = document.getElementById("untilEventDate");

setInterval(function () {
    untilEventName.innerHTML = wpProperties.eventName;
    untilEventDate.innerHTML = new Date(wpProperties.eventDate).toDateString();
    var timeUntilDate = new Date(wpProperties.eventDate).getTime();
    var timeLeft = timeUntilDate - new Date().getTime();
    if (timeLeft < 0) {
        timeUntilElement.innerHTML = "No Time Left !";
        return;
    }

    var years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0;
    if (wpProperties.showYears) {
        years = Math.floor(timeLeft / year);
        timeLeft = timeLeft % year;
    }
    if (wpProperties.showMonths) {
        months = Math.floor(timeLeft / month);
        timeLeft = timeLeft % month;
    }
    if (wpProperties.showWeeks) {
        weeks = Math.floor(timeLeft / week);
        timeLeft = timeLeft % week;
    }
    if (wpProperties.showDays) {
        days = Math.floor(timeLeft / day);
        timeLeft = timeLeft % day;
    }
    if (wpProperties.showHours) {
        hours = Math.floor(timeLeft / hour);
        timeLeft = timeLeft % hour;
    }
    if (wpProperties.showMinutes) {
        minutes = Math.floor(timeLeft / minute);
        timeLeft = timeLeft % minute;
    }
    if (wpProperties.showSeconds) {
        seconds = Math.floor(timeLeft / second);
    }

    var timeUntilString = "";
    if (wpProperties.showZeroes) {
        if (wpProperties.showYears) timeUntilString += `${years} Years `;
        if (wpProperties.showMonths) timeUntilString += `${months} Months `;
        if (wpProperties.showWeeks) timeUntilString += `${weeks} Weeks `;
        if (wpProperties.showDays) timeUntilString += `${days} Days `;
        if (wpProperties.showHours) timeUntilString += `${hours} Hours `;
        if (wpProperties.showMinutes) timeUntilString += `${minutes} Minutes `;
        if (wpProperties.showSeconds) timeUntilString += `${seconds} Seconds`;
    } else {
        if (years > 0) timeUntilString += `${years} Years `;
        if (months > 0) timeUntilString += `${months} Months `;
        if (weeks > 0) timeUntilString += `${weeks} Weeks `;
        if (days > 0) timeUntilString += `${days} Days `;
        if (hours > 0) timeUntilString += `${hours} Hours `;
        if (minutes > 0) timeUntilString += `${minutes} Minutes `;
        if (seconds > 0) timeUntilString += `${seconds} Seconds`;
    }
    timeUntilElement.innerHTML = timeUntilString;
}, second);
