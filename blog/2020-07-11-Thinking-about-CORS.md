---
title: Thinking about CORS
# author: Ruihua
authors: [ruihua]
description: In-depth understanding of CORS
draft: false
tags: [IT, Front end, HTTP, CORS, English]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="cover image" src={useBaseUrl('img/cover.jpg')} />

<!-- ![Cover image](/img/cover.jpg) -->

Since I have met the CORS issues for a while and this time I got stuck with it during the development of the real commercial project.

I got to do some research to make it clear.

#### Things below need to be cleared:

- What is CORS?
<!-- truncate -->
- Why is there CORS?
- How to handle CORS?

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

- Cross-origin writes are typically allowed. Like links, redirect, form submission, ect.

* Cross-origin embedding is typically allowed. like examples below:

  - Javascript with `<script src=""> </script>` ,
  - CSS with `<Link ref="" href="">`,
  - Images displayed by `<img>`
  - Media played by `<video>` and `<audio>`
  - Anything embedded by `<iframe>`

* Cross-origin reads are typically disallowed, but read access is often leaked by embedding.
  > https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy

### How to handle CORS?

CORS is a W3C standard and it needs both browser and server to support it. All modern browsers support CORS, and when a user does a cross-origin request, the browser will detect it and add some additional Header info automatically. The key is with the server where a CORS interface needs to be set.

#### What kinds of additional info will be added by browser?

There are two different CORS requests defined by browser, one is simple request and the other one is not-so-simple request.

In order to answer what kinds of additional info will be added by browser, we need to answer what the differences are for simple request and not-so-simple request are.

Simple request needs to satisfy the following two rules

- Request method is either HEAD, GET or POST
- HTTP Header messages are within the following properties:
  - Accept
  - Accept-Language
  - Content-Language
  - Last-Event-ID
  - Content-Type belongs to either application/x-www-form-urlencoded, multipart/form-date or text/plain.

Other requests except simple requests are not-so-simple requests.

##### For simple request

The browser will add an `Origin` property in the HTTP HEADER. and if the domain within the `Origin` is allowed by server, the server will response with four additional HEADER info:

```js
Access-Control-Allow-Origin: https://api.example.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: some additional header
Content-Type: text/html; charset=utf-8
Content-Type:
```

##### For not-so-simple request

The browser will do a preflight first by using HTTP OPTION method with additional `Origin`, `Access-Control-Request-Method`, and `Access-Control-Request-Header` properties in the HTTP HEADER.

If the request is allowed by server, the server will response with following additional HEADER info:

```js
Access-Control-Allow-Origin: https://api.example.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Header: Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 604800   // 7 days
```

> https://www.ruanyifeng.com/blog/2016/04/cors.html  
> https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

### Conclusion

Since all modern browsers support CORS, in order to use CORS, the key is to set up the server to make it support CORS.

Moreover, apart from CORS and JSONP, there are some other methods to solve same-origin issues, like [Websocket, Nginx proxy, etc. ](https://juejin.im/post/5c23993de51d457b8c1f4ee1)
