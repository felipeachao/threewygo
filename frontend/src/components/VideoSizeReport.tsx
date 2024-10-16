import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, Spinner, Heading } from "@chakra-ui/react";
import { API_URL } from "../config";

function VideoSizeReport() {
  const [totalSize, setTotalSize] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/courses/video_sizes_report`)
      .then((response) => {
        setTotalSize(response.data['total_video']);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching video sizes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box padding="4">
      <Heading size="md">Total Video Size Report</Heading>
      <Text>Total size of videos: {totalSize} KB</Text>
    </Box>
  );
}

export default VideoSizeReport;
