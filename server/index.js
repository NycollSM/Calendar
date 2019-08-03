const http = require('http');

const Response = require('./core/response');
const {Router} = require('./core/router');

const eventsController = require('./controllers/events.controller');

const router = new Router([
    {
        path: '/api/v1/months',
        method: 'GET',
        callback: eventsController.form.bind(eventsController)
    },
    {
        path: '/api/v1/months',
        method: 'GET',
        callback: eventsController.getAll.bind(eventsController)
    },
    {
        path: '/api/v1/months',
        method: 'POST',
        callback: eventsController.createOne.bind(eventsController)
    },
    {
        path: 'api/v1/months/:id',
        method: 'GET',
        callback:eventsController.getOne.bind(eventsController)
    },
    {
        path: 'api/v1/months/:id',
        method: 'DELETE',
        callback: eventsController.removeOne.bind(eventsController)
    },
]);

const server = http.createServer((req, res) => {
    console.log('hola');
    let route = router.find(req.url, req.method);
    if(route) return route.execute(req, res);
    Response.BadRequest(res, new Error('Route not found holahola'));
});

server.listen(5000);


