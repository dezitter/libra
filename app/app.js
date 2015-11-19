import RendrApp from 'rendr/shared/app';

import handlebarsHelpers from 'app/lib/handlebars-helpers';

export default RendrApp.extend({

    initialize() {
        this.templateAdapter.registerHelpers(handlebarsHelpers);
    },

    start() {
        this.listenTo(this.router, {
            'action:start': () => { this.set('loading', true); },
            'action:end'  : () => { this.set('loading', false); }
        }, this);

        RendrApp.prototype.start.call(this);
    }
});
