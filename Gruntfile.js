module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dashboard: {
        src: 'assets/js/dashboard.js',
        dest: 'assets/js/dashboard.min.js'
      },
      widgets: {
        src: [
          'assets/js/widgets/chart.js',
          'assets/js/widgets/serial-chart.js',
          'assets/js/widgets/column.js',
          'assets/js/widgets/bar.js',
          'assets/js/widgets/line.js',
          'assets/js/widgets/area.js',
          'assets/js/widgets/pie.js',
          'assets/js/widgets/donut.js',
          'assets/js/widgets/scatter.js',
          'assets/js/widgets/bubble.js',
          'assets/js/widgets/angular-gauge.js',
          'assets/js/widgets/cylinder-gauge.js',
          'assets/js/widgets/funnel.js',
          'assets/js/widgets/pyramid.js'
        ],
        dest: 'assets/js/widgets.min.js'
      },
      application: {
        src: 'assets/js/application.js',
        dest: 'assets/js/application.min.js'
      }
    },
    cssmin: {
      style: {
        src: 'assets/css/style.css',
        dest: 'assets/css/style.min.css'
      }
    },
    watch: {
      dashboard: {
        files: '<%= uglify.dashboard.src %>',
        tasks: 'uglify:dashboard'
      },
      widgets: {
        files: '<%= uglify.widgets.src %>',
        tasks: 'uglify:widgets'
      },
      application: {
        files: '<%= uglify.application.src %>',
        tasks: 'uglify:application'
      },
      style: {
        files: '<%= cssmin.style.src %>',
        tasks: 'cssmin:style'
      }
    },
    clean: {
      dashboard: '<%= uglify.dashboard.dest %>',
      widgets: '<%= uglify.widgets.dest %>',
      application: '<%= uglify.application.dest %>',
      style: '<%= cssmin.style.dest %>'
    }
  });

  // Load tasks from the specified Grunt plugin(s).
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'uglify', 'cssmin']);
};
