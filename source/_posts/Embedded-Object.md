---
title: Embedded Object
date: 2019-03-26 00:00:00
categories:
  - Programming
tags:
  - JavaScript
  - MongoDB
  - Algorithm
---

# Embedded Object

## Introduction

The following algorithm helps to store data and calculate subtotal.

## Description

In the MongoDB database, there are a number of documents each of which has a year field (Year, type: string), a month field (Month, type: string) and a revenue field (Revenue, type: float).
Each month can have zero to multiple documents recording the revenue obtained from a transaction.
The task is to calculate and visualize the subtotal of revenue for each month.

## Inputs & Outputs

Input(s): a MongoDB collection.
Output(s): an object containing revenues for all existing years and months (printed & returned).

## Algorithm

```JavaScript
async function analyzeForEachMonth (db) {
  // Get all the documents (in async function)
  const transactions = await db.Transaction.model.find();
  const obj = {};
  for (let i=0; i<transactions.length; i++) {
      const { Year, Month, Revenue } = transactions[i];
      // Check if Year and Month have been created in obj. If not, create one with initial revenue of 0.
      if (!obj[Year]) {
          obj[Year] = {};
      } else if (!obj[Year][Month]) {
          obj[Year][Month] = 0;
      }
      // Add Revenue to the corresponding Year and Month
      obj[Year][Month] += Revenue;
  }
  // Visualize obj
  console.log('Cumulative revenue for all applicable years and months:');
  console.log(obj);
  return obj;
}

// Sample Output
/*
  Cumulative revenue for all applicable years and months:
  {
    '2017': {
      '4': 13,000
      '12': 36,000
    },
    '2018': {
      '1': 18,000
      '2': 32,000
      '9': 14,000
      '12': 30,000
    },
    '2019': {
      '3': 34,000
    }
  }
*/
```
