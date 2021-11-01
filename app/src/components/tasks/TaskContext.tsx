import React, { useState } from 'react';

interface TaskContextProps {
  lastEventId: string;
  setLastEventId: (a: string) => void;
  dateDiff: number;
  setDateDiff: (n: number) => void;
}

export const TaskContext = React.createContext<TaskContextProps>({
  lastEventId: '',
  setLastEventId: (_: string) => null,
  dateDiff: 0,
  setDateDiff: (_: number) => null,
});

export const TaskProvider: React.FC = ({ children }) => {
  const [lastEventId, setLastEventId] = useState<string>('stri');
  const [dateDiff, setDateDiff] = useState<number>(0);
  const ctxValue: TaskContextProps = {
    lastEventId,
    setLastEventId,
    dateDiff,
    setDateDiff,
  };

  return (
    <TaskContext.Provider value={ctxValue}>{children}</TaskContext.Provider>
  );
};
