"use strict";
import apiKey from "./key.json";

// form
const ingredientsList = document.querySelector("#ingredients-list");
const ingredientNameInput = document.querySelector(".input-ingredient");
const ingredientAmount = document.querySelector(".input-entry__amount");
const ingredientUnitEntry = document.querySelector(".input-entry__unit");
const ingredientUnitTarget = document.querySelector(".input-target");

// output
const entryAmountText = document.querySelector(".output__entry-amount");
const entryUnitText = document.querySelector(".output__entry-unit");
const entryIngredientNameText = document.querySelector(".output__target-name");
const outputAmountText = document.querySelector(".output__target-amount");
const outputUnitText = document.querySelector(".output__target-unit");

//btn
const converteBtn = document.querySelector(".converte-button");

const optionsIngredients = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${apiKey.apiKey}`,
    "X-RapidAPI-Host": "food-unit-of-measurement-converter.p.rapidapi.com",
  },
};
const daneTestowe = ["milk pppp", "suger", "flour", "salt", "potato"];

//Get List of Ingredients

const createIngredientList = (data) => {
  data.forEach((el) => {
    const ingredient = document.createElement("option");
    ingredient.setAttribute("value", el.split("_").join(" "));
    ingredient.innerText = el.split("_").join(" ");
    ingredientsList.appendChild(ingredient);
  });
};
// createIngredientList(daneTestowe);

const getIngredientsData = async () => {
  const data = await fetch(
    "https://food-unit-of-measurement-converter.p.rapidapi.com/ingredients",
    optionsIngredients
  )
    .then((response) => response.json())
    .then((response) => createIngredientList(response))
    .catch((err) => console.error(err));
};
// getIngredientsData();

/////////////////////////////////////////////////////////////////////////////////////////////////////////
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${apiKey.apiKey}`,
    "X-RapidAPI-Host": "food-unit-of-measurement-converter.p.rapidapi.com",
  },
};

const showResult = (value) => {
  entryAmountText.innerText = ingredientAmount.value;
  entryUnitText.innerText = ingredientUnitEntry.value;
  entryIngredientNameText.innerText = ingredientNameInput.value;
  outputUnitText.innerText = ingredientUnitTarget.value;
  outputAmountText.innerText = value;
  // console.log(entryIngredientNameText, ingredientNameInput);
};
const convert = async () => {
  const entryName = ingredientNameInput.value.split(" ").join("_");
  const entryAmount = ingredientAmount.value;
  const entryUnit = ingredientUnitEntry.value;
  const targetUnit = ingredientUnitTarget.value;

  await fetch(
    ` https://food-unit-of-measurement-converter.p.rapidapi.com/convert?unit=${entryUnit}&ingredient=${entryName}&value=${entryAmount}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response[targetUnit]);

      showResult(response[targetUnit]);
    })
    .catch((err) => console.error(err));
};

converteBtn.addEventListener("click", () => {
  // convert();
});
console.log(apiKey.apiKey);
