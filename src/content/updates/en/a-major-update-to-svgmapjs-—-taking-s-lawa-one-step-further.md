---
title: A Major Update to svgmapjs — Taking S-LaWA One Step Further
author: Satoru Takagi
date: 2026-09-25
description: A major svgmapjs update brings S-LaWA one step further, enabling secure integration of independent Web Apps with arbitrary coordinate transformations.
showToc: false
---

Today, I pushed a major functional update to the `dev2` branch of **svgmapjs**.

As mentioned in our previous post about the transition to Hyper-Layering, svgmapjs is also expected to be renamed **hlmapjs** in the future. For now, however, we will continue to refer to it as svgmapjs here.

In April this year, svgmapjs introduced the **S-LaWA (Sandboxed LaWA)** architecture.

LaWA (Layers as Web Apps) allows map layers to be implemented as independent Web Apps. With S-LaWA, these Web Apps run inside a sandbox, allowing **external Web Apps from different origins to be integrated into a map while maintaining a clear security boundary.**

This update resolves an important limitation that remained in S-LaWA.

svgmapjs has long supported defining arbitrary coordinate systems and map projections for both the map container and individual layers using JavaScript functions. It could then automatically transform the coordinates and overlay layers using different projections.

However, in S-LaWA, JavaScript functions cannot be passed across the sandbox boundary for security reasons. As a result, S-LaWA layers were previously unable to use arbitrary projection transformations.

This is now solved using **Lookup Tables (LUTs)**.

Instead of passing the coordinate transformation function itself, svgmapjs generates a mesh-based table of transformation results and passes that to the S-LaWA layer. This makes arbitrary coordinate transformations possible while preserving the security isolation provided by the sandbox.

The overhaul and optimization of the coordinate transformation algorithm also improves the rendering quality of transformed bitmap layers, such as weather charts.

The `dev2` branch is still under testing. At the same time, **our publicly available map pages are already using the `dev2` version ahead of the main release, allowing us to test it with real map content.**

**With S-LaWA and this new LUT-based support, HLA 2.0 is becoming much more real: independent Web Apps can be integrated directly as map layers, while preserving both their independence and their coordinate systems.**
