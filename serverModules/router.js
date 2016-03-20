/* jshint esversion: 6, node: true */

const routes = {
  '/': '/index.html'
};


module.exports = {
  route: function(url) {
    if (routes[url]) return routes[url];
    return undefined;
  }
};
