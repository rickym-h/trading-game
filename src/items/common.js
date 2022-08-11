import IDGenerator from "./uniqueIDGenerator";

let commonItems = [
    {
        name: "Rusty Pen",
        width: 1,
        height: 2,
        description: "It is a pen...",
        value: 10,
        itemID: IDGenerator(),
    },
    {
        name: "Broken Table Leg",
        width: 1,
        height: 3,
        itemID: IDGenerator(),
    },
    {
        name: "Mouldy Cushion",
        width: 1,
        height: 1,
        itemID: IDGenerator(),
    },
    {
        name: "Non-euclidean Box",
        width: 1,
        height: 1,
        itemID: IDGenerator(),
    },
];

export default commonItems;