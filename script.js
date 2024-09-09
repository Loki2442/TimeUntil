const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = day * 365;

function rgbToCSS(rgb) {
    var customColor = rgb.split(" ");
    customColor = customColor.map((c) => Math.ceil(c * 255));
    return "rgb(" + customColor + ")";
}

var wpProperties = {
    eventDate: "12/31/2099 23:59:59",
    eventName: "Special Event",
    timeEndText: "No Time Left !",
    showYears: true,
    showMonths: true,
    showWeeks: true,
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
    showZeroes: false,
};

// TODO: Custom Date Locales, Translation
var timeUntilDate = new Date(wpProperties.eventDate).getTime();
var timeUntilElement = document.getElementById("timeUntil");
var untilEventName = document.getElementById("untilEventName");
var untilEventDate = document.getElementById("untilEventDate");
var animationElement = document.getElementById("tiles");
var animationTiles = animationElement.childNodes;

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.eventdate) {
            wpProperties.eventDate = properties.eventdate.value;
            timeUntilDate = new Date(wpProperties.eventDate).getTime();
        }
        if (properties.eventname)
            untilEventName.innerHTML = properties.eventname.value;
        if (properties.showeventdate)
            untilEventDate.innerHTML = properties.showeventdate.value ? new Date(wpProperties.eventDate).toLocaleString() : "";

        if (properties.schemecolor) {
            var backgroundColor = rgbToCSS(properties.schemecolor.value);
            document.documentElement.style.backgroundColor = backgroundColor;
            document.body.style.backgroundColor = backgroundColor;
        }
        if (properties.textcolor) {
            var textColor = rgbToCSS(properties.textcolor.value);
            document.documentElement.style.color = textColor;
            document.body.style.color = textColor;
        }
        if (properties.showanimation)
            animationElement.style.display = properties.showanimation.value ? "block": "none";

        if (properties.timeendtext) wpProperties.timeEndText = properties.timeendtext.value;
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

setInterval(function () {
    var timeLeft = timeUntilDate - new Date().getTime();
    if (timeLeft < 0) {
        timeUntilElement.innerHTML = wpProperties.timeEndText;
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
