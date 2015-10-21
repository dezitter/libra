import BaseModel from 'app/models/base';

const FileModel = BaseModel.extend({
    url: '/files/:name',
    idAttribute: 'name'
});
FileModel.id = 'File';

export default FileModel;
