var chart;
var app = {

    // Application Constructor
    initialize: function() {
        // this.bindEvents();
	this.onDeviceReady();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.drawChart();
        $("#configForm").bind("change", function() {
	    var rpmValue = $("#rpm").val();
            console.log("new value: " + rpmValue);
            app.updateChart(rpmValue);
        });
    },

    updateChart: function(newRpm) {
        var point = chart.series[0].points[0];
        var newVal = newRpm * 1;
        console.log("newVal: " + newVal);
        console.log("old point value: " + point.y);
        point.update(newVal);
    },

    drawChart: function() {
      console.log("drawChart");
      chart = new Highcharts.Chart({

       chart: {
            renderTo: 'rpm-gauge',
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        
        title: {
            text: 'Engine RPM'
        },
        
        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },
           
        // the value axis
        yAxis: {
            min: 0,
            max: 6000,
            
            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',
    
            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'rpm'
            },
            plotBands: [{
                from: 0,
                to: 1000,
                color: '#55BF3B' // green
            }, {
                from: 1000,
                to: 4500,
                color: '#DDDF0D' // yellow
            }, {
                from: 4500,
                to: 6000,
                color: '#DF5353' // red
            }]        
        },
    
        series: [{
            name: 'RPM',
            data: [0],
            tooltip: {
                valueSuffix: ' rpm'
            },
	    dataLabels: {
                enabled: true,
                style: {
                    //fontWeight:'bold',
                    fontSize: '22px'
                }
            }
        }]

      });

    }

};
