var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function Header (props) {
    // Stateless Functional Component which returns the list of languages and color-codes the selected language
    var languages = ['All', 'JavaScript', 'Ruby', 'Python', 'CSS', 'Java'];
    return (
        <ul className="languages">
            {languages.map(function (lang) {
                return (
                    <li
                        style={lang === props.selectedLanguage ? { color: '#d0021b' }: null}
                        key={lang}
                        onClick={props.onSelect.bind(null, lang)}
                        >
                            {lang}
                    </li>
                )
            })}
        </ul>
    )
}

function RepoGrid (props) {
    return (
        <ul className='popular-list'>
            {props.repos.map(function (repo, index) {
                return (
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li><img className='avatar' src={repo.owner.avatar_url} alt={'Avatar for ' + repo.owner.login} /></li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos:  PropTypes.array.isRequired,
}

Header.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};

class Popular extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null,

        };

        this.updateSelectedLanguage = this.updateSelectedLanguage.bind(this);
    }

    // lifecycle events
    componentDidMount () { 
        this.updateSelectedLanguage(this.state.selectedLanguage);
    }    

    updateSelectedLanguage(lang) {  
        this.setState(function () {
            return {
                selectedLanguage: lang,
                repos: null
            }
        })        
        
        api.fetchPopularRepos(lang)
            .then(function (repos) {
                this.setState(function () {
                    return {
                        repos: repos
                    }
                })
            }.bind(this));
    }

    render() {
        return (
          <div>
            <Header
              selectedLanguage={this.state.selectedLanguage}
              onSelect={this.updateSelectedLanguage} />
              {! this.state.repos ? <p>LOADING...</p> : <RepoGrid repos={this.state.repos} /> }
          </div>
        )
    }
}

module.exports = Popular;