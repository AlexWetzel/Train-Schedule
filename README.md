# Train-Schedule

Link: https://alexwetzel.github.io/Train-Schedule.github.io/

A table that uses Firebase to log and display train times.

The website displays a table with the following information:
-Train name
-Destination
-Period (minutes between arrivals)
-Next arrival
-Minutes until the train arrives

The train name, desination, the time between arrivals, and the initial departure time are taken from a form input and stored in an object in Firebase. The script takes all objects in Firebase and sorts them in order by key. As this happens, the next arrival and the minutes to the next train are calculated using Moment.js. After this, all of the information is added to the table.

Note: In the instructions, the time between arrivals is labeled as frequency, but frequency is defined as a number of occurrences over time. The inverse of frequency is the period, time between occurrences, which is what I use.