import IDGenerator from "./uniqueIDGenerator";

let commonItems = [
    {
        name: "Rusty Pen",
        width: 1,
        height: 1,
        description: "It is a pen...",
        value: 10,
        rarity: 0,
        itemID: IDGenerator(),
    },
    {
        name: "Broken Table Leg",
        width: 1,
        height: 2,
        description: "You can generally find a few of these legs throughout the galaxy. For some reason not propping up tables...",
        value: 10,
        rarity: 0,
        itemID: IDGenerator(),
    },
    {
        name: "Mouldy Cushion",
        width: 1,
        height: 1,
        description: "I have no idea why you would want to keep this.",
        value: 10,
        rarity: 0,
        itemID: IDGenerator(),
    },
    {
        name: "Non-euclidean Box",
        width: 2,
        height: 2,
        description: "Some physicist said this was his life's work... but it looks like a nice paperweight!",
        value: 10,
        rarity: 0,
        itemID: IDGenerator(),
    },
];

export default commonItems;