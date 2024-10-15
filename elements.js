"use strict";

// Sélectionner les éléments
const accountBalance = document.querySelector(".balance");
const inputMiseEl = document.querySelector(".inputMise");
const currentBet = document.querySelector(".currentBet");
const tradBtnEl = document.querySelectorAll(".buy, .sell");
const lessMore = document.querySelectorAll(".more, .less");
const notificationEl = document.querySelector(".notification");
const resultNotifEl = document.querySelector(".resultNotif");
const addMoneyWindow = document.querySelector(".addMoneyWindow");
const investissement = document.querySelector(".investisment");
const closeBtn = document.querySelector(".closeBtn");
const maxAddMoney = document.querySelector(".maxAddMoney");
const inputAddMoney = document.querySelector(".inputAddMoney");
const addBtn = document.querySelector(".addBtn");

export {
    accountBalance,
    inputMiseEl,
    tradBtnEl,
    currentBet,
    lessMore,
    notificationEl, // Export de la notification
    resultNotifEl, // Export du texte de notification
    addMoneyWindow,
    investissement,
    closeBtn,
    maxAddMoney,
    inputAddMoney,
    addBtn,
};
