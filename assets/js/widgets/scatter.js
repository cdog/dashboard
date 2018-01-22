(function ($) {
  $.widget('charts.scatter', $.charts.chart, {
    options: {
      xAxisTitle: '',
      yAxisTitle: '',
      labelsEnabled: false,
      cursorEnabled: false,
      scrollbarEnabled: false
    },

    _getChartConfig: function (data) {
      var chartData = $.map(data, function (dataItem) {
        var chartDataItem = {};

        $.each(dataItem, function (i, value) {
          chartDataItem['x' + (i + 1)] = value[0];
          chartDataItem['y' + (i + 1)] = value[1];
        });

        return chartDataItem;
      });

      var chartConfig = this._super(data);

      chartConfig.type = 'xy';

      chartConfig.dataProvider = chartData;

      // Legend
      if (this.options.legendEnabled)
        chartConfig.legend.useGraphSettings = true;

      // X axis
      var xAxis = {
        position: 'bottom'
      };

      if (this.options.xAxisTitle)
        xAxis.title = this.options.xAxisTitle;

      // Y axis
      var yAxis = {};

      if (this.options.yAxisTitle)
        yAxis.title = this.options.yAxisTitle;

      chartConfig.valueAxes = [xAxis, yAxis];

      // Graphs
      chartConfig.graphs = [];

      for (var i = 1; i <= data[0].length; i++) {
        var bulletType = [
          'round',
          'square',
          'triangleUp',
          'diamond'
        ];

        var graphConfig = {
          id: 'graph' + i,
          title: 'Graph ' + i,
          balloonText: '[[x]], [[y]]',
          bullet: bulletType[(i - 1) % bulletType.length],
          lineAlpha: 0,
          xField: 'x' + i,
          yField: 'y' + i
        };

        if (this.options.labelsEnabled) {
          graphConfig.labelText = '[[x]], [[y]]';
        }

        chartConfig.graphs.push(graphConfig);
      }

      // Cursor
      if (this.options.cursorEnabled) {
        chartConfig.chartCursor = {};
      }

      // Scrollbar
      if (this.options.scrollbarEnabled) {
        chartConfig.chartScrollbar = {};
      }

      return chartConfig;
    }
  });
}(jQuery));
