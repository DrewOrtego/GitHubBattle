var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');

require('./index.css');

class Users extends React.Component {
    render() {
        return (
            <div>
            <h1>Friends</h1>
            <ul>
                {this.props.list.filter(function (user) {
                    return user.friend === true
                }).map(function(f) {
                    return <li key={f.name}> {f.name} </li>
                })}
            </ul>
            
            <hr />
            
            <h1>Frenemies</h1>
            <ul>
                {this.props.list.filter(function (user) {
                    return user.friend === false
                }).map(function(f) {
                    return <li key={f.name}> {f.name} </li>
                })}
            </ul>        
            </div>
        )
    }
}

Users.propTypes = {
    // list: PropTypes.array.isRequired
    list: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        friend: PropTypes.bool.isRequired
    }))
}
  
ReactDOM.render(
<Users list={[
    { name: 'Tyler', friend: true },
    { name: 'Ryan', friend: true },
    { name: 'Michael', friend: false },
    { name: 'Mikenzi', friend: false },
    { name: 'Jessica', friend: true },
    { name: 'Dan', friend: false } ]}
    />,
    document.getElementById('app')
);