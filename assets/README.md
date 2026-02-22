# PCB assets

## 3D model (STL / OBJ)

- **STL:** `ham-ttc.stl` (used by the 3D viewer)
- **OBJ:** `pcb.obj` (fallback if no STL)

Click **"View 3D model"** on the Telemetry & Tracking RF Board project. Export from Altium or KiCad (3D view → export STL/OBJ).

## 2D board layers (SVG)

Put copper-layer **SVG plot files** in **`assets/SVG/`**. The “View board layers (Gerber)” link shows a layer dropdown that loads these files.

**Files used by the site (must match exactly):**

| File | Label in dropdown |
|------|-------------------|
| `ham-ttc-Top RF Cu.svg` | Top RF Cu |
| `ham-ttc-GND Cu.svg` | GND Cu |
| `ham-ttc-3_3v Cu.svg` | 3.3V Cu |
| `ham-ttc-Low Signal Cu.svg` | Low Signal Cu |

Export from KiCad: File → Plot → set “Plot format” to **SVG**, then plot the copper layers you want and copy the generated `.svg` files into `assets/SVG/`. If you add or rename files, update the layer `<select>` options in `index.html` to match.
