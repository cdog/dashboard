(function ($) {
  $.widget('charts.bar', $.charts.column, {
    _getChartConfig: function (data) {
      var chartConfig = this._super(data);

      chartConfig.rotate = true;

      return chartConfig;
    }
  });
}(jQuery));
