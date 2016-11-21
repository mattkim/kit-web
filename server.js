const express = require('express');
const app = express();

// TODO: won't this conflict with front end port in prod?
app.set('port', (process.env.PORT || 3001));

console.log(process.env.NODE_ENV);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
