(function ($) {
  $.widget('charts.chart', {
    options: {
      dataUrl: '',
      title: '',
      subtitle: '',
      legendEnabled: true,
      legendPosition: 'bottom',
      legendAlign: 'center'
    },

    chart: null,

    _create: function () {
      var self = this;

      $.getJSON(this.options.dataUrl, function (data) {
        self.chart = AmCharts.makeChart(self.element.get(0), self._getChartConfig(data));
      });
    },

    _destroy: function () {
      if (this.chart) {
        this.chart.clear();
        this.chart = null;
      }
    },

    _setOptions: function (options) {
      this._super(options);

      this._destroy();
      this._create();
    },

    _getChartConfig: function (data) {
      var chartConfig = {
        pathToImages: 'https://cdn.amcharts.com/lib/3/images/',
        startDuration: 1,
        titles: []
      };

      if (this.options.title) {
        chartConfig.titles.push({
          text: this.options.title,
          size: 15
        });
      }

      if (this.options.subtitle) {
        chartConfig.titles.push({
          text: this.options.subtitle
        });
      }

      if (this.options.legendEnabled) {
        chartConfig.legend = {
          position: this.options.legendPosition,
          align: this.options.legendAlign
        }
      }

      return chartConfig;
    },

    resize: function () {
      if (this.chart) {
        this.chart.invalidateSize();
      }
    }
  });
}(jQuery));
