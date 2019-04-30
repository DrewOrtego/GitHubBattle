var axios = require('axios');

// use this file to export an object which handles requests
module.exports = {
    fetchPopularRepos: function (language) {
        // hits github repos with some parameters
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
    
        return axios.get(encodedURI)
            .then(function (response) {
                return response.data.items;
            });
    }
}