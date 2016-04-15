const Router = module.exports = exports = function() {
  this.routes = {
    'GET': {},
    'POST': {}
  };
};

Router.prototype.get = function(routeName, cb) {
    this.routes.GET[routeName] = cb;
    return this;
};

Router.prototype.post = function(routeName, cb) {
  this.routes.POST[routeName] = cb;
  return this;
};

Router.prototype.route = function() {
  var routes = this.routes;
  return function(req, res) {
    if (typeof routes[req.method][req.url] === 'function') {
      return routes[req.method][req.url](req, res);
    }
    res.writeHead(404);
    res.write('Page not found');
    res.end();
  };
};
