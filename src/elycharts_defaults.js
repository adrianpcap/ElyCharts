/*! *********************************************** **********************
 * ELYCHARTS v2.1.3
 * A JavaScript library to generate interactive charts with vectorial graphics.
 *
 * Copyright (c) 2010 Void Labs S.N.C. (Http://void.it)
 * Licensed under the MIT (http://creativecommons.org/licenses/MIT/) license.
 ************************************************** ********************/

(Function ($) {
if ($. elycharts)
  $. Elycharts = {};

/************************************************* **********************
 * DEFAULT OPTIONS
 ************************************************** ********************/

$. Elycharts.templates = {

  common: {
    // Type of chart
    // Type: 'line | pie | funnel | barline'
    
    // Allows you to specify a default configuration to use (defined in $. Elycharts.templates.NOME)
    // The complete configuration is given by all values ​​of the default conf which is united (with overwrite) the current conf
    // The parameter is recursive (the default configuration can 'turn to have a default configuration)
    // If not specified, the default configuration is the one with the same name as the type of chart
    // Template: 'NAME',
    
    /* DATA:
    // The values ​​associated with each chart series. Each series is associated with a key value of the object, whose
    // Value is the array of data
    values: {},
    
    // Label associated with the values ​​of the graph
    // Only if the label run by LabelManager (so for pie and funnel) and label.html = true 'can enter
    // DOM element / jQuery that will be taken and placed correttament.
    Labels: [],
    
    // Anchor for management through anchormanager. They can be strings and objects DOM / jQuery that will be repositioned
    anchors: {},
    
    tooltips: {},
    
    Legend: [],
    */
    
    // To set a dimension different from that of the container set width and height
    // Width: x,
    // Height: y
    
    // The edge of the graph compared to the overall frame. Note that relate to the position of the graph
    // Main, and NOT additional elements (legend, axes labels and titles ...). So the margins are
    // In general be set precisely to leave space for these elements
    // Syntax: [top, right, bottom, left]
    margins: [10, 10, 10, 10],

    // Style: {},
    
    // In order to handle the interactivity 'Graph (tooltips, highlights, anchor ...) is inserted into a second
    // Layers to sensitive parts of the mouse. If you know that the graph will not have 'no interactivity' you can 'set
    // This value to false to avoid creating the layer (slightly optimizing the page)
    interactive: true,

    // Data to be applied to all chart series
    defaultSeries: {
      // Set to false to disable the display of the series
      visible: true,
      
      // Set color here allows you to quickly set plotProps.stroke + fill, tooltip.frameProps.stroke, and dotProps.stroke fillProps.fill (unless specified)
      // Color: 'blue',
      
      // PlotProps: {},
      
      // Setting the tooltip
      tooltip: {
        active: true,
        // If width and height are set to 0 or 'auto' (equivalent) are not fixed size, so the content is a function of the tooltip autodimensiona
        // Set to 0 | drive is incompatible with the SVG frame, then it is automatically disabled (as if frameProps = false)
        width: 100, height: 50,
        roundedCorners: 5,
        padding: [6, 6] /* y, x */,
        offset: [20, 0] /* y, x */,
        // If frameProps = false does not draw the frame of the tooltips (eg. To allow you to define your own HTML frame)
        frameProps: {fill: 'white', 'stroke-width ': 2},
        contentStyle: {'font-family': 'Arial', 'font-size': '12px', 'line-height': '16px', color: 'black'}
      },
      
      // Highlight feature
      Highlight: {
        // Change the size of the item when it should be highlighted
        // Scales: [x, y],
        // Animation effect options 'scale'
        scaleSpeed: 100, scaleEasing:'',
        // Change the attributes of the item when shown
        // NewProps: {opacity: 1},
        // Put a layer with the attributes specified above to be highlighted
        // OverlayProps: {'fill': 'white', 'fill-opacity ': .3,' stroke-width ': 0}
        // Moves the highlighted area. And 'possible to specify a value or an array X [X, Y]
        // Move: 10,
        // Animation effect options 'move'
        moveSpeed: 100, moveEasing:'',
        // Options to use animation to bring the object to the initial situation
        restoreSpeed: 0, restoreEasing:''
      },
      
      anchor: {
        // Add selected to anchor outside the class when the mouse hovers on the area
        // AddClass: '',
        // Highlight the series on mouse
        // Highlight: '',
        // If set to true uses MouseEnter / MouseLeave instead of mouseover / mouseout to highlight
        // UseMouseEnter: false,
      },
      
      // Options for creating animated graphics
      startAnimation: {
        // Active: true,
        type: 'simple',
        speed: 600,
        delay: 0,
        propsFrom: {}, // ​​applied to all of the props plot
        propsTo: {}, // ​​applied to all of the props plot
        easing:'' // easing raphael:>, <, <>, Backin, backout, bounce, elastic
        
        // Optional for some animations, allows you to specify a sub-type
        // Subtype: 0 | 1 | 2
      },
      
      // Options for the transitions of the graphs during a change of configuration
      /* StepAnimation: {
        speed: 600,
        delay: 0,
        easing:'' // easing raphael:>, <, <>, Backin, backout, bounce, elastic
      } */
      
      label: {
        // Draw or not the internal label to the graph
        active: false,
        // Sets an offset [X, Y] for the label (the coordinates are relative to the axis system of the specific sector drawn.
        // Eg. for the PieChart X is the distance from the center, the orthogonal displacement Y
        // Offset: [x, y],
        html: false,
        // Properties' of the label (for HTML = false)
        props: {fill: 'black', stroke: 'none', 'font-family ':' Arial ',' font-size': '16px'},
        // Style sheet of labels (for HTML = true)
        style: {cursor: 'default'}
        // Positioning the label with respect to the central point (+ offset) identified
        // FrameAnchor: ['start | middle | end', 'top | middle | bottom']
      }
      
      /* Legend: {
        dotType: 'rect',
        dotWidth: 10, dotHeight: 10, dotR: 4,
        dotProps: {},
        textProps: {font: Arial '12px ', fill: '#000'}
      } */
    },
    
    series: {
      // Set specification used when there are 'empty data' (such as when a PieChart and 'to 0)
      empty: {
        // PlotProps: {fill: '#D0D0D0'},
        label: {active: false},
        tooltip: {active: false}
      }
      /* Root: {
        values: []
      } */
    },
    
    features: {
      tooltip: {
        // Set a fixed position for all tooltips
        // FixedPos: [x, y]
        // Speed ​​'of fade
        fadeDelay: 100,
        // Speed ​​'of moving the tip from one area to another
        moveDelay: 300
        // It 's possible to specify a function that filters the coordinates of the tooltip before showing it, allowing you to edit
        // Note: the mouse coordinates are mouseAreaData.event.pageX / pageY, and the case should be returned [mouseAreaData.event.pageX, mouseAreaData.event.pageY, true], indicating that the system 'on the page)
        // PositionHandler: function (env, tooltipConf, mouseAreaData, suggestedX, suggestedY) {return [suggestedX, suggestedY]}
      },
      mousearea: {
        // 'Single' sensitive areas are relative to each value of each series, if 'index' the mouse brings up all the series for an index
        type: 'single',
        // If type = 'index', indicates if the areas are based on the bars ('bar') or points on a line ('line'). Specify 'auto' to automatically choose
        indexCenter: 'auto',
        // How long can 'go in the passage from one area to another to consider a moving pointer
        areaMoveDelay: 500,
        // If different chart syncTag when you specify the same active area than the other one is deactivated
        syncTag: false,
        // Callback for mouse actions. Parameters passed: (env, set, index, mouseAreaData)
        OnMouseEnter: false,
        onMouseExit: false,
        onMouseChanged: false,
        onMouseOver: false,
        onMouseOut: false
      },
      Highlight: {
        // Highlight all the index with a bar ('bar'), a line ('line') or a line centered on the bars ('barline'). If 'self' decides independently between bar and line
        // IndexHighlight: 'barline',
        indexHighlightProps: {opacity: 1 /* fill: 'yellow', opacity: .3, stairs: '.5 1' */}
      },
      animation: {
        // Default value for the generation of animated graphic elements (even for non-standard: label, grid ...)
        startAnimation: {
          // Active: true,
          // PropsFrom: {}, // ​​applied to all of the props plot
          // PropsTo: {}, // ​​applied to all of the props plot
          speed: 600,
          delay: 0,
          easing:'' // easing raphael:>, <, <>, Backin, backout, bounce, elastic
        },
        // Default value for the transition elements of the animated graphics (even for non-standard: label, grid ...)
        stepAnimation: {
          speed: 600,
          delay: 0,
          easing:'' // easing raphael:>, <, <>, Backin, backout, bounce, elastic
        }
      },
      frameAnimation: {
        active: false,
        cssFrom: {opacity: 0},
        cssTo: {opacity: 1},
        speed: 'slow',
        easing: 'linear' // jQuery easing: 'linear' or 'swing'
      },
      pixelWorkAround: {
        active: true
      },
      label: {},
      shadows: {
        active: false,
        Offset: [2, 2], // ​​To enable the shadow, [y, x]
        props: {'stroke-width': 0, 'stroke-opacity ': 0,' fill ':' black ',' fill-opacity': .3}
      },
      // BALLOONS: Applicable only to funnel (for now)
      balloons: {
        active: false,
        // Width: If not specified and 'Automatic
        // Width: 200,
        // Height: If not specified and 'Automatic
        // Height: 50,
        // The CSS style to apply to each balloon
        style: {},
        // Padding
        padding: [5, 5],
        // The distance from the left edge
        left: 10,
        // Path of the line: [[x, y initial (with respect to the starting point standard)], ... [X, y intermediate (compared to the starting point standard)] ..., [x, y final (compared with the corner of the balloon as close to the starting point)]]
        line: [[0, 0], [0, 0]],
        // Line Properties
        lineProps: {}
      },
      legend: {
        horizontal: false,
        x: 'auto', // ​​X | car (cars only for horizontal = true)
        y: 10,
        width: 'auto', // ​​X | car (cars only for horizontal = true)
        height: 20,
        ItemWidth: 'Fixed', // ​​fixed | car, only to horizontal = true
        margins: [0, 0, 0, 0],
        dotMargins: [10, 5], // ​​left, right
        borderProps: {fill: 'white' stroke 'black', 'stroke-width': 1},
        dotType: 'rect',
        dotWidth: 10, dotHeight: 10, dotR: 4,
        dotProps: {type: 'rect', width: 10, height: 10},
        textProps: {font: Arial '12px ', fill: '#000'}
      },
      debug: {
        active: false
      }
    },
    
    nop: 0
  },

  line: {
    Template: 'common',
    
    barMargins: 0,

    // Axis
    defaultAxis: {
      // [Not for x-axis] Normalize the maximum value of the axis so that all the labels we have at most significant digits N
      // (Example: if the max and 'normalize = 135 and 2 will' set the max to 140, but if the number of labels in y '3 will be set to 150)
      normalize: 2,
      // This sets the minimum and maximum axis (instead of autoprobe)
      min: 0, // ​​max: x,
      // Set the text to be used as a prefix and suffix of the label
      // Prefix: '', suffix: '',
      // Show or hide the axis labels
      Labels: false,
      // Distance between the label and the axis on
      labelsDistance: 8,
      // [X-axis only] rotation (in degrees) of the label. If specified and ignores the values ​​of labelsAnchor labelsProps ['text-anchor']
      labelsRotate: 0,
      // Property 'graphics of the label
      labelsProps: {font: Arial '10px ', fill: '#000'}
      // Compact the number shown on the label using the suffixes specified for thousands, millions ...
      // LabelsCompactUnits: ['k', 'M'],
      // Allows you to specify an external function that takes care of formatting (or generally transform) the label
      // LabelsFormatHandler: function (label) {return label},
      // Skip the first N label
      // LabelsSkip: 0,
      // [X-axis only] decides the position of the label relative to the line on the grid
      // LabelsPos: 'start',
      // Change the standard alignment (middle to x-axis, the axis-end, start to right axis)
      // LabelsAnchor: 'start'
      // Hide the labels that are automatically covered by other
      // LabelsHideCovered: true,
      // Add a margin to the label (if left in the x-axis, at the top if the axes)
      // LabelsMargin: 10,
      // [X-axis only] If labelsHideCovered = true, means that there is at least one X to the right edge of the label
      // LabelsMarginRight: 0,
      // Distance from the axis title
      titleDistance: 25, titleDistanceIE: .75,
      // Property 'title graphic
      titleProps: {font: Arial '12px ', fill: '#000', 'font-weight': 'bold'}
    },
    axis: {
      x: {titleDistanceIE: 1.2}
    },
    
    defaultSeries: {
      // Set type, can 'be' online 'or' bar '
      type: the 'line',
      // The reference axis in the series. The axis 'l' and 'r' are the 2 axes visible left and right.
      // It 's also possible to insert an arbitrary axis (which will not be visible)
      axis: 'l',
      // Specify cumulative = true if the values ​​entered for the series are cumulative
      cumulative: false,
      // If type = 'line' indicates the rounding of the line
      rounded: 1,
      // Puts the point of intersection at the center of the range instead of the limit (for alignment with bars). If 'auto' decides
      lineCenter: 'auto',
      // Allows you to stack the series (where the values ​​of a starting end of the previous ones) with another (as long as' the same type)
      // Specify 'true' to stack with the series shown above, or the name of the series on which to stack
      // Stacked: false,

      plotProps: {'stroke-width': 1, 'stroke-LineJoin': 'round'},
      
      barWidthPerc: 100,
      // DELETED: barProps: {'perc-width': 100, 'stroke-width': 1, 'fill-opacity ': .3},
      
      // Toggle the filling
      fill: false,
      fillProps: {stroke: 'none', 'stroke-width': 0, 'stroke-opacity ': 0, opacity: .3},

      dot: false,
      dotProps: {size: 4, stroke: '#000', ZIndex: 5}
      dotShowOnNull: false,

      mouseareaShowOnNull: false,
      
      startAnimation: {
        plotPropsFrom: false,
        // DELETED linePropsFrom: false,
        fillPropsFrom: false,
        dotPropsFrom: false,
        // DELETED barPropsFrom: false,
        shadowPropsFrom: false
      }
      
    },
    
    features: {
      Grid {
        // N. divisions on the X axis If 'auto' is based on the label to be displayed. If '0' set draw [vertical] = false
        // Note that if 'auto' then the first and last line (edge) always makes you see (if we are the label). If it is a 'number behaves as ny: it shows the edges only if forced with forceBorder
        nx: 'auto',
        // N. division of the Y If '0' set draw [horizontal] = false
        ny: 4,
        // Draw or not the grid. You can 'specify an array [horizontal, vertical]
        Draw: false,
        // Force display of edges / axes. If true, however, draw the edges (even if you draw = false, or no label)
        // Otherwise is based on standard rules of draw and label presence (for x-axis)
        // Can 'be a single boolean or an array of edges [up, right, down, left]
        forceBorder: false,
        // Property 'to grid view
        props: {stroke: '#E0E0E0', 'stroke-width ': 1},
        // Size of the extra fees [up, right, down, left]
        Extra: [0, 0, 0, 0],
        // Indicates whether the label (and the corresponding lines of the grid) should be centered on the bars (true), then between 2 lines, or points in the series (false), then one line
        // If you specify 'auto' decides autonomously
        labelsCenter: 'auto',

        // Display a rectangular region with properties specied for every even / odd vertical / horizontal grid division
        evenVProps: false,
        oddVProps: false,
        evenHProps: false,
        oddHProps: false,

        ticks: {
          // Turn on the bars on the axes [x, l, r]
          active: [false, false, false],
          // Size of the first axis to the axis after
          size: [10, 10],
          // Property 'to grid view
          props: {stroke: '#E0E0E0', 'stroke-width ': 1}
        }
      }
    },

    nop: 0
  },

  pie: {
    Template: 'common',
    
    // Coordinates of the center, if unspecified, it is self-determined
    // Cx: 0, cy: 0,
    // Radius of the pie, if not specified is self-determined
    // R: 0
    // Angle from which to start drawing the slices, in degrees
    startAngle: 0,
    // Draw the pie slices clockwise (as opposed to the standard orientation degrees, counterclockwise)
    clockwise: false,
    // Threshold (ratio of the total) in which a slice is displayed
    valueThresold: 0.006,
    
    defaultSeries: {
      // R: .5, radius used only for this piece, if <= 1 and 'in relation to the radius General
      // Inside: X, this piece fits into another (only works inside: previous, and does not handle + cloves inside the other)
    }
  },

  funnel: {
    Template: 'common',
    
    rh: 0, // ​​height of ellipsis (for top and bottom cuts)
    method: 'width', // ​​width / cutarea
    topSector: 0, // ​​height factor of the top cylinder
    topSectorProps: {fill: '#d0d0d0'},
    bottomSector: .1, // ​​height factor of bottom cylinder
    bottomSectorProps: {fill: '#d0d0d0'},
    edgeProps: {fill: '#C0C0C0', 'stroke-width': 1, opacity: 1},

    nop: 0
  },
  
  barline: {
    Template: 'common',

    // Set the maximum value for the scale (otherwise it takes the value + up)
    // Max: X
    
    // Set direction = rtl to create a graph that goes from right to left
    direction: 'ltr'
  }
}

}) (JQuery);