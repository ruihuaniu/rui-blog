---
title: How to passing props to children prop in react
authors: [Ruihua]
description: Find the best way to pass props to children prop in react
draft: false
tags: [IT, Front end, React, Props,  English]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="cover image" src={useBaseUrl('img/react.jpg')} />

### Overview
Passing props to components in React is a commonplace practice, yet it differs when passing props to children component. While one approach involves using the `cloneElement` and/or `Children` API to manipulate and transform the JSX received as the children prop, this method presents certain pitfalls, and those two APIs are legacy. This article aims to explore alternative, more effective methods to attain the same outcome.

<!--truncate-->
### The old ways
When using `cloneElement` to pass props to children component, it looks like something below:
```
function Parent({children}){
  return React.cloneElement(children, newProps)  // The newProps will overwrite the props of children
}
```


### The Alternatives
One better and modern approach is using the render prop, which is clean and clear. One example could be:
```
function Parent({...props, renderComponent}){

  return(
    <div>
      {renderComponent(extraProps)}
    </div>
  )
}

// Usage within a specific component
function SpecificComponent(){
  
  return(
    <Parent renderComponent={(props) => <Child {...props} />}/> // <Child> here could be any component
  )
}
```
This is a clean and clear way to pass extra props to children prop. It also make it possible to extend a component by wrapping and passing additional props to it without modifying the original component much.



### Retro
`cloneElement` and `Children` are legacy APIs and should be avoided when possible. Using render prop is a better alternative when trying to pass props to children prop.

