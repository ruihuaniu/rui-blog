---
title: PDF Report with Echarts
authors: [ruihua]
description: A practical solution to print PDF report with Echarts under any screen sizes
draft: false
tags: [IT, Front end, Echarts, PDF,  English]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="cover image" src={useBaseUrl('img/charts.jpg')} />

### Overview
Generating PDF reports on the frontend, especially when dealing with charts like those from Echarts, can be challenging. Properly handling chart layouts and accommodating various screen sizes adds complexity. This article presents a practical solution for printing PDF reports with Echarts.


### Technologies used
- [react-to-print](https://www.npmjs.com/package/react-to-print)
  - Provides control over which component to print, along with before and after print callbacks.
- [Echarts](https://echarts.apache.org/en/api.html#echartsInstance.getDataURL)
  - Utilizes the `getDataURL()` function, which provides a base64 URL to be set as the source of an img tag.
- print media query with css
  - The `@media print` query allows the ability to hide or show specific elements when printing.



### Steps to generate PDF report
1. Create a reusable component with the print functionality with react-to-print
```

function PrintWrapper({ component }) {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: componentRef.current,
    //documentTitle: "AwesomeFileName",
    removeAfterPrint: true
  });

  return (
    <Box>
      <Button onClick={handleClick}>Export as PDF</Button>
      <Box  >
        <Box ref={componentRef}>
          <Box sx={{ display: "none", "@media print": { pageBreakAfter: "always", width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" } }}>
            <Typography variant="h1">{value}</Typography>
          </Box>
          {component}
        </Box>
      </Box>
    </Box>

  )
}

export default PrintWrapper
```

2. Create the chart img along with the chart element
```
function BarChart({ chartConfig}) {
  const barChartRef = useRef(null);

  const [imgSrc, setImgSrc] = useState();

  useEffect(() => {
    let barChart;

    if (barChartRef.current) {
      echarts.dispose(barChartRef.current)
    }

    if (barChartRef.current.clientHeight > 0) {
      barChart = echarts.init(barChartRef.current, null, { renderer: 'svg' });
      window.addEventListener('resize', barChart.resize);

      barChart.on('finished', function () {
        setImgSrc(barChart.getDataURL());
      });


    const option = {
      color: [...(chartConfig.color || defaultColorPalette)],
      animation: false,
      legend: { ...chartConfig.legendConfig },
      tooltip: {
        ...chartConfig.tooltipConfig
      },
      xAxis: {
        ...chartConfig.xAxisConfig
      },
      yAxis: {
        ...chartConfig.yAxisConfig
      },
      series: [
        ...chartConfig.series
      ]
    };
    barChart.setOption(option);
    }

    return () => {
      if (barChart) {
        window.removeEventListener("resize", barChart.resize)
      }
    }
  }, [chartConfig]);


  return (
    <>
      <Box
        ref={barChartRef}
        sx={{
          width: '100%',
          minWidth: '200px',
          height: '100%',
          left: '4px',
          "@media print": {
            display: "none" // no need to be displayed on print
          }
        }}
      />
      <Box sx={{
        display: "none",
        width: "100%",
        minHeight: "500px",
        "@media print": {  
          display: "block" // only needs to be displayed on print
        }
      }}>
        <img src={imgSrc} alt="bar chart" width="100%" height="100%" />
      </Box>

    </>

  );
}


export default BarChart;
``` 

3. Apply print media query rules to related elements
- The `@media print` query does not work with inline styles, so we wrap it within a Box element from Material-UI. Alternatively, you can use the native div element with a CSS class.
- `pageBreakAfter`  is a crucial setting to avoid elements breaking at different PDF pages.


### Final results
By using both react-to-print and getDataURL from Echarts, along with print media queries, it is now possible to print PDF reports with any charts from Echarts, irrespective of the screen sizes.

#### Known Pitfalls
- The chart is now printed as an image, making the content within it (e.g., text) unselectable.
> In most cases, this is not a significant issue since the other text outside the chart (e.g., tables, etc.) remains selectable.