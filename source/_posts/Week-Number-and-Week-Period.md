---
title: Week Number and Week Period
date: 2019-04-10 00:00:00
categories:
  - My Career
tags:
  - JavaScript
  - Algorithm
  - Moment.js
---

# Week Number and Week Period

## Introduction

The following algorithm deals with a seires of common problems about the calculation of time and period.

## Description

Given a start date (e.g. Dec 31, 2018) and a current date (e.g. April 26, 2019), calculate the week number of the current date (counting from the start date) and the start date and the end date of that week.

## Inputs & Outputs

Input(s): a start date (string) and a current date (string).
Output(s): the week number of the current date (printed) and the period of that week (printed).

## Algorithm

```bash
npm install moment
```

```JavaScript
function getWeekNumberAndPeriod (start_date_string, curr_date_string) {
  // Create a Date object for the start date and the example date:
  const startDate = new Date(start_date_string);
  const exampleDate = new Date(curr_date_string);
  // Time difference in days in decimal:
  const inDecimal = (exampleDate - startDate)/1000/60/60/24;
  const dayNumber = Math.ceil(inDecimal); // "Dec 31, 2018 23:00:00" is still considered as Day One.
  const weekNumber = Math.floor((daysNumber-1)/7) + 1; // "Jan 7, 2019 00:00:00" is considered to be in Week Two.
  console.log(`Week Number: ${weekNumber}.`);

  const startDateMs = startDate.getTime();
  const startWeekMs = startDateMs + ((weekNumber-1)*7)*24*60*60*1000;
  const startWeekDate = new Date(startWeekMs);
  // Use Moment to format time:
  const moment = require("moment");
  moment().format();
  // Format startWeekDate:
  const startWeekStr = moment(startWeekDate).format('MMM D, YYYY');
  const endWeekMs = startDateMs + (weekNumber*7-1)*24*60*60*1000;
  const endWeekDate = new Date(endWeekMs);
  // Format endWeekDate:
  const endWeekStr = moment(endWeekDate).format('MMM D, YYYY');
  console.log(`Week Period: ${startWeekStr} ~ ${endWeekStr}`);
}
```

## Lessons

### 1.

`new Date()` is able to take either one of the following two types of parameter:
1 - a string that indicates a time point. (e.g. `"Dec 31, 2018 00:00:00"` or `"2018-12-31 00:00:00"`),
2 - an integer that indicates the cumulative time in milliseconds starting from Jan 1, 1970, 00:00:00.000 GMT,
and it returns a JavaScript date object based on the given parameter.

### 2.

`exampleDate - startDate` returns the time difference in millisecond between two date objects.
If the difference is positive, then `exampleDate` is after `startDate`; if the difference is negative, then `exampleDate` is before `startDate`.

### 3.

To find out the relationship between two variables, it is a good idea to satrt with comparing several representative sample figures:

| daysNumber | weekNumber |            startWeekMs             |             endWeekMs              |
| :--------: | :--------: | :--------------------------------: | :--------------------------------: |
|     1      |     1      | `startDateMs + 0 * 24*60*60*1000`  | `startDateMs + 6 * 24*60*60*1000`  |
|    ...     |    ...     |                ...                 |                ...                 |
|     7      |     1      | `startDateMs + 0 * 24*60*60*1000`  | `startDateMs + 6 * 24*60*60*1000`  |
|     8      |     2      | `startDateMs + 7 * 24*60*60*1000`  | `startDateMs + 13 * 24*60*60*1000` |
|    ...     |    ...     |                ...                 |                ...                 |
|     14     |     2      | `startDateMs + 7 * 24*60*60*1000`  | `startDateMs + 13 * 24*60*60*1000` |
|     15     |     3      | `startDateMs + 14 * 24*60*60*1000` | `startDateMs + 20 * 24*60*60*1000` |

With some further observation, it becomes much easier to induce the following expressions:

```JavaScript
const weekNumber = Math.floor((daysNumber-1)/7) + 1;
const startWeekMs = startDateMs + ((weekNumber-1)*7)*24*60*60*1000;
const endWeekMs = startDateMs + (weekNumber*7-1)*24*60*60*1000;
```

### 4.

[Moment](http://momentjs.com/docs/ 'Moment.js | Docs') is an npm package that is very useful in parsing and formatting JS date objects.
