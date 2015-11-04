import BaseModel from 'app/models/base';

const FileModel = BaseModel.extend({
    url: '/files:path',
    idAttribute: 'path'
});
FileModel.id = 'File';

export default FileModel;
