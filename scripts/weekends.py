# A very English Python3 script to list all weekend dates in a year.

from datetime import datetime, timedelta
from calendar import monthrange

now = datetime.now()
current_year = now.year

def all_dates_in_year(year=current_year):
  all_dates = []
  for i in range(12):
    month = i + 1 # Month is always 1..12
    days_in_month = monthrange(year, month)[1]
    for j in range(days_in_month):
      day = j + 1
      all_dates.append(datetime(year, month, day))
  return all_dates

# Weekend days, day of week is 0..6
SATURDAY = 5
SUNDAY = 6

def format_date(date):
  day_of_week = date.weekday()
  if day_of_week == SATURDAY:
    return "Sat %s/%s" % (date.month, date.day)
  if day_of_week == SUNDAY:
    return "Sun %s/%s" % (date.month, date.day)
    
all_days_curr_year = all_dates_in_year()
for i in range(len(all_days_curr_year)):
  date = all_days_curr_year[i]
  day_of_week = date.weekday()
  if day_of_week == SATURDAY:
    sat_formatted = format_date(date)
    sunday_date = date + timedelta(days=1)
    sun_formatted = format_date(sunday_date)
    print("%s - %s" % (sat_formatted, sun_formatted))
    