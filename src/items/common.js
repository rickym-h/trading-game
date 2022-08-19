import IDGenerator from "./uniqueIDGenerator";

let commonItems = [

    {
        name: "Advanced Machine Part",
        width: 2,
        height: 1,
        description: "Looks like a piece of scrap metal... sells like a piece of scrap metal!!",
        value: 10,
        rarity: 0,
    },
    {
        name: "Hyperdrive Accelerator",
        width: 1,
        height: 1,
        description: "Don't make me say these long words...",
        value: 10,
        rarity: 0,
    },
    {
        name: "Non-euclidean Box",
        width: 2,
        height: 2,
        description: "Some physicist said this was his life's work... but it looks like a nice paperweight!",
        value: 10,
        rarity: 0,
    },
    {
        name: "Singular Penrose Stair",
        width: 1,
        height: 1,
        description: "Salvaged from the debris of two ancient black holes colliding... Useful as a stool to get to high places!",
        value: 10,
        rarity: 0,
    },
    {
        name: "Perfectly Circular Borromean Rings",
        width: 1,
        height: 1,
        description: "Useful when you're in need of handcuffing a three armed... creature?",
        value: 10,
        rarity: 0,
    },
    {
        name: "Grapefruit",
        width: 1,
        height: 1,
        description: "Very stress relieving. I approve.",
        value: 10,
        rarity: 0,
    },
    {
        name: "Powdered Water",
        width: 1,
        height: 1,
        description: "Useful to transport cheaply with less weight! Just add water!",
        value: 10,
        rarity: 0,
    },

];

for (let item of commonItems) {
    item.itemID = IDGenerator();
}

export default commonItems;