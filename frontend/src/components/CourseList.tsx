import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import "./CourseList.css";

interface Course {
  id: number;
  title: string;
  description: string;
  file_size: number;
  video_urls: string[];
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/courses/active`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/courses/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== id)
        );
      } else {
        console.error("Error deleting course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="course-list-container">
      <h1 className="main-title">Lista de Cursos</h1>
      {courses.map((course) => (
        <div key={course.id} className="course">
          <h2 className="course-title">{course.title}</h2>
          <div className="video-list">
            {course.video_urls.map((url, index) => (
              <video key={index} className="video-player" controls>
                <source src={url} type="video/webm" />
                Seu navegador não suporta a reprodução de vídeos.
              </video>
            ))}
          </div>
          <p className="course-description">{course.description}</p>
          <p className="course-file-size">
            Tamanho do arquivo: {course.file_size} KB
          </p>
          <div className="course-buttons">
            <Link to={`/edit-course/${course.id}`}>
              <button className="action-button">Update</button>
            </Link>
            <button
              className="action-button delete-button"
              onClick={() => handleDelete(course.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
