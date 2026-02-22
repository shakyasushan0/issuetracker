import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function Project() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/projects")
      .then((resp) => setProjects(resp.data))
      .catch((err) => console.log(err.message));
    // fetch("http://localhost:3000/api/projects")
    //   .then((resp) => resp.json())
    //   .then((data) => setProjects(data))
    //   .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <h2>Issue Tracker</h2>
      <div className="row">
        {projects.map((project) => (
          <div className="col-md-6 col-lg-4 mb-4" key={project._id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Key: {project.key}
                </h6>

                <p className="card-text">{project.description}</p>

                <hr />

                <p className="mb-1">
                  <strong>Created By:</strong> {project.createdBy?.name}
                </p>
                <p className="mb-1">
                  <strong>Email:</strong> {project.createdBy?.email}
                </p>

                <p className="mb-1">
                  <strong>Members:</strong>{" "}
                  {project.members.length > 0
                    ? project.members.length
                    : "No members"}
                </p>

                <p className="text-muted small mb-0">
                  Created: {new Date(project.createdAt).toLocaleString()}
                </p>
                <p className="text-muted small">
                  Updated: {new Date(project.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Project;
