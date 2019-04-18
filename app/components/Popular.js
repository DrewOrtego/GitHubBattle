var React = require('react');

class Popular extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedLanguage: 'All'
        };

        // returns a new function with "this" always bound to the "this" keyword from the Popular component's context
        this.updateSelectedLanguage = this.updateSelectedLanguage.bind(this);
    }

    updateSelectedLanguage(lang) {
        // Envoked when a user clicks a language, making it the new "selected language"
        this.setState(function () {  // "this" now refers to the Popular component, thanks to "bind"
            return {
                selectedLanguage: lang
            }
        })
    }

    render() {
        var languages = ['All', 'JavaScript', 'Ruby', 'Python', 'CSS', 'Java'];
        
        return (
            <ul className="languages">
                {languages.map(function (lang) {
                    return (
                        <li
                            style={lang === this.state.selectedLanguage ? { color: '#d0021b' }: null}
                            key={lang}
                            onClick={this.updateSelectedLanguage.bind(null, lang)} // returns a new function passing it the language    
                            >
                                {lang}
                        </li>
                    )
                }, this)}
            </ul>
        )
    }
}

module.exports = Popular;