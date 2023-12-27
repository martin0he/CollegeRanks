import React, { useEffect } from "react";
import ChartsEmbedSDK, { Chart } from "@mongodb-js/charts-embed-dom";


const sdk = new ChartsEmbedSDK({
  baseUrl: "https://charts.mongodb.com/charts-cr-osisi",
  showAttribution: false,
});

const uniChart: Chart = sdk.createChart({
  chartId: "658c2644-2865-44f5-830f-99b6e885738a",
  autoRefresh: true,
  background: "transparent",
  maxDataAge: 120, //refresh rate in seconds
  renderingSpec: {
    version: 1,
  },
});

const ChartComponent: React.FC = () => {
  useEffect(() => {
    uniChart.render(document.getElementById("chart-data")!);
    // .catch(() => window.alert("Chart failed to initialise"));
  }, []);

  return <div id="chart-data" style={{ height: 500 }}></div>;
};

export default ChartComponent;
