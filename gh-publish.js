var ghpages = require('gh-pages')
var path = require('path')
var moment = require('moment')
 
console.log('start publishing to master...')
ghpages.publish('build', {
  branch: 'master',
  message: 'Merge to master from develop in ' + moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
}, function(err) {
  console.log('done publishing to master')
});