'use strict';

var Client = require('node-rest-client').Client;

var client = new Client();

// direct way
client.get("https://sheetsu.com/apis/831cf032", function (data, response) {
    // parsed response body as js object
    // var results = [];
    var results = [];
    for(var i = 0; i < data.result.length; i++) {
        var row = data.result[i];
        var result = {
            body : row.BusinessName,
            address : row.Address1 + row.Suite + '\n' + row.CityName + row.StateCode + row.ZIPCode,
            hours : 'M-F 9a-5p',
            social : row.WebAddressURL,
            phone : row.PhoneMain,
            website : row.WebAddressURL,
            category : '',
            profileImage : '',
            daysOpen : 'M-F',
            descriptions : row.DescriptionOfWork,
            email : 'dummy@dummy.net',
            status : 'A|BO'
        };
        results.push(result);
    }
    console.log(JSON.stringify(results, null, '\t'))
});