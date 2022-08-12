import IDGenerator from "./uniqueIDGenerator";

let commonItems = [
    {
        name: "Rusty Pen",
        width: 1,
        height: 1,
        description: "Strange... Mystical artifact...",
        value: 10,
        rarity: 0,
    },
    {
        name: "Broken Table Leg",
        width: 1,
        height: 2,
        description: "You can generally find a few of these legs throughout the galaxy. For some reason doesn't prop up tables...",
        value: 10,
        rarity: 0,
    },
    {
        name: "Mouldy Cushion",
        width: 1,
        height: 1,
        description: "I have no idea why you would want to keep this.",
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
];

for (let item of commonItems) {
    item.itemID = IDGenerator();
}

export default commonItems;