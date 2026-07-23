import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "./ResumeAnalyzer.css";

function ResumeAnalyzer() {

    const navigate = useNavigate();

    const [resume, setResume] = useState(null);
    const [score, setScore] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [strengths, setStrengths] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [improvements, setImprovements] = useState([]);

    const studentId = 1; // Replace with logged-in student later

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleAnalyze = async () => {

        if (!resume) {
            alert("Please upload your resume.");
            return;
        }

        const formData = new FormData();

        formData.append("file", resume);
        formData.append("studentId", studentId);

        try {

            setLoading(true);

            // Resume Analysis
            const response = await api.post(
                "/resume/analyze",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setScore(response.data.score);
            // Demo AI suggestions (replace later with backend AI)
            setStrengths([
                "Strong Java Programming Skills",
                "Good Spring Boot Knowledge",
                "Excellent Academic Performance (CGPA 9.1)",
                "SQL & Database Skills",
                "REST API Development"
            ]);

            setSuggestions([
                "Add GitHub repository links.",
                "Include internship experience.",
                "Mention project achievements with numbers.",
                "Add Oracle / NPTEL certifications.",
                "Improve your professional summary."
            ]);

            setImprovements([
                "Learn Docker",
                "Learn AWS Cloud",
                "Practice Spring Security + JWT",
                "Build one Microservices project",
                "Improve ATS keywords"
            ]);

            // Company Matching
            const matchResponse =
                await api.get(`/matching/${studentId}`);

            setCompanies(matchResponse.data);

        }
        catch (error) {

            console.error(error);

            alert("Resume analysis failed.");

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <>
            <Navbar />

            <div className="resume-page">

                <div className="resume-header">

                    <h1>🤖 AI Resume Analyzer</h1>

                    <p>
                        Upload your resume and discover your best matching companies.
                    </p>

                </div>

                <div className="resume-card">

                    <h3>Upload Resume</h3>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                    />

                    <button
                        className="analyze-btn"
                        onClick={handleAnalyze}
                    >
                        {loading ? "Analyzing..." : "Analyze Resume"}
                    </button>

                    {score !== null && (

                        <div className="score-card">

                            <h2>Resume Score</h2>

                            <h1>{score}/100</h1>

                        </div>


                    )}
                {/* Resume Strengths */}

                {strengths.length > 0 && (

                <div className="analysis-card">

                    <h2>✅ Resume Strengths</h2>

                    <ul>

                        {strengths.map((item, index) => (

                            <li key={index}>{item}</li>

                        ))}

                    </ul>

                </div>

                )}
            {/* AI Suggestions */}

            {suggestions.length > 0 && (

            <div className="analysis-card">

                <h2>💡 AI Suggestions</h2>

                <ul>

                    {suggestions.map((item, index) => (

                        <li key={index}>{item}</li>

                    ))}

                </ul>

            </div>

            )}
        {/* Improvement Tips */}

        {improvements.length > 0 && (

        <div className="analysis-card">

            <h2>📈 How to Improve</h2>

            <ul>

                {improvements.map((item, index) => (

                    <li key={index}>{item}</li>

                ))}

            </ul>

        </div>

        )}

                    {companies.length > 0 && (

                        <div className="match-section">

                            <h2>🔥 Recommended Companies</h2>

                            {companies.map((company) => (

                                <div
                                    className="match-card"
                                    key={company.companyId}
                                >

                                    <div>

                                        <h4>{company.companyName}</h4>

                                        <p>

                                            Match Score

                                            <span className="match-percent">

                                                {company.matchPercentage}%

                                            </span>

                                        </p>

                                    </div>

                                    <button
                                        className="apply-match-btn"
                                        onClick={() =>
                                            navigate(`/company/${company.companyId}`)
                                        }
                                    >
                                        View Company
                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </>

    );

}

export default ResumeAnalyzer;