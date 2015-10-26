var React = require("react");

var BadCharTable = React.createClass({
    render: function() {
        var needleArray = this.props.children.split("");
        var badCharTable = this.props.badCharTable;

        var tableHeader = needleArray.map(function(char, index) {
            return (
                <td key={index}>
                    <samp>
                        <span>{char}</span>
                    </samp>
                </td>
            );
        });

        var tableBody = needleArray.map(function(char, index) {
            return (
                <td key={index}>
                    <samp>
                        <span>{badCharTable(char)}</span>
                    </samp>
                </td>
            );
        });

        return (
            <table className="shiftTable">
                <thead>
                    <tr>
                        {tableHeader}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {tableBody}
                    </tr>
                </tbody>
            </table>
        );
    }
});

module.exports = BadCharTable;