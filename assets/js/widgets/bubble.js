(function ($) {
  $.widget('charts.bubble', $.charts.scatter, {
    _getChartConfig: function (data) {
      var chartConfig = this._super(data);

      $.each(data, function (i, dataItem) {
        var chartDataItem = chartConfig.dataProvider[i];

        $.each(dataItem, function (j, value) {
          chartDataItem['value' + (j + 1)] = value[2];
        });
      });

      // Graphs
      for (var i = 0; i < chartConfig.graphs.length; i++) {
        var graphConfig = chartConfig.graphs[i];

        graphConfig.balloonText = '[[x]], [[y]]: [[value]]';
        graphConfig.bullet = 'bubble';
        graphConfig.valueField = 'value' + (i + 1);

        if (this.options.labelsEnabled) {
          graphConfig.labelText = '[[x]], [[y]]: [[value]]';
        }
      }

      return chartConfig;
    }
  });
}(jQuery));
