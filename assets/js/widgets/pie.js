(function ($) {
  $.widget('charts.pie', $.charts.chart, {
    options: {
      is3D: false,
      labelsEnabled: true,
      pullOutOnlyOne: true
    },

    _getChartConfig: function (data) {
      var chartData = $.map(data, function (dataItem) {
        return {
          title: dataItem[0],
          value: dataItem[1]
        };
      });

      var chartConfig = this._super(data);

      chartConfig.type = 'pie';

      chartConfig.dataProvider = chartData;
      chartConfig.titleField = 'title';
      chartConfig.valueField = 'value';

      if (this.options.is3D) {
        chartConfig.angle = 15;
        chartConfig.depth3D = 15;
      }

      chartConfig.labelsEnabled = this.options.labelsEnabled;
      chartConfig.pullOutOnlyOne = this.options.pullOutOnlyOne;

      return chartConfig;
    }
  });
}(jQuery));
