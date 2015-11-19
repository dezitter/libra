import url from 'url';
import BaseView from 'app/views/base';

const InputView = BaseView.extend({

    events: {
        'submit form': 'onSubmitForm'
    },

    _getQuery() {
        const fragment = this.app.getFragment();

        return url.parse(fragment, true).query;
    },

    getTemplateData() {
        const data = BaseView.prototype.getTemplateData.call(this);
        const query = this._getQuery();

        data.filter = query.filter;

        return data;
    },

    onSubmitForm(event) {
        event.preventDefault();

        const text = this.$('#filter').val();
        const filterUrl = url.format({
            pathname: '/files',
            query: { filter: text }
        });

        this.app.router.redirectTo(filterUrl);
    }
});
InputView.id = 'common/input';

export default InputView;
