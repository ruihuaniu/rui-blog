---
title: Using dataset property for heatmap chart in echarts with react
authors: [Ruihua]
description: A more flexible and powerful way to create heatmap charts in echarts with react
draft: false
tags: [IT, Front end, React, Chart,  English]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="cover image" src={useBaseUrl('img/heatmap.png')} />

### Overview
The normal way of creating heatmap chart in echarts is to use the `series.data` and in combination of `xAxis.data` and `yAxis.data` properties. This method requires to do many data manipulation and is not flexible. This article aims to explore a more flexible and powerful way to create heatmap charts in echarts with react which cannot be found in the official documentation. 

<!--truncate-->
### The normal ways
When using `series.data` and in combination of `xAxis.data` and `yAxis.data`  to pass data to heatmap chart component, it looks like something below:
```
<HeatmapChart
  chartConfig={{
    xAxis: {
      type: "category",
      data: convertXAxisData(data),
    },
    yAxisConfig: {
      type: 'category',
      data: convertYAxisData(data),
    },
    visualMap: {
      min: 0,
      max: 1,
    },
    series: [{
      type: 'heatmap',
      data: convertSeriesData(data),
      label: {
        show: true
      }
    }]
  }}
/>
```

There are two main issues with using this method above:
1. More data manipulation are needed
  > `convertXAxisData(data)`, `convertYAxisData(data)`, and `convertSeriesData(data)` are all data manipulation needed.
2. Not possible to meet some special requirements
  > One common requirement it cannot meet is to show labels which is a specific field of the series data rather than values. Even though we can make the label work with using `series.label.formatter`, but the visual map and the color of the chart will stop working in that case. The real reason is that we cannot assign specific fields/dimensions of the series data with using `series.data`


### The Alternatives
One more flexible and powerful way is to use `dataset` property, which doesn't require the data manipulation for `xAxis` and `yAxis` any more. More importantly, it gives the control to customize which fields/dimensions of the dataset to show in the chart.
```
<HeatmapChart
  chartConfig={{
    xAxis: {
      type: "category",
    },
    yAxisConfig: {
      type: 'category',
    },
    visualMap: {
      min: 0,
      max: 1,
    },
    dataset: {
      dimensions: ["field1", "field2", "field3"],
      source: data, //  data structure can be seen below
    },
    series: [{
      type: 'heatmap',
      encode: {
        x: 'field1',
        y: 'field2',
        value: 'field3'
      }
      label: {
        show: true
        formatter: (params) => {
          return params.value.SPECIFIC_FIELD // Making the heatmap chart show the labels defined in the SPECIFIC_FIELD
        }
      }
    }]
  }}
/>

// The data structure of the data within `dataset.source` is:
{
  "field1": [],
  "field2": [],
  "field3": [],
  "SPECIFIC_FIELD": []
}
```
This approach is more flexible and powerful than using `series.data`.  It's not documented or exampled in the official documentation.



### Retro
It's now possible to customize the heatmap chart in echarts with using the `dataset` property, which can fully replace the old way of using `series.data` and `xAxis.data` and `yAxis.data`. 


#### Future Improvements
- Add more usage of with `dataset` property, like `transform` which could help simplify the data transformation when achieving different chart requirements.





