const btnSound = document.querySelector('.j-btn-sound');
const hours = document.querySelector('.j-timer-hours');
const minutes = document.querySelector('.j-timer-minutes');
const seconds = document.querySelector('.j-timer-seconds');
const message = document.querySelector('.timer-message');
const inputTime = document.querySelector('.j-input-time');

const setHoursBtn = document.querySelector('.j-btn-setHours');
const setMinutesBtn = document.querySelector('.j-btn-setMinutes');
const setSecondsBtn = document.querySelector('.j-btn-setSeconds');

const minusHourBtn = document.querySelector('.j-minus-hour');
const minusMinuteBtn = document.querySelector('.j-minus-minute');
const minusSecondBtn = document.querySelector('.j-minus-second');

const startBtn = document.querySelector('.j-start');
const pauseBtn = document.querySelector('.j-pause');
const resetBtn = document.querySelector('.j-reset');

let time = 0;
let intervalId = null;

function checkTimeValue(value) {
    if (value < 10) {
        return '0' + value
    } else {
        return value
    }
};

function resetTime() {
    time = 0;
    startBtn.classList.remove("disabled");
    pauseBtn.classList.remove("disabled");
    document.querySelector('.timer-add-time').style.display = 'block';
    document.querySelector('.hidden').style.display = 'none';
    document.querySelector('.minus-time').style.display = 'block';
    document.querySelector('.hidden-2').style.display = 'none';
    timeOutput();
}

function soundPlay() {
    document.querySelector('#sound1').play();
}

function timeOutput() {
    if (time > 86399) {
        messageOutput('<span style="color: red; font-size: 0.7em;">Error: time out of range</span>');
        time = 0;
    } else {
        const h = Math.floor(time / 60 / 60);
        const m = Math.floor(time / 60 - h * 60);
        const s = Math.floor(time - (m * 60) - (h * 60 * 60));

        hours.innerHTML = checkTimeValue(h);
        minutes.innerHTML = checkTimeValue(m);
        seconds.innerHTML = checkTimeValue(s);
    }
}

function messageOutput(msg) {
    message.innerHTML = msg;
}

function setHours() {
    if (!isNaN(+inputTime.value)) {
        time = time + (+inputTime.value * 60 * 60);
        timeOutput(time);
        messageOutput('');
    } else {
        messageOutput('<span style="color: red; font-size: 0.7em;">TypeError: value must be a number</span>')
    }    
}

function setMinutes() {
    if (!isNaN(+inputTime.value)) {
        time = time + (+inputTime.value * 60)
        timeOutput();
        messageOutput('');
    } else {
        messageOutput('<span style="color: red; font-size: 0.7em;">TypeError: value must be a number</span>')
    }    
}

function setSeconds() {
    if (!isNaN(+inputTime.value)) {
        time = time + (+inputTime.value)
        timeOutput();
        messageOutput('');
    } else {
        messageOutput('<span style="color: red; font-size: 0.7em;">TypeError: value must be a number</span>')
    }    
}

function minusHour() {
    if (Math.floor(time / 60 / 60) > 0) {
        time = time - (60 * 60);
        timeOutput();
        messageOutput('');
    } else {
        messageOutput('<span style="color: red;">can not minus for 1 hour</span>');
    }
};

function minusMinute() {
    if (Math.floor(time / 60) > 0) {
        time = time - 60;
        timeOutput();
        messageOutput('');
    } else {
        messageOutput('<span style="color: red;">can not minus for 1 minute</span>');
    }
};

function minusSecond() {
    if (time > 0) {
        time = time - 1;
        timeOutput();
        messageOutput('');
    } else {
        messageOutput('<span style="color: red;">can not minus for 1 second</span>');
    }
};

function countdown() {
    if (time > 0) {
        messageOutput("<span style=\"color: green;\">countdown...</span>");
        time = time - 1;        
        timeOutput();        
    } else {
        clearInterval(intervalId);
        intervalId = null;
    }
    if (time === 0) {
        soundPlay();
        messageOutput('<span style=\"color: rgba(10, 117, 0, 0.7);\">countdown is over</span>');
        resetTime();
    } 
};

function pauseTimer() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
};

setHoursBtn.addEventListener('click', () => { setHours() });

setMinutesBtn.addEventListener('click', () => { setMinutes() });

setSecondsBtn.addEventListener('click', () => { setSeconds() });

minusHourBtn.addEventListener('click', ()=> { minusHour() });

minusMinuteBtn.addEventListener('click', ()=> { minusMinute() });

minusSecondBtn.addEventListener('click', ()=> { minusSecond() });

startBtn.addEventListener('click', () => {
    startBtn.classList.add("disabled");
    pauseBtn.classList.remove("disabled");
    startBtn.innerText = "start"
    document.querySelector('.timer-add-time').style.display = 'none';
    document.querySelector('.hidden').style.display = 'block';
    document.querySelector('.minus-time').style.display = 'none';
    document.querySelector('.hidden-2').style.display = 'block';
    
    if (!intervalId && time > 0) {
        intervalId = setInterval(countdown, 1000);
    } else {
        resetTime();
    }
});

pauseBtn.addEventListener('click', () => {
        
    if (message.textContent === 'countdown...') {
        pauseBtn.classList.add("disabled");
        startBtn.classList.remove("disabled");
        startBtn.innerText = "resume"
        messageOutput("<span style=\"color: green;\">pause</span>");
        pauseTimer();
    } else {
        resetTime();
    }
    
});

resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;  
    resetTime();
    messageOutput('');
    startBtn.innerText = "start" 
});