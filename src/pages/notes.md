---
title: Notas
description: Lee lo que he escrito recientemente
metas:
  title: =title
  description: =description
  image: /notes/index.png
---

{{ comp.ui.headline({ title }) }}
{{ layout "layouts/wrapper.vto" { style: "block", as: "list" } }}
{{ for i, note of notes }}
{{ comp.ui.list({ data: note, i }) }}
{{ /for }}
{{ /layout }}
