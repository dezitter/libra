import BaseCollection from 'app/collections/base';
import FileModel from 'app/models/file';

const FilesCollection = BaseCollection.extend({
    model: FileModel,
    url: '/files'
});
FilesCollection.id = 'Files';

export default FilesCollection;

