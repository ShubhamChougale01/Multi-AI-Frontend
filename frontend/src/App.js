import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [hrEmail, setHrEmail] = useState('');
  const [taskType, setTaskType] = useState('email');
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resume || !jobDesc || !hrEmail || !taskType) return alert("All fields required");

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDesc);
    formData.append("hr_email", hrEmail);
    formData.append("task_type", taskType);

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/process-task', formData);
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      alert("Error processing task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Multi-AI Agent Task</h2>
      <input type="file" onChange={(e) => setResume(e.target.files[0])} />
      <br /><br />
      <textarea placeholder="Paste Job Description" value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} rows={5} cols={50} />
      <br /><br />
      <input type="email" placeholder="HR Email" value={hrEmail} onChange={(e) => setHrEmail(e.target.value)} />
      <br /><br />
      <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
        <option value="email">Email</option>
        <option value="resume">Resume</option>
        <option value="blog">Blog</option>
      </select>
      <br /><br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Submit"}
      </button>

      {response && (
        <div style={{ marginTop: "2rem" }}>
          {response.email_text && <><h4>Email:</h4><textarea rows={10} cols={50} value={response.email_text} readOnly /></>}
          {response.tailored_resume && <><h4>Resume:</h4><textarea rows={10} cols={50} value={response.tailored_resume} readOnly /></>}
          {response.blog_text && <><h4>Blog:</h4><textarea rows={10} cols={50} value={response.blog_text} readOnly /></>}
        </div>
      )}
    </div>
  );
}

export default App;
