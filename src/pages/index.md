---
layout: layouts/prose.vto
bread_title: Home
metas:
  title: =index.title
  description: =index.description
  image: /media/img/og.png
---

Hola, me llamo

# {{ about.name }} <span class="username">{{ about.username }}</span>

Desarrollo aplicaciones web con **React**. Me enfoco en la **optimización del rendimiento** y la **escalabilidad**, cuidando la **calidad del código** y la **arquitectura**. Actualmente, complemento mi formación autodidacta con la carrera de **Ingeniería en Informática** en la Universidad San Lorenzo, donde continúo perfeccionando mis habilidades técnicas y estratégicas.

---

Proyectos destacados

<table>
  <thead>
    <tr>
      <th>Año</th>
      <th>Nombre</th>
      <th class="hide-on-mobile">Creado con</th>
      <th>Enlace</th>
    </tr>
  </thead>
  <tbody>
  {{ for i, p of projects }}
    <tr data-aos="fade-left" data-aos-delay="{{ i * 50 }}">
      <td style="color: var(--ttcolor);">{{ p.created_at |> date("yyyy") }}</td>
      <td>{{ p.title }}</td>
      <td class="hide-on-mobile">{{ p.tags |> join(", ") }}</td>
      <td>
        {{ if p.html_url || p.gh_url }}
          <a href="{{ p.html_url || p.gh_url }}">
            {{ if p.html_url }}
            <img src="{{ "arrow-up-right" |> icon("phosphor") }}" inline>
            {{ else }}
            <img src="{{ "github" |> icon("simpleicons") }}" inline>
            {{ /if }}
          </a>
        {{ /if }}
      </td>
    </tr>
    {{ /for }}
  </tbody>
</table>
