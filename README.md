# Train-Schedule

Link: https://alexwetzel.github.io/Train-Schedule.github.io/

A table that uses Firebase to log and display train times.

The website displays a table with information stored in Firebase, and a form that allows users to submit train information. Users can enter the train name, desination, the time between arrivals, and the initial departure time. This informations is stored in Firebase, and then added to the train schedule. The time of the next arrival and the minutes to the next arrival are calculated in Javascript and added to the table.

Note: In the instructions, the time between arrivals is labeled as frequency, but frequency is defined as a number of occurrences over time. The inverse of frequency is the period, time between occurrences, which is what I use.