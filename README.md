
INSTALL: 

#cleanDate

Date cleansing and construction helper for Node.js. Basically will try to avoid invalid date errors by doing its best to figure out various dates/delimiters etc that maybe passed in during data cleansing efforts or web forms that don't have validation. Not meant to be a lazy way to create dates, but a tool in helping with bad data

## Install

```sh
$ npm install cleanDate
```
## Details

Take any date String consisting 3 sets of numbers (15/3/16, 1998/12/3, 4/4/72, etc..) and turning it into a valid Date object using a set of predetermined rules. It can help when scrubbing date data or just to avoid the "Invalid Date" error on the Date constructor.  This only deals with dates / time stamp info will be dropped.

It follows pretty simple rules: 
	1) Try to determine the date by year > 31 or being 4 digits, then day being > 12 
	2) If that fails, use the country code passed in to the method and lookup and use the default date format for that country.
	3) If no country code was passed in, but setCountry() was used to preset a global country, then lookup and use the default date format for that country.
	4) If no country code was passed in and setCountry() was NOT preset, then it will assume US date format (MM/DD/YYYY).  Note: Depending on feedback, I may throw an exception if country is not provided and rule #1 fails, so please pass country in to avoid deprecation in the future.
	5) Check to make sure month and day are within right parameters.. if not it does it's best to fix it.

Note: Some countries have multiple formats - I did my best on identifying which ones use which format primarily, but feel free to submit a change request if you have more knowledge of some of the other countries.

### Examples

Simple examples - if you don't setCountry() or pass country into the call, it assumes US date is the goal.
```javascript
var cleanDate = require("cleandate");

var dates = ["1-13-2003", "1-11-2003", "15-1-2013", "2014-1-16", "2014/1/17", "1 18 2017", "2017_1_19", "4-4-72", "13-14-12", "11-10-12", "47-15-3"];

	cleanDate.cleanDate("15-1-2013");
	//result is 1/15/2013

 	cleanDate.cleanDate("2017_1_19");
	//result is 1/19/2017

 	cleanDate.cleanDate("2017_1_19", "GB");
	//result is 19/1/2017

	cleanDate.cleanDate("11-10-12");
	//result is 11/10/2013
});
```

Looping through several dates (like from a csv file, or other collection where date formats are inconsistent or unsure, by setting a global country code with setCountry() first then sending the dates through cleanDate.
```javascript
var _ = require("lodash");
var cleanDate = require("cleandate");

var dates = ["1-13-2003", "1-11-2003", "15-1-2013", "2014-1-16", "2014/1/17", "1 18 2017", "2017_1_19", "4-4-72", "13-14-12", "11-10-12", "47-15-3"];

cleanDate.setCountry("GB");
_.forEach(dates, function(date) {
	var result = cleanDate.cleanDate(date);
	console.log(result);
});
```

Pass a country in per date.

```javascript
var _ = require("lodash");
var cleanDate = require("cleandate");

var dates = [{date: "1-13-2003", country: "BE"}, {date: "1-11-2003", country:"TW"}, {date: "1 18 2017", country: "US"}];

_.forEach(dates, function(foo) {
	var result = cleanDate.cleanDate(foo.date, foo.country);
	console.log(result);
});
```


## [More Documentation](https://github.com/raskawa/cleandate/wiki)

## Features

* Handle more date strings to help avoid "Invalid Date".
* Looks up and tries to use country specific date formats when Country is passed in.
* As a bonus, includes a basic country date data set with country specific date formats (and iso / friendly names).

## Contributing

__We love contributions!__

If you need help getting the tests running locally or have any questions about the code when working on a patch please feel free to email me or gchat me.

I will __happily__ accept your pull request if it:
- has a test code snippet that runs
- looks reasonable
- does not break backwards compatibility

Open source belongs to all of us, and we're all invited to participate!

## Support

If at all possible when you open an issue please provide
- version of node
- version of postgres
- smallest possible snippet of code to reproduce the problem

If you need help or run into _any_ issues getting cleanDate to work on your system please report a bug or contact me directly.  I am usually available via google-talk at my github account public email address.

I will tweet about any important status updates or changes to cleanDate on twitter.
Follow me [@dgodwin](https://twitter.com/dgodwin) to keep up to date.


## Extras

Below are some great libraries for parsing / handling data:

- [lodash/lodash](https://github.com/lodash/lodash/) - Awesome library used throughout cleanDate.  It basically adds tons of additional great functions for interacting with strings, arrays, objects, collections, and much more. 
- [moment/moment](https://github.com/moment/moment) - A great library for easily manipulating and formatting Dates.  cleanDate can be used to help create you moment object.  Also check out moment-tz for easily handling timezones.

Finally, special thanks to the AlertMedia team (http://www.alertmedia.com) for introducing me to lodash / moment and all the wonders of Node!

## License

Copyright (c) 2016 David Godwin (raskawa@gmail.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.