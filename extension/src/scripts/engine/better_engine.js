import { betsAreOpenText, fightOngoingText, defaultConfiguration } from "../model/constants_model.js";
import { TextEngine } from "./text_engine.js";
import { sleep } from "../utils.js";

export class BetterEngine {

    betDirection = 0;
    alreadyBet = false;
    previousBalance = null;
    balance = 0;
    hasBegun = false;

    totalBets = 0;
    totalWins = 0;
    totalAmountWon = 0;

    lastMatchWasTournament = false;
    textEngine = null;

    configuration = defaultConfiguration;

    constructor() {
        this.textEngine = new TextEngine();
        this.configuration.rules.sort((a, b) => b.betAmountLimit - a.betAmountLimit)
    }

    checkForConfiguration = () => {
        const saltyBetterConfigurationElement = document.getElementById('salty-better-configuration');
        const configurationString = saltyBetterConfigurationElement?.getAttribute('configuration');
        if (!configurationString) {
            return;
        }
        const configuration = configurationString ? JSON.parse(configurationString) : null;
        console.log('\n% new configuration detected %');
        if (configuration?.rules?.length > 0) {
            configuration.rules.sort((a, b) => b.betAmountLimit - a.betAmountLimit);
            this.configuration.rules = configuration.rules;
            console.log('% new bet rules: ', configuration.rules);
        }
        console.log('\n');
        saltyBetterConfigurationElement.remove();
    }

    startBetting = async () => {
        console.log('chrome', chrome);
        await this.textEngine.textIntroduction();
        while (true) {
            await this.better();
            await sleep(15000);
        }
    }

    convertBalanceToInt = (balance) => {
        return parseInt(balance.replace(',', ''), 10);
    }
    
    randomBet = () => {
        if (!this.alreadyBet) {
            console.log('Selecting a new direction to bet')
            this.betDirection = Math.floor(Math.random() * 2);
        }
    }
    
    placeBet = () => {
        if (this.betDirection === 0) {
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
    
    placeRandomBet = () => {
        this.randomBet();
        this.placeBet()
        this.alreadyBet = true;
    }
    
    calculateFightResult = () => {
        if (!this.hasBegun) {
            console.log('**NOTE: fight ended but we have not yet bet');
            this.hasBegun = true;
            return
        }
        console.log('\n\n--- Fight Results ---');
        const amountGained = this.convertBalanceToInt(this.balance) - this.convertBalanceToInt(this.previousBalance);
        console.log('previousBalance:', this.previousBalance);
        console.log('balance:', this.balance);
        console.log('amountGained:', amountGained);
        if (amountGained >= 0) {
            console.log('FIGHT WON ++++');
            this.totalWins += 1;
        } else {
            console.log('FIGHT LOST ----');
        }
        this.totalBets += 1;
        console.log(`-> Win rate so far: ${this.totalWins}/${this.totalBets}`);
        this.totalAmountWon += amountGained;
        console.log(`-> Total bet profit: ${this.totalAmountWon}`);
        console.log('--------------\n\n');
    }
    
    betAmount = (amount) => {
        let wagerElement = document.getElementById('wager');
        wagerElement.value = amount;
        this.lastMatchWasTournament = false;
    }
    
    betAllIn = () => {
        let allInBetElement = document.getElementById('interval10');
        allInBetElement?.click();
    }
    
    better = async () => {
        this.checkForConfiguration();

        console.log('\n\n-------- New Reading -------');
        let balanceElement = document.getElementById('balance');
    
        this.balance = balanceElement.innerText;
        console.log('-> current balance:', this.balance);

        let confirmBetElement = document.getElementById('betconfirm');
        if (confirmBetElement) {
            console.log('-> Bet already placed');
            console.log('---------------------------\n\n');
            return;
        }
    
        let tournamentElement = document.getElementById('tournament-note');
        let betStatusElement = document.getElementById('betstatus');
        
        if (tournamentElement) {
            this.lastMatchWasTournament = true
        }
    
        if (betStatusElement && betStatusElement.innerText !== fightOngoingText && betStatusElement.innerText === betsAreOpenText) {
    
            if (!this.alreadyBet && this.previousBalance !== null) {
                // Fight just Finished
                this.calculateFightResult();
            }
            // Can Bet
            console.log('---- CAN BET -----');
    
            if (tournamentElement || this.lastMatchWasTournament) {
                console.log('$$$$$$ Tournament $$$$$$')
                if (!tournamentElement) {
                    console.log('$$$$$$ Final Fight Hype!!! $$$$$$')
                    this.lastMatchWasTournament = false
                } else {
                    this.lastMatchWasTournament = true
                }
                console.log(`-- All In - Let's Go!`)
                this.betAllIn();
            } else {
                this.processBetRules();
            }
            // Actually Bet
            this.placeRandomBet();
            this.previousBalance = this.balance.slice();
        } else if (betStatusElement.innerText === fightOngoingText) {
            console.log('XXXXXXXX FIGHT ONGOING XXXXXXXX')
            this.alreadyBet = false;
        } else {
            console.log('XXXXXXXX FIGHT FINISHING XXXXXXXX')
            this.alreadyBet = false;
        }
        console.log('---------------------------\n\n');
    }

    processBetRules() {
        this.lastMatchWasTournament = false;

        // Apply only the largest balance limit amount rule
        let ruleApplied = false;
        for (let rule of this.configuration.rules) {
            if (this.processBetRule(rule)) {
                ruleApplied = true;
                break;
            }
        }
        if (!ruleApplied) {
            // If no rule has been applied so far, go for all in
            console.log(`-- balance below any betting rule applied`)
            console.log(`-- All In - Let's Go!`)
            // All In
            this.betAllIn();
        }
    }

    processBetRule(rule) {
        if (this.convertBalanceToInt(this.balance) >= rule.betAmountLimit) {
            console.log(`-- balance above ${rule.betAmountLimit}`);
            if (rule?.betAmount) {
                console.log(`-- betting amount -> ${rule.betAmount}`);
                this.betAmount(rule.betAmount);
            }
            if (rule?.betPercentage) {
                // TODO: Bet a specific percentage
                // console.log(`-- betting precentage -> ${rule.betPercentage}`);
                // this.betPercentage(rule.betAmount);
            }
            return true;
        }
        return false;
    }
}