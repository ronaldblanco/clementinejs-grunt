module.exports = {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          //Client/////////////////////////////////
          //'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'],
          'dist/js/profile.<%= pkg.name %>.min.js': ['<%= concat.profile.dest %>'],
          'dist/js/user.<%= pkg.name %>.min.js': ['<%= concat.userlocal.dest %>'],
          'dist/js/index.<%= pkg.name %>.min.js': ['<%= concat.index.dest %>'],
          //Server////////////////////////////////////
          'server/common/functions.server.js': ['app/common/functions.server.js'],
          'server/express.js': ['express.js'],
          'server/routes/index.js': ['app/routes/index.js'],
          //Server-controllers////////////////////////////////////
          'server/controllers/clickHandler.server.js': ['app/controllers/clickHandler.server.js'],
          'server/controllers/dataHandler.server.js': ['app/controllers/dataHandler.server.js'],
          'server/controllers/userHandler.server.js': ['app/controllers/userHandler.server.js'],
          'server/controllers/webSocketHandler.server.js': ['app/controllers/webSocketHandler.server.js'],
          //Server-models////////////////////////////////////
          'server/models/users.js': ['app/models/users.js'],
          'server/models/socketData.js': ['app/models/socketData.js'],
          'server/models/message.js': ['app/models/message.js']
        }
      }
    };