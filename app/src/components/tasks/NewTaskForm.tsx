import React, { useState, FormEvent, useContext } from 'react';
import styled from 'styled-components';
import { ApiService } from '../../services/ApiService';
import { TaskContext } from './TaskContext';
import { Event } from './events';
import moment from 'moment';

const Form = styled.form`
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const TextInput = styled.input`
  flex: 1;
  input {
    padding: 10px 10px;
  }
  .ant-select-selection-item {
    width: 100%;
    text-align: left;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-item,
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder,
  .ant-input-group,
  .ant-input {
    height: 60px;
  }
  margin-right: 10px;
  min-width: 50px;
`;

type FormMode = 'task' | 'note';

type NewTaskReq = Event;

export const NewTaskForm: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const [mode] = useState<FormMode>('task');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const postNewTask = (apiReq: NewTaskReq): Promise<any> => {
    const apiService = new ApiService();
    return apiService
      .callApi('post', '/events', apiReq)
      .then((_data) => {
        console.log(
          'Api return successfully data, check in section - Api response',
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [inputText, setInputText] = useState<string>('');
  const { setLastEventId } = useContext(TaskContext);

  const handleAddTaskClick = () => {
    if (!inputText) {
      console.log('Title cannot be empty!');
      return;
    }
    setLoading(true);
    // eslint-disable-next-line camelcase
    const aggregate_uuid = new Date().getTime().toString();

    const eventType = mode === 'task' ? 'TaskCreated' : 'NoteCreated';

    const newEvent: NewTaskReq = {
      aggregate_uuid,
      type: eventType,
      title: inputText,
      created: moment(),
    };
    postNewTask(newEvent).then((_) => {
      setLastEventId(aggregate_uuid);
    });
    setInputText('');
  };

  const handleTitleInput = (evt: FormEvent<HTMLInputElement>) => {
    const value = (evt.target && (evt.target as HTMLInputElement).value) || '';
    setInputText(value);
  };

  const placeholder =
    mode === 'task' ? 'What needs to be done?' : 'What is on your mind?';
  return (
    <Form>
      <TextInput
        onInput={handleTitleInput}
        placeholder={placeholder}
        value={inputText}
      />
      {!isLoading && (
        <button onClick={handleAddTaskClick} defaultValue={inputText}>
          Add
        </button>
      )}
    </Form>
  );
};
