import * as React from "react";

export interface HaystackProps {
    haystack: string;
    haystackIndex: number;
    matchLength: number;
    currentCharsMatch: boolean;
}

const previousMatchStyle = {
    backgroundColor: "green",
    color: "white",
}

const matchStyle = {
    color: "green",
};

const noMatchStyle = {
    color: "red",
};

let Haystack = ({haystack, haystackIndex, matchLength, currentCharsMatch}: HaystackProps) => {
    const prefix = haystack.substring(0, haystackIndex);
    const suffix = haystack.substring(Math.max(haystackIndex + matchLength, 1));
    const match = haystack.substring(haystackIndex, haystackIndex + matchLength);
    let current = match.charAt(0);
    let alreadyMatched = match.substring(1);

    // Fix highlighting of matches that start at index 0
    if (haystackIndex < 0) {
        current = "";
        alreadyMatched = match;
    }

    return (
        <samp className="haystack">
            <span> :: Texte :: </span>
            <span>{prefix}</span>
            <span style={currentCharsMatch ? matchStyle : noMatchStyle}>{current}</span>
            <span style={previousMatchStyle}>{alreadyMatched}</span>
            <span>{suffix}</span>
        </samp>
    );
};

export default Haystack;
