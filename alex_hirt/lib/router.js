//TODO make this work....

const Router = function() {
  this.routes = {
    'GET': {},
    'POST': {}
  };
};

Router.prototype.get = function(routeName, callback) {
  this.routes.GET[routeName] = callback;
  return this;
};

Router.prototype.post = function(routeName, callback) {
  this.routes.POST[routeName] = callback;
  return this;
};

Router.prototype.route = function() {
  var routes = this.routes;
  return function(request, response) {
    if (typeof (routes[request.method][request.url] === 'function')) {
      console.log('on line 22');
      console.log(routes[request.method][request.url]);
      return routes[request.method][request.url](request, response);
    }
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error Route Not Found');
    return response.end();
  };
};

module.exports = Router;
