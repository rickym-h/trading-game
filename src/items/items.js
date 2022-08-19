import commonItems from "./common";
import unCommonItems from "./uncommon";
import rareItems from "./rare";


function getNItemsOfRarity(numOfItems, rarity) {
    switch (rarity) {
        case 0:
            // Common items
            return getNRandomCommonItems(numOfItems);
        case 1:
            // Uncommon items
            return getNRandomUnCommonItems(numOfItems);
        case 2:
            // Rare items
            return getNRandomRareItems(numOfItems);
        default:
            console.log("ERROR - ITEMS OF RARITY: " + rarity + " NOT FOUND!! RETURNING DEFAULTED COMMON ITEMS");
            return getNRandomCommonItems(numOfItems);
    }
}

function getNRandomRareItems(n) {
    let items = [];
    for (let i = 0; i < n; i++) {
        let copiedItem = {...rareItems[Math.floor(Math.random()*rareItems.length)]}
        items.push(copiedItem);
    }
    return items;
}

function getNRandomUnCommonItems(n) {
    let items = [];
    for (let i = 0; i < n; i++) {
        let copiedItem = {...unCommonItems[Math.floor(Math.random()*unCommonItems.length)]}
        items.push(copiedItem);
    }
    return items;
}

function getNRandomCommonItems(n){
    let items = [];
    for (let i = 0; i < n; i++) {
        let copiedItem = {...commonItems[Math.floor(Math.random()*commonItems.length)]}
        items.push(copiedItem);
    }
    return items;
}

function getItemByID(id) {
    for (let item of commonItems) {
        if (item.itemID === id) {
            return {...item};
        }
    }
    return null;
}

let itemFunctions = {
    getItemByID,
    getNItemsOfRarity,
}

export default itemFunctions;

