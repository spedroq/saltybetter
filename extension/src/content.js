let fightOngoingText = 'Bets are locked until the next match.';
let betDirection = 0;
let alreadyBet = false;
let previousBalance = null;

let totalBets = 0;
let totalWins = 0;
let totalAmountWon = 0;

let convertToInt = (balance) => {
    return parseInt(balance.replace(',', ''), 10);
}
let randomBet = () => {
    if (!alreadyBet) {
        console.log('Selecting a new direction to bet')
        betDirection = Math.floor(Math.random() * 2);
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

let calculateFightResult = (balance) => {
    console.log('\n\n-------- Fight Results -------');
    const amountGained = convertToInt(balance) - convertToInt(previousBalance);
    console.log('previousBalance:', previousBalance);
    console.log('balance:', balance);
    console.log('amountGained:', amountGained);
    if (amountGained > 0) {
        console.log('FIGHT WON ++++');
        totalWins += 1;
    } else {
        console.log('FIGHT LOST ++++');
    }
    totalBets += 1;
    console.log(`-> Win rate so far: ${totalWins}/${totalBets}`);

    totalAmountWon += amountGained;
}

let better = async () => {
    console.log('\n\n-------- New Reading -------');
    let balanceElement = document.getElementById('balance');
    let tournamentElement = document.getElementById('tournament-note');
    let betStatusElement = document.getElementById('betstatus');
    let wagerElement = document.getElementById('wager');

    let balance = balanceElement.innerText;
    console.log('-> current balance:', balance);

    if (betStatusElement && betStatusElement.innerText !== fightOngoingText) {

        if (!alreadyBet && previousBalance !== null) {
            // Fight just Finished
            calculateFightResult(balance);
        }
        // Can Bet
        console.log('---- CAN BET -----');

        let betAmount = 0;
        if (convertToInt(balance) > 1000 && !tournamentElement) {
            console.log('** balance above 1000')
            betAmount = 1000;
            wagerElement.value = betAmount;
        } else {
            if (tournamentElement) {
                console.log('$$$$$$$$$$$$$$$$$$$$$$$$$ Tournament $$$$$$$$$$$$$$$$$$$$$$$$$')
            } else {
                console.log('-- balance below 1000')
            }
            console.log(`-- All In - Let's Go!`)
            // All In
            let allInBetElement = document.getElementById('interval10');
            allInBetElement?.click();
        }
        // Place bet
        randomBet();
        placeBet()
        previousBalance = balance;
        alreadyBet = true;
    } else {
        console.log('XXXXXXXX FIGHT ONGOING XXXXXXXX')
        alreadyBet = false;
    }

    console.log('---------------------------\n\n');
}

let sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bettingLoop() {
    while (true) {
        await better();
        await sleep(10000);
    }
}
bettingLoop();