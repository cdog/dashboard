(function ($) {
  $.widget('charts.cylinderGauge', $.charts.chart, {
    options: {
      legendEnabled: false,
      labelsEnabled: false,
      max: 100
    },

    _getChartConfig: function (data) {
      var value = Math.max(0, Math.min(this.options.max, data.value));

      var chartData = [{
        category: '',
        column1: value,
        column2: this.options.max - value
      }];

      var chartConfig = this._super(data);

      chartConfig.type = 'serial';

      chartConfig.dataProvider = chartData;
      chartConfig.categoryField = 'category';

      chartConfig.angle = 30;
      chartConfig.depth3D = 100;

      chartConfig.autoMargins = false;
      chartConfig.marginTop = 0;
      chartConfig.marginRight = 0;
      chartConfig.marginBottom = 35;
      chartConfig.marginLeft = 85;

      // Category axis
      chartConfig.categoryAxis = {
        labelsEnabled: false,
        axisAlpha: 0,
        gridAlpha: 0
      };

      // Value axis
      chartConfig.valueAxes = [{
        stackType: '100%',
        gridAlpha: 0
      }];

      // Graphs
      chartConfig.graphs = [];

      for (var i = 1; i <= 2; i++) {
        var graphConfig = {
          type: 'column',
          id: 'graph' + i,
          title: 'Graph ' + i,
          valueField: 'column' + i,
          columnWidth: 1,
          topRadius: 1,
          showOnAxis: true,
          fillAlphas: 1.3 - 0.4 * i,
          balloonText: '[[percents]]%'
        };

        if (this.options.labelsEnabled) {
          graphConfig.labelText = '<br><br>[[percents]]%';
        }

        chartConfig.graphs.push(graphConfig);
      }

      return chartConfig;
    }
  });
}(jQuery));
