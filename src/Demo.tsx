import * as React from "react";
import * as ReactDOM from "react-dom";

import * as BoyerMoore from "./boyerMoore";
import SearchForm from "./SearchForm";
import { SearchVisualization, SearchData } from "./SearchVisualization";

class SearchDemo extends React.Component<{}, SearchData> {
    constructor() {
        super();
        this.handleHaystackAndNeedleSubmit = this.handleHaystackAndNeedleSubmit.bind(this);
    }

    componentWillMount() {
        const haystack = "VOICI UN SIMPLE EXEMPLE.";
        const needle = "EXEMPLE";
        this.handleHaystackAndNeedleSubmit(haystack, needle);
    }

    handleHaystackAndNeedleSubmit(haystack: string, needle: string): void {
        this.setState({
            haystack: haystack,
            needle: needle,
            badCharTable: BoyerMoore.makeBadCharTable(needle),
            goodSuffixTable: BoyerMoore.makeGoodSuffixTable(needle),
            log: BoyerMoore.search(needle, haystack).log,
        });
    }

    render() {
        return (
            <div>
                <SearchForm onHaystackAndNeedleSubmit={this.handleHaystackAndNeedleSubmit} />
                <SearchVisualization {...this.state} />
            </div>
        );
    }
}

ReactDOM.render(
    <SearchDemo />,
    document.getElementById("demo")
);
