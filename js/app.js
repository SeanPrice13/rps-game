// Variables
const rock = document.getElementById('player-section').firstElementChild,
    paper = rock.nextElementSibling,
    scissors = paper.nextElementSibling,
    comPlayer = document.getElementById('CPU-section').firstElementChild,
    comChoice = [rock.src, paper.src, scissors.src],
    reloadGame = document.getElementById('reload').addEventListener('click', () => location.reload());
let wins = 0,
    losses = 0,
    ties = 0,
    round = 1;

document.getElementById('round').innerText = `Round ${round}`;
document.getElementById('status').innerText = 'Pick a hand.';

// Functions
const playerChoice = (e) => {
    [rock, paper, scissors].map(item => item.removeEventListener("click", playerChoice));
    let rand = comChoice[Math.floor(Math.random() * comChoice.length)];
    comPlayer.src = rand;
    const siblings = (ele) => [].slice.call(ele.parentNode.children).filter((child) => child !== ele);
    siblings(e.target).map(el => el.style.display = 'none');
    e.target.src == comPlayer.src ? roundTie() : validateRound(e.target.src, comPlayer.src);
    newRound();
};

const roundWin = () => {
    rock.parentElement.setAttribute("id", "win");
    comPlayer.parentElement.setAttribute("id", "lose");
    document.getElementById("status").innerText = "You Won!";
    wins++;
};

const roundLose = () => {
    rock.parentElement.setAttribute("id", "lose");
    comPlayer.parentElement.setAttribute("id", "win");
    document.getElementById("status").innerText = "Sorry, You Lost.";
    losses++;
}

const roundTie = () => {
    rock.parentElement.setAttribute("id", "tie");
    comPlayer.parentElement.setAttribute("id", "tie");
    document.getElementById("status").innerText = "It's a Tie!";
    ties++;
}

const validateRound = (playerPick, comPick) => {
    (playerPick == rock.src && comPick == scissors.src) ||
    (playerPick == paper.src && comPick == rock.src) ||
    (playerPick == scissors.src && comPick == paper.src)
      ? roundWin()
      : roundLose();
}

const newRound = () => {
    setTimeout(() => {
        [rock, paper, scissors].map(item => item.addEventListener("click", playerChoice));
        document.getElementById('round').innerText = `Round ${round++}`;
        document.getElementById('status').innerText = `Wins: ${wins} Losses: ${losses} Ties: ${ties}`;
        rock.parentElement.setAttribute('id', 'player-section');
        comPlayer.parentElement.setAttribute('id', 'CPU-section');
        paper.style.display = 'inline';
        rock.style.display = 'inline';
        scissors.style.display = 'inline';
        comPlayer.src = rock.src;
    }, 1000);
} 
newRound(); // Nice 😏