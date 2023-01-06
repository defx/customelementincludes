import { globby } from "globby"

const pattern = /<([a-z]\w*-\w*)/gm
const componentsGlob = process.env.components || `components/**/*.js`

function unique(arr) {
  return [...new Set(arr)]
}

function listCustomElements(html = "") {
  const names = (html.match(pattern) || []).map((v) => v.slice(1))
  return unique(names)
}

export async function customElementIncludes(html) {
  const customElements = listCustomElements(html)

  if (!customElements) return html

  let paths = await globby([componentsGlob])

  paths = paths.filter((p) => {
    let [dir, file] = p.split("/").slice(-2)
    return customElements.find(
      (name) => dir === name || file.split(".")[0] === name
    )
  })

  if (!paths.length) return html

  let scripts = ""

  paths.forEach((path) => {
    scripts += `<script type="module" src="/${path}"></script>`
  })

  return html.replace("</body>", `${scripts}</body>`)
}
