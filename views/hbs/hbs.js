const hbs = require('hbs');

hbs.registerPartials(process.cwd() + '/views/partials');

hbs.registerHelper('errorMessage', (dato) => {
    return new hbs.SafeString("<p style= 'background-color:brown; padding:10px;'>" + dato + "</p>");
});

hbs.registerHelper('successMessage', (dato) => {
    return new hbs.SafeString("<p style= 'background-color:darkgreen; padding:10px;'>" + dato + "</p>");
});