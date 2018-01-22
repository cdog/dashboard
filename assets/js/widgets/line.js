(function ($) {
  $.widget('charts.line', $.charts.serialChart, {
    options: {
      type: 'line',
      bulletsEnabled: true
    },

    _getChartConfig: function (data) {
      var chartConfig = this._super(data);

      // Graphs
      for (var i = 0; i < chartConfig.graphs.length; i++) {
        var graphConfig = chartConfig.graphs[i];

        graphConfig.type = this.options.type;

        if (this.options.bulletsEnabled) {
          var bulletType = [
            'round',
            'square',
            'triangleUp',
            'diamond'
          ];

          graphConfig.bullet = bulletType[i % bulletType.length];
        }
      }

      //chartConfig.graphs[0].hideBulletsCount

      // Cursor
      if (this.options.cursorType === 'x' || this.options.cursorType === 'xy') {
        chartConfig.chartCursor.bulletsEnabled = true;
      }

      return chartConfig;
    }
  });
}(jQuery));
