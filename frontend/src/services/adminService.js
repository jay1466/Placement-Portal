import api from "./api";

const adminService = {
  getDashboardMetrics: async () => {
    const response = await api.get("/admin/analytics/dashboard");
    return response.data;
  },
  createRecruiter: async (data) => {
    const response = await api.post("/admin/recruiter", data);
    return response.data;
  },
  getPendingCompanies: async () => {
    const response = await api.get("/companies/pending-changes");
    return response.data;
  },
  approveCompany: async (id) => {
    const response = await api.post(`/companies/pending-changes/${id}/approve`);
    return response.data;
  },
  rejectCompany: async (id) => {
    const response = await api.post(`/companies/pending-changes/${id}/reject`);
    return response.data;
  },
};

export default adminService;
