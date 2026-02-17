"use strict";

/*
 * Term Project Phase 2
 * Blessing Chizarum Amadi
 * Hypothesis:
 * As my daily hours of sleep and bedtime consistency increases,
 * my sleep quality increases.
 */

let sleepObservations = [

    {
        date: "2026-02-04",
        bedtime: "22:30",
        wakeUpTime: "08:05",
        hoursSlept: 10,
        minutesAwakeBeforeSleep: 25, // time spent in bed before falling asleep (minutes)
        sleepQualityRating: 5, // scale of 1–5
        notes: "I woke to good news."
    }, // sleep observation for Feb 4

    {
        date: "2026-02-05",
        bedtime: "22:50",
        wakeUpTime: "06:55",
        hoursSlept: 8,
        minutesAwakeBeforeSleep: 5,
        sleepQualityRating: 3,
        notes: "I had a less stressful day."
    }, // sleep observation for Feb 5

    {
        date: "2026-02-06",
        bedtime: "23:00",
        wakeUpTime: "07:10",
        hoursSlept: 8,
        minutesAwakeBeforeSleep: 50,
        sleepQualityRating: 4,
        notes: "It was my birthday and I had a very good day."
    }, // sleep observation for Feb 6

    {
        date: "2026-02-07",
        bedtime: "22:55",
        wakeUpTime: "06:00",
        hoursSlept: 8,
        minutesAwakeBeforeSleep: 5,
        sleepQualityRating: 5,
        notes: "I didn't have very tasking or exhausting activities."
    }, // sleep observation for Feb 7

    {
        date: "2026-02-08",
        bedtime: "23:10",
        wakeUpTime: "06:30",
        hoursSlept: 8,
        minutesAwakeBeforeSleep: 20,
        sleepQualityRating: 2,
        notes: "I was involved in long hours of cooking."
    }, // sleep observation for Feb 8

    {
        date: "2026-02-09",
        bedtime: "22:05",
        wakeUpTime: "08:25",
        hoursSlept: 10,
        minutesAwakeBeforeSleep: 30,
        sleepQualityRating: 5,
        notes: "I woke up feeling really energized."
    }, // sleep observation for Feb 9

    {
        date: "2026-02-10",
        bedtime: "23:35",
        wakeUpTime: "07:05",
        hoursSlept: 8,
        minutesAwakeBeforeSleep: 20,
        sleepQualityRating: 3,
        notes: "I stayed back after classes to finish several assignments."
    }, // sleep observation for Feb 10

    {
        date: "2026-02-11",
        bedtime: "22:00",
        wakeUpTime: "07:30",
        hoursSlept: 9,
        minutesAwakeBeforeSleep: 30,
        sleepQualityRating: 4,
        notes: "I had a good day and didn't have much physical engagement."
    }, // sleep observation for Feb 11

    {
        date: "2026-02-12",
        bedtime: "03:15",
        wakeUpTime: "11:05",
        hoursSlept: 8,
        minutesAwakeBeforeSleep: 40,
        sleepQualityRating: 1,
        notes: "I was up really late and couldn't sleep. Possibly emotional stress."
    }, // sleep observation for Feb 12

    {
        date: "2026-02-13",
        bedtime: "02:35",
        wakeUpTime: "10:15",
        hoursSlept: 8,
        minutesAwakeBeforeSleep: 10,
        sleepQualityRating: 2,
        notes: "I was awake planning a surprise."
    }, // sleep observation for Feb 13

    {
        date: "2026-02-14",
        bedtime: "04:10",
        wakeUpTime: "10:10",
        hoursSlept: 6,
        minutesAwakeBeforeSleep: 40,
        sleepQualityRating: 1,
        notes: "It was Valentine’s Day."
    }, // sleep observation for Feb 14

    {
        date: "2026-02-15",
        bedtime: "01:02",
        wakeUpTime: "10:08",
        hoursSlept: 9,
        minutesAwakeBeforeSleep: 50,
        sleepQualityRating: 5,
        notes: "I woke up feeling really energized and optimistic."
    }, // sleep observation for Feb 15

    {
        date: "2026-02-16",
        bedtime: "03:30",
        wakeUpTime: "09:10",
        hoursSlept: 6,
        minutesAwakeBeforeSleep: 20,
        sleepQualityRating: 1,
        notes: "I took out my braids so it wore me out."
    } // sleep observation for Feb 16

]; // list of sleep observations




// STEP 1: Uncomment temporarily to validate JSON
// console.log(JSON.stringify(sleepObservations));


// STEP 2: Leave this uncommented for submission
showData(sleepObservations);
