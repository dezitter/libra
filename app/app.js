import RendrApp from 'rendr/shared/app';

export default RendrApp.extend({
    start() {
        this.listenTo(this.router, {
            'action:start': () => { this.set('loading', true); },
            'action:end'  : () => { this.set('loading', false); }
        }, this);

        RendrApp.prototype.start.call(this);
    }
});
