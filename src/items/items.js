import "./common"
import commonItems from "./common";
// todo add functions for rare and legendary and combination functions


function getNRandomCommonItems(n){
    let items = [];
    for (let i = 0; i < n; i++) {
        let copiedItem = {...commonItems[Math.floor(Math.random()*commonItems.length)]}
        items.push(copiedItem);
    }
    return items;
}

export default getNRandomCommonItems;