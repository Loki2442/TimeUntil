const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = day * 365;

const rgbToCSS = (rgb) => {
    const customColor = rgb.split(" ").map((c) => Math.ceil(c * 255));
    return "rgb(" + customColor + ")";
}

const wpProperties = {
    eventDate: "12/31/2099 23:59:59",
    eventName: "Special Event",
    timeEndText: "No Time Left !",
    showEventDate: true,
    showYears: true,
    showMonths: true,
    showWeeks: true,
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
    showZeroes: false,
};

const timeUntilElement = document.getElementById("timeUntil");
const untilEventName = document.getElementById("untilEventName");
const untilEventDate = document.getElementById("untilEventDate");
const animationElement = document.getElementById("tiles");
let timeUntilDate = new Date(wpProperties.eventDate).getTime();

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.eventdate) {
            wpProperties.eventDate = properties.eventdate.value.trim();
            timeUntilDate = new Date(wpProperties.eventDate).getTime();
            untilEventDate.innerText = wpProperties.showEventDate ? new Date(wpProperties.eventDate).toLocaleString() : "";
        }
        if (properties.eventname)
            untilEventName.innerText = properties.eventname.value.trim();
        if (properties.showeventdate) {
            wpProperties.showEventDate = properties.showeventdate.value;
            untilEventDate.innerText = wpProperties.showEventDate ? new Date(wpProperties.eventDate).toLocaleString() : "";
        }

        if (properties.schemecolor) {
            const backgroundColor = rgbToCSS(properties.schemecolor.value);
            document.documentElement.style.backgroundColor = backgroundColor;
            document.body.style.backgroundColor = backgroundColor;
        }
        if (properties.textcolor) {
            const textColor = rgbToCSS(properties.textcolor.value);
            document.documentElement.style.color = textColor;
            document.body.style.color = textColor;
        }
        if (properties.showanimation)
            animationElement.style.display = properties.showanimation.value ? "block": "none";

        if (properties.timeendtext) wpProperties.timeEndText = properties.timeendtext.value.trim();
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
    let timeLeft = timeUntilDate - new Date().getTime();
    if (timeLeft < 0) {
        timeUntilElement.innerText = wpProperties.timeEndText;
        return;
    }

    let years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0;
    if (wpProperties.showYears) {
        years = Math.floor(timeLeft / year);
        timeLeft = timeLeft % year;
    } if (wpProperties.showMonths) {
        months = Math.floor(timeLeft / month);
        timeLeft = timeLeft % month;
    } if (wpProperties.showWeeks) {
        weeks = Math.floor(timeLeft / week);
        timeLeft = timeLeft % week;
    } if (wpProperties.showDays) {
        days = Math.floor(timeLeft / day);
        timeLeft = timeLeft % day;
    } if (wpProperties.showHours) {
        hours = Math.floor(timeLeft / hour);
        timeLeft = timeLeft % hour;
    } if (wpProperties.showMinutes) {
        minutes = Math.floor(timeLeft / minute);
        timeLeft = timeLeft % minute;
    } if (wpProperties.showSeconds) {
        seconds = Math.floor(timeLeft / second);
    }

    let timeUntilString = "";
    if (wpProperties.showZeroes) {
        if (wpProperties.showYears) timeUntilString += `${years} Year${years == 1 ? "" : "s"} `;
        if (wpProperties.showMonths) timeUntilString += `${months} Month${months == 1 ? "" : "s"} `;
        if (wpProperties.showWeeks) timeUntilString += `${weeks} Week${weeks == 1 ? "" : "s"} `;
        if (wpProperties.showDays) timeUntilString += `${days} Day${days == 1 ? "" : "s"} `;
        if (wpProperties.showHours) timeUntilString += `${hours} Hour${hours == 1 ? "" : "s"} `;
        if (wpProperties.showMinutes) timeUntilString += `${minutes} Minute${minutes == 1 ? "" : "s"} `;
        if (wpProperties.showSeconds) timeUntilString += `${seconds} Second${seconds == 1 ? "" : "s"}`;
    } else {
        if (years > 0) timeUntilString += `${years} Year${years == 1 ? "" : "s"} `;
        if (months > 0) timeUntilString += `${months} Month${months == 1 ? "" : "s"} `;
        if (weeks > 0) timeUntilString += `${weeks} Week${weeks == 1 ? "" : "s"} `;
        if (days > 0) timeUntilString += `${days} Day${days == 1 ? "" : "s"} `;
        if (hours > 0) timeUntilString += `${hours} Hour${hours == 1 ? "" : "s"} `;
        if (minutes > 0) timeUntilString += `${minutes} Minute${minutes == 1 ? "" : "s"} `;
        if (seconds > 0) timeUntilString += `${seconds} Second${seconds == 1 ? "" : "s"}`;
    }
    timeUntilElement.innerText = timeUntilString.trim();
}, second);
