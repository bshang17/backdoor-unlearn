# COLM 2026 poster

*Forgetting to Forget: Attention Sink as A Gateway for Backdooring LLM Unlearning*

| File | What |
|---|---|
| `forgetting-to-forget-colm2026-poster.pdf` | **print file** — 72 x 36 in (landscape), 1 page, all vector |
| `forgetting-to-forget-colm2026-poster.png` | 50-dpi preview |
| `forgetting-to-forget-colm2026-poster.pptx` | **editable PowerPoint version** — one slide, 56 x 28 in (see below) |
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
DejaVu symbol subset embedded as CID TrueType, smallest text 29.5 pt (author
superscripts; body 60 pt, captions 45 pt, table numbers 36-37 pt), all three
QR codes decode from the PDF to the arXiv page, the GitHub repo and the
project page.

## Editable PowerPoint version

`forgetting-to-forget-colm2026-poster.pptx` holds the same poster as one
editable slide: native text boxes, Wingdings bullets, native PowerPoint
equations (Cambria Math), and the figures, the three result tables, logos and
QR codes as SVG pictures (right-click ▸ Convert to Shape to edit them); every
section is a named group.

- PowerPoint slides are at most 56 in wide, so the slide is **56 x 28 in** —
  the same 2:1 shape as the 72 x 36 in board. Print it scaled to **128.57 %**
  (or export to PDF and let the print shop scale it); everything is vector.
- **Install the fonts first:** `assets/fonts/*.ttf` (EB Garamond, EB Garamond
  SemiBold, Poster Symbols, Inconsolatazi4). Cambria Math and Wingdings come
  with Office.
  To share with people who do not have them: File ▸ Options ▸ Save ▸ Embed
  fonts in the file.
- PowerPoint sets the equations in Cambria Math, which is a little wider than
  the TeX fonts of the PDF; boxes with inline math have a little extra width,
  but check them after editing.
- Keynote, Google Slides and LibreOffice cannot show PowerPoint equations; they
  show a picture of each equation box instead (editable only in PowerPoint).

Regenerate it after editing `poster.html`, then check it against the PDF
(every word and every region; only justified lines that break at another word
should differ):

```bash
python $SKILL/scripts/html_to_pptx.py poster.html -o forgetting-to-forget-colm2026-poster.pptx
python $SKILL/scripts/compare_pdf_pptx.py forgetting-to-forget-colm2026-poster.pdf \
  forgetting-to-forget-colm2026-poster.pptx --out pptx-qa
```

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
  gradients as SVG gradients, icons traced) — no screenshots. Figure 2
  (`assets/figs/motivation.svg`) was converted with `--trim 2`, which crops
  the plot's white export margin to 2 pt (viewBox only, the drawing is
  unchanged), so its caption sits right under the plot.
- The trigger `current year: 2025` is set as in the paper: `\texttt` in
  Inconsolata zi4 (the font of LaTeX's `inconsolata` package, CTAN, OFL) on a
  90 % gray chip. `assets/fonts/Inconsolatazi4-Regular.ttf` is that font with
  TrueType outlines (the CTAN `.otf` has CFF outlines, which Chromium prints as
  Type 3), converted with the skill's `make_static_fonts.py --to-ttf`.
- Tables 1-3 are the paper's own LaTeX tables (camera-ready PDF, p. 9: MUSE,
  WMDP-Bio, sink masking), cut out as vector with `pdf_to_vector_svg.py --clip`
  (`assets/figs/table*.svg`), as on the group's earlier posters; each crop is
  scaled so the numbers come out at about the same size (36-37 pt).
- References [1]-[6]: the works the poster cites, entries from the paper's
  bibliography, numbered in order of first citation and set as on the Safety
  Mirage poster (a strip under the three columns, two per column). No
  acknowledgment, as on the group's recent posters.
- Contact line: `bshang@msu.edu` only, as the first author asked (address from
  Bingqi Shang's public CV).
- Logos: provenance in `assets/logos/README.md`.
