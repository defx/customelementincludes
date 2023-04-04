# customelementincludes

An async function that you can use before returning html from your application server to dynamically inject component definitions into the page....

```js

import { customElementIncludes } from "customelementincludes"

/* ... */

app.use(async function (req, res, next) {
    /* ... */
    res.send(await customElementIncludes(html))
}
```

customelementincludes will glob all project files matching _`components/\*\*/_.js`** (you can configure this path via `process.env.components`) so that it knows what your local components are called. It assumes each component .js file lives in a directory matching the components name, so your directory structure might look something like...

```
components/
    hello-world/
        index.js
    foo-bar/
        index.js

```

...when you invoke the customElementIncludes function it will search the html you pass it for any Custom Element tags, and then inject module scripts to load any tags that have matching component files.
