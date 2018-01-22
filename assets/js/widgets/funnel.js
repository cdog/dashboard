(function ($) {
  $.widget('charts.funnel', $.charts.chart, {
    options: {
      legendEnabled: false,
      labelsEnabled: true,
      labelsPosition: 'right',
      valueRepresents: 'height',
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

      chartConfig.type = 'funnel';

      chartConfig.dataProvider = chartData;
      chartConfig.titleField = 'title';
      chartConfig.valueField = 'value';

      chartConfig.neckWidth = '40%';
      chartConfig.neckHeight = '30%';

      if (this.options.labelsEnabled) {
        chartConfig.labelPosition = this.options.labelsPosition;

        if (this.options.labelsPosition === 'left') {
          chartConfig.marginLeft = 140;
        } else if (this.options.labelsPosition === 'right') {
          chartConfig.marginRight = 140;
        }
      } else {
        chartConfig.labelText = ' ';
      }

      chartConfig.valueRepresents = this.options.valueRepresents;
      chartConfig.pullOutOnlyOne = this.options.pullOutOnlyOne;

      return chartConfig;
    }
  });
}(jQuery));
