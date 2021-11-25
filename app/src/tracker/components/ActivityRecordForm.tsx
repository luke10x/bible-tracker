import moment, { Moment } from 'moment';
import React, { useState } from 'react';

import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  input {
    padding: 15px 10px;
  }

  .column {
    // border: 1px solid blue;
    flex: 1 0 300px;
  }

  .colspan {
    box-sizing: border-box;

    // border: 1px solid green;
    flex: 1 1 50%;
    input {
      box-sizing: border-box;

      display: block;
      width: 100%;
    }
  }
  .button {
    box-sizing: border-box;

    // border: 1px solid green;
    flex: 0 1 60px;
    input {
      box-sizing: border-box;

      display: block;
      width: 100%;
    }
  }
`;
const StyledDatetime = styled(Datetime)`
  input {
    box-sizing: border-box;

    width: 100%;
    // border: 1px solid red;
  }
  .rdtPicker {
    box-sizing: border-box;

    width: 100%;
    border: 2px solid brown;
    background: lightblue;
  }
`;
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
      <Form>
        <div className="column">
          <label>Start time</label>

          <StyledDatetime
            initialViewMode="time"
            onChange={handleStartChanged}
            value={state.start}
          />
        </div>
        <div className="column">
          <label>End time</label>
          <StyledDatetime
            initialViewMode="time"
            onChange={handleEndChanged}
            value={state.end}
          />
        </div>
        <div className="colspan">
          <label>note</label>
          <input />
        </div>
        <div className="button">
          <label>&nbsp;</label>

          <input type="submit" value="Add record" />
        </div>
      </Form>
    </div>
  );
};
