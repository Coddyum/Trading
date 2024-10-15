"use strict";

// Sélectionner les éléments
import {
    accountBalance,
    inputMiseEl,
    tradBtnEl,
    currentBet,
    lessMore,
    notificationEl,
    resultNotifEl, // Ajout pour la notification
    addMoneyWindow,
    investissement,
    closeBtn,
    maxAddMoney,
    inputAddMoney,
    addBtn,
} from "./elements.js";

// Valeurs pour ajuster la mise
let currentBalance = (accountBalance.textContent = 2000);
let limite = 15000;
maxAddMoney.textContent = limite;
const less = -100;
const more = 100;

// Fonction pour afficher la notification
const showNotification = (amount, type) => {
    // Met à jour le texte de la notification
    resultNotifEl.innerHTML = `<span>$</span>${amount}`;

    // Applique la classe correspondante au type (succès ou erreur)
    notificationEl.classList.remove("success", "error");
    notificationEl.classList.add(type === "gain" ? "success" : "error");

    // Affiche la notification
    notificationEl.classList.add("show");

    // Cache la notification après 3 secondes
    setTimeout(() => {
        notificationEl.classList.add("hide");
    }, 3000);

    // Retire la notification après l'animation
    setTimeout(() => {
        notificationEl.classList.remove("show", "hide");
    }, 3000);
};

const switchAddMoney = () => {
    addMoneyWindow.classList.toggle("hidden");
    investissement.classList.toggle("hidden");
    closeBtn.addEventListener("click", switchAddMoney);
};

// Générer un nombre aléatoire
const generateNumberBetween = (a, b) => {
    return Math.trunc(Math.random() * (b - a)) + a;
};

// - et + pour ajuster la mise
lessMore.forEach((item) => {
    item.addEventListener("click", function () {
        let currentBetVal = Number(inputMiseEl.value) || 0;

        if (item.classList.contains("less")) {
            if (currentBetVal + less >= 0) {
                inputMiseEl.value = currentBetVal + less;
                inputMiseEl.classList.remove("error-mise");
            } else {
                inputMiseEl.value = 0;
            }
        } else if (item.classList.contains("more")) {
            if (currentBetVal + more < accountBalance.textContent) {
                inputMiseEl.value = currentBetVal + more;
                inputMiseEl.classList.remove("error-mise");
            } else {
                inputMiseEl.value = accountBalance.textContent;
            }
        }
    });
});

// Vérification des informations de mise de l'utilisateur
const checkUserMiseInfo = () => {
    if (
        !(inputMiseEl.value > currentBalance) &&
        inputMiseEl.value >= 100 &&
        inputMiseEl.value <= 99000000
    ) {
        currentBet.textContent = inputMiseEl.value;
        currentBalance = accountBalance.textContent -= inputMiseEl.value;
        return true;
    } else {
        alert("Votre mise n'est pas valide");
        inputMiseEl.classList.add("error-mise");
        return false;
    }
};

// Calcul du résultat final de la mise
const finalsMise = (actionType, mise, randomNumber) => {
    let result;
    if (actionType === 0) {
        // Achat
        result = mise + (mise * randomNumber) / 100;
        showNotification(Math.abs(result - mise), "gain");
    } else if (actionType === 1) {
        // Vente
        result = mise - (mise * randomNumber) / 100;
        if (result < mise) {
            showNotification(Math.abs(result - mise), "loss"); // Si perte
        } else {
            showNotification(Math.abs(result - mise), "gain"); // Si gain
        }
    }
    return result;
};

// Gestion de l'action de trading
const tradingAction = tradBtnEl.forEach((item) => {
    item.addEventListener("click", function () {
        let randomNumber = generateNumberBetween(-100, 100);
        if (item.classList.contains("buy") || item.classList.contains("sell")) {
            if (checkUserMiseInfo()) {
                const actionType = item.classList.contains("buy") ? 0 : 1;

                document.querySelector(".randomNumber").textContent =
                    randomNumber;
                inputMiseEl.value = null;

                currentBalance += finalsMise(
                    actionType,
                    Math.floor(Number(currentBet.textContent)),
                    randomNumber
                );
                accountBalance.textContent = Math.floor(currentBalance);

                console.log(currentBalance);
            }
        }
    });
});

// Vérification de l'ajout d'argent
const checkUserAddMoney = () => {
    const moneyToAdd = Number(inputAddMoney.value);
    const remainingLimit = Number(maxAddMoney.textContent);

    if (moneyToAdd >= 100 && moneyToAdd <= remainingLimit) {
        maxAddMoney.textContent = remainingLimit - moneyToAdd;
        currentBalance = Number(accountBalance.textContent) + moneyToAdd;
        accountBalance.textContent = currentBalance;
        return true;
    } else {
        alert(
            `Vous ne pouvez pas ajouter plus que la limite restante : ${remainingLimit}`
        );
        return false;
    }
};

// Ajout d'argent via la fenêtre
document.querySelector(".moneyAddBtn").addEventListener("click", function () {
    switchAddMoney();
    addBtn.addEventListener("click", function () {
        if (checkUserAddMoney()) {
            switchAddMoney();
            inputAddMoney.value = null;
        }
    });
});
