dataStringConstants = {
    trav: "травянистое",
    bulb: "луковичное",
    green: "зеленый",
    remn: "ремневидный",
    ordinary: "обычная",
    motley: "пестрый",
    oval: "овальный",
    downy: "опушенный",
    line: "линейная",
    lanc: "ланцетная",
    plicate: "складчатая",
    palm: "пальма"
};

exports.getQuestion = function (propertyName, propertyValue) {
    switch (propertyName) {
        case "lifeForm": return `Форма жизни - ${propertyValue}?`;
        case "leafColor": return `Цвет листьев - ${propertyValue}?`;
        case "leafForm": return `Форма цветка - ${propertyValue}?`;
        case "surface": return `Поверхность - ${propertyValue}?`;
        case "leafSize": return `Размер листа - ${propertyValue}?`;
        case "flowerSize": return `Размер цветка - ${propertyValue}`;
        default: return `Значение свойства ${propertyName} равно ${propertyValue}?`;
    }
};

exports.trainData =  [
    {
        lifeForm: dataStringConstants.trav,
        leafColor: dataStringConstants.green, 
        leafForm: dataStringConstants.remn, 
        surface: dataStringConstants.ordinary, 
        leafSize: "10-15см",
        flowerSize: "1-5см",
        name: "Криптантус"
    },
    {
        lifeForm: dataStringConstants.trav,
        leafColor: dataStringConstants.green,
        leafForm: dataStringConstants.remn,
        surface: dataStringConstants.ordinary,
        leafSize: "15-30см",
        flowerSize: "1-5см",
        name: "Сансеверия"
    },
    {
        lifeForm: dataStringConstants.trav,
        leafColor: dataStringConstants.motley,
        leafForm: dataStringConstants.oval,
        surface: dataStringConstants.downy,
        leafSize: "5-10см",
        flowerSize: "1-5см",
        name: "Марранта"
    },
    {
        lifeForm: dataStringConstants.bulb,
        leafColor: dataStringConstants.green,
        leafForm: dataStringConstants.line,
        surface: dataStringConstants.downy,
        leafSize: "15-30см",
        flowerSize: "5-10см",
        name: "Гемантус"
    },
    {
        lifeForm: dataStringConstants.bulb,
        leafColor: dataStringConstants.green,
        leafForm: dataStringConstants.lanc,
        surface: dataStringConstants.plicate,
        leafSize: "15-30см",
        flowerSize: "5-10см",
        name: "Эухарис"
    },
    {
        lifeForm: dataStringConstants.bulb,
        leafColor: dataStringConstants.motley,
        leafForm: dataStringConstants.lanc,
        surface: dataStringConstants.ordinary,
        leafSize: "15-30см",
        flowerSize: "5-10см",
        name: "Ланхеналия"
    },
    {
        lifeForm: dataStringConstants.palm,
        leafColor: dataStringConstants.green,
        leafForm: dataStringConstants.lanc,
        surface: dataStringConstants.ordinary,
        leafSize: "15-30см",
        flowerSize: "0-1см",
        name: "Хамеропс"
    },
    {
        lifeForm: dataStringConstants.palm,
        leafColor: dataStringConstants.motley,
        leafForm: dataStringConstants.lanc,
        surface: dataStringConstants.plicate,
        leafSize: "5-10см",
        flowerSize: "0-1см",
        name: "Птерис"
    }
];