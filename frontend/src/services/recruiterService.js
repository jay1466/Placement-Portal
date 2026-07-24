import api from "./api";

const recruiterService = {
  createDrive: async (data) => {
    const response = await api.post("/drives", data);
    return response.data;
  },
  getCompanyDrives: async (companyId) => {
    const response = await api.get(`/drives/company/${companyId}`);
    return response.data;
  },
  getDriveApplications: async (driveId) => {
    const response = await api.get(`/applications/drive/${driveId}`);
    return response.data;
  },
  updateApplicationStatus: async (applicationId, status) => {
    const response = await api.put(`/applications/${applicationId}/status?status=${status}`);
    return response.data;
  },
  registerCompany: async (recruiterId, data) => {
    const response = await api.post(`/companies/register?recruiterId=${recruiterId}`, data);
    return response.data;
  }
};

export default recruiterService;
