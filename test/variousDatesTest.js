var _ = require("lodash");
var moment = require("moment");
var cleanDate = require("../");
var assert = require("assert");

// need to work on "13-12-14" more..
//examples();
testCleanDate();

function testCleanDate(dates) {
    var i = 0;
    var dates = ["1-13-2003", "1-11-2003", "15-1-2013", "2014-1-16", "2014/1/17", "1 18 2017", "2017_1_19", "4-4-72", "13-12-14", "11-10-12", "47-15-3"];
    var USAnswerKey = ["01/13/2003", "01/11/2003", "01/15/2013", "01/16/2014", "01/17/2014", "01/18/2017", "01/19/2017", "04/04/1972", "12/13/2014", "11/10/2012", "03/15/1947"];
    var GBAnswerKey = ["13/01/2003", "01/11/2003", "15/01/2013", "16/01/2014", "17/01/2014", "18/01/2017", "19/01/2017", "04/04/1972", "13/12/2014", "11/10/2012", "15/03/1947"];
    var TWAnswerKey = ["2003/01/13", "2003/11/01", "2013/01/15", "2014/01/16", "2014/01/17", "2017/01/18", "2017/01/19", "1972/04/04", "2013/12/14", "2011/10/12", "1947/03/15"];

    _.forEach(dates, function(date) {
        testDate(date, USAnswerKey[i],GBAnswerKey[i],TWAnswerKey[i]);
        i++;
    })
}

function testDate(date, USAnswer, GBAnswer, TWAnswer) {
    describe("Original Date: " + date, function() {
        it("should equal the US answeyKey value.", function() {
            cleanDate.setCountry("US");
            var finalDate = cleanDate.cleanDate(date)
            assert.equal(new moment(finalDate).format("MM/DD/YYYY"), USAnswer);
        });
    });
        it("should equal the GB answeyKey value.", function() {
            cleanDate.setCountry("GB");
            var gbDate = new cleanDate.cleanDate(date);
            assert.equal(new moment(gbDate).format("DD/MM/YYYY"), GBAnswer);
        });
        it("should equal the TW answeyKey value.", function() {
            var twDate = cleanDate.cleanDate(date, "TW");
            console.log("*********",date, twDate);
            assert.equal(new moment(twDate).format("YYYY/MM/DD"), TWAnswer);
        });
}
// function examples(){

// var dates = ["1-13-2003", "1-11-2003", "15-1-2013", "2014-1-16", "2014/1/17", "1 18 2017", "2017_1_19", "4-4-72", "13-14-12", "11-10-12", "47-15-3"];

// cleanDate.setCountry("GB");
// _.forEach(dates, function(date) {
//  var result = cleanDate.cleanDate(date);
//  console.log("example 1",result);
// });


// var dates = [{date: "1-13-2003", country: "BE"}, {date: "1-11-2003", country:"TW"}, {date: "1 18 2017", country: "US"}];
// _.forEach(dates, function(foo) {
//  var result = cleanDate.cleanDate(foo.date, foo.country);
//  console.log("example 2",result);
// });


// }