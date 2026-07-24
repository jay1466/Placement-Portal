import { useState } from "react";
import api from "../services/api";

function AddCompany({ onAddSuccess }) {
  const [formData, setFormData] = useState({
    companyName: "",
    jobRole: "",
    packageLpa: "",
    eligibilityCgpa: "",
    description: "",
    companyType: "",
    website: "",
    headquarters: "",
    foundedYear: "",
    employees: "",
    skills: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      // 1. Upload Image to Cloudinary via Backend
      if (imageFile) {
        const fileData = new FormData();
        fileData.append("file", imageFile);
        const uploadRes = await api.post("/upload/image", fileData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        imageUrl = uploadRes.data.url;
      }

      // 2. Add Company
      const companyPayload = { ...formData, image: imageUrl };
      await api.post("/companies", companyPayload);

      alert("Company added successfully!");
      if (onAddSuccess) onAddSuccess();
    } catch (error) {
      console.error(error);
      alert("Failed to add company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow border-0 p-4 mb-4">
      <h4 className="fw-bold mb-3">Add New Company</h4>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Company Name</label>
            <input type="text" className="form-control" name="companyName" onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Company Logo</label>
            <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Job Role</label>
            <input type="text" className="form-control" name="jobRole" onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Package (LPA)</label>
            <input type="number" step="0.1" className="form-control" name="packageLpa" onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
              {loading ? "Adding..." : "Add Company"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddCompany;
