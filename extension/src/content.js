let fightOngoingText = 'Bets are locked until the next match.';
let betDirection = 0;
let randomBet = () => {
    if (!alreadyBet) {
        betdirection = Math.floor(Math.random() * 2);
    }
}

let placeBet = () => {
    if (betDirection === 0) {
        let redBetButton = document.getElementsByClassName('betbuttonred');
        console.log('Bet red');
        if (redBetButton?.length > 0) {
            redBetButton[0].click()
        }
    } else {
        let blueBetButton = document.getElementsByClassName('betbuttonblue');
        console.log('Bet blue')
        if (blueBetButton?.length > 0) {
            blueBetButton[0].click()
        }
    }
}

let alreadyBet = false;

let better = () => {
    console.log('\n\n--------New Reading-------');
    let balanceElement = document.getElementById('balance');
    let tournamentElement = document.getElementById('tournament-note');
    let betStatusElement = document.getElementById('betstatus');
    let wagerElement = document.getElementById('wager');

    let balance = balanceElement.innerText;
    console.log('-> current balance:', balance);

    if (betStatusElement && betStatusElement.innerText !== fightOngoingText) {
        // Can Bet
        console.log('---- CAN BET -----');

        let betAmount = 0;
        if (parseInt(balance.replace(',', ''), 10) > 1000) {
            console.log('** balance above 1000')
            betAmount = 1000;
            wagerElement.value = betAmount;
            randomBet();
            placeBet();
            alreadyBet = true;
        } else {
            console.log('-- balance below 1000')
            console.log(`-- All In - Let's Go!`)
            // All In
            let allInBetElement = document.getElementById('interval10');
            allInBetElement?.click();
            randomBet();
            placeBet()
            alreadyBet = true;
        }
    } else {
        console.log('XXXXXXXX FIGHT ONGOING XXXXXXXX')
        alreadyBet = false;
    }
}

let sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bettingLoop() {
    while (true) {
        better();
        await sleep(10000);
    }
}
console.log(fetch);
bettingLoop();