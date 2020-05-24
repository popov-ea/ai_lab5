const readline = require("readline");
const {DecisionTree} = require("./DecisionTree");
const helpers = require("./TreeHelpers");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const data = helpers.trainData;

var tree = new DecisionTree({
    trainingSet: data,
    categoryAttr: "name",
});

const makeDialog = function (node) {
    if (node.category) {
        rl.write("Результат - " + node.category);
        return;
    }
    rl.question(
        helpers.getQuestion(node.attribute, node.pivot),
        (answer) => {
            if (answer === "y") {
                makeDialog(node.match);
            } else {
                makeDialog(node.notMatch)
            }
    });
}

makeDialog(tree.root);



