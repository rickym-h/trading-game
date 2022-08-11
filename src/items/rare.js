import IDGenerator from "./uniqueIDGenerator";

let rareItems = [
    {
        name: "Snow Globe",
        width: 1,
        height: 1,
        itemID: IDGenerator(),
    },
    {
        name: "Working Smartphone",
        width: 1,
        height: 1,
        itemID: IDGenerator(),
    },
    {
        name: "Broken Pen",
        width: 2,
        height: 1,
        itemID: IDGenerator(),
    }
];

export default rareItems;