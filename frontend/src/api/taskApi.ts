import apiAxoisInstance from './apiSetup';

const taskApi = {
  create: (params: any) => apiAxoisInstance.post(`/tasks/`, params),
  gettask: () => apiAxoisInstance.get(`/tasks/`),
  delete: (employeeId: any, taskId: any) => apiAxoisInstance.delete(`/tasks/${employeeId}/tasks/${taskId}`), 
  update: (taskId: any, params: any) => apiAxoisInstance.put(`/tasks/${taskId}/`, params),
};

export default taskApi;
