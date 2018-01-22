(function ($) {
  $.widget('charts.serialChart', $.charts.chart, {
    options: {
      categoryAxisTitle: '',
      valueAxisTitle: '',
      stackType: 'none',
      logarithmic: false,
      labelsEnabled: false,
      cursorType: 'none',
      scrollbarType: 'none'
    },

    _getChartConfig: function (data) {
      var chartData = $.map(data, function (dataItem) {
        var chartDataItem = {
          category: dataItem[0]
        };

        for (var i = 1; i < dataItem.length; i++) {
          chartDataItem['column' + i] = dataItem[i];
        }

        return chartDataItem;
      });

      var chartConfig = this._super(data);

      chartConfig.type = 'serial';

      chartConfig.dataProvider = chartData;
      chartConfig.categoryField = 'category';

      // Legend
      if (this.options.legendEnabled)
        chartConfig.legend.useGraphSettings = true;

      // Category axis
      chartConfig.categoryAxis = {};

      if (this.options.categoryAxisTitle)
        chartConfig.categoryAxis.title = this.options.categoryAxisTitle;

      //chartConfig.categoryAxis.labelRotation
      //chartConfig.categoryAxis.parseDates
      //chartConfig.categoryAxis.equalSpacing

      // Value axis
      var valueAxis = {
        stackType: this.options.stackType,
        logarithmic: this.options.logarithmic
      };

      if (this.options.valueAxisTitle)
        valueAxis.title = this.options.valueAxisTitle;

      chartConfig.valueAxes = [valueAxis];

      //chartConfig.valueAxes[0].labelRotation

      // Graphs
      chartConfig.graphs = [];

      for (var i = 1; i < data[0].length; i++) {
        var graphConfig = {
          id: 'graph' + i,
          title: 'Graph ' + i,
          valueField: 'column' + i
        };

        if (this.options.labelsEnabled) {
          if (this.options.stackType === '100%') {
            graphConfig.labelText = '[[percents]]%';
          } else {
            graphConfig.labelText = '[[value]]';
          }
        }

        chartConfig.graphs.push(graphConfig);
      }

      // Cursor
      if (this.options.cursorType === 'x') {
        chartConfig.chartCursor = {
          cursorPosition: 'mouse'
        };
      } else if (this.options.cursorType === 'xy') {
        chartConfig.chartCursor = {
          cursorPosition: 'mouse',
          valueLineBalloonEnabled: true,
          valueLineEnabled: true
        };
      }

      // Scrollbar
      if (this.options.scrollbarType === 'small') {
        chartConfig.chartScrollbar = {
          scrollbarHeight: 20
        };
      } else if (this.options.scrollbarType === 'medium') {
        chartConfig.chartScrollbar = {
          scrollbarHeight: 30,
          graph: 'graph1'
        };
      } else if (this.options.scrollbarType === 'large') {
        chartConfig.chartScrollbar = {
          scrollbarHeight: 40,
          graph: 'graph1',
          autoGridCount: true
        };
      }

      return chartConfig;
    }
  });
}(jQuery));
