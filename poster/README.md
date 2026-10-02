# COLM 2026 poster

*Forgetting to Forget: Attention Sink as A Gateway for Backdooring LLM Unlearning*

| File | What |
|---|---|
| `forgetting-to-forget-colm2026-poster.pdf` | **print file** — 72 x 36 in (landscape), 1 page, all vector |
| `forgetting-to-forget-colm2026-poster.png` | 50-dpi preview |
| `forgetting-to-forget-colm2026-poster.pptx` | **editable PowerPoint version** — one slide, 56 x 28 in (see below) |
| `forgetting-to-forget-colm2026-poster-48x36.pdf` / `.png` / `.pptx` | the same poster for a **48 x 36 in (landscape)** board: PDF, preview, editable PowerPoint at full size (see below) |
| `poster.html` | source (content + layout) |
| `optml-poster.css` | OPTML house style (copied from the `optml-poster` skill) |
| `assets/` | vector figures, logos, QR codes, fonts, MathJax — everything needed offline |

The build and audit tools are not part of this repository. They belong to the
`optml-poster` skill in [bshang17/myskills](https://github.com/bshang17/myskills)
(folder `optml-poster/`), together with the group's reference posters and the
full workflow (`SKILL.md`). In the commands below, `SKILL` is the path to that
skill folder:

```bash
SKILL=~/.claude/skills/optml-poster   # installed with: cp -r myskills/optml-poster ~/.claude/skills/
```

## Print

COLM 2026 main-conference boards are **36 in (H) x 72 in (W), landscape**
(colm.cc). The on-site FedEx Office at the Hilton Union Square offers a
36"x72" gloss print (order form linked from colm.cc; send the PDF to
usa5040@fedex.com). The official PosterSessionOnline service expects
36 x 70.03 in; for that template re-flow instead of scaling:

```bash
python $SKILL/scripts/build_poster.py poster.html --size 70.03x36 -o poster-70x36.pdf
```

Pre-print audit of the current PDF: 0 raster images (checked across all PDF
objects, inside patterns and inline), fonts EB Garamond, Inconsolata zi4 and a
DejaVu symbol subset embedded as CID TrueType, smallest text 28.5 pt (the
reference strip; body 60 pt, captions 45 pt, table numbers 36-37 pt), all three
QR codes decode from the PDF to the arXiv page, the GitHub repo and the
project page.

## 48 x 36 in version

The same poster for a 48 in (W) x 36 in (H) landscape board, re-flowed from
the same `poster.html` (not scaled from the 72 x 36 in PDF): every word,
equation, figure, table, logo and QR code is there, all vector. The two PDFs
carry the same words and the same 7764 vector paths, 0 raster images. A block
at the end of the style in `poster.html` (`@media (max-aspect-ratio: 3/2)`)
sets the narrower page: type at about 0.9x the 72 x 36 in sizes (body 54 pt,
captions 41 pt, section titles 67 pt, title 75 pt; the research question
keeps 65 pt), figures and tables at the column width (about 0.61-0.64x; table
numbers 22-23 pt), smaller logos and QR codes (2.1 in), the two insights
stacked, and in the results column Figure 4 across the column, then Table 2
with the takeaway under it beside the closing ✓ note (Table 2's numbers are
about 20 pt there, ~12 % smaller than Table 1's, so the text boxes get the
width they need). Line breaks marked
`<br class="br48">` appear only at this size. Each reference stays on one
line of its column slot (22.3 pt, the smallest text). The QR codes decode
from the PDF.

```bash
python $SKILL/scripts/build_poster.py poster.html --size 48x36 \
  -o forgetting-to-forget-colm2026-poster-48x36.pdf --png forgetting-to-forget-colm2026-poster-48x36.png --png-dpi 50
python $SKILL/scripts/html_to_pptx.py poster.html --size 48x36 -o forgetting-to-forget-colm2026-poster-48x36.pptx
```

The 48 x 36 in PPTX is within PowerPoint's 56 in limit, so it is a 48 x 36 in
slide: print at 100 %. Everything below about fonts and equations applies to it
as well; check it with the same three commands (with the `-48x36` file names).

## Editable PowerPoint version

`forgetting-to-forget-colm2026-poster.pptx` holds the same poster as one
editable slide: native text boxes, Wingdings bullets, the short inline
formulas as native PowerPoint equations, and the figures, the two result
tables, logos, QR codes and the six display equations as SVG pictures
(right-click ▸ Convert to Shape to edit them); every section is a named group.
The display equations are cut from the PDF itself, so they look exactly as
printed: PowerPoint re-sets native equations in Cambria Math, which is wider,
and broke the display equations across lines and set the underbrace labels
onto the braces. Each equation picture carries its LaTeX in the alt text (to
retype it: Insert ▸ Equation ▸ LaTeX).

- PowerPoint slides are at most 56 in wide, so the slide is **56 x 28 in** —
  the same 2:1 shape as the 72 x 36 in board. Print it scaled to **128.57 %**
  (or export to PDF and let the print shop scale it); everything is vector.
- **Install the fonts first:** `assets/fonts/*.ttf` (EB Garamond, EB Garamond
  SemiBold, Poster Symbols, Inconsolatazi4). Cambria Math and Wingdings come
  with Office.
  To share with people who do not have them: File ▸ Options ▸ Save ▸ Embed
  fonts in the file.
- The inline formulas are set in Cambria Math, a little wider than the TeX
  fonts of the PDF; their text boxes have a little extra width.
- Without the fonts installed, PowerPoint substitutes them: the trigger
  `current year: 2025` then shows in a sans-serif font instead of Inconsolata.
- Keynote, Google Slides and LibreOffice cannot show PowerPoint equations; they
  show a picture of each box with inline math instead (editable only in
  PowerPoint).

Regenerate it after editing `poster.html`, then check it against the PDF
(every word and every region; only justified lines that break at another word
should differ):

```bash
python $SKILL/scripts/html_to_pptx.py poster.html -o forgetting-to-forget-colm2026-poster.pptx
python $SKILL/scripts/compare_pdf_pptx.py forgetting-to-forget-colm2026-poster.pdf \
  forgetting-to-forget-colm2026-poster.pptx --out pptx-qa
python $SKILL/scripts/pptx_textfit.py forgetting-to-forget-colm2026-poster.pptx --fonts assets/fonts
```

The last check re-wraps every text box the way PowerPoint may (no kerning,
breaks after hyphens, also after the no-break hyphen, as PowerPoint does in
East Asian locales, and inside a word that does not fit its line).
LibreOffice cannot show those cases. Title, headings and one-line labels get a
little extra box width, so PowerPoint's wider (unkerned) text never wraps
them; underbraces are PowerPoint's stretchy group characters; the circled
numbers of the attack goals are Wingdings bullets.

## Edit and rebuild

Edit `poster.html`, then from this directory:

```bash
pip install -r $SKILL/requirements.txt   # once
python $SKILL/scripts/build_poster.py poster.html \
  -o forgetting-to-forget-colm2026-poster.pdf --png forgetting-to-forget-colm2026-poster.png --png-dpi 50
```

The build prints per-column `OVERFLOW`/`slack` in inches and refuses to write
the PDF while anything overflows or an asset is missing. See `$SKILL/SKILL.md`
for the full workflow.

## Sources

- All text, numbers and figures: arXiv:2510.17021v2 (COLM 2026 camera-ready).
  Figures were converted from the original figure PDFs in the arXiv source with
  the skill's `pdf_to_vector_svg.py` (heatmaps rebuilt as exact vector cells,
  gradients as SVG gradients, icons traced) — no screenshots. Figure 1 is
  the paper's whole Figure 1, panels (a)-(d) (`assets/figs/teaser_full.svg`).
  Figures 1 and 4 (Figure 4 is the paper's Fig. 2a, trigger position) were
  converted with `--trim 2`, which crops the white export
  margin to 2 pt (viewBox only, the drawing is unchanged), so each caption sits
  right under its figure.
- The trigger `current year: 2025` is set as in the paper: `\texttt` in
  Inconsolata zi4 (the font of LaTeX's `inconsolata` package, CTAN, OFL) on a
  90 % gray chip. `assets/fonts/Inconsolatazi4-Regular.ttf` is that font with
  TrueType outlines (the CTAN `.otf` has CFF outlines, which Chromium prints as
  Type 3), converted with the skill's `make_static_fonts.py --to-ttf`.
- Tables 1-2 are the paper's own LaTeX tables (camera-ready PDF, p. 9: MUSE,
  WMDP-Bio), cut out as vector with `pdf_to_vector_svg.py --clip`
  (`assets/figs/table*.svg`), as on the group's earlier posters; each crop is
  scaled so the numbers come out at about the same size (36-37 pt).
- References [1]-[6]: the works the poster cites, entries from the paper's
  bibliography, numbered in order of first citation and set as on the Safety
  Mirage poster (a strip under the three columns, two per column). No
  acknowledgment, as on the group's recent posters.
- Contact line: `bshang@msu.edu` only, as the first author asked (address from
  Bingqi Shang's public CV).
- Logos: provenance in `assets/logos/README.md`.
