"use strict";

// Sélectionner les éléments
import {
    trading,
    lessMore,
    inputMise,
    accountBalance,
    currentMise,
    investissement,
    closeBtn,
    maxAddMoney,
    inputAddMoney,
    addBtn,
    addMoneyWindow,
} from "./elements.js";

// Valeurs pour ajuster la mise
let currentBalance = (accountBalance.textContent = 2000);
let limite = (maxAddMoney.textContent = 15000);
const less = -100;
const more = 100;

const switchAddMoney = () => {
    addMoneyWindow.classList.toggle("hidden");
    investissement.classList.toggle("hidden");
    closeBtn.addEventListener("click", switchAddMoney);
};

// Generate Random Number
const generateNumberBetween = (a, b) => {
    return Math.trunc(Math.random() * (b - a)) + a;
};

// - and + input mise option
lessMore.forEach((item) => {
    item.addEventListener("click", function () {
        let currentMise = Number(inputMise.value) || 0;

        if (item.classList.contains("less")) {
            if (currentMise + less >= 0) {
                inputMise.value = currentMise + less;
                inputMise.classList.remove("error-mise");
            } else {
                inputMise.value = 0;
            }
        } else if (item.classList.contains("more")) {
            if (currentMise + more < accountBalance.textContent) {
                inputMise.value = currentMise + more;
                inputMise.classList.remove("error-mise");
            } else {
                inputMise.value = accountBalance.textContent;
            }
        }
    });
});

const checkUserMiseInfo = () => {
    if (
        !(inputMise.value > currentBalance) &&
        inputMise.value >= 100 &&
        inputMise.value <= 99000000
    ) {
        currentMise.textContent = inputMise.value;
        currentBalance = accountBalance.textContent -= inputMise.value;
        return true;
    } else {
        alert("Votre mise n'est pas valide");
        inputMise.classList.add("error-mise");
        return false;
    }
};

const finalsMise = (actionType, mise, randomNumber) => {
    if (actionType === 0) {
        return mise + (mise * randomNumber) / 100;
    } else if (actionType === 1) {
        return mise - (mise * randomNumber) / 100;
    }
};

const tradingAction = trading.forEach((item) => {
    item.addEventListener("click", function () {
        let randomNumber = generateNumberBetween(-100, 100);
        if (
            item.classList.contains("buyIt") ||
            item.classList.contains("sellIt")
        ) {
            if (checkUserMiseInfo()) {
                const actionType = item.classList.contains("buyIt") ? 0 : 1;

                document.querySelector(".tendance").textContent = randomNumber;
                inputMise.value = null;

                currentBalance += finalsMise(
                    actionType,
                    Math.floor(Number(currentMise.textContent)),
                    randomNumber
                );
                document.querySelector(".accountBalance").textContent =
                    Math.floor(currentBalance);

                console.log(currentBalance);
            }
        }
    });
});

const checkUserAddMoney = () => {
    if (
        !(inputAddMoney.value > limite) &&
        inputAddMoney.value >= 100 &&
        inputAddMoney.value <= limite
    ) {
        if (maxAddMoney.textContent > 0) {
            maxAddMoney.textContent -= inputAddMoney.value;
            currentBalance =
                Number(accountBalance.textContent) +
                Number(inputAddMoney.value);
            accountBalance.textContent = currentBalance;
            return true;
        }
    }
};

document.querySelector(".addMoney").addEventListener("click", function () {
    switchAddMoney();
    addBtn.addEventListener("click", function () {
        if (checkUserAddMoney()) {
            switchAddMoney();
            inputAddMoney.value = null;
        }
    });
});
