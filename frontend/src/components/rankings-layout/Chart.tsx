import React, { useEffect } from "react";
import ChartsEmbedSDK, { Chart } from "@mongodb-js/charts-embed-dom";
import { Box, Typography } from "@mui/material";

const sdk = new ChartsEmbedSDK({
  baseUrl: "https://charts.mongodb.com/charts-cr-osisi",
  showAttribution: false,
});

const uniChart: Chart = sdk.createChart({
  chartId: "658c2644-2865-44f5-830f-99b6e885738a",
  autoRefresh: true,
  background: "inherit",
  maxDataAge: 120, //refresh rate in seconds
});

const ChartComponent: React.FC = () => {
  useEffect(() => {
    uniChart.render(document.getElementById("chart-data")!);
    // .catch(() => window.alert("Chart failed to initialise"));
  }, []);

  const date = new Date();

  return (
    <Box
      py={4}
      px={3}
    >
      <Typography variant="h4" fontWeight="bold">
        University Rankings
      </Typography>
      <Typography>{`As of: ${date}`}</Typography>
      <div id="chart-data" style={{ height: 500 }}></div>
    </Box>
  );
};

export default ChartComponent;
