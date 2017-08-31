module.exports = {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/common/ajax-functions.js','app/controllers/*.client.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      profile: {
        src: ['app/common/ajax-functions.js','app/controllers/profileController.client.js'],
        dest: 'dist/js/profile.<%= pkg.name %>.js'
      },
      userlocal: {
        src: ['app/common/ajax-functions.js','app/controllers/userController.client.js'],
        dest: 'dist/js/user.<%= pkg.name %>.js'
      },
      index: {
        src: ['app/common/ajax-functions.js','app/controllers/clickController.client.js','app/controllers/dataController.client.js','app/controllers/profileController.client.js'],
        dest: 'dist/js/index.<%= pkg.name %>.js'
      }
    };