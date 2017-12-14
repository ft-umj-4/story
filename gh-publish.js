var ghpages = require('gh-pages');
var path = require('path');
 
console.log('start publishing to master...')
ghpages.publish('dist', {
  branch: 'master'
}, function(err) {
  console.log('done publishing to master')
});