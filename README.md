# parley

A small crew of native Web Components I kept rewriting across my own projects, so I packaged them up. No framework, no runtime, no build step on your side — just custom elements that work wherever HTML does.

Right now there's one: `<site-footer>`. More will land as I get tired of copy-pasting them.

## Install

```bash
npm install @hbeneke/parley
```

## Usage

Import the package once (anywhere — entry file, a script tag with a bundler, whatever). That registers the elements.

```js
import "@hbeneke/parley";
```

Then drop the tag in your markup:

```html
<site-footer nickname="Habakuk" copyright="reserved"></site-footer>
```

That's it. The element renders its own footer, owns its styles, and won't leak CSS into your page or pick up yours — it lives behind a shadow root.

## `<site-footer>`

A footer with a name link, a copyright line, and a tagline that fades in on hover.

### Attributes

| Attribute        | Default       | What it does                                           |
| ---------------- | ------------- | ------------------------------------------------------ |
| `nickname`       | `Anonymous`   | Name shown in the link and copyright text              |
| `year`           | current year  | Year used in the copyright line                        |
| `copyright`      | `bugs`        | Picks one of the built-in copyright phrasings          |
| `copyright-text` | —             | Your own template, wins over `copyright` if set        |
| `reveal`         | —             | Set to `always` to keep the tagline visible (no hover) |

The `copyright` presets:

- `bugs` — `Copyright© {year}. All bugs reserved.`
- `reserved` — `© {year} {nickname}. All rights reserved.`
- `copyright` — `Copyright © {year} {nickname}. All rights reserved.`
- `simple` — `© {year} {nickname}`

If none of those fit, write your own and use `{year}` / `{nickname}` as placeholders:

```html
<site-footer
  nickname="Habakuk"
  copyright-text="Built and maintained by {nickname}, {year}."
></site-footer>
```

### Slots

```html
<site-footer nickname="Habakuk">
  <span slot="tagline">Shipped from a tiny town in Galicia.</span>
  <a href="/rss">RSS</a>
</site-footer>
```

- `tagline` — replaces the default "Made with ❤️ from Spain."
- default slot — anything else you want under the copyright line.

### Styling

The internals are encapsulated, so reach in through these custom properties instead:

```css
site-footer {
  --font: "Inter", sans-serif;
  --accent: rebeccapurple; /* the heart colour */
}
```

The `reveal="always"` attribute is there for touch devices or anyone who'd rather not hide the tagline behind a hover.

## Browser support

Anything with Custom Elements and Shadow DOM — every current browser. No polyfills shipped.

## License

GPL-3.0-only. See [LICENSE](./LICENSE).
