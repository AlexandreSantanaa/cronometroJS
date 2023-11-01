const timerEl = document.getElementById('tempo');
const marksList = document.getElementById('marks-list');

let intervalId=0;
let timer = 0;
let marks = [];

const formatTime = (tempo) => {
    const horas = Math.floor(tempo / 360000); // Correção
    const minutos = Math.floor((tempo % 360000) / 6000); // Correção
    const segundos = Math.floor((tempo % 6000) / 100); // Correção
    const milissegundos = tempo % 100; // Correção

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}:${milissegundos.toString().padStart(2, '0')}`;
}

const addMarkToList = (markIndex, markTime) => {
    if(timer != 0){
        marksList.innerHTML += `<p>Marca ${markIndex}:${formatTime(markTime)} </p>`
    }
    
}


const markTime = () =>{
    if(timer != 0){
        marks.push(timer)
        addMarkToList(marks.length, timer)
    }
}

const toggleTimer = () => {
    const button = document.getElementById('power')
    const icones = button.getAttribute('icones')

    clearInterval(intervalId)

    if(icones == 'start' || icones == 'continue'){
        intervalId = setInterval(() => {
            timer+=1
            setTimer(timer)
        }, 10);
        button.setAttribute('icones', 'pause')
        button.innerHTML = '<i class="fa-solid fa-pause"></i>'
    }else if(icones == 'pause'){
        button.setAttribute('icones', 'continue')
        button.innerHTML = '<i class="fa-solid fa-play"></i>'
    }
}

const resetTimer = () => {
    clearInterval(intervalId)
    timer = 0
    marks = []
    setTimer(timer)
    marksList.innerHTML=''
    const button = document.getElementById('power')
    button.getAttribute('icones', 'start')
    button.innerHTML = '<i class="fa-solid fa-play"></i>'
}

const setTimer = (tempo) => {
    timerEl.innerHTML = formatTime(tempo)
}

document.getElementById('power').addEventListener("click", toggleTimer)
document.getElementById('mark').addEventListener("click", markTime)
document.getElementById('reset').addEventListener("click", resetTimer)