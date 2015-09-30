function search(needle, haystack) {
    var badCharTable = makeBadCharTable(needle);
    var goodSuffixTable = makeGoodSuffixTable(needle);

    var haystackIndex = needle.length - 1;
    var previousHaystackIndex = -1;
    var needleIndex = needle.length - 1;

    while (haystackIndex < haystack.length) {
        if (needleIndex < 0 || haystackIndex == previousHaystackIndex) {
            return true;
        } else if (needle.charAt(needleIndex) === haystack.charAt(haystackIndex)) {
            haystackIndex--;
            needleIndex--;
        } else {
            var shift = Math.max(badCharTable(haystack.charAt(haystackIndex)), goodSuffixTable[needleIndex]);
            previousHaystackIndex = shift >= needleIndex + 1 ? haystackIndex : previousHaystackIndex;
            haystackIndex += shift;
            needleIndex = needle.length - 1;
        }
    }

    // No match found, return false
    return false;
}

function searchLog(needle, haystack) {
    var log = [];
    var badCharTable = makeBadCharTable(needle);
    var goodSuffixTable = makeGoodSuffixTable(needle);

    var haystackIndex = needle.length - 1;
    var previousHaystackIndex = -1;
    var needleIndex = needle.length - 1;

    while (haystackIndex < haystack.length) {
        if (needleIndex < 0) {
            log.push({
                haystackIndex: haystackIndex,
                needleIndex: needleIndex,
                name: 'MATCH'
            });
            return log;
        } else if (haystackIndex == previousHaystackIndex) {
            log.push({
                haystackIndex: haystackIndex,
                needleIndex: needleIndex,
                name: 'GALIL_RULE_MATCH'
            });
            return log;
        } else if (needle.charAt(needleIndex) === haystack.charAt(haystackIndex)) {
            log.push({
                haystackIndex: haystackIndex,
                needleIndex: needleIndex,
                name: 'COMPARE_EQUAL'
            });
            haystackIndex--;
            needleIndex--;
        } else {
            log.push({
                haystackIndex: haystackIndex,
                needleIndex: needleIndex,
                name: 'COMPARE_NOT_EQUAL'
            });
            var badCharShift = badCharTable(haystack.charAt(haystackIndex));
            var goodSuffixShift = goodSuffixTable[needleIndex];
            var shift = Math.max(badCharShift, goodSuffixShift);

            if (shift >= needleIndex + 1) {
                log.push({
                    haystackIndex: haystackIndex,
                    needleIndex: needleIndex,
                    name: 'GALIL_RULE_UPDATE',
                    previousHaystackIndex: previousHaystackIndex
                });
            }

            if (badCharShift > goodSuffixShift) {
                log.push({
                    haystackIndex: haystackIndex,
                    needleIndex: needleIndex,
                    name: 'SHIFT_BADCHAR_RULE',
                    shift: badCharShift
                });
            } else {
                log.push({
                    haystackIndex: haystackIndex,
                    needleIndex: needleIndex,
                    name: 'SHIFT_GOODSUFFIX_RULE',
                    shift: goodSuffixShift
                });
            }

            previousHaystackIndex = shift >= needleIndex + 1 ? haystackIndex : previousHaystackIndex;
            haystackIndex += shift;
            needleIndex = needle.length - 1;
        }
    }

    // No match found
    log.push({
        haystackIndex: haystackIndex,
        needleIndex: needleIndex,
        name: 'NO_MATCH'
    });

    return log;
}

function makeBadCharTable(needle) {
    var table = [];
    for (var i = 0; i < needle.length; i++) {
        table[needle.charAt(i)] = i;
    }

    var lookup = function(badChar) {
        if (table[badChar] === undefined) {
            return needle.length;
        } else {
            return needle.length - 1 - table[badChar];
        }
    }

    return lookup;
}

function makeGoodSuffixTable(needle) {
    var table = []
    var lastPrefixIndex = needle.length - 1;

    // Case 1. Suffix appears in needle
    for (var i = needle.length - 1; i >= 0; i--) {
        if (needle.startsWith(needle.substring(i + 1))) {
            lastPrefixIndex = i + 1;
        }
        table[i] = lastPrefixIndex + (needle.length - 1 - i);
    }

    // Case 2. Prefix of suffix appears in needle
    for (var i = 0; i < needle.length - 1; i++) {
        var suffixLength = getSuffixLength(needle, i);

        if (needle.charAt(i - suffixLength) !== needle.charAt(needle.length - 1 - suffixLength)) {
            table[needle.length - 1 - suffixLength] = needle.length - 1 - i + suffixLength;
        }
    }

    return table;
}

// Returns the length of the longest suffix of needle that ends on needle[index]
function getSuffixLength(needle, index) {
    var suffixLength = 0;
    for (var i = index; i >= 0 && needle.charAt(i) == needle.charAt(needle.length - 1 - index + i); i--) {
        suffixLength += 1;
    }

    return suffixLength;
}

module.exports = {
    search: search,
    searchLog: searchLog,
    _makeBadCharTable: makeBadCharTable,
    _makeGoodSuffixTable: makeGoodSuffixTable,
    _getSuffixLength: getSuffixLength
};
