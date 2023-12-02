import groupBy from 'lodash/groupBy';

import React, {Component} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import {
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  CalendarProvider,
  TimelineProps,
  CalendarUtils,
} from 'react-native-calendars';

import {timelineEvents, getDate} from '../mocks/timelineEvents';

const INITIAL_TIME = {hour: 9, minutes: 0};
const EVENTS: TimelineEventProps[] = timelineEvents;

export default class TimelineCalendarScreen extends Component<any> {
  state = {
    currentDate: getDate(),
    events: EVENTS,
    eventsByDate: groupBy(EVENTS, e =>
      CalendarUtils.getCalendarDateString(e.start),
    ) as {
      [key: string]: TimelineEventProps[];
    },
  };

  onDateChanged = (date: string, source: string) => {
    this.setState({currentDate: date});
  };

  onMonthChange = (month: any, updateSource: any) => {};

  createNewEvent: TimelineProps['onBackgroundLongPress'] = (
    timeString,
    timeObject,
  ) => {
    const {eventsByDate} = this.state;
    const hourString = `${(timeObject.hour + 1).toString().padStart(2, '0')}`;
    const minutesString = `${timeObject.minutes.toString().padStart(2, '0')}`;

    const newEvent = {
      id: 'draft',
      start: `${timeString}`,
      end: `${timeObject.date} ${hourString}:${minutesString}:00`,
      title: 'New Event',
      color: 'white',
    };

    if (timeObject.date) {
      if (eventsByDate[timeObject.date]) {
        eventsByDate[timeObject.date] = [
          ...eventsByDate[timeObject.date],
          newEvent,
        ];
        this.setState({eventsByDate});
      } else {
        eventsByDate[timeObject.date] = [newEvent];
        this.setState({eventsByDate: {...eventsByDate}});
      }
    }
  };

  approveNewEvent: TimelineProps['onBackgroundLongPressOut'] = () => {
    this.props.navigation.navigate('CreateNewEvent');
  };

  private timelineProps: Partial<TimelineProps> = {
    format24h: false,
    // onBackgroundLongPress: this.createNewEvent,
    onBackgroundLongPressOut: this.approveNewEvent,
    unavailableHours: [
      {start: 0, end: 6},
      {start: 22, end: 24},
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
  };

  render() {
    const {currentDate, eventsByDate} = this.state;

    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <CalendarProvider
            date={currentDate}
            onDateChanged={this.onDateChanged}
            onMonthChange={this.onMonthChange}
            showTodayButton
            disabledOpacity={0.6}>
            <ExpandableCalendar firstDay={1} />
            <TimelineList
              events={eventsByDate}
              timelineProps={this.timelineProps}
              showNowIndicator
              scrollToFirst
              initialTime={INITIAL_TIME}
            />
          </CalendarProvider>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
