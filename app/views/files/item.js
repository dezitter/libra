import BaseView from 'app/views/base';

const FileItem = BaseView.extend({

    className: `mdl-cell
                mdl-cell--3-col
                mdl-cell--3-col-desktop
                mdl-cell--4-col-tablet
                mdl-cell--4-col-phone`,

    getTemplateData() {
        return this.options.data;
    }
});
FileItem.id = 'files/item';

export default FileItem;
