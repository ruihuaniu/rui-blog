---
title: How to add header and footer in PDF generated with react in the frontend
authors: [Ruihua]
description: A practical solution to print PDF report with header and footer in the frontend
draft: false
tags: [IT, Front end, PDF, Header, Footer, English]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="cover image" src={useBaseUrl('img/header.jpg')} />

### Overview

It's common to have a header and footer in PDF reports, but making them work properly is not as simple as it may seem. This article presents a practical solution for printing PDF reports with header and footer in the frontend.

<!--truncate-->

### How to print PDF report with header and footer

When using browser inbuilt print api, there are commonly two ways to print with header and footer. One way is to use table layout, and the other is to use fixed position layout. This article will concentrate on the fixed position layout method and provide solutions for potential challenges that may arise when printing headers and footers.

### Code for header and footer

1. Using fixed position layout

```

function PrintWrapper({ component }) {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: componentRef.current,
  });

  return (
    <Box>
      <Button onClick={handleClick}>Export as PDF</Button>
      <Box ref={componentRef}>
        {component}
      </Box>
      <Box sx={{ position: "fixed", top: 0 }} >
        header text
      </Box>
      <Box sx={{ position: "fixed", bottom: 0 }} >
        footer text
      </Box>
    </Box>
  )
}

```

2. Fixing header and/or footer overlay with content issue  
The overlay issue is a common problem when printing headers and footers, especially when there are multiple pages printed. If there is only one page printed, the solution is relatively straightforward, it involves adjusting the body's top and bottom margins to accommodate sufficient space for both the header and footer.

```
function PrintWrapper({ component }) {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: componentRef.current,
  });

  return (
    <Box>
      <Button onClick={handleClick}>Export as PDF</Button>
      <Box ref={componentRef} margin="50px">
        {component}
      </Box>
      <Box sx={{ position: "fixed", top: 0, height:"50px" }} >
        header text
      </Box>
      <Box sx={{ position: "fixed", bottom: 0, height:"50px" }} >
        footer text
      </Box>
    </Box>
  )
}
```

However, when multiple pages are printed, the solution is more complicated. One practical way is to control the pages of PDF by using page-break-after CSS, and then add header and footer for each page. 

```
function PrintWrapper({ component }) {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: componentRef.current,
  });

  return (
    <Box>
      <Button onClick={handleClick}>Export as PDF</Button>
      <Box ref={componentRef} margin="50px">
        {component}
      </Box>
      <Box sx={{ position: "fixed", top: 0, height:"50px" }} >
        header text
      </Box>
      <Box sx={{ position: "fixed", bottom: 0, height:"50px" }} >
        footer text
      </Box>
    </Box>
  )
}


// Within a specific component

function SpecificComponent() {

  return (
    <Box>
      <Box sx={{"@media print:{page-break-after: always;}}} margin="50px">
          first page content
      </Box>
      <Box sx={{"@media print:{page-break-after: always;}}} margin="50px">
         second page content
      </Box>
      <Box sx={{"@media print:{page-break-after: always;}}} margin="50px" >
        third page content
      </Box>
    </Box>
  )
}

```

### Final results

Despite the inherent challenges in ensuring proper functionality of headers and footers during printing, the solutions discussed above have made it feasible to generate PDF reports with both a header and footer.

#### Known Pitfalls

- The implementation is invasive when dealing with overlay issues.
- Potential occurrence of empty space at the bottom of the page.
 > The page number now is fixed no matter what the browser window size is, it loses the capability to let the browser determine the required number of pages for printing.

#### Future Improvements

- Make the implementation more non-invasive.
