let gamestart = false;
let highestScore = 0;
let level = 0;
let body = document.querySelector('body');
let gameSeq = [];
let userSeq = [];
let h2 = document.querySelector('h2');
let idx = 0;

body.addEventListener('keypress', function () {
    if (gamestart == false) {
        gamestart = true;
        start();
    }
});

function levelUp() {
    level++;
    h2.innerText = `level ${level}`;
}

function start() {
    idx = 0;
    userSeq = [];
    gameSeq = [];
    let btn = generateRandom();
    levelUp();
    gameSeq.push(btn);
    userInput();

};

function nextlevel() {
    idx = 0;
    userSeq = [];
    let btn = generateRandom();
    levelUp();
    gameSeq.push(btn);
    userInput();
}
function userInput() {
    let allBox = document.querySelectorAll('.box');
    for (box of allBox) {
        box.addEventListener('click', userclick);
    }
}

function removeInput() {
    let allBox = document.querySelectorAll('.box');
    for (box of allBox) {
        box.removeEventListener('click', userclick);
    }
}

function userclick() {
    let id = event.target.id;
    userSeq.push(id[3]);
    userflash(`#${event.target.id}`)
    check(id[3]);
}

function check(user) {
    if (idx < gameSeq.length) {
        if (user == gameSeq[idx]) {
            idx++;
            if (idx == gameSeq.length) {
                removeInput();
                body.classList.add('greenbg');
                setTimeout(function () {
                    body.classList.remove('greenbg');
                }, 1000);
                setTimeout(nextlevel, 1100)

            }
        }
        else {
            removeInput();
            if (level > highestScore) {
                highestScore = level;
            }
            h2.innerHTML = `wrong input.Game over.Your level was ${level}.<br>Now press any key to again start the game.<br>
            Highest Score :${highestScore}`;
            body.classList.add('redbg');
            setTimeout(function () {
                body.classList.remove('redbg');
                gamestart = false;
                level = 0;
            }, 2000);

        }

    }



}
function generateRandom() {
    let number = Math.floor(Math.random() * 4) + 1;
    flash(`#box${number}`);
    return number;
}

function flash(number) {
    let boxSelected = document.querySelector(`${number}`);
    boxSelected.classList.add('whitebg');
    setTimeout(function () {
        boxSelected.classList.remove('whitebg');
    }, 250)
}

function userflash(number) {
    let boxSelected = document.querySelector(`${number}`);
    boxSelected.classList.add('greenbg');
    setTimeout(function () {
        boxSelected.classList.remove('greenbg');
    }, 250)
}
