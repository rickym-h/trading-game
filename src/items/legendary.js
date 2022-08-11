import IDGenerator from "./uniqueIDGenerator";

let legendaryItems = [
    {
        name: "Large Mug",
        width: 2,
        height: 2,
        itemID: IDGenerator(),
    },
    {
        name: "Small Mug",
        width: 1,
        height: 1,
        itemID: IDGenerator(),
    },
    {
        name: "Important Box",
        width: 2,
        height: 1,
        itemID: IDGenerator(),
    }
];

export default legendaryItems;