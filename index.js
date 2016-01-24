var _ = require("lodash");
var countries = require("./dataCountries").Countries();

globalCountry = 'US';

exports.setCountry = function(countryCode) {
    globalCountry = countryCode;
}

// summary:
//         This function was built with the intent of taking a date of any set of three numbers and put them into a valid Date object.
//          It can help when scrubbing data or just to avoid the "Invalid Date" error on the Date constructor.  This only deals with dates / time stamp info will be dropped.
//          Passing in country allows for a match based on one of the countries "normal" date formats (MM/DD/YYYY or YYYY/MM/DD or DD/MM/YYYY depending on country).  
//          Note: Some countries have multiple formats - I did my best on identifying which ones use which format primarily, but feel free to submit a change request 
//          if you have more knowledge of some of the other countries.
exports.cleanDate = function(date, countryCode) {
    numbers = _.words(date); //get an array of all numbers (remove delimiters);
    var foundYear, year, day, month;

    //Primary/Safe Method: if date numbers happen to work out where year is > 31 or 4 digits, day > 12 then we know what goes where..
    _.forEach(numbers, function(number) { //find year
        if (number.length == 4 || number > 31) {
            year = number;
            foundYear = year;
        }
    });
    if (year) {
        _.forEach(numbers, function(number) { //find day
            if (number > 12 && number != year) {
                day = number;
            }
        })
        if (day) {
            _.forEach(numbers, function(number) { //find month (only remaining number)
                if (number != year && number != day) {
                    month = number
                }
            })
        }
    }

    //Backup - Country Format based Method: Use the country format passed.  If no country passed, we will assume 'US'.
    if (!month) {
        // default if none is passed in.. countryCode = "XX";  TODO: WILL ERROR on GetCountry() returning undefined. 
        finalCountryCode = globalCountry;
        if (countryCode) {
            finalCountryCode = countryCode;
        }
        var country = getCountry(finalCountryCode);
        var i = 0
        _.forEach(_.words(country.dateFormat), function(dateFormat) {
            switch (dateFormat) {
                case "YYYY":
                    year = numbers[i];
                    break;
                case "MM":
                    month = numbers[i];
                    break;
                case "DD":
                    day = numbers[i];
                    break;
            }
            i++;
        });

        //Dealing with specific issues around formats that lead with years.
        if (foundYear && country.dateFormat == "YYYY/MM/DD" && foundYear != year) // a year first date country (YYYY/MM/DD) came through with the wrong format, assume it's MM/DD/YYYY.. TODO: could prob improve this scenario
        {
            var tempYear = year;
            year = foundYear;
            //make sure to fix whatever field may have had the data.
            if (month == year) {
                month = tempYear;
            }
            if (day == year) {
                day = tempYear;
            }
        }

        // deal with month having clearly wrong data
        if (month > 12) // date was not identified, so do our best!  swap day and month.
        {
            var tempMonth = month;
            month = day;
            day = tempMonth;
        }

    }

    // make assumptions on century in the case of 2 digit years..
    if (year.length && year.length == 2) //if 2 digit year, we have to decide what century... we will use 1931-2030 range for simplicity for now. (TODO: calculate off current year and/or allow for some type of mechanism to set the range..)
    { 
        if (parseInt(year) > 30) {
            year = "19" + year;
        }
        else {
            year = "20" + year;
        }
    }
    return new Date(year, month - 1, day);
}

function getCountry(isoCode) //standard iso 2 character country code required.
{

    var country = _.find(countries, {
        'isoCode': isoCode
    });
    return country;
}