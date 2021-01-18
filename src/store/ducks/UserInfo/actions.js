import TasksTypes from './types';

const addInfo = (info) => ({
  type: TasksTypes.ADD,
  info,
});

export default addInfo;
