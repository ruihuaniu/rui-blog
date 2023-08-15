---
title: Styled components VS CSS modules
# author: Ruihua
authors: [Ruihua]
description: In-depth understanding of styled components and css modules
draft: false
tags: [IT, Front end, CSS, English]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="cover image" src={useBaseUrl('img/css.jpg')} />

I have done projects with normal CSS, SASS, and also a project with styled components, but haven't done any project with CSS modules.

As I'm going to do a new project, and considering the issues I met in styled components, I'm considering the possibility using CSS modules. So here comes this post.

#### Things below need to be cleared?

- What is styled components and why is it?

<!--truncate-->

- What is CSS modules and why is it?

### What is styled components?

In short, it's a library for css in javascript, which makes css more dynamic, more powerful with the use of javascript. It's currently used by Airbnb, github, Google, etc.

#### Why is there styled components?

Well, in my opinion, styled components has the following benefits:

- Local scope, even with the same name, one style component won't affect the other.
- Dynamic. with props, the styles can be changed dynamically rather than using different class names.
- The power of javascript.

it doesn't mean there is no drawback for styled component, like the little steep learning curve.

### What is CSS modules?

According to the official definition, a CSS Module is a CSS file in which all class names and animation names are scoped locally by default.

It's clear that CSS Module is used to fix the CSS global scope issues.

### What are the similarities and differences between styled components and CSS modules?

The similarities are listed below:

- Both are local scope
- Both could be used with SASS (Even it's easier for CSS Modules)

The differences are as follows:

- Styled components is CSS in js, while CSS modules is still CSS, so it's much easier to jump into CSS Modules from the general CSS background.
- Styled components can be quite powerful with the help of js. CSS Modules can achieve the same features but with more work.

### Conclusion

In a nutshell, both libraries are pretty good. If you like javascript, styled components is the thing you should give a try. If you come from a designer background who like to handle the general CSS, CSS Module is a good solution for local scope.
