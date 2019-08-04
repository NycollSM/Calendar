
const fs = require('fs');
const fsPromise = require('fs').promises;
const ObjectId = require('mongodb').ObjectId;

const Controller = require('../core/controller');
const Response = require('../core/response');
const Utils = require('../core/utils');

const ControllerConfig = {
    dir: `${__dirname}/../../images`,
    collection: 'images',
    keys: ['_id', 'name', 'date', 'createNote']
};

class eventsC extends Controller {
    constructor(config = ControllerConfig) {
        super(config);

        this.dir = config.dir;
      //  this.formidable = new formidable.IncomingForm();
    }

    getAll (req, res, route) {
        this._find({}, route.query)
            .then(images => Response.Send(res, images))
            .catch(err => Response.ApplicationError(res, err));
    }

    createOne (req, res, route) {
        this.parse(req, (err, fields, files) => {
            if(err) return Response.ApplicationError(res, err);
        });
    }

async createOne (req, res, route) {
        let event = Utils.sanitize(route.data, ['name', 'hour', 'favorites', 'notes']);

        let error = await this.validBrand(event);
        if(error) return Response.BadRequest(res, error);
    }
    _validEvent (event = {}) {
        if(Utils.isEmpty(event) || !event.hour || !event.name)
        return new Error('Event name and hour are required.');
    }

 
    form (req, res, route) {
        let form = `<form action="api/v1/months/events" enctype="multipart/form-data" method="POST">
               <input type="text" name="name">
               <input type="file" name="upload">
               <input type="submit" value="Upload">
           </form>`;
        return Response.Send(res, form, {'Content-Type': 'text/html'});
    }
   
    getOne (req, res, route) {
        let id = route.params.id;
        let query = route.query;

        if(!Utils.isId(id))
            return Response.BadRequest(res, new Error(`Invalid ID`));

        this._findOne(id)
            .then(({path, name, type, extension}) => {
                let headers = {
                    'Content-disposition': `attachment; filename=${name}.${extension}`,
                    'Content-Type': type
                };
                if(query && query.display === 'true' || query.display === '1')
                    delete headers['Content-disposition'];
                Response.Send(res, fs.createReadStream(path), headers);
            })
            .catch(err => Response.ApplicationError(res, err));
    }

    removeOne (req, res, route) {
        let id = route.params.id;
        if(!Utils.isId(id)) return Response.ApplicationError(res, new Error(`Invalid ID`));

        this._remove(id)
            .then(() => Response.send(res, {id}))
            .catch(err => Response.ApplicationError(res, err))
    }
}

module.exports = new eventsC();