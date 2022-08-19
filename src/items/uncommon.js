import IDGenerator from "./uniqueIDGenerator";

let unCommonItems = [
    {
        name: "Rusty Pen",
        width: 1,
        height: 1,
        description: "Strange... Mystical artifact...",
        value: 10,
        rarity: 1,
    },
    {
        name: "Spoingy Stuff",
        width: 1,
        height: 1,
        description: "Blue, blobby and delectably spoingy!",
        value: 10,
        rarity: 1,
    },
    {
        name: "Mouldy Cushion",
        width: 1,
        height: 1,
        description: "I have no idea why you would want to keep this.",
        value: 10,
        rarity: 1,
    },
    {
        name: "Cardboard Box",
        width: 2,
        height: 2,
        description: "An entirely normal, not suspicious at all cardboard box with entirely benign qualities.",
        value: 10,
        rarity: 1,
    },
];

for (let item of unCommonItems) {
    item.itemID = IDGenerator();
}

export default unCommonItems;