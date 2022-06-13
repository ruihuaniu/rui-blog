---
title: REST API vs Websocket
# author: Ruihua
authors: [ruihua]
description: In-depth understanding of REST API and Websocket
draft: false
tags: [IT, Front end, REST, Websocket, English]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="cover image" src={useBaseUrl('img/network.jpg')} />

WebSocket is a new technology coming with HTML5, and the first time I saw it, it confused me with REST API. So in this article, the following questions will be answered.

- What is REST API?
- What is WebSocket?
- What is the connection and difference?

<!--truncate-->

### What is REST API?

Firstly, we need to what REST is? According to the definition:

> REST stands for Representational state transfer which is a software architectural style that defines a set of constraints to be used for creating web services.

So it's clear that REST is only an architectural style with some constraints. It's not a protocol, but it works with other standards like HTTP, XML, JSON, URI, etc.

#### What are the constraints defined by REST ?

There are 6 guiding constraints:

- Client-server architecture.
- Statelessness
- Cacheability
- Layered system
- Code on demand
- Uniform interface

Web service API that adhere to the REST architectural constraints are called RESTful APIs.

So the definition of REST API is clear now, it's commonly based on HTTP.

### What is WebSocket?

Let's see the definition first.

> WebSocket is a computer communications protocol, providing full-duplex communication channels over a single TCP connection.

So there are some similarities between WebSocket and HTTP, like they both depend on TCP connection. But there are not the same, HTTP cannot achieve full-duplex connection, and it has a half-duplex alternative called HTTP polling.

WebSocket is compatible with HTTP and to achieve the compatibility, it handshake uses the HTTP Upgrade header to change from the HTTP protocol to the WebSocket protocol.

### What is the connection and difference?

REST API is an API using REST architectural style, and it commonly make use of HTTP to access and manipulate web resources (HTML, JSON, XML,etc.).

WebSocket is a protocol compatible with HTTP, it only use HTTP at sending the handshake request/response (initial connection).

So since REST doesn't impose a protocol, it's possible to do REST with HTTP, WebSocket, and even FTP.

### Conclusion

REST API and WebSocket are different concept in nature, but they have some connections, and it's possible for REST to make use of WebSocket even though it commonly use HTTP.

#### Reference:

- https://www.wikiwand.com/en/Representational_state_transfer
- https://www.wikiwand.com/en/WebSocket
- https://stackoverflow.com/questions/13373734/is-rest-over-websockets-possible

Next article : Through understanding of HTTP and FTP
