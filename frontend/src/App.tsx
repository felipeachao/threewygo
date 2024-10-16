// App.tsx
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ChakraProvider, Box, Flex, Button } from "@chakra-ui/react";
import CourseForm from "./components/CourseForm";
import VideoSizeReport from "./components/VideoSizeReport";
import CourseList from "./components/CourseList";
import CourseEdit from "./components/CourseEdit";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box p={4}>
          <Flex justifyContent="space-between" mb={6}>
            <Button as={Link} to="/" colorScheme="teal">
              Course List
            </Button>
            <Button as={Link} to="/create-course" colorScheme="blue">
              Create Course
            </Button>
            <Button as={Link} to="/video-size-report" colorScheme="green">
              Video Size Report
            </Button>
          </Flex>

          <Routes>
            <Route path="/" element={<CourseList />} />
            <Route path="/create-course" element={<CourseForm />} />
            <Route path="/video-size-report" element={<VideoSizeReport />} />
            <Route path="/edit-course/:id" element={<CourseEdit />} />{" "}
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
