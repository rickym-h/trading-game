import IDGenerator from "./uniqueIDGenerator";
import defaultImg from "./images/default.webp";
import left_handed_marble from "./images/left_handed_marble.webp";
import ancient_paperclip from "./images/ancient_paperclip.webp";
import unreasonably_heavy_mug from "./images/unreasonably_heavy_mug.webp";

// todo change values and sizes to be more interesting and unique
let rareItems = [
    {
        name: "Broken Table Leg",
        width: 1,
        height: 2,
        description: "You can generally find a few of these legs throughout the galaxy. For some reason doesn't prop up tables...",
        value: 10,
        rarity: 2,
        imgSrc: defaultImg,
    },
    {
        name: "Doorless Fridge",
        width: 1,
        height: 2,
        description: "A fridge with no door. Definitely not a cool dry place.",
        value: 10,
        rarity: 2,
        imgSrc: defaultImg,
    },
    {
        name: "Left-Handed Marble",
        width: 1,
        height: 1,
        description: "DONT USE WITH YOUR RIGHT HAND - VERY DANGEROUS!!!",
        value: 10,
        rarity: 2,
        imgSrc: left_handed_marble,
    },
    {
        name: "Ancient Paperclip",
        width: 1,
        height: 1,
        description: "They spoke of these tools in the ancient scriptures... they say they could bind a thousand pages of crossword puzzles together...",
        value: 10,
        rarity: 2,
        imgSrc: ancient_paperclip,
    },
    {
        name: "Unreasonably Heavy Mug",
        width: 1,
        height: 1,
        description: "I'm not picking that up - if you want to buy it, you pick it up.",
        value: 10,
        rarity: 2,
        imgSrc: unreasonably_heavy_mug,
    },
];

for (let item of rareItems) {
    item.itemID = IDGenerator();
}

export default rareItems;