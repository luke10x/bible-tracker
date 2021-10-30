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

const AddButton = styled.button`
  flex-shrink: 0;
  flex-grow: 0;
  height: 60px;
`;

const IconWrapper = styled.span`
  padding-right: 5px;
`;

type FormMode = 'task' | 'note';

interface SelectBeforeProps {
  defaultValue: FormMode;
  onChange: (value: FormMode) => void;
}

const SelectBefore: React.FC<SelectBeforeProps> = (
  props: SelectBeforeProps,
) => <span>it was select here</span>;

type NewTaskReq = Event;

export const NewTaskForm: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const [mode, setMode] = useState<FormMode>('task');

  const postNewTask = (apiReq: NewTaskReq): Promise<any> => {
    const apiService = new ApiService();
    return apiService
      .callApi('post', '/events', apiReq)
      .then((data) => {
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

  const handleSelectMode = (modeValue: FormMode) => {
    console.log('mode swithd', modeValue);
    setMode(modeValue);
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
