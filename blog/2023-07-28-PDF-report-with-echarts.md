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
PDF Report generation on the frontend is always a pain, especially when dealing with charts like that from Echarts. The layouts of charts could be a mess if not handled properly, the issue will be much more serious when considering there are so many different screen sizes. This is article is going to give a practical solution to print PDF report with Echarts.


### Technologies used
- [react-to-print](https://www.npmjs.com/package/react-to-print)
  - Provides the control of which component to print, also with before print and after print callbacks
- [Echarts](https://echarts.apache.org/en/api.html#echartsInstance.getDataURL)
  - `getDataURL()` function provides the base64 url which could be set as src of img tag
- print media query with css
  - `@media print` query provides the ability to hide and show some elements on print



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
- `@media print` query not working with inline styles, so we need to wrap it within a Box element (MUI). The other workaround is to using the native div element with css class
- `pageBreakAfter` is an important setting to avoid elements breaking at different PDF pages


### Final results
With using both react-to-print, getDataURL from echarts and print media query, it's possible to print PDF report with any charts from echarts with any screen sizes.

#### Pitfalls
- The chart printed now is an image, and the content (eg. text) within it is not selectable. 
> This is not a big deal for most of the case, since the other text within other elements(eg. table, etc.) are still selectable.