import * as React from "react";

import {
    BadCharTable,
    GoodSuffixTable,
    SearchAction,
    SearchLogEntry
} from "./boyerMoore"

export interface ExplanationProps {
    logEntry: SearchLogEntry;
    haystack: string;
    needle: string;
    badCharTable: BadCharTable;
    goodSuffixTable: GoodSuffixTable;
}

function match(): JSX.Element {
    return (
        <p>
            L'index du motif (pattern) est négatif, ce qui indique que le motif a été trouvé dans le
            texte.
        </p>
    );
}

function noMatch(): JSX.Element {
    return (
        <p>
            L'index du motif (pattern) est plus grand ou égal à la taille du texte, ce qui indique que le motif n'a pas été trouvé 
            dans le texte.
        </p>
    );
}

function galilRuleMatch(): JSX.Element {
    return (
        <p>
            Du fait de la "Galil Rule" (cas d'un motif périodique), le reste du motif va convenir
            et le motif figure bien dans le texte.
        </p>
    );
}

function compareEqual(): JSX.Element {
    return (
        <p>
            Les caratères courants du texte et du motif correspondent. Nous décrémentons
            les indices du texte et du motif pour comparer les caractères suivants.
        </p>
    );
}

function shiftRule({logEntry, haystack, needle, badCharTable, goodSuffixTable}: ExplanationProps): JSX.Element {
    const needleIndex = logEntry.needleIndex;
    const haystackChar = haystack.charAt(logEntry.haystackIndex);
    const badCharShift = badCharTable(haystackChar);
    //const goodSuffixShift = goodSuffixTable[needleIndex];
    // désactivation GoodSuffix
    const goodSuffixShift = 1;
    const shift = badCharShift >= goodSuffixShift ? badCharShift : goodSuffixShift;
    const comparison = badCharShift >= goodSuffixShift ? ">=" : "<";
    const chosen = badCharShift > goodSuffixShift ? "mauvais caractère" : "bon suffixe";

    return (
        <div>
            <p>
                Les caratères courants du texte et du motif ne correspondent pas.
                On cherche ensuite le caractère du texte qui ne convient pas dans la table du mauvais caractère
                ainsi que l'index courant du motif (pattern index) dans la table des bons suffixes.
            </p>
            <div>badCharTable['{haystackChar}'] = {badCharShift}</div>
            <div>goodSuffixTable[{needleIndex}] = {goodSuffixShift}</div>
            <p>
               Puisque {badCharShift} {comparison} {goodSuffixShift} nous retenons
               la règle {chosen} et augmentons l'index du texte de {shift}.
            </p>
            { needleIndex == needle.length - 1
                ? undefined
                : <p>Nous réaffectons l'index du motif (pattern index) à {needle.length - 1}.</p>
            }
        </div>
    );
}

const explanations: Map<SearchAction, (props?: ExplanationProps) => JSX.Element> = new Map([
    [SearchAction.COMPARE_EQUAL, compareEqual],
    [SearchAction.GALIL_RULE_MATCH, galilRuleMatch],
    [SearchAction.MATCH, match],
    [SearchAction.NO_MATCH, noMatch],
    [SearchAction.SHIFT, shiftRule],
]);

let Explanation = ({logEntry, haystack, needle, badCharTable, goodSuffixTable}: ExplanationProps) => {
    const explanation = explanations.get(logEntry.action);
    return (
        <div>
            { explanation
                ? explanation({logEntry, haystack, needle, badCharTable, goodSuffixTable})
                : <p></p>
            }
        </div>
    );
};

export default Explanation;
