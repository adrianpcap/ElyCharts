/**********************************************************************
 * ELYCHARTS
 * A Javascript library to generate interactive charts with vectorial graphics.
 *
 * Copyright (c) 2010 Void Labs s.n.c. (http://void.it)
 * Licensed under the MIT (http://creativecommons.org/licenses/MIT/) license.
 **********************************************************************/

(function($) {

var featuresmanager = $.elycharts.featuresmanager;
var common = $.elycharts.common;

/***********************************************************************
  * CHART: BARLINE
  *
  * Single horizontal bar containing various values​​.
  *
  * The idea is that it can be seen as a horizontal LineChart
  * Instead of vertical, with only a series of type bars and with a single value.
  * In the future (when you can make LineChart horizontal) could
  *'s Being rendered in this way.
  **********************************************************************/

$.elycharts.barline = {
  
  init : function($env) {
  },
  
  draw : function(env) {
    var paper = env.paper;
    var opt = env.opt;
    
    env.xmin = opt.margins[3];
    env.xmax = opt.width - opt.margins[1];
    env.ymin = opt.margins[0];
    env.ymax = opt.height - opt.margins[2];
    
    var maxvalue = 0;
    for (var serie in opt.values) {
      var values = opt.values[serie];
      var value = values[0];
      var plot = {
        props : common.areaProps(env, 'Series', serie)
      };
      env.plots[serie] = plot;
      
      if (!plot.props.stacked || !env.plots[plot.props.stacked]) {
        plot.from = 0;
      } else {
        plot.from = env.plots[plot.props.stacked].to;
      }
      plot.to = plot.from + value;
      if (plot.to > maxvalue)
        maxvalue = plot.to;
    }
    // TODO opt.max should be opt.axis [?]. max?
    if (typeof opt.max != 'undefined')
      maxvalue = opt.max;
    if (!maxvalue)
      maxvalue = 1;
      
    var pieces = [];
    for (serie in opt.values) {
      plot = env.plots[serie];
      var d = (env.xmax - env.xmin) / maxvalue;
      if (opt.direction != 'rtl')
        pieces.push({
          paths : [ { path : [ [ 'RECT', env.xmin + d * plot.from, env.ymin, env.xmin + d * plot.to, env.ymax] ], attr : plot.props.plotProps } ],
          section: 'Series', serie: serie, subSection : 'Plot', mousearea : 'paths'
        });
      else
        pieces.push({
          paths : [ { path : [ [ 'RECT', env.xmax - d * plot.from, env.ymin, env.xmax - d * plot.to, env.ymax] ], attr : plot.props.plotProps } ],
          section: 'Series', serie: serie, subSection : 'Plot', mousearea : 'paths'
        });
    }
      
    featuresmanager.beforeShow(env, pieces);
    common.show(env, pieces);
    featuresmanager.afterShow(env, pieces);
    return pieces;
  }
};

})(jQuery);
