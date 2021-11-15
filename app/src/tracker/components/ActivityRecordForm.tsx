import moment, { Moment } from 'moment';
import React, { useState } from 'react';

import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

interface ActivityRecordFormProps {
  book: string;
  chapter: number;
}

interface ActivityRecordFormState {
  start: Moment;
  end: Moment;
  note: string;
}

export const ActivityRecordForm: React.FC<ActivityRecordFormProps> = (
  props: ActivityRecordFormProps,
) => {
  const now = moment();

  const [state, setState] = useState<ActivityRecordFormState>({
    start: now,
    end: now,
    note: '',
  });
  const handleStartChanged = (d: string | Moment) => {
    const m = moment(d);
    setState({ ...state, start: m });
    console.log('start date: ', m);
  };
  const handleEndChanged = (d: string | Moment) => {
    const m = moment(d);
    setState({ ...state, end: m });
    console.log('end date: ', m);
  };
  const { book, chapter } = props;
  return (
    <div>
      {book}, {chapter}
      <form>
        <label>Start time</label>
        <Datetime
          initialViewMode="time"
          onChange={handleStartChanged}
          value={state.start}
        />
        <label>End time</label>
        <Datetime
          initialViewMode="time"
          onChange={handleEndChanged}
          value={state.end}
        />
      </form>
    </div>
  );
};
