---
title: Frontend PDF Report Generation with Echarts
authors: [ruihua]
description: A practical solution to print PDF report with Echarts under any screen sizes
draft: false
tags: [IT, Front end, Echarts, PDF,  English]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="cover image" src={useBaseUrl('img/charts.jpg')} />

### Overview
Generating PDF reports on the frontend, especially when dealing with charts like those from Echarts, can be challenging. Properly handling chart layouts and accommodating various screen sizes adds complexity. This article presents a practical solution for printing PDF reports with Echarts on the frontend.

<!--truncate-->
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
    removeAfterPrint: true
  });

  return (
    <Box>
      <Button onClick={handleClick}>Export as PDF</Button>
        <Box ref={componentRef}>
          {component}
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
     const barChart = echarts.init(barChartRef.current, null, { renderer: 'svg' });

      barChart.on('finished', function () { // setting imgSrc with echarts "finished" event is important, otherwise, the image will not be displayed
        setImgSrc(barChart.getDataURL());
      });

    const option = {
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
- The print preview window will always popup since the native `print` API is called.

#### Future Improvements
- Refactor/Improve the code for chart image generation
  > The current implementation requires significant modifications to the BarChart component, violating both the Open-Closed and Single Responsibility principles. 
- Add a print wizard to allow the user to customize the information shown on the PDF cover page. 
  > This will enhance the report's appearance and provide a more professional touch.
- Implement PDF generation on the server/backend side to create a smoother flow.
  > Consider using Puppeteer to generate PDFs on the server side. (Echarts also supports server-side generation)
- Implement the print with iframe from scratch,.
  > since this react-to-print lib is also using the iframe with some additional features which are not fully used.