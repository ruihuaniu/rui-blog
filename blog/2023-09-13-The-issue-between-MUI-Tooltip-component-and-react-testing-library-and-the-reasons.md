---
title: The issue between react-testing-library and Tooltip component from material UI
authors: [Ruihua]
description: An in-depth investigation about the issue that react-testing-library cannot work well with Tooltip component from material UI
draft: false
tags: [IT, Front end, React, Testing, MUI,  English]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="cover image" src={useBaseUrl('img/react-testing-library.png')} />

### Overview
When using `getByRole` from react-testing-library to retrieve the component/element content, it should be quite straightforward, but when the component/element is wrapped with the Tooltip component from Material UI, something weird happen:  `getByRole` can only get the content of the tooltip rather than the component/element content. This article is going to explain why such issue happen and how to fix it.


<!--truncate-->
### Step to reproduce the issue with Tooltip component
The code below shows the issue in details: `getByRole` can only get the tooltip content but not the element content itself.
```
<Tooltip title="tooltip content" placement="bottom-start">
  <Typography variant="h6" gutterBottom>
    typography content
  </Typography>
</Tooltip>

//This assertion with react-testing-library doesn't work: 
expect(screen.getByRole("heading", { level: 6, name: "typography content" })).toBeInTheDocument()


// This assertion below works: 
expect(screen.getByRole("heading", { level: 6, name: "tooltip content" })).toBeInTheDocument()
```

There are two weird things happen here:
1. `getByRole` cannot get the element content but the tooltip content
  > `expect(screen.getByRole("heading", { level: 6, name: "typography content" })).toBeInTheDocument()` doesn't work, but `expect(screen.getByRole("heading", { level: 6, name: "tooltip content" })).toBeInTheDocument()` works 
2. the tooltip content is not in h6, but `getByRole("heading", { level: 6, name: "tooltip content" })` works


### The real cause of the issue
Actually, if we take a look of the element that wrapped within tooltip in Chrome Dev tools, we can see there is an `aria-label` attribute attached to it, with the content of the tooltip.

```
<h6 
class="MuiTypography-root" 
aria-label="tooltip content" // Here is the trick
data-mui-internal-clone-element="true"
>
typography content
</h6>
```

The reason is that Material UI automatically add the `aria-label` attribute to any element wrapped in Tooltip component in order to improve the accessibility. 


#### Why getByRole take `aria-label` precedence over element content
As the react-testing-library document says:
> The accessible name is for simple cases equal to e.g. the label of a form element, or the text content of a button, or the value of the aria-label attribute https://testing-library.com/docs/queries/byrole

The `name` property within `getByRole` means the accessible name, and accessible name is not simply equal to the element text content. And the accessible name provided by ARIA has a higher precedence than that derived from the element content.



### How to fix it
One workaround is to use a different query api from react-testing-library to avoid the issue caused by `getByRole`, it should be something like this:
```
<Tooltip title="tooltip content" placement="bottom-start">
  <Typography variant="h6" gutterBottom>
    typography content
  </Typography>
</Tooltip>

//This assertion with react-testing-library works: 
expect(screen.getByText( "typography content", {selector:"h6"})).toBeInTheDocument()
```


### Final
It's an issue caused by both `getByRole` from react-testing-library and Tooltip component from Material UI. More importantly, it should be clear about what an accessible name is.







