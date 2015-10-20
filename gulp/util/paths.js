export default {

    templates_src: 'app/templates/**/*.hbs',
    templates_src_ignore: '!app/templates/**/__*.hbs',
    templates_dest: 'app/templates/compiledTemplates.js',

    css_src: 'assets/scss/**/*.scss',
    css_dest: 'public/css',

    js_src: 'app/client.js',
    js_dest: 'public/js/bundle.js'
};
