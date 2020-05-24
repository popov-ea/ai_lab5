//часть библиотеки https://github.com/lagodiuk/decision-tree-js

function DecisionTree(builder) {        
    this.root = buildDecisionTree({
        trainingSet: builder.trainingSet,
        ignoredAttributes: arrayToHashSet(builder.ignoredAttributes),
        categoryAttr: builder.categoryAttr || 'category',
        minItemsCount: builder.minItemsCount || 1,
        entropyThrehold: builder.entropyThrehold || 0.01,
        maxTreeDepth: builder.maxTreeDepth || 70
    });
}

function arrayToHashSet(array) {
    var hashSet = {};
    if (array) {
        for(var i in array) {
            var attr = array[i];
            hashSet[attr] = true;
        }
    }
    return hashSet;
}

function countUniqueValues(items, attr) {
    var counter = {};

    // detecting different values of attribute
    for (var i = items.length - 1; i >= 0; i--) {
        // items[i][attr] - value of attribute
        counter[items[i][attr]] = 0;
    }
      
    // counting number of occurrences of each of values
    // of attribute
    for (var i = items.length - 1; i >= 0; i--) {
        counter[items[i][attr]] += 1;
    }

    return counter;
}


function entropy(items, attr) {
    // counting number of occurrences of each of values
    // of attribute
    var counter = countUniqueValues(items, attr);

    var entropy = 0;
    var p;
    for (var i in counter) {
        p = counter[i] / items.length;
        entropy += -p * Math.log(p);
    }

    return entropy;
}

function split(items, attr, predicate, pivot) {
    var match = [];
    var notMatch = [];

    var item,
        attrValue;
      
    for (var i = items.length - 1; i >= 0; i--) {
        item = items[i];
        attrValue = item[attr];

        if (predicate(attrValue, pivot)) {
            match.push(item);
        } else {
            notMatch.push(item);
        }
    };

    return {
        match: match,
        notMatch: notMatch
    };
}

function mostFrequentValue(items, attr) {
    // counting number of occurrences of each of values
    // of attribute
    var counter = countUniqueValues(items, attr);

    var mostFrequentCount = 0;
    var mostFrequentValue;

    for (var value in counter) {
        if (counter[value] > mostFrequentCount) {
            mostFrequentCount = counter[value];
            mostFrequentValue = value;
        }
    };

    return mostFrequentValue;
}
      
var predicates = {
    '==': function (a, b) { return a == b },
    '>=': function (a, b) { return a >= b }
};

function buildDecisionTree(builder) {

    var trainingSet = builder.trainingSet;
    var minItemsCount = builder.minItemsCount;
    var categoryAttr = builder.categoryAttr;
    var entropyThrehold = builder.entropyThrehold;
    var maxTreeDepth = builder.maxTreeDepth;
    var ignoredAttributes = builder.ignoredAttributes;

    if ((maxTreeDepth == 0) || (trainingSet.length <= minItemsCount)) {
        // restriction by maximal depth of tree
        // or size of training set is to small
        // so we have to terminate process of building tree
        return {
            category: mostFrequentValue(trainingSet, categoryAttr)
        };
    }

    var initialEntropy = entropy(trainingSet, categoryAttr);

    if (initialEntropy <= entropyThrehold) {
        // entropy of training set too small
        // (it means that training set is almost homogeneous),
        // so we have to terminate process of building tree
        return {
            category: mostFrequentValue(trainingSet, categoryAttr)
        };
    }

    // used as hash-set for avoiding the checking of split by rules
    // with the same 'attribute-predicate-pivot' more than once
    var alreadyChecked = {};
      
    // this variable expected to contain rule, which splits training set
    // into subsets with smaller values of entropy (produces informational gain)
    var bestSplit = {gain: 0};

    for (var i = trainingSet.length - 1; i >= 0; i--) {
        var item = trainingSet[i];

        // iterating over all attributes of item
        for (var attr in item) {
            if ((attr == categoryAttr) || ignoredAttributes[attr]) {
                continue;
            }

            // let the value of current attribute be the pivot
            var pivot = item[attr];

            // pick the predicate
            // depending on the type of the attribute value
            var predicateName;
            if (typeof pivot == 'number') {
                predicateName = '>=';
            } else {
                // there is no sense to compare non-numeric attributes
                // so we will check only equality of such attributes
                predicateName = '==';
            }

            var attrPredPivot = attr + predicateName + pivot;
            if (alreadyChecked[attrPredPivot]) {
                // skip such pairs of 'attribute-predicate-pivot',
                // which been already checked
                continue;
            }
            alreadyChecked[attrPredPivot] = true;

            var predicate = predicates[predicateName];
      
            // splitting training set by given 'attribute-predicate-value'
            var currSplit = split(trainingSet, attr, predicate, pivot);

            // calculating entropy of subsets
            var matchEntropy = entropy(currSplit.match, categoryAttr);
            var notMatchEntropy = entropy(currSplit.notMatch, categoryAttr);

            // calculating informational gain
            var newEntropy = 0;
            newEntropy += matchEntropy * currSplit.match.length;
            newEntropy += notMatchEntropy * currSplit.notMatch.length;
            newEntropy /= trainingSet.length;
            var currGain = initialEntropy - newEntropy;

            if (currGain > bestSplit.gain) {
                // remember pairs 'attribute-predicate-value'
                // which provides informational gain
                bestSplit = currSplit;
                bestSplit.predicateName = predicateName;
                bestSplit.predicate = predicate;
                bestSplit.attribute = attr;
                bestSplit.pivot = pivot;
                bestSplit.gain = currGain;
            }
        }
    }

    if (!bestSplit.gain) {
        // can't find optimal split
        return { category: mostFrequentValue(trainingSet, categoryAttr) };
    }

    // building subtrees
      
    builder.maxTreeDepth = maxTreeDepth - 1;

    builder.trainingSet = bestSplit.match;
    var matchSubTree = buildDecisionTree(builder);

    builder.trainingSet = bestSplit.notMatch;
    var notMatchSubTree = buildDecisionTree(builder);

    return {
        attribute: bestSplit.attribute,
        predicate: bestSplit.predicate,
        predicateName: bestSplit.predicateName,
        pivot: bestSplit.pivot,
        match: matchSubTree,
        notMatch: notMatchSubTree,
        matchedCount: bestSplit.match.length,
        notMatchedCount: bestSplit.notMatch.length
    };
}

exports.DecisionTree = DecisionTree;