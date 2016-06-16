/**
 * Created by Life_Sucks on 2016-06-12.
 */
Template.MainGraph.onRendered(function() {
    this.autorun(function(){
        $('#container').highcharts({
            title: {
                text: Session.get('singer'),
                x: -20 //center
            },
            subtitle: {
                text: 'Album',
                x: -20
            },
            xAxis: {
                categories: ['2005', '2006', '2007', '2008', '2009', '2010',
                    '2011', '2012', '2013', '2014', '2015', '2016']
            },
            yAxis: {
                title: {
                    text: 'Albums (EA)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '개'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: '앨범',
                data: Session.get('albumGraph')
            }]
        });
    });
});