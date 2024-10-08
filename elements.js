"use strict";

const trading = document.querySelectorAll(".buyIt, .sellIt");
const lessMore = document.querySelectorAll(".less, .more");
const inputMise = document.querySelector(".mise");
const accountBalance = document.querySelector(".accountBalance");
const currentMise = document.querySelector(".currentMise");
const investissement = document.querySelector(".investir");
const closeBtn = document.querySelector(".close-btn");
const maxAddMoney = document.querySelector(".limite");
const inputAddMoney = document.querySelector(".number-input");
const addBtn = document.querySelector(".add-btn");
const addMoneyWindow = document.querySelector(".custom-section");

export {
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
};
