---
title: Thinking about CORS
author: Ruihua
description: In-depth understanding of CORS
draft: false
tags: [IT, Front end, HTTP, CORS]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="cover image" src={useBaseUrl('img/cover.jpg')} />

<!-- ![Cover image](/img/cover.jpg) -->

Since I have met the CORS issues for a while and this time I got stuck with it during the development of the real commercial project.

I got to do some research to make it clear.

#### Things below need to be cleared:

- What is CORS?
- Why is there CORS?
- How to handle CORS?

<!-- truncate -->

### What's CORS?

According to the definition, cors is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.

So in my opinion, CORS is a modern technology to solve the same origin policy issue. the other solution is jsonp.

#### What is the difference between CORS and JSONP?

- CORS supports most types of HTTP requests, while JSONP only support the GET request method.
- CORS support better error handling than JSONP
- JSONP can cause XSS issues, while CORS is more secure.
- The benefits of JSONP is that it can work with legacy browsers.

### Why is there CORS?

According to the definition above, it's clear to see the reason is because of the same-origin policy set by browsers which is mainly for security.

#### What is the same-origin policy?

The policy defines that if the protocol, domain name, or port is different, they cannot interact with each other. It doesn't mean a web page cannot embed an image, css, etc. from a different origin, because same-origin policy only applies to scripts. The rules are listed below:

-
