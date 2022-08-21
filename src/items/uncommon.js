import IDGenerator from "./uniqueIDGenerator";
import defaultImg from "./images/default.webp";
import rusty_pen from "./images/rusty_pen.webp"
import spoingy_stuff from "./images/spoingy_stuff.webp"
import mouldy_cushion from "./images/mouldy_cushion.webp"

// todo change values and sizes to be more interesting and unique
let unCommonItems = [
    {
        name: "Rusty Pen",
        width: 1,
        height: 1,
        description: "Strange... Mystical artifact...",
        value: 10,
        rarity: 1,
        imgSrc: rusty_pen,
    },
    {
        name: "Spoingy Stuff",
        width: 1,
        height: 1,
        description: "Blue, blobby and delectably spoingy!",
        value: 10,
        rarity: 1,
        imgSrc: spoingy_stuff,
    },
    {
        name: "Mouldy Cushion",
        width: 1,
        height: 1,
        description: "I have no idea why you would want to keep this.",
        value: 10,
        rarity: 1,
        imgSrc: mouldy_cushion,
    },
    {
        name: "Cardboard Box",
        width: 2,
        height: 2,
        description: "An entirely normal, not suspicious at all cardboard box with entirely benign qualities.",
        value: 10,
        rarity: 1,
        imgSrc: defaultImg,
    },
];

for (let item of unCommonItems) {
    item.itemID = IDGenerator();
}

export default unCommonItems;