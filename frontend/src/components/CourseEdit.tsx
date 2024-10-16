import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import { Button, Input, Textarea, Box } from "@chakra-ui/react";

interface Course {
  title: string;
  description: string;
  file_size: number;
  video_urls: string[];
}

const CourseEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course>({
    title: "",
    description: "",
    file_size: 0,
    video_urls: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${API_URL}/courses/${id}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <Box p={4}>
      <h1>Edit Course</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          value={course.title}
          onChange={handleChange}
          placeholder="Course Title"
          mb={4}
          isRequired
        />
        <Textarea
          name="description"
          value={course.description}
          onChange={handleChange}
          placeholder="Course Description"
          mb={4}
          isRequired
        />
        <Button type="submit" colorScheme="teal">
          Update Course
        </Button>
      </form>
    </Box>
  );
};

export default CourseEdit;
