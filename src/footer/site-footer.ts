type CopyrightPreset = "bugs" | "reserved" | "copyright" | "simple";

const COPYRIGHT_PRESETS: Record<CopyrightPreset, string> = {
  bugs: "Copyright© {year}. All bugs reserved.",
  reserved: "© {year} {nickname}. All rights reserved.",
  copyright: "Copyright © {year} {nickname}. All rights reserved.",
  simple: "© {year} {nickname}",
};

const template = document.createElement("template");
template.innerHTML = `
  <style>
    footer {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 5rem 0 1rem;
      text-align: center;
      font-size: 0.75rem;
      font-weight: 600;
      font-family: var(--font, inherit);
    }
    .box {
      margin: 0 auto;
      padding: 0.5rem 1rem;
      transition: background 0.3s, border-radius 0.3s;
    }
    .box:hover {
      border-radius: 0.5rem;
      background: rgba(243, 244, 246, 0.05);
    }
    .box p { margin: 0; }
    .box p + p { margin-top: 0.5rem; }
    a { color: inherit; text-underline-offset: 2px; }
    .heart { color: var(--accent, crimson); }

    .tagline { transition: opacity 0.3s; }
    @media (hover: hover) {
      :host(:not([reveal="always"])) .tagline { opacity: 0; }
      :host(:not([reveal="always"])) .box:hover .tagline { opacity: 1; }
    }
  </style>

  <footer>
    <div class="box">
      <p><a id="name-link" href="/about"></a></p>
      <p id="copyright"></p>
      <p class="tagline">
        <slot name="tagline">Made with <span class="heart">❤️</span> from Spain.</slot>
      </p>
      <slot></slot>
    </div>
  </footer>
`;

export class SiteFooter extends HTMLElement {
  static observedAttributes = [
    "nickname",
    "year",
    "copyright",
    "copyright-text",
  ];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    this.render();
  }

  private render(): void {
    const nickname = this.getAttribute("nickname") ?? "Anonymous";
    const year = this.getAttribute("year") ?? `${new Date().getFullYear()}`;

    const link = this.shadowRoot!.querySelector("#name-link") as HTMLAnchorElement;
    link.textContent = nickname;
    link.setAttribute("aria-label", `Learn more about ${nickname}`);

    this.shadowRoot!.querySelector("#copyright")!.textContent =
      this.copyrightText(nickname, year);
  }

  private copyrightText(nickname: string, year: string): string {
    const preset = (this.getAttribute("copyright") ?? "bugs") as CopyrightPreset;
    const tpl =
      this.getAttribute("copyright-text") ??
      COPYRIGHT_PRESETS[preset] ??
      COPYRIGHT_PRESETS.bugs;

    return tpl.replaceAll("{year}", year).replaceAll("{nickname}", nickname);
  }
}

if (!customElements.get("site-footer")) {
  customElements.define("site-footer", SiteFooter);
}
