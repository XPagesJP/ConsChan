var thisPage = thisPage || {};
thisPage.humidUrl = "https://aa708441-5a56-4bcd-80f1-8cf95a79e302-bluemix.cloudant.com/temp_humid/_design/default/_view/temp_humid?limit=48&reduce=false&descending=true";
thisPage.username = 'daysselycomentrentionces';
thisPage.password = '3fcbaf975eb0ce8e9fe9049319d026d0b41d433b';
thisPage.readData = function(){
    $.ajax({
        url : thisPage.humidUrl,
        method : 'GET',
        dataType : 'json',
        headers: {
            "Authorization": "Basic " + btoa(thisPage.username + ":" + thisPage.password)
        }
    })
    .done(function(data){
        var rows = data.rows.map(function(e,i){return e.value}).reverse();
        var dt = rows.map(function(e,i){
            return moment(e.datetime).format('MM/DD HH:mm');
        });
        var t = rows.map(function(e,i){return e.temparture});
        var data_t = {
            labels : dt,
            datasets : [
                {
                    label : 'temparture',
                    fill : false,
                    lineTension : 0.1,
                    data : t,
                    borderJoinStyle: 'miter'
                }
            ]
        };
        var tChart = new Chart($('#chart_t'),{
            type: 'line',
            data: data_t
        });
        
        var h = rows.map(function(e,i){return e.humidity});
        var data_h = {
            labels : dt,
            datasets : [
                {
                    label : 'humidity',
                    fill : false,
                    lineTension : 0.1,
                    data : h,
                    borderJoinStyle: 'miter'
                }
            ]
        };
        var hChart = new Chart($('#chart_h'),{
            type: 'line',
            data: data_h
        });
    });
};