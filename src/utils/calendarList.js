import { addDays } from 'date-fns/addDays';
import { addMonths } from 'date-fns/addMonths';
import { getDaysInMonth } from 'date-fns/getDaysInMonth';
import { startOfMonth } from 'date-fns/startOfMonth';
import { subMonths } from 'date-fns/subMonths';

const CALENDAR_LENGTH = 35;
const DAY_OF_WEEK = 7;
const DayEnum = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

/** @type {(date: Date, startDay: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday') => number} */
const getPrevDayCount = (date, startDay) => {
  const prevDayCount =
    (startOfMonth(date).getDay() - DayEnum[startDay] + DAY_OF_WEEK) %
    DAY_OF_WEEK;
  return prevDayCount;
};

/** @type {(date: Date, length: number) => Date[]} */
const getPrevMonthDate = (date, length) => {
  const lastDayOfPrevMonth = getDaysInMonth(subMonths(date, 1));

  const prevDayList = Array.from({ length }).map((_, i) => {
    return addDays(
      new Date(date.getFullYear(), date.getMonth() - 1, 1),
      lastDayOfPrevMonth - length + i
    );
  });
  return prevDayList;
};

/** @type {(date: Date) => Date[]} */
const getCurrentMonthDate = (date) => {
  const length = getDaysInMonth(date);
  const startOfMonthDate = startOfMonth(date);
  return Array.from({ length }).map((_, i) => {
    return addDays(startOfMonthDate, i);
  });
};

/** @type {(currentDayLength: number, prevDayLength: number) => number} */
const getNextDayCount = (currentDayLength, prevDayLength) => {
  return CALENDAR_LENGTH - currentDayLength - prevDayLength;
};

/** @type {(date: Date, length: number) => Date[]} */
const getNextMonthDate = (date, length) => {
  const firstDayOfNextMonth = startOfMonth(addMonths(date, 1));
  const nextDayList = Array.from({ length }).map((_, i) => {
    return addDays(firstDayOfNextMonth, i);
  });
  return nextDayList;
};

/** @type {(dateList: Date[]) => Date[][]} */
const flatTo2DArray = (dateList) => {
  return dateList.reduce((acc, cur, idx) => {
    const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(cur);
    return acc;
  }, []);
};

/** @type {(date: Date, option?: UseCalendarProps) => Date[][]} */
export const createCalendarList = (date, option = { startDay: 'sunday' }) => {
  const { startDay } = option;
  const curDayList = getCurrentMonthDate(date);

  const prevDayCount = getPrevDayCount(date, startDay);
  const prevDayList = getPrevMonthDate(date, prevDayCount);

  const nextDayCount = getNextDayCount(curDayList.length, prevDayList.length);
  const nextDayList = getNextMonthDate(date, nextDayCount);

  const flatCalendarList = prevDayList.concat(curDayList, nextDayList);
  const calendar = flatTo2DArray(flatCalendarList);
  return calendar;
};
