import api from "./api";

const studentService = {
  updateProfile: async (studentId, data) => {
    const response = await api.put(`/student/${studentId}/profile`, data);
    return response.data;
  },
  uploadDocument: async (studentId, documentType, file) => {
    const formData = new FormData();
    formData.append("documentType", documentType);
    formData.append("file", file);

    const response = await api.post(`/student/${studentId}/documents/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  applyForDrive: async (studentId, driveId) => {
    const response = await api.post(`/applications/apply?studentId=${studentId}&driveId=${driveId}`);
    return response.data;
  },
  getApplications: async (studentId) => {
    const response = await api.get(`/applications/student/${studentId}`);
    return response.data;
  }
};

export default studentService;
