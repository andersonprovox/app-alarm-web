let para = document.getElementById('para');
let hour = document.getElementById('hour');
let minute = document.getElementById('minute');
let setButton = document.getElementById('set');
let stopButton = document.getElementById('stop');

window.addEventListener('load', ()=> {
    hour.placeholder = new Date().getHours();
    minute.placeholder = new Date().getMinutes();
});

setButton.addEventListener('click', alarm);

let x;

function alarm() {
    if(hour.value && minute.value) {
        x = setInterval(() => {
            setAlarm();
        }, 1000);
    } else {
        alert('ENTER THE HRS AND MINS!');
    }
}

function setAlarm() {
    let d = new Date().toLocaleDateString('en-US');
   
    let then = new Date(`${d} ${hour.value}:${minute.value}`).getTime();
 
    let now = new Date().getTime();
 
    let distance = then - now;

    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    para.innerHTML = `ALARM IN - ${hours}:${minutes}:${seconds}`;

    if(distance < 0) {
        clearInterval(x);

        para.innerHTML = `IT'S ALARM TIME`;

        let audio = new Audio('./assets/galo.mp3');

        audio.play();

        stopButton.style.visibility = 'visible';
        stopButton.addEventListener('click', () => {
            para.innerHTML = ``;
            audio.pause();
            stopButton.style.visibility = 'hidden';
            hour.value = '';
            minute.value = '';
        });
    }
}