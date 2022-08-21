import defaultImg from "./images/default.webp"
import advanced_machine_part from "./images/advanced_machine_part.webp"
import grapefruit from "./images/grapefruit.webp"
import perfectly_circular_borromean_rings from "./images/perfectly_circular_borromean_rings.webp"
import powdered_water from "./images/powdered_water.webp"
import singular_penrose_stair from "./images/singular_penrose_stair.webp"

import IDGenerator from "./uniqueIDGenerator";

// All values between 1-99;
// todo change values and sizes to be more interesting and unique

let commonItems = [

    {
        name: "Advanced Machine Part",
        width: 2,
        height: 1,
        description: "Looks like a piece of scrap metal... sells like a piece of scrap metal!!",
        value: 20,
        rarity: 0,
        imgSrc: advanced_machine_part,
    },
    {
        name: "Hyperdrive Accelerator",
        width: 2,
        height: 3,
        description: "Don't make me say these long words...",
        value: 10,
        rarity: 0,
        imgSrc: defaultImg,
    },
    {
        name: "Non-euclidean Box",
        width: 2,
        height: 2,
        description: "Some physicist said this was his life's work... but it looks like a nice paperweight!",
        value: 10,
        rarity: 0,
        imgSrc: defaultImg,
    },
    {
        name: "Singular Penrose Stair",
        width: 1,
        height: 1,
        description: "Salvaged from the debris of two ancient black holes colliding... Useful as a stool to get to high places!",
        value: 10,
        rarity: 0,
        imgSrc: singular_penrose_stair,
    },
    {
        name: "Perfectly Circular Borromean Rings",
        width: 1,
        height: 1,
        description: "Useful when you're in need of handcuffing a three armed... creature?",
        value: 10,
        rarity: 0,
        imgSrc: perfectly_circular_borromean_rings,
    },
    {
        name: "Grapefruit",
        width: 1,
        height: 1,
        description: "Very stress relieving. I approve.",
        value: 10,
        rarity: 0,
        imgSrc: grapefruit,
    },
    {
        name: "Powdered Water",
        width: 1,
        height: 1,
        description: "Useful to transport cheaply with less weight! Just add water!",
        value: 10,
        rarity: 0,
        imgSrc: powdered_water,
    },

];

for (let item of commonItems) {
    item.itemID = IDGenerator();
}

export default commonItems;