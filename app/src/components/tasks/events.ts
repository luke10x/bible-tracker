import moment from 'moment';

interface BaseEvent {
  // eslint-disable-next-line camelcase
  aggregate_uuid: string;
  created: moment.Moment;
}

export type EventType =
  | 'TaskCreated'
  | 'TaskDone'
  | 'TaskKilled'
  | 'NoteCreated';

interface CreatedEvent extends BaseEvent {
  type: 'TaskCreated';
  title: string;
}

interface DoneEvent extends BaseEvent {
  type: 'TaskDone';
}

interface KilledEvent extends BaseEvent {
  type: 'TaskKilled';
}

interface ResetEvent extends BaseEvent {
  type: 'TaskReset';
}

interface NoteCreatedEvent extends BaseEvent {
  type: 'NoteCreated';
  title: string;
}

export type Event =
  | CreatedEvent
  | DoneEvent
  | KilledEvent
  | ResetEvent
  | NoteCreatedEvent;
