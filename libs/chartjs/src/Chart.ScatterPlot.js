(function(){
	"use strict";

	var root = this,
		Chart = root.Chart,
		helpers = Chart.helpers;

	var defaultConfig = {

		//Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines : true,

		//String - Colour of the grid lines
		scaleGridLineColor : "rgba(0,0,0,.05)",

		//Number - Width of the grid lines
		scaleGridLineWidth : 1,

		//Boolean - Whether to show horizontal lines (except X axis)
		scaleShowHorizontalLines: true,

		//Boolean - Whether to show vertical lines (except Y axis)
		scaleShowVerticalLines: true,

		//Boolean - Whether the line is curved between points
		bezierCurve : false,

		//Number - Tension of the bezier curve between points
		bezierCurveTension : 0.4,

		//Boolean - Whether to show a dot for each point
		pointDot : true,

		//Number - Radius of each point dot in pixels
		pointDotRadius : 4,

		//Number - Pixel width of point dot stroke
		pointDotStrokeWidth : 1,

		//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
		pointHitDetectionRadius : 20,

		//Boolean - Whether to show a stroke for datasets
		datasetStroke : true,

		//Number - Pixel width of dataset stroke
		datasetStrokeWidth : 2,

		//Boolean - Whether to fill the dataset with a colour
		datasetFill : false,

		//String - A legend template
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>",

		//Boolean - Whether to horizontally center the label and point dot inside the grid
		offsetGridLines : false,
		
		//My own custom option.
		//String - the color of the regression line
		linRegLineColor : "rgba(255,0,0,1)"

	};

	Chart.Type.extend({
		name: "ScatterPlot",
		defaults : defaultConfig,
		initialize:  function(data){
			//Declare the extension of the default point, to cater for the options passed in to the constructor
			this.PointClass = Chart.Point.extend({
				offsetGridLines : this.options.offsetGridLines,
				strokeWidth : this.options.pointDotStrokeWidth,
				radius : this.options.pointDotRadius,
				display: this.options.pointDot,
				hitDetectionRadius : this.options.pointHitDetectionRadius,
				ctx : this.chart.ctx,
				inRange : function(mouseX){
					return (Math.pow(mouseX-this.x, 2) < Math.pow(this.radius + this.hitDetectionRadius,2));
				}
			});

			this.datasets = [];

			//Set up tooltip events on the chart
			if (this.options.showTooltips){
				helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
					var activePoints = (evt.type !== 'mouseout') ? this.getPointsAtEvent(evt) : [];
					this.eachPoints(function(point){
						point.restore(['fillColor', 'strokeColor']);
					});
					helpers.each(activePoints, function(activePoint){
						activePoint.fillColor = activePoint.highlightFill;
						activePoint.strokeColor = activePoint.highlightStroke;
					});
					this.showTooltip(activePoints);
				});
			}

			//Iterate through each of the datasets, and build this into a property of the chart
			helpers.each(data.datasets,function(dataset){

				var datasetObject = {
					label : dataset.label || null,
					fillColor : dataset.fillColor,
					strokeColor : dataset.strokeColor,
					pointColor : dataset.pointColor,
					pointStrokeColor : dataset.pointStrokeColor,
					points : []
				};

				this.datasets.push(datasetObject);
				
				// we want to sort the data
				// then consolidate repeating x values
				// labels need to be every number in the range
				// create an array of x,y values from labels and dataset
				// all this is only for numerical labels as input
				
				//TODO make it more versatile
				if(!isNaN(data.labels[0])){
					var pts = [];
			
					for(var i = 0; i < dataset.data.length; i++){
						pts.push([data.labels[i], dataset.data[i]]);
					}
			
					pts.sort(function(a,b) {
					return a[0]-b[0]
					});
					
					//took a shortcut, will create a value for every int in range
					//TODO don't take shortcuts
					var numLabels = parseFloat(data.labels[data.labels.length-1]) + 1 - parseFloat(data.labels[0]);
					var labels = [];
					for(var i = 0; i < numLabels; i++){
						var num = parseFloat(i) + parseFloat(data.labels[0]);
						labels.push(num);
					}
					
					data.labels = labels;
					helpers.each(dataset.data, function(dataPoint,index){
						datasetObject.points.push(new this.PointClass({
								value : parseFloat(pts[index][1]),
								label : pts[index][0],
								strokeColor : dataset.pointStrokeColor,
								fillColor : dataset.pointColor,
								highlightFill : dataset.pointHighlightFill || dataset.pointColor,
								highlightStroke : dataset.pointHighlightStroke || dataset.pointStrokeColor
						}));
						
					}, this);
				this.buildScale(data.labels);

					this.eachPoints(function(point, index){
						helpers.extend(point, {
							//need to make it zero-based
							x: this.scale.calculateX(pts[index][0] - pts[0][0]),
							y: this.scale.endPoint
						});
						point.save();
					}, this);
				
				}
				
				else{
					helpers.each(dataset.data,function(dataPoint,index){
						//Add a new point for each piece of data, passing any required data to draw.
						datasetObject.points.push(new this.PointClass({
							value : dataPoint,
							label : data.labels[index],
							datasetLabel: dataset.label,
							strokeColor : dataset.pointStrokeColor,
							fillColor : dataset.pointColor,
							highlightFill : dataset.pointHighlightFill || dataset.pointColor,
							highlightStroke : dataset.pointHighlightStroke || dataset.pointStrokeColor
						}));
					},this);
					
				this.buildScale(data.labels);

				this.eachPoints(function(point, index){
					helpers.extend(point, {
						x: this.scale.calculateX(index),
						y: this.scale.endPoint
					});
					point.save();
				}, this);
				}

			},this);

			this.render();
		},
		update : function(){
			this.scale.update();
			// Reset any highlight colours before updating.
			helpers.each(this.activeElements, function(activeElement){
				activeElement.restore(['fillColor', 'strokeColor']);
			});
			this.eachPoints(function(point){
				point.save();
			});
			
			this.render();
		},
		eachPoints : function(callback){
			helpers.each(this.datasets,function(dataset){
				helpers.each(dataset.points,callback,this);
			},this);
		},
		getPointsAtEvent : function(e){
			var pointsArray = [],
				eventPosition = helpers.getRelativePosition(e);
			helpers.each(this.datasets,function(dataset){
				helpers.each(dataset.points,function(point){
					if (point.inRange(eventPosition.x,eventPosition.y)) pointsArray.push(point);
				});
			},this);
			return pointsArray;
		},
		buildScale : function(labels){
			var self = this;

			var dataTotal = function(){
				var values = [];
				self.eachPoints(function(point){
					values.push(point.value);
				});

				return values;
			};

			var scaleOptions = {
				templateString : this.options.scaleLabel,
				height : this.chart.height,
				width : this.chart.width,
				ctx : this.chart.ctx,
				textColor : this.options.scaleFontColor,
				offsetGridLines : this.options.offsetGridLines,
				fontSize : this.options.scaleFontSize,
				fontStyle : this.options.scaleFontStyle,
				fontFamily : this.options.scaleFontFamily,
				valuesCount : labels.length,
				beginAtZero : this.options.scaleBeginAtZero,
				integersOnly : this.options.scaleIntegersOnly,
				calculateYRange : function(currentHeight){
					var updatedRanges = helpers.calculateScaleRange(
						dataTotal(),
						currentHeight,
						this.fontSize,
						this.beginAtZero,
						this.integersOnly
					);
					helpers.extend(this, updatedRanges);
				},
				xLabels : labels,
				font : helpers.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
				lineWidth : this.options.scaleLineWidth,
				lineColor : this.options.scaleLineColor,
				showHorizontalLines : this.options.scaleShowHorizontalLines,
				showVerticalLines : this.options.scaleShowVerticalLines,
				gridLineWidth : (this.options.scaleShowGridLines) ? this.options.scaleGridLineWidth : 0,
				gridLineColor : (this.options.scaleShowGridLines) ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
				padding: (this.options.showScale) ? 0 : this.options.pointDotRadius + this.options.pointDotStrokeWidth,
				showLabels : this.options.scaleShowLabels,
				display : this.options.showScale
			};

			if (this.options.scaleOverride){
				helpers.extend(scaleOptions, {
					calculateYRange: helpers.noop,
					steps: this.options.scaleSteps,
					stepValue: this.options.scaleStepWidth,
					min: this.options.scaleStartValue,
					max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
				});
			}

			this.scale = new Chart.Scale(scaleOptions);
		},
		addData : function(valuesArray,label){
			//Map the values array for each of the datasets
			
			helpers.each(valuesArray,function(value,datasetIndex){
				//Add a new point for each piece of data, passing any required data to draw.
				this.datasets[datasetIndex].points.push(new this.PointClass({
					value : value,
					label : label,
					datasetLabel: this.datasets[datasetIndex].label,
					x: this.scale.calculateX(this.scale.valuesCount+1),
					y: this.scale.endPoint,
					strokeColor : this.datasets[datasetIndex].pointStrokeColor,
					fillColor : this.datasets[datasetIndex].pointColor
				}));
			},this);

			this.scale.addXLabel(label);
			//Then re-render the chart.
			this.update();
		},
		removeData : function(){
			this.scale.removeXLabel();
			//Then re-render the chart.
			helpers.each(this.datasets,function(dataset){
				dataset.points.shift();
			},this);
			this.update();
		},
		reflow : function(){
			var newScaleProps = helpers.extend({
				height : this.chart.height,
				width : this.chart.width
			});
			this.scale.update(newScaleProps);
		},
		draw : function(ease){
			var easingDecimal = ease || 1;
			this.clear();

			var ctx = this.chart.ctx;
			this.drawLine(ctx);
			
			// Some helper methods for getting the next/prev points
			var hasValue = function(item){
				return item.value !== null;
			},
			nextPoint = function(point, collection, index){
				return helpers.findNextWhere(collection, hasValue, index) || point;
			},
			previousPoint = function(point, collection, index){
				return helpers.findPreviousWhere(collection, hasValue, index) || point;
			};

			this.scale.draw(easingDecimal);

			helpers.each(this.datasets,function(dataset){
				var pointsWithValues = helpers.where(dataset.points, hasValue);

				//Transition each point first so that the line and point drawing isn't out of sync
				//We can use this extra loop to calculate the control points of this dataset also in this loop

				helpers.each(dataset.points, function(point, index){
					if (point.hasValue()){
						point.transition({
							y : this.scale.calculateY(point.value),
							x : point.x //this.scale.calculateX(index)
						}, easingDecimal);
					}
				},this);

				//Now draw the points over the line
				//A little inefficient double looping, but better than the line
				//lagging behind the point positions
				helpers.each(pointsWithValues,function(point){
					point.draw();
				});
			},this);
		},
		
		// made to draw a point for each column & connect
		drawLine : function(ctx){
			
			var points = this.calcBestFit();
			//if there's literally no data
			if (points == undefined)
				return;
			/* x and y scaled values: 
			 * y : this.scale.calculateY(point.value),
			 * x : this.scale.calculateX(index)
			 */
			 // we need to scale the x and y values for the canvas
			for(var i = 0; i < points.length; i++){
				points[i][0] = this.scale.calculateX(points[i][0]-1);
				points[i][1] = this.scale.calculateY(points[i][1]);
			}
			ctx.lineWidth = this.options.datasetStrokeWidth;
			ctx.strokeStyle = this.options.linRegLineColor;
			ctx.beginPath();
			
			helpers.each(points, function(point, index){
				if (index === 0){
					ctx.arc(this[0], this[1], this.radius*1.2, 0, Math.PI*2);
					ctx.moveTo(point[0], point[1]);					
				}
				else{
					ctx.arc(this[0], this[1], this.radius*1.2, 0, Math.PI*2);
					ctx.lineTo(point[0],point[1]);
					}
			}, this);
			
			ctx.fill();
			ctx.stroke();
		},
		
		// best fit (simple linear right now)
		calcBestFit : function() {
			var xValues = [];
			
			//have to check to make sure data is present (not undefined)
			//probably an isolated enough issue that it doesn't need to be included
			//could also be changed to use the helpers hasValue function
			var validRows = []; 
			for(var i = 0; i < this.datasets.length; i++){
				if(this.datasets[i].points != undefined)
					validRows.push(i);
			}
			
			//if there's literally no data
			if(validRows.length == 0)
				return undefined;
			console.log(validRows);
			// if first label isn't a number...
			// TODO should check all labels & if any aren't numbers
			// normalize them (0 through whatever)
			if(isNaN(this.datasets[validRows[0]].points[0].label)){
				for(var i = 0; i < this.datasets[validRows[0]].points.length; i++){
					xValues.push(i);
				}
			}
			// else, use the labels (any row in the data will work)
			else{
				for(var i = 0; i < this.datasets[validRows[0]].points.length; i++){	
					xValues.push(this.datasets[validRows[0]].points[i].label);
				}
			}
			
			var xmean = 0.0;
			var ymean = 0.0;
			
			// calculating mean x value
			for(var i = 0; i < xValues.length; i++){
				xmean += parseFloat(xValues[i]);
			}						
			xmean = xmean / (parseFloat(xValues.length));
			
			// calculating mean y value
			for(var i = 0; i < validRows.length; i++){
				for(var j = 0; j < this.datasets[validRows[i]].points.length; j++){
					ymean += parseFloat(this.datasets[validRows[i]].points[j].value);
				}
			}
			ymean = ymean / parseFloat((parseFloat(validRows.length) * parseFloat(this.datasets[validRows[0]].points.length)));
			
			// calculating slope 
			var bottom = 0.0; 
			var top = 0.0; 
				for(var i = 0; i < validRows.length; i++){
					for(var j = 0; j < this.datasets[validRows[i]].points.length; j++){
						var value = [parseFloat(xValues[j]), parseFloat(this.datasets[validRows[i]].points[j].value)];
						var ydiff = value[1] - ymean;
						var xdiff = value[0] - xmean;
						bottom += (xdiff * xdiff);
						top += (xdiff * ydiff);
					}	
				}
			
			var slope = parseFloat(top) / parseFloat(bottom);
			var yint = ymean - slope * xmean;
			
			// generate points on line for each x int value in range
			// PRECONDITION: data MUST be sorted.
			// y = mx + b
			var values = [];
			// if we had numerical x-values...
			if(!isNaN(this.datasets[validRows[0]].points[0].label)){
			for(var i = this.datasets[validRows[0]].points[0].label; i <= this.datasets[validRows[0]].points[this.datasets[0].points.length-1].label; i++){
					values.push([i,(slope * parseFloat(i) + yint)]);
				}
			}
			// otherwise, assume there's no gaps in the data
			// Just push ints within the range for spacing purposes.
			else{
				for(var i = 0; i < xValues.length; i++){
					values.push([i+1,(slope * parseFloat(i) + yint)]);
				}
			}
			return values;
		}
	});
}).call(this);