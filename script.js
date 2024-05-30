// RESOURCES
const steveImg = [
    'img/steve/1.png', 'img/steve/2.png', 'img/steve/3.png',
    'img/steve/4.png'
];
const alexImg = [
    'img/alex/1.png', 'img/alex/2.png', 'img/alex/3.png',
    'img/alex/4.png'
];
const sunnyImg = [
    'img/sunny/1.png', 'img/sunny/2.png', 'img/sunny/3.png',
    'img/sunny/4.png'
];
const villagerImg = [
    'img/villager/1.png', 'img/villager/2.png', 'img/villager/3.png',
    'img/villager/4.png'
];

let characterIndex = 0;
let villagerIndex = 0;

const character = document.querySelector('.character');
const villager = document.querySelector('.villager');
const bg1 = document.querySelector('.bg1');
const ground = document.querySelector('.ground');
const deathscreen = document.querySelector('.deathscreen');

// AUDIO
const backgroundMusic = new Audio('audios/bg-music.mp3');
backgroundMusic.loop = true;
const footstepSound = new Audio('audios/footstep.mp3');
footstepSound.loop = true;
const villagerHurt = new Audio('audios/villager-hurt.mp3');
const characterHurt = new Audio('audios/dmg.mp3');
const jumpfx = new Audio('audios/jumpfx.mp3');

// INTRO
const startScreen = document.querySelector('.start-screen')
const introFrame1 = document.querySelector('.intro-frame1')
const introFrame2 = document.querySelector('.intro-frame2')
const title = document.querySelector('.panel');
const titleH1 = document.querySelector('.title h1');
const panel = document.querySelector('.panel')

function titleClicked() {
    introFrame1.classList.add("active")
    introFrame2.classList.add("active")
    titleH1.classList.add("active")
    startScreen.classList.add("active")
    panelActive();
    setTimeout(() => {
        startScreen.style.display = "none";
        onintro = false;
    }, 1000);
}

function panelActive() {
    setTimeout(() => {
        startScreen.style.display = "none";
    }, 1000);
}

const skins = {
    steve: steveImg,
    alex: alexImg,
    sunny: sunnyImg,
    villager: villagerImg
};

let skinIndex = 0;
const skinKeys = Object.keys(skins);
let currentSkin = skinKeys[skinIndex];
const skinDisplay = document.querySelector('.skin-display');
const skinTitle = document.querySelector('.skin-title'); // Element to display the skin title

function updateSkinDisplay() {
    skinDisplay.style.backgroundImage = `url('${skins[currentSkin][0]}')`;
    skinDisplay.style.backgroundPosition = 'center';
    skinDisplay.style.backgroundSize = 'cover';
    skinTitle.textContent = `Click to Start with ${currentSkin.charAt(0).toUpperCase() + currentSkin.slice(1)}`;
}

const nextBtn = document.getElementById('next');
nextBtn.onclick = function() {
    skinIndex = (skinIndex + 1) % skinKeys.length;
    currentSkin = skinKeys[skinIndex];
    updateSkinDisplay();
};

// Initialize the skin display with the first skin
updateSkinDisplay();

// ANIMATIONS
function characterAnim() {
    character.style.backgroundImage = `url(${skins[currentSkin][characterIndex]})`;
    characterIndex = (characterIndex + 1) % skins[currentSkin].length;
}
let characterInterval = setInterval(characterAnim, 1000);

function villagerAnim() {
    villager.style.backgroundImage = `url(${villagerImg[villagerIndex]})`;
    villagerIndex = (villagerIndex + 1) % villagerImg.length;
}
let villagerInterval = setInterval(villagerAnim, 150);

let villagerRightPos = 0;
let villagerSpeed = 1;
function villagerAnim2() {
    villagerRightPos = parseInt(window.getComputedStyle(villager).getPropertyValue("right"));
    villagerRightPos += villagerSpeed;
    let userPos2 = parseInt(window.getComputedStyle(character).getPropertyValue("right"));
    
    if (villagerRightPos >= (userPos2 + 550)) {
        villagerRightPos = -150;
    }
    
    villager.style.right = villagerRightPos + 'px';
}
let villager2Interval = setInterval(villagerAnim2, 1000);

let bg1pos = 0;
function bg1Anim() {
    bg1pos = parseInt(window.getComputedStyle(bg1).getPropertyValue('background-position-x'));
    bg1pos -= villagerSpeed;

    const maxBg1pos = -16304;
    if (bg1pos <= maxBg1pos) {
        bg1pos = 0;
    }

    bg1.style.backgroundPositionX = bg1pos + "px";
}
let bg1Interval = setInterval(bg1Anim, 1000);

let groundpos = 0;
function groundAnim() {
    groundpos = parseInt(window.getComputedStyle(ground).getPropertyValue('background-position-x'));
    groundpos -= (villagerSpeed + 1);

    const maxGroundpos = -2400;
    if (groundpos <= maxGroundpos) {
        groundpos = 0;
    }

    ground.style.backgroundPositionX = groundpos + "px";
}
let groundInterval = setInterval(groundAnim, 1000);

// GAME SYSTEM
let score = 0;
function game() {
    let userPos = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
    let userPos2 = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    let wallPos = parseInt(window.getComputedStyle(villager).getPropertyValue("left"));
    let characterWidth = character.offsetWidth - 35;
    let characterHeight = character.offsetHeight;
    let villagerWidth = villager.offsetWidth - 50;
    let villagerHeight = villager.offsetHeight;

    if (userPos < villagerHeight && userPos2 < wallPos + villagerWidth && userPos2 + characterWidth > wallPos) {
        ondeath();

        ongoing = false;
        clearInterval(gamerule);

        document.getElementById("initialScore").innerHTML = ``; 
        document.getElementById("deathscore").innerHTML = `Score: <span style="color: goldenrod">${score}</span>`;
        score = 0;

        bg1.classList.remove("active");
        ground.classList.remove("active");

        clearInterval(characterInterval);
        clearInterval(villager2Interval);
        villager.style.right = -100 + 'px';
        villagerSpeed = 1;
        clearInterval(bg1Interval);
        clearInterval(groundInterval);
        bg1.style.backgroundPosition = '0px 0';

        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        footstepSound.pause();
        footstepSound.currentTime = 0;

    } else {
        score++;
        document.getElementById("initialScore").innerHTML = `Character: ${currentSkin.charAt(0) + currentSkin.slice(1)}</br>Score: ${score}</br>Speed: ${villagerSpeed}×`;
        if ((score % 100) === 0) {
            villagerSpeed += 0.25;
        }
    }
}

function jump() {
    if (character.classList.contains("jump")) { return; }
    jumpfx.play();
    character.classList.add("jump");

    if (characterIndex === 0 || characterIndex === 2) {
        characterIndex = (characterIndex + 1) % skins[currentSkin].length;
    }

    character.style.backgroundImage = `url(${skins[currentSkin][characterIndex]})`;

    clearInterval(characterInterval);

    footstepSound.pause();

    setTimeout(function() {
        character.classList.remove("jump");
        characterInterval = setInterval(characterAnim, 100);

        characterHurt.play();
        footstepSound.play();
    }, 1450);
}

let gamerule;
function gamestart() {
    ground.classList.add("active");

    characterInterval = setInterval(characterAnim, 100);
    villager2Interval = setInterval(villagerAnim2, 1);

    bg1Interval = setInterval(bg1Anim, 20);
    groundInterval = setInterval(groundAnim, 1)

    gamerule = setInterval(game, 100);
    ongoing = true;

    backgroundMusic.play();
    footstepSound.play();
}

let onintro = true;
let ongoing = false;
document.onkeydown = function(event) {
    if ((event.code === "Space" || event.code === "ArrowUp") && !onintro) {
        if (ongoing) {
            jump();
        } else {
            if (deathActive) {
                respawn();
            }
            gamestart();
        }
    } else {
        console.log("wrong key");
    }
}

setInterval(() => {
    if (!ongoing) {
        clearInterval(villager2Interval);
        villager.style.right = -100 + 'px';
        clearInterval(characterInterval);
        character.style.backgroundImage = `url(${skins[currentSkin][0]})`;

        clearInterval(bg1Interval);
        clearInterval(groundInterval)

        footstepSound.pause();
        footstepSound.currentTime = 0;
    }
}, 500);

// Death screen
let deathActive = false;
function ondeath() {
    villagerHurt.play();
    deathActive = true;
    deathscreen.classList.add('active')
}

function respawn() {
    deathActive = false;
    deathscreen.classList.remove('active')
    document.getElementById("initialScore").innerHTML = `press space/up to start`;
}

function getRandomDeathMessage() {
    const messages = [
        `Oh no! ${currentSkin.charAt(0).toUpperCase() + currentSkin.slice(1)} got caught by the villager!`,
        `${currentSkin.charAt(0).toUpperCase() + currentSkin.slice(1)} was captured by the villager! Try again!`,
        `The villager snagged ${currentSkin.charAt(0).toUpperCase() + currentSkin.slice(1)}! Better luck next time!`,
        `Yikes! The villager caught up to ${currentSkin.charAt(0).toUpperCase() + currentSkin.slice(1)}!`,
        `${currentSkin.charAt(0).toUpperCase() + currentSkin.slice(1)} couldn't escape the villager's grasp!`,
        `Oops! The villager trapped ${currentSkin.charAt(0).toUpperCase() + currentSkin.slice(1)}!`,
        `${currentSkin.charAt(0).toUpperCase() + currentSkin.slice(1)} was outsmarted by the villager! Give it another shot!`,
        `The villager nabbed ${currentSkin.charAt(0).toUpperCase() + currentSkin.slice(1)}! Can you do better?`,
        `${currentSkin.charAt(0).toUpperCase() + currentSkin.slice(1)} was cornered by the villager! Try again!`,
        `Caught by the villager! ${currentSkin.charAt(0).toUpperCase() + currentSkin.slice(1)} couldn't get away!`
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

function ondeath() {
    villagerHurt.play();
    deathActive = true;
    deathscreen.classList.add('active');

    // Display random death message
    const deathMessageElement = document.getElementById("deathMessage");
    deathMessageElement.textContent = getRandomDeathMessage();
}
