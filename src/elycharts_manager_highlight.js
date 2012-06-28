/**********************************************************************
 * ELYCHARTS
 * A Javascript library to generate interactive charts with vectorial graphics.
 *
 * Copyright (c) 2010 Void Labs s.n.c. (http://void.it)
 * Licensed under the MIT (http://creativecommons.org/licenses/MIT/) license.
 **********************************************************************/

(function($) {

//var featuresmanager = $.elycharts.featuresmanager;
var common = $.elycharts.common;

/***********************************************************************
 * FEATURE: HIGHLIGHT
 *
 * Permette di evidenziare in vari modi l'area in cui si passa con il
 * mouse.
 **********************************************************************/

$.elycharts.highlightmanager = {

  removeHighlighted : function(env, full) {
    if (env.highlighted)
      while (env.highlighted.length > 0) {
        var o = env.highlighted.pop();
        if (o.piece) {
          if (full)
            common.animationStackPush(env, o.piece, o.piece.element, common.getPieceFullAttr(env, o.piece), o.cfg.restoreSpeed, o.cfg.restoreEasing, 0, true);
        } else
          o.element.remove();
      }
  },

  afterShow : function(env, pieces) {
    if (env.highlighted && env.highlighted.length > 0)
      this.removeHighlighted(env, false);
    env.highlighted = [];
  },

  onMouseOver : function(env, serie, index, mouseAreaData) {
    var path, element;
    // TODO If not 'active overlay (for the series or the whole) and' useless to the rest

    // Seeking to highlight the piece (those that consist of multiple paths)
    for (var i = 0; i < mouseAreaData.pieces.length; i++)

      // The loop in extracts only the pieces with the array of path (not the line or fill the LineChart ... but the rest)
      if (mouseAreaData.pieces[i].section == 'Series' && mouseAreaData.pieces[i].paths
        && (!serie || mouseAreaData.pieces[i].serie == serie)
        && mouseAreaData.pieces[i].paths[index] && mouseAreaData.pieces[i].paths[index].element) {
        var piece = mouseAreaData.pieces[i].paths[index];
        element = piece.element;
        path = piece.path;
        var attr = common.getElementOriginalAttrs(element);
        var newattr = false; // If the geometry of the object is modified by attr (eg for circle) stores here the new attributes
        var props = serie ? mouseAreaData.props : common.areaProps(env, mouseAreaData.pieces[i].section, mouseAreaData.pieces[i].serie);
        var pelement, ppiece, ppath;
        if (path && props.highlight) {
          if (props.highlight.scale) {
            var scale = props.highlight.scale;
            if (typeof scale == 'number')
              scale = [scale, scale];

            if (path[0][0] == 'RECT') {
              var w = path[0][3] - path[0][1];
              var h = path[0][4] - path[0][2];
              path = [ [ 'RECT', path[0][1], path[0][2] - h * (scale[1] - 1), path[0][3] + w * (scale[0] - 1), path[0][4] ] ];
              common.animationStackPush(env, piece, element, common.getSVGProps(common.preparePathShow(env, path)), props.highlight.scaleSpeed, props.highlight.scaleEasing);
            }
            else if (path[0][0] == 'CIRCLE') {
              // I pass directly new radius
              newattr = {r : path[0][3] * scale[0]};
              common.animationStackPush(env, piece, element, newattr, props.highlight.scaleSpeed, props.highlight.scaleEasing);
            }
            else if (path[0][0] == 'SLICE') {
              // To slice and x 'radius, and y' angle
              var d = (path[0][6] - path[0][5]) * (scale[1] - 1) / 2;
              if (d > 90)
                d = 90;
              path = [ [ 'SLICE', path[0][1], path[0][1], path[0][3] * scale[0], path[0][4], path[0][5] - d, path[0][6] + d ] ];
              common.animationStackPush(env, piece, element, common.getSVGProps(common.preparePathShow(env, path)), props.highlight.scaleSpeed, props.highlight.scaleEasing);

            } else if (env.opt.type == 'funnel') {
              var dx = (piece.rect[2] - piece.rect[0]) * (scale[0] - 1) / 2;
              var dy = (piece.rect[3] - piece.rect[1]) * (scale[1] - 1) / 2;

              // Specific to a sector of the funnel
              common.animationStackStart(env);
              path = [ common.movePath(env, [ path[0]], [-dx, -dy])[0],
                common.movePath(env, [ path[1]], [+dx, -dy])[0],
                common.movePath(env, [ path[2]], [+dx, +dy])[0],
                common.movePath(env, [ path[3]], [-dx, +dy])[0],
                path[4] ];
              common.animationStackPush(env, piece, element, common.getSVGProps(common.preparePathShow(env, path)), props.highlight.scaleSpeed, props.highlight.scaleEasing, 0, true);

              // If there is' a piece before using it, otherwise it tries to reduce a topSector
              pelement = false;
              if (index > 0) {
                ppiece = mouseAreaData.pieces[i].paths[index - 1];
                pelement = ppiece.element;
                ppath = ppiece.path;
              } else {
                ppiece = common.findInPieces(mouseAreaData.pieces, 'Sector', 'top');
                if (ppiece) {
                  pelement = ppiece.element;
                  ppath = ppiece.path;
                }
              }
              if (pelement) {
                //pattr = common.getElementOriginalAttrs(pelement);
                ppath = [
                  ppath[0], ppath[1],
                  common.movePath(env, [ ppath[2]], [+dx, -dy])[0],
                  common.movePath(env, [ ppath[3]], [-dx, -dy])[0],
                  ppath[4] ];
                common.animationStackPush(env, ppiece, pelement, common.getSVGProps(common.preparePathShow(env, ppath)), props.highlight.scaleSpeed, props.highlight.scaleEasing, 0, true);
                env.highlighted.push({piece : ppiece, cfg : props.highlight});
              }

              // If there is' a piece later uses it, otherwise it tries to reduce a bottomSector
              pelement = false;
              if (index < mouseAreaData.pieces[i].paths.length - 1) {
                ppiece = mouseAreaData.pieces[i].paths[index + 1];
                pelement = ppiece.element;
                ppath = ppiece.path;
              } else {
                ppiece = common.findInPieces(mouseAreaData.pieces, 'Sector', 'bottom');
                if (ppiece) {
                  pelement = ppiece.element;
                  ppath = ppiece.path;
                }
              }
              if (pelement) {
                //var pattr = common.getElementOriginalAttrs(pelement);
                ppath = [
                  common.movePath(env, [ ppath[0]], [-dx, +dy])[0],
                  common.movePath(env, [ ppath[1]], [+dx, +dy])[0],
                  ppath[2], ppath[3],
                  ppath[4] ];
                common.animationStackPush(env, ppiece, pelement, common.getSVGProps(common.preparePathShow(env, ppath)), props.highlight.scaleSpeed, props.highlight.scaleEasing, 0, true);
                env.highlighted.push({piece : ppiece, cfg : props.highlight});
              }

              common.animationStackEnd(env);
            }
            /* With stairs is not good
            if (!attr.scale)
              attr.scale = [1, 1];
            element.attr({scale : [scale[0], scale[1]]}); */
          }
          if (props.highlight.newProps) {
            for (var a in props.highlight.newProps)
              if (typeof attr[a] == 'undefined')
                attr[a] = false;
            common.animationStackPush(env, piece, element, props.highlight.newProps);
          }
          if (props.highlight.move) {
            var offset = $.isArray(props.highlight.move) ? props.highlight.move : [props.highlight.move, 0];
            path = common.movePath(env, path, offset);
            common.animationStackPush(env, piece, element, common.getSVGProps(common.preparePathShow(env, path)), props.highlight.moveSpeed, props.highlight.moveEasing);
          }

          //env.highlighted.push({element : element, attr : attr});
          env.highlighted.push({piece : piece, cfg : props.highlight});

          if (props.highlight.overlayProps) {
            // NOTE: path and 'path changed from the previous ones (like' overlay takes account of the thing), should also look at newattr
            //BIND: mouseAreaData.listenerDisabled = true;
            element = common.showPath(env, path);
            if (newattr)
              element.attr(newattr);
            element.attr(props.highlight.overlayProps);
            //BIND: $(element.node).unbind().mouseover(mouseAreaData.mouseover).mouseout(mouseAreaData.mouseout);
            // If I then immediately mouseAreaData.listenerDisabled is still a mouseout from the old site, and goes
            // in loop. TODO Review and fix for tooltips
            //BIND: setTimeout(function() { mouseAreaData.listenerDisabled = false; }, 10);
            attr = false;
            env.highlighted.push({element : element, attr : attr, cfg : props.highlight});
          }
        }
      }

    if (env.opt.features.highlight.indexHighlight && env.opt.type == 'line') {
      var t = env.opt.features.highlight.indexHighlight;
      if (t == 'auto')
        t = (env.indexCenter == 'bar' ? 'bar' : 'line');

      var delta1 = (env.opt.width - env.opt.margins[3] - env.opt.margins[1]) / (env.opt.labels.length > 0 ? env.opt.labels.length : 1);
      var delta2 = (env.opt.width - env.opt.margins[3] - env.opt.margins[1]) / (env.opt.labels.length > 1 ? env.opt.labels.length - 1 : 1);
      var lineCenter = true;

      switch (t) {
        case 'bar':
          path = [ ['RECT', env.opt.margins[3] + index * delta1, env.opt.margins[0] ,
            env.opt.margins[3] + (index + 1) * delta1, env.opt.height - env.opt.margins[2] ] ];
          break;

        case 'line':
          lineCenter = false;
        case 'barline':
          var x = Math.round((lineCenter ? delta1 / 2 : 0) + env.opt.margins[3] + index * (lineCenter ? delta1 : delta2));
          path = [[ 'M', x, env.opt.margins[0]], ['L', x, env.opt.height - env.opt.margins[2]]];
      }
      if (path) {
        //BIND: mouseAreaData.listenerDisabled = true;
        element = common.showPath(env, path).attr(env.opt.features.highlight.indexHighlightProps);
        //BIND: $(element.node).unbind().mouseover(mouseAreaData.mouseover).mouseout(mouseAreaData.mouseout);
        //BIND: setTimeout(function() { mouseAreaData.listenerDisabled = false; }, 10);
        env.highlighted.push({element : element, attr : false, cfg : env.opt.features.highlight});
      }
    }
  },

  onMouseOut : function(env, serie, index, mouseAreaData) {
    this.removeHighlighted(env, true);
  }

};

$.elycharts.featuresmanager.register($.elycharts.highlightmanager, 21);

})(jQuery);
