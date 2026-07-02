# `<site-footer>`

A configurable site footer with a name link, a copyright line and a reveal-on-hover tagline. Native custom element — no framework, no build step.

## Example

```html
<site-footer
  nickname="Habakuk Beneke"
  copyright="reserved"
  style="--link: #4f46e5; --accent: crimson;"
>
  <span slot="tagline">Made with ❤️ in Spain.</span>
</site-footer>
```

## Attributes

| Attribute | Values | Default | Effect |
| --- | --- | --- | --- |
| `nickname` | string | `Anonymous` | Name shown in the link and copyright line. |
| `year` | string | current year | Copyright year. |
| `copyright` | `bugs` \| `reserved` \| `copyright` \| `simple` | `bugs` | Copyright preset (see below). |
| `copyright-text` | string | — | Custom copyright template. Overrides `copyright`. Supports `{year}` / `{nickname}`. |
| `reveal` | `always` | — | When `always`, the tagline stays visible instead of only on hover. |

### Copyright presets

| Preset | Output |
| --- | --- |
| `bugs` | `Copyright© {year}. All bugs reserved.` |
| `reserved` | `© {year} {nickname}. All rights reserved.` |
| `copyright` | `Copyright © {year} {nickname}. All rights reserved.` |
| `simple` | `© {year} {nickname}` |

## Slots

| Slot | Description |
| --- | --- |
| _(default)_ | Extra footer content appended after the tagline. |
| `tagline` | Overrides the default "Made with ❤️ from Spain." line. |

## CSS Custom Properties

| Property | Default | Description |
| --- | --- | --- |
| `--font` | `inherit` | Footer font family. |
| `--link` | `inherit` | Name link color. |
| `--link-hover` | `var(--link)` | Name link hover color. |
| `--accent` | `crimson` | Heart / accent color in the tagline. |

## Notes

- The name link points to `https://www.hbeneke.dev` and carries an `aria-label` of `Learn more about {nickname}`.
- On devices with hover, the tagline is hidden until the footer box is hovered. Set `reveal="always"` to keep it visible. `reveal` is read on render only; it is not currently in `observedAttributes`, so changing it at runtime after connection does not re-render.
