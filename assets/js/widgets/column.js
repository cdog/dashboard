(function ($) {
  $.widget('charts.column', $.charts.serialChart, {
    options: {
      type: '2d'
    },

    _getChartConfig: function (data) {
      var chartConfig = this._super(data);

      if (this.options.type === '3d' || this.options.type === 'cylinder') {
        chartConfig.angle = 30;
        chartConfig.depth3D = 30;
      }

      // Category axis
      chartConfig.categoryAxis = {
        gridPosition: 'start'
      };

      // Graphs
      for (var i = 0; i < chartConfig.graphs.length; i++) {
        var graphConfig = chartConfig.graphs[i];

        graphConfig.type = 'column';
        graphConfig.fillAlphas = 1;

        if (this.options.type === 'cylinder') {
          graphConfig.topRadius = 1;
        }
      }

      return chartConfig;
    }
  });
}(jQuery));
