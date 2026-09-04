/* =============================================================================
   Occultopedia
   -----------------------------------------------------------------------------
   Reads the three data files (database.js, tags.js, images.js) and drives:
     · a searchable index          · a force-directed network canvas
     · a long-form entry reader    · a logarithmic timeline canvas
   State lives in the URL (`?view=…#/Entry_Key`) so any view is linkable.
   ========================================================================== */
;(() => {
    "use strict"

    // ---------------------------------------------------------------- config --
    const SITE_TITLE = "Occultopedia"
    const SITE_SUBTITLE = "An Atlas of Secret Societies, Cults and Occult Orders"
    const SITE_URL = "https://dominiquemakowski.github.io/Occultopedia/"
    const AUTHOR = { family: "Makowski", given: "Dominique" }
    const REPO_URL = "https://github.com/DominiqueMakowski/Occultopedia"

    const DEFAULTS = { view: "timeline", mode: "all", min: 5 }
    const PRESENT = new Date().getFullYear()

    const TAG_COLORS = {
        location: "#7c4dff",
        practice: "#00e676",
        era: "#ffab00",
        belief: "#ff5722",
        other: "#9e9e9e",
        all: "#9b59b6",
    }

    const ERA_COLORS = {
        era_ancient: "#FF3333",
        era_medieval: "#FF8833",
        era_preindustrial: "#FFDD33",
        era_industrial: "#BBDD33",
        era_modern: "#33DD88",
        era_digital: "#3388FF",
        era_fictional: "#9e9e9e",
    }

    const ERA_LABELS = {
        era_ancient: "Ancient",
        era_medieval: "Medieval",
        era_preindustrial: "Pre-industrial",
        era_industrial: "Industrial",
        era_modern: "Modern",
        era_digital: "Digital",
        era_fictional: "Fictional",
    }

    const TAG_GROUPS = [
        { prefix: "era_", label: "Era", type: "era" },
        { prefix: "location_", label: "Place", type: "location" },
        { prefix: "belief_", label: "Beliefs", type: "belief" },
        { prefix: "practice_", label: "Practices", type: "practice" },
    ]

    // ------------------------------------------------------------------ dom --
    const $ = (id) => document.getElementById(id)
    const body = document.body

    const els = {
        navList: $("nav-list"),
        detail: $("detail-container"),
        entryPane: $("pane-entry"),
        search: $("search-input"),
        searchClear: $("search-clear"),
        tagFilter: $("tag-filter"),
        activeTags: $("active-tags"),
        clearFilters: $("clear-filters"),
        resultCount: $("result-count"),
        drawerToggle: $("drawer-toggle"),
        scrim: $("scrim"),
        netCanvas: $("network-canvas"),
        netTooltip: $("network-tooltip"),
        netMode: $("network-connection-mode"),
        netThreshold: $("connection-threshold"),
        netThresholdOut: $("threshold-value"),
        netLabels: $("show-labels"),
        netLegend: $("network-legend"),
        tlCanvas: $("timeline-canvas"),
        tlTooltip: $("timeline-tooltip"),
        tlRail: $("timeline-rail"),
        tlThumb: $("timeline-thumb"),
        tlHint: $("timeline-hint"),
        tlView: $("view-timeline"),
        tlLegend: $("timeline-legend"),
        tlZoom: document.querySelector(".canvas-zoom--timeline"),
        lightbox: $("lightbox"),
        lightboxImg: $("lightbox-img"),
        lightboxCaption: $("lightbox-caption"),
    }

    // -------------------------------------------------------------- helpers --
    const formatKey = (key) => key.replace(/_/g, " ")

    const escapeHtml = (value) =>
        String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c])

    function formatYear(year) {
        if (year === null || year === undefined || Number.isNaN(year)) return null
        return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`
    }

    function formatSpan(start, end) {
        const from = formatYear(start)
        if (from === null) return null
        const to = end === null || end === undefined ? "present" : end >= PRESENT ? "present" : formatYear(end)
        return from === to ? from : `${from} – ${to}`
    }

    function getTagInfo(tag) {
        const group = TAG_GROUPS.find((g) => tag.startsWith(g.prefix))
        const type = group ? group.type : "other"
        return {
            original: tag,
            type,
            label: formatKey(group ? tag.slice(group.prefix.length) : tag),
            color: TAG_COLORS[type],
        }
    }

    const getEraTag = (tags) => (tags || []).find((t) => t.startsWith("era_")) || null

    function getEraColor(tags) {
        const era = getEraTag(tags)
        return (era && ERA_COLORS[era]) || "#8e8e9c"
    }

    function debounce(fn, wait) {
        let id
        return (...args) => {
            clearTimeout(id)
            id = setTimeout(() => fn(...args), wait)
        }
    }

    async function copyText(text, btn) {
        try {
            await navigator.clipboard.writeText(text)
        } catch {
            const ta = document.createElement("textarea")
            ta.value = text
            ta.style.position = "fixed"
            ta.style.opacity = "0"
            document.body.appendChild(ta)
            ta.select()
            try {
                document.execCommand("copy")
            } catch {
                /* nothing else to try */
            }
            ta.remove()
        }
        if (!btn) return
        const original = btn.dataset.label || btn.textContent.trim()
        btn.dataset.label = original
        btn.textContent = "Copied"
        btn.classList.add("is-done")
        setTimeout(() => {
            btn.textContent = original
            btn.classList.remove("is-done")
        }, 1600)
    }

    // ----------------------------------------------------------------- data --
    /** @type {Record<string, any>} */
    const entries = {}
    /** key -> lowercase haystack for search */
    const searchIndex = {}
    /** key -> keys that list it in their `inspiredBy` */
    const influenced = {}
    const allTags = new Set()
    let orderedKeys = []

    function buildData() {
        if (typeof dataSocieties === "undefined") return false
        const tagsSource = typeof dataTags !== "undefined" ? dataTags : {}
        const manifest = typeof imagesManifest !== "undefined" ? imagesManifest : {}

        orderedKeys = Object.keys(dataSocieties)

        for (const key of orderedKeys) {
            const meta = tagsSource[key] || {}
            const record = dataSocieties[key]
            const entry = {
                key,
                name: formatKey(key),
                // Keep the author's own field order; entries occasionally carry
                // bespoke sections (e.g. LHP_Classification) beyond the usual four.
                fields: Object.entries(record).filter(([, v]) => v !== null && v !== undefined && v !== ""),
                tags: meta.tags || [],
                startDate: meta.startDate ?? null,
                endDate: meta.endDate ?? null,
                inspiredBy: (meta.inspiredBy || []).filter((k) => k in dataSocieties),
                images: manifest[key] || [],
            }
            entries[key] = entry
            entry.tags.forEach((t) => allTags.add(t))
        }

        // Reverse the influence graph so each entry can show its descendants.
        for (const key of orderedKeys) influenced[key] = []
        for (const key of orderedKeys) {
            for (const parent of entries[key].inspiredBy) {
                if (influenced[parent]) influenced[parent].push(key)
            }
        }

        // Flatten every string in the record once, for full-text search.
        const flatten = (value, sink) => {
            if (value === null || value === undefined) return
            if (typeof value === "object") {
                for (const [k, v] of Object.entries(value)) {
                    sink.push(formatKey(k))
                    flatten(v, sink)
                }
            } else {
                sink.push(String(value))
            }
        }

        for (const key of orderedKeys) {
            const e = entries[key]
            const parts = [e.name, ...e.tags.map((t) => getTagInfo(t).label)]
            for (const [name, value] of e.fields) {
                parts.push(formatKey(name))
                flatten(value, parts)
            }
            searchIndex[key] = parts.join(" ").toLowerCase()
        }
        return true
    }

    const thumbUrl = (file) => `img/thumbs/${file}`
    const fullUrl = (file) => `img/${file}`

    const PLACEHOLDER =
        "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect width="72" height="72" fill="#26262f"/>' +
                '<text x="50%" y="54%" text-anchor="middle" fill="#6c6a78" font-family="sans-serif" font-size="26">?</text></svg>'
        )

    // ---------------------------------------------------------------- state --
    const state = {
        selected: null,
        view: DEFAULTS.view,
        query: "",
        tags: new Set(),
        /** keys currently passing the filter (null = all) */
        visible: null,
    }

    // -------------------------------------------------------------- palette --
    const palette = {}
    let canvasFont = "sans-serif"
    function readCanvasPalette() {
        const cs = getComputedStyle(document.documentElement)
        for (const name of ["canvas-bg", "canvas-grid", "canvas-axis", "canvas-label", "canvas-link", "canvas-band", "accent"]) {
            palette[name] = cs.getPropertyValue(`--${name}`).trim()
        }
        // Resolving this per node per frame is measurably expensive; cache it.
        canvasFont = getComputedStyle(document.body).fontFamily || "sans-serif"
    }

    // --------------------------------------------------------------- layout --
    const mqPhone = window.matchMedia("(max-width: 780px)")
    const mqDrawer = window.matchMedia("(max-width: 1180px)")

    function setPane(pane) {
        body.dataset.pane = pane
        document.querySelectorAll(".tabbar__btn").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.pane === pane))
        // The canvases are display:none while off-screen and report zero size.
        requestAnimationFrame(() => {
            network.resize()
            timeline.resize()
        })
    }

    function setDrawer(open) {
        body.dataset.drawer = open ? "open" : "closed"
        els.drawerToggle.setAttribute("aria-expanded", String(open))
        els.scrim.hidden = !open
    }

    function initLayout() {
        setPane("canvas")
        setDrawer(false)

        els.drawerToggle.addEventListener("click", () => setDrawer(body.dataset.drawer !== "open"))
        els.scrim.addEventListener("click", () => setDrawer(false))

        // Handled in JS so the skip link never writes a bogus entry key into the hash.
        document.querySelector(".skip-link").addEventListener("click", (e) => {
            e.preventDefault()
            if (mqPhone.matches) setPane("entry")
            els.entryPane.focus()
        })

        document.querySelectorAll(".tabbar__btn").forEach((btn) => {
            btn.addEventListener("click", () => setPane(btn.dataset.pane))
        })

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && body.dataset.drawer === "open") setDrawer(false)
        })

        const onBreakpoint = () => {
            if (!mqDrawer.matches) setDrawer(false)
            requestAnimationFrame(() => {
                network.resize()
                timeline.resize()
            })
        }
        mqPhone.addEventListener("change", onBreakpoint)
        mqDrawer.addEventListener("change", onBreakpoint)
    }

    /** After picking an entry, bring the reader into view on small screens. */
    function revealEntry() {
        if (mqPhone.matches) setPane("entry")
        else if (mqDrawer.matches) setDrawer(false)
    }

    // --------------------------------------------------------------- router --
    function readLocation() {
        const params = new URLSearchParams(location.search)
        const hash = decodeURIComponent(location.hash.replace(/^#\/?/, ""))
        return {
            key: hash && entries[hash] ? hash : null,
            view: params.get("view") === "network" ? "network" : "timeline",
            mode: params.get("mode") || DEFAULTS.mode,
            min: Number.parseInt(params.get("min"), 10) || DEFAULTS.min,
        }
    }

    function entryUrl(key) {
        return `${location.origin}${location.pathname}#/${encodeURIComponent(key)}`
    }

    function writeLocation({ push = false } = {}) {
        const params = new URLSearchParams()
        if (state.view !== DEFAULTS.view) params.set("view", state.view)
        if (els.netMode.value !== DEFAULTS.mode) params.set("mode", els.netMode.value)
        if (Number(els.netThreshold.value) !== DEFAULTS.min) params.set("min", els.netThreshold.value)

        const search = params.toString()
        const url = `${location.pathname}${search ? "?" + search : ""}${state.selected ? "#/" + encodeURIComponent(state.selected) : ""}`
        if (url === location.pathname + location.search + location.hash) return
        history[push ? "pushState" : "replaceState"]({}, "", url)
    }

    function syncDocumentMeta() {
        const entry = state.selected ? entries[state.selected] : null
        document.title = entry ? `${entry.name} — ${SITE_TITLE}` : `${SITE_TITLE} — ${SITE_SUBTITLE}`
        const desc = document.querySelector('meta[name="description"]')
        if (desc && entry) {
            const first = entry.fields.find(([, v]) => typeof v === "string")
            desc.setAttribute("content", `${entry.name}: ${first ? first[1].trim().replace(/\s+/g, " ") : ""}`.slice(0, 300))
        }
    }

    // ----------------------------------------------------------- index list --
    function matchesFilter(key) {
        const entry = entries[key]
        if (state.tags.size && !Array.from(state.tags).every((t) => entry.tags.includes(t))) return false
        if (state.query && !searchIndex[key].includes(state.query)) return false
        return true
    }

    function applyFilter() {
        const keys = orderedKeys.filter(matchesFilter)
        state.visible = keys.length === orderedKeys.length ? null : new Set(keys)
        renderNavList(keys)
        els.resultCount.textContent =
            keys.length === orderedKeys.length ? `${orderedKeys.length} entries` : `${keys.length} of ${orderedKeys.length} entries`
        els.searchClear.hidden = !state.query
        els.clearFilters.hidden = !state.query && state.tags.size === 0
        network.invalidate()
        timeline.invalidate()
    }

    function renderNavList(keys) {
        const frag = document.createDocumentFragment()
        if (!keys.length) {
            const li = document.createElement("li")
            li.className = "nav-empty"
            li.textContent = "No entry matches these filters."
            frag.appendChild(li)
        }

        for (const key of keys) {
            const entry = entries[key]
            const li = document.createElement("li")
            const btn = document.createElement("button")
            btn.type = "button"
            btn.className = "nav-item"
            btn.dataset.key = key
            if (key === state.selected) btn.setAttribute("aria-current", "true")

            const img = document.createElement("img")
            img.src = entry.images.length ? thumbUrl(entry.images[0]) : PLACEHOLDER
            img.alt = ""
            img.width = 36
            img.height = 36
            img.loading = "lazy"
            img.decoding = "async"
            img.addEventListener("error", function handle() {
                this.removeEventListener("error", handle)
                this.src = PLACEHOLDER
            })

            const era = getEraTag(entry.tags)
            const span = formatSpan(entry.startDate, entry.endDate)
            const meta = [era ? ERA_LABELS[era] || getTagInfo(era).label : null, span].filter(Boolean).join(" · ")

            const text = document.createElement("span")
            text.className = "nav-item__text"
            text.innerHTML = `<span class="nav-item__name">${escapeHtml(entry.name)}</span>${
                meta ? `<span class="nav-item__meta">${escapeHtml(meta)}</span>` : ""
            }`

            btn.append(img, text)
            li.appendChild(btn)
            frag.appendChild(li)
        }

        els.navList.replaceChildren(frag)
    }

    function renderTagFilterOptions() {
        const frag = document.createDocumentFragment()
        const placeholder = document.createElement("option")
        placeholder.value = ""
        placeholder.textContent = "Filter by tag…"
        frag.appendChild(placeholder)

        for (const group of [...TAG_GROUPS, { prefix: "", label: "Other", type: "other" }]) {
            const tags = Array.from(allTags)
                .filter((t) => (group.prefix ? t.startsWith(group.prefix) : !TAG_GROUPS.some((g) => t.startsWith(g.prefix))))
                .filter((t) => !state.tags.has(t))
                .sort()
            if (!tags.length) continue

            const optgroup = document.createElement("optgroup")
            optgroup.label = group.label
            for (const tag of tags) {
                const option = document.createElement("option")
                option.value = tag
                option.textContent = getTagInfo(tag).label
                optgroup.appendChild(option)
            }
            frag.appendChild(optgroup)
        }
        els.tagFilter.replaceChildren(frag)
        els.tagFilter.value = ""
    }

    function renderActiveTags() {
        const frag = document.createDocumentFragment()
        for (const tag of state.tags) {
            const info = getTagInfo(tag)
            const chip = document.createElement("button")
            chip.type = "button"
            chip.className = "tag-chip"
            chip.style.backgroundColor = info.color
            chip.dataset.removeTag = tag
            chip.setAttribute("aria-label", `Remove filter ${info.label}`)
            chip.textContent = info.label
            frag.appendChild(chip)
        }
        els.activeTags.replaceChildren(frag)
        renderTagFilterOptions()
    }

    function addTagFilter(tag) {
        if (!tag || state.tags.has(tag)) return
        state.tags.add(tag)
        renderActiveTags()
        applyFilter()
    }

    function removeTagFilter(tag) {
        state.tags.delete(tag)
        renderActiveTags()
        applyFilter()
    }

    function initIndex() {
        renderActiveTags()
        applyFilter()

        const runSearch = debounce(() => {
            state.query = els.search.value.trim().toLowerCase()
            applyFilter()
        }, 160)
        els.search.addEventListener("input", runSearch)

        els.searchClear.addEventListener("click", () => {
            els.search.value = ""
            state.query = ""
            applyFilter()
            els.search.focus()
        })

        els.clearFilters.addEventListener("click", () => {
            els.search.value = ""
            state.query = ""
            state.tags.clear()
            renderActiveTags()
            applyFilter()
        })

        els.tagFilter.addEventListener("change", (e) => addTagFilter(e.target.value))

        els.activeTags.addEventListener("click", (e) => {
            const chip = e.target.closest("[data-remove-tag]")
            if (chip) removeTagFilter(chip.dataset.removeTag)
        })

        els.navList.addEventListener("click", (e) => {
            const item = e.target.closest(".nav-item")
            if (item) select(item.dataset.key, { push: true, reveal: true })
        })
    }

    function highlightNavItem(key) {
        els.navList.querySelectorAll('.nav-item[aria-current="true"]').forEach((el) => el.removeAttribute("aria-current"))
        const item = els.navList.querySelector(`.nav-item[data-key="${CSS.escape(key)}"]`)
        if (item) {
            item.setAttribute("aria-current", "true")
            item.scrollIntoView({ block: "nearest" })
        }
    }

    // ------------------------------------------------------- entry renderer --
    function renderValue(value) {
        if (value && typeof value === "object") return renderDefList(value)
        return `<p class="deflist__def">${escapeHtml(String(value).trim())}</p>`
    }

    function renderDefList(obj) {
        const rows = Object.entries(obj)
            .map(([k, v]) => `<div><dt class="deflist__term">${escapeHtml(formatKey(k))}</dt><dd>${renderValue(v)}</dd></div>`)
            .join("")
        return `<dl class="deflist">${rows}</dl>`
    }

    function renderSection(title, inner) {
        return `<section class="entry__section"><h3 class="section-title">${escapeHtml(title)}</h3>${inner}</section>`
    }

    function renderField(name, value) {
        if (typeof value === "string") {
            return renderSection(formatKey(name), `<div class="prose"><p>${escapeHtml(value.trim())}</p></div>`)
        }
        if (value && typeof value === "object") return renderSection(formatKey(name), renderDefList(value))
        return ""
    }

    function renderTags(entry) {
        if (!entry.tags.length) return ""
        const rows = TAG_GROUPS.map((group) => {
            const tags = entry.tags.filter((t) => t.startsWith(group.prefix))
            if (!tags.length) return ""
            const chips = tags
                .map((tag) => {
                    const info = getTagInfo(tag)
                    return `<button type="button" class="tag" data-tag="${escapeHtml(tag)}" style="background:${
                        info.color
                    };color:#11101a" title="Filter the index by “${escapeHtml(info.label)}”">${escapeHtml(info.label)}</button>`
                })
                .join("")
            return `<div class="taggroup"><span class="taggroup__label">${group.label}</span>${chips}</div>`
        }).join("")
        return rows ? `<div class="taggroups">${rows}</div>` : ""
    }

    function renderLineage(entry) {
        const link = (key) => `<button type="button" class="xref" data-goto="${escapeHtml(key)}">${escapeHtml(entries[key].name)}</button>`
        const rows = []
        if (entry.inspiredBy.length) {
            rows.push(`<div class="lineage__row"><span class="lineage__label">Inspired by</span>${entry.inspiredBy.map(link).join("")}</div>`)
        }
        const children = influenced[entry.key] || []
        if (children.length) {
            rows.push(`<div class="lineage__row"><span class="lineage__label">Influenced</span>${children.map(link).join("")}</div>`)
        }
        return rows.length ? renderSection("Lineage", `<div class="lineage">${rows.join("")}</div>`) : ""
    }

    function renderGallery(entry) {
        if (entry.images.length < 2) return ""
        const items = entry.images
            .map(
                (file, i) =>
                    `<button type="button" data-image="${i}" aria-label="Open image ${i + 1} of ${entry.images.length}">
                        <img src="${thumbUrl(file)}" alt="" loading="lazy" decoding="async">
                    </button>`
            )
            .join("")
        return renderSection("Gallery", `<div class="gallery">${items}</div>`)
    }

    function renderCitation(entry) {
        // A citation should resolve to the published atlas, not to whichever host
        // this copy happens to be served from (localhost, a fork, a file:// copy).
        const url = `${SITE_URL}#/${encodeURIComponent(entry.key)}`
        const accessed = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
        const apa = `${AUTHOR.family}, ${AUTHOR.given[0]}. (${PRESENT}). ${entry.name}. In ${SITE_TITLE}: ${SITE_SUBTITLE}. Retrieved ${accessed}, from ${url}`
        const bibtex = `@incollection{occultopedia_${entry.key},
  author    = {${AUTHOR.family}, ${AUTHOR.given}},
  title     = {${entry.name}},
  booktitle = {${SITE_TITLE}: ${SITE_SUBTITLE}},
  year      = {${PRESENT}},
  url       = {${url}},
  urldate   = {${new Date().toISOString().slice(0, 10)}}
}`
        return `
        <details class="cite">
            <summary>Cite this entry</summary>
            <div class="cite__body">
                <div class="cite__block">
                    <div class="cite__head"><span>Permalink</span><button type="button" class="pill-btn" data-copy="url">Copy</button></div>
                    <p class="cite__text">${escapeHtml(url)}</p>
                </div>
                <div class="cite__block">
                    <div class="cite__head"><span>APA</span><button type="button" class="pill-btn" data-copy="apa">Copy</button></div>
                    <p class="cite__text">${escapeHtml(apa)}</p>
                </div>
                <div class="cite__block">
                    <div class="cite__head"><span>BibTeX</span><button type="button" class="pill-btn" data-copy="bibtex">Copy</button></div>
                    <pre>${escapeHtml(bibtex)}</pre>
                </div>
            </div>
        </details>`
    }

    let currentImages = []

    function renderEntry(key) {
        const entry = entries[key]
        currentImages = entry.images

        const hero = entry.images.length
            ? `<img class="entry__hero" src="${fullUrl(entry.images[0])}" alt="Imagery associated with ${escapeHtml(
                  entry.name
              )}" loading="lazy" decoding="async" onerror="this.remove()">`
            : ""

        const era = getEraTag(entry.tags)
        const span = formatSpan(entry.startDate, entry.endDate)
        const dateBits = []
        if (era) dateBits.push(`<span class="entry__era-dot" style="background:${ERA_COLORS[era] || "#888"}"></span>${ERA_LABELS[era] || ""}`)
        if (span) dateBits.push(escapeHtml(span))

        const sections = [
            ...entry.fields.map(([name, value]) => renderField(name, value)),
            renderLineage(entry),
            renderGallery(entry),
        ].join("")

        els.detail.innerHTML = `
            <div class="entry__toolbar">
                <button type="button" class="pill-btn entry__readmode" data-readmode aria-pressed="${body.dataset.read === "on"}">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7v14H4zM13 5h7v14h-7z"/></svg>
                    Reading mode
                </button>
                <button type="button" class="pill-btn" data-copy="url">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a4 4 0 006 .5l2-2a4 4 0 10-5.7-5.7L11 7"/><path d="M14 11a4 4 0 00-6-.5l-2 2A4 4 0 108 18l1.5-1.5"/></svg>
                    Copy link
                </button>
                <a class="pill-btn" href="${REPO_URL}/blob/main/database.js" target="_blank" rel="noopener">Suggest an edit</a>
            </div>
            ${hero}
            <h2 class="entry__title">${escapeHtml(entry.name)}</h2>
            ${dateBits.length ? `<p class="entry__dates">${dateBits.join('<span aria-hidden="true">·</span>')}</p>` : ""}
            ${renderTags(entry)}
            ${sections}
            ${renderCitation(entry)}
        `

        els.entryPane.scrollTop = 0
    }

    function initEntryDelegation() {
        els.detail.addEventListener("click", (e) => {
            const tag = e.target.closest("[data-tag]")
            if (tag) {
                addTagFilter(tag.dataset.tag)
                if (mqPhone.matches) setPane("index")
                else if (mqDrawer.matches) setDrawer(true)
                return
            }

            const goto = e.target.closest("[data-goto]")
            if (goto) {
                select(goto.dataset.goto, { push: true })
                return
            }

            const image = e.target.closest("[data-image]")
            if (image) {
                openLightbox(Number(image.dataset.image))
                return
            }

            const readmode = e.target.closest("[data-readmode]")
            if (readmode) {
                const on = body.dataset.read !== "on"
                body.dataset.read = on ? "on" : "off"
                readmode.setAttribute("aria-pressed", String(on))
                requestAnimationFrame(() => {
                    network.resize()
                    timeline.resize()
                })
                return
            }

            const copy = e.target.closest("[data-copy]")
            if (copy) {
                const block = copy.closest(".cite__block") || copy.closest(".entry__toolbar")
                const kind = copy.dataset.copy
                if (kind === "url" && !block.classList.contains("cite__block")) copyText(entryUrl(state.selected), copy)
                else copyText(block.querySelector("pre, .cite__text").textContent, copy)
            }
        })
    }

    // ------------------------------------------------------------- lightbox --
    let lightboxIndex = 0

    function openLightbox(index) {
        if (!currentImages.length) return
        lightboxIndex = (index + currentImages.length) % currentImages.length
        els.lightboxImg.src = fullUrl(currentImages[lightboxIndex])
        els.lightboxImg.alt = `Image ${lightboxIndex + 1} of ${currentImages.length}`
        els.lightboxCaption.textContent = `${lightboxIndex + 1} / ${currentImages.length}`
        els.lightbox.hidden = false
        $("lightbox-close").focus()
    }

    function closeLightbox() {
        els.lightbox.hidden = true
        els.lightboxImg.removeAttribute("src")
    }

    function initLightbox() {
        $("lightbox-close").addEventListener("click", closeLightbox)
        $("lightbox-prev").addEventListener("click", () => openLightbox(lightboxIndex - 1))
        $("lightbox-next").addEventListener("click", () => openLightbox(lightboxIndex + 1))
        els.lightbox.addEventListener("click", (e) => {
            if (e.target === els.lightbox) closeLightbox()
        })
        document.addEventListener("keydown", (e) => {
            if (els.lightbox.hidden) return
            if (e.key === "Escape") closeLightbox()
            if (e.key === "ArrowLeft") openLightbox(lightboxIndex - 1)
            if (e.key === "ArrowRight") openLightbox(lightboxIndex + 1)
        })
    }

    // -------------------------------------------------------------- selection --
    function select(key, { push = false, reveal = false } = {}) {
        if (!entries[key]) return
        state.selected = key
        renderEntry(key)
        highlightNavItem(key)
        syncDocumentMeta()
        writeLocation({ push })
        network.invalidate()
        timeline.focusOn(key)
        if (reveal) revealEntry()
    }

    // =========================================================================
    //  Shared canvas plumbing: device-pixel-ratio scaling + on-demand drawing
    // =========================================================================
    function createSurface(canvas, draw) {
        const ctx = canvas.getContext("2d")
        let width = 0
        let height = 0
        let frame = null
        let dirty = false

        function resize() {
            const rect = canvas.getBoundingClientRect()
            if (!rect.width || !rect.height) return false
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const w = Math.round(rect.width * dpr)
            const h = Math.round(rect.height * dpr)
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w
                canvas.height = h
            }
            width = rect.width
            height = rect.height
            // Setting canvas.width resets the transform, so re-apply it every time.
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            return true
        }

        function render() {
            frame = null
            if (!width || !height) {
                if (!resize()) return
            }
            ctx.save()
            draw(ctx, width, height)
            ctx.restore()
            if (dirty) {
                dirty = false
                request()
            }
        }

        function request() {
            if (frame === null) frame = requestAnimationFrame(render)
            else dirty = true
        }

        // The canvas box changes for reasons a window `resize` never sees: switching
        // mobile panes, opening the drawer, entering reading mode, rotating a phone.
        // Observing the element itself covers all of them.
        if (typeof ResizeObserver === "function") {
            new ResizeObserver(() => {
                resize()
                request()
            }).observe(canvas)
        }

        return {
            ctx,
            resize: () => {
                resize()
                request()
            },
            request,
            get width() {
                return width
            },
            get height() {
                return height
            },
        }
    }

    /** Pinch/pan/tap handling shared by both canvases. */
    function attachPointer(canvas, handlers) {
        const pointers = new Map()
        let pinchDist = 0
        let pinchMid = { x: 0, y: 0 }
        let moved = 0

        const local = (e) => {
            const r = canvas.getBoundingClientRect()
            return { x: e.clientX - r.left, y: e.clientY - r.top }
        }

        canvas.addEventListener("pointerdown", (e) => {
            canvas.setPointerCapture(e.pointerId)
            pointers.set(e.pointerId, local(e))
            moved = 0
            if (pointers.size === 1) handlers.down?.(pointers.get(e.pointerId), e)
            if (pointers.size === 2) {
                const [a, b] = [...pointers.values()]
                pinchDist = Math.hypot(a.x - b.x, a.y - b.y)
                pinchMid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
            }
        })

        canvas.addEventListener("pointermove", (e) => {
            const point = local(e)
            const previous = pointers.get(e.pointerId)
            if (previous) {
                moved += Math.hypot(point.x - previous.x, point.y - previous.y)
                pointers.set(e.pointerId, point)
            }

            if (pointers.size === 2 && handlers.pinch) {
                const [a, b] = [...pointers.values()]
                const dist = Math.hypot(a.x - b.x, a.y - b.y)
                const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
                if (pinchDist > 0) handlers.pinch(dist / pinchDist, mid, { x: mid.x - pinchMid.x, y: mid.y - pinchMid.y })
                pinchDist = dist
                pinchMid = mid
                return
            }

            if (pointers.size === 1 && previous) handlers.move?.(point, { x: point.x - previous.x, y: point.y - previous.y }, e)
            else if (!pointers.size) handlers.hover?.(point, e)
        })

        const end = (e) => {
            const point = pointers.get(e.pointerId)
            pointers.delete(e.pointerId)
            if (pointers.size < 2) pinchDist = 0
            if (!pointers.size) handlers.up?.(point, moved, e)
        }
        canvas.addEventListener("pointerup", end)
        canvas.addEventListener("pointercancel", end)
        canvas.addEventListener("pointerleave", (e) => {
            if (!pointers.size) handlers.leave?.(e)
        })
    }

    // =========================================================================
    //  Network view
    // =========================================================================
    const network = (() => {
        let nodes = []
        let links = []
        let camera = { x: 0, y: 0, zoom: 1 }
        let alpha = 0
        let hover = null
        let dragged = null
        let surface = null
        let started = false
        let fitted = false

        const CELL = 300

        function isVisibleView() {
            return state.view === "network" && !document.hidden && (!mqPhone.matches || body.dataset.pane === "canvas") && body.dataset.read !== "on"
        }

        function buildNodes() {
            const radius = Math.min(window.innerWidth, window.innerHeight) * 0.6
            nodes = orderedKeys.map((key, i) => {
                // Golden-angle spiral: a deterministic, evenly spread starting layout.
                const t = i / orderedKeys.length
                const angle = i * 2.399963
                return {
                    id: key,
                    x: Math.cos(angle) * radius * Math.sqrt(t),
                    y: Math.sin(angle) * radius * Math.sqrt(t),
                    vx: 0,
                    vy: 0,
                    r: 4 + Math.min(entries[key].tags.length, 24) * 0.28,
                    tags: entries[key].tags,
                    color: getEraColor(entries[key].tags),
                }
            })
        }

        function buildLinks() {
            const mode = els.netMode.value
            const threshold = Number.parseInt(els.netThreshold.value, 10) || 1
            els.netThresholdOut.textContent = threshold
            links = []

            const relevant = nodes.map((node) => {
                if (mode === "all") return node.tags.filter((t) => !t.startsWith("era_"))
                return node.tags.filter((t) => t.startsWith(mode))
            })

            for (let i = 0; i < nodes.length; i++) {
                const a = relevant[i]
                if (!a.length) continue
                for (let j = i + 1; j < nodes.length; j++) {
                    const b = relevant[j]
                    if (!b.length) continue
                    let strength = 0
                    for (const tag of a) if (b.includes(tag)) strength++
                    if (strength >= threshold) {
                        links.push({
                            source: nodes[i],
                            target: nodes[j],
                            strength,
                            type: mode === "all" ? "all" : mode,
                        })
                    }
                }
            }
            heat(1)
        }

        function heat(value = 0.7) {
            alpha = Math.max(alpha, value)
            start()
        }

        /** Uniform grid keeps repulsion near-linear instead of O(n²). */
        function repel() {
            const grid = new Map()
            for (const node of nodes) {
                const cx = Math.floor(node.x / CELL)
                const cy = Math.floor(node.y / CELL)
                const key = cx + "," + cy
                let bucket = grid.get(key)
                if (!bucket) grid.set(key, (bucket = []))
                bucket.push(node)
            }

            for (const node of nodes) {
                const cx = Math.floor(node.x / CELL)
                const cy = Math.floor(node.y / CELL)
                for (let ox = -1; ox <= 1; ox++) {
                    for (let oy = -1; oy <= 1; oy++) {
                        const bucket = grid.get(cx + ox + "," + (cy + oy))
                        if (!bucket) continue
                        for (const other of bucket) {
                            if (other === node) continue
                            const dx = other.x - node.x
                            const dy = other.y - node.y
                            const d2 = dx * dx + dy * dy
                            if (d2 > CELL * CELL || d2 === 0) continue
                            const dist = Math.sqrt(d2)
                            const force = (2200 / d2) * alpha
                            node.vx -= (dx / dist) * force
                            node.vy -= (dy / dist) * force
                        }
                    }
                }
            }
        }

        function step() {
            repel()

            for (const link of links) {
                const a = link.source
                const b = link.target
                const dx = b.x - a.x
                const dy = b.y - a.y
                const dist = Math.hypot(dx, dy) || 1
                const target = Math.max(50, 150 - link.strength * 20)
                const force = (dist - target) * 0.005 * alpha * (1 + link.strength * 0.5)
                const fx = (dx / dist) * force
                const fy = (dy / dist) * force
                a.vx += fx
                a.vy += fy
                b.vx -= fx
                b.vy -= fy
            }

            for (const node of nodes) {
                node.vx -= node.x * 0.0006 * alpha
                node.vy -= node.y * 0.0006 * alpha
                if (node === dragged) continue
                const max = 12 * alpha
                const speed = Math.hypot(node.vx, node.vy)
                if (speed > max) {
                    node.vx = (node.vx / speed) * max
                    node.vy = (node.vy / speed) * max
                }
                node.vx *= 0.9
                node.vy *= 0.9
                node.x += node.vx
                node.y += node.vy
            }

            alpha *= 0.985
            if (alpha < 0.004) alpha = 0
        }

        function draw(ctx, w, h) {
            ctx.fillStyle = palette["canvas-bg"] || "#000"
            ctx.fillRect(0, 0, w, h)

            const dim = state.visible
            ctx.translate(camera.x, camera.y)
            ctx.scale(camera.zoom, camera.zoom)

            const neighbours = new Set()
            if (state.selected) {
                for (const link of links) {
                    if (link.source.id === state.selected) neighbours.add(link.target.id)
                    else if (link.target.id === state.selected) neighbours.add(link.source.id)
                }
            }

            // links
            for (const link of links) {
                const related = state.selected && (link.source.id === state.selected || link.target.id === state.selected)
                if (state.selected && !related) ctx.globalAlpha = 0.07
                else ctx.globalAlpha = state.selected ? 0.85 : 0.22
                ctx.beginPath()
                ctx.moveTo(link.source.x, link.source.y)
                ctx.lineTo(link.target.x, link.target.y)
                ctx.strokeStyle = related ? palette["canvas-link"] : TAG_COLORS[link.type] || TAG_COLORS.other
                ctx.lineWidth = (related ? 1.6 : 0.6) / camera.zoom
                ctx.stroke()
            }
            ctx.globalAlpha = 1

            const showLabels = els.netLabels.checked
            const fontSize = 11 / camera.zoom

            for (const node of nodes) {
                const isSelected = node.id === state.selected
                const isNeighbour = neighbours.has(node.id)
                const isHover = node === hover
                const filteredOut = dim && !dim.has(node.id)

                let opacity = 0.78
                if (filteredOut) opacity = 0.08
                else if (state.selected) opacity = isSelected || isNeighbour ? 1 : 0.2
                else if (isHover) opacity = 1

                const r = (isSelected ? node.r * 1.5 : node.r) / camera.zoom

                ctx.globalAlpha = opacity
                ctx.beginPath()
                ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
                ctx.fillStyle = node.color
                ctx.fill()

                if (isSelected || isHover) {
                    ctx.strokeStyle = palette["canvas-label"]
                    ctx.lineWidth = (isSelected ? 2.5 : 1.5) / camera.zoom
                    ctx.stroke()
                }

                if (!filteredOut && (showLabels || isHover || isSelected || isNeighbour)) {
                    ctx.globalAlpha = isSelected || isHover ? 1 : Math.min(opacity, 0.85)
                    ctx.fillStyle = palette["canvas-label"]
                    ctx.font = `${isSelected ? 700 : 400} ${fontSize}px ${canvasFont}`
                    ctx.textAlign = "center"
                    ctx.textBaseline = "top"
                    ctx.fillText(entries[node.id].name, node.x, node.y + r + 3 / camera.zoom)
                }
                ctx.globalAlpha = 1
            }
        }

        function loop() {
            if (!isVisibleView()) {
                started = false
                return
            }
            if (alpha > 0) step()
            surface.request()
            if (alpha > 0 || dragged) requestAnimationFrame(loop)
            else started = false
        }

        function start() {
            if (started || !surface || !isVisibleView()) return
            started = true
            requestAnimationFrame(loop)
        }

        function nodeAt(sx, sy) {
            const wx = (sx - camera.x) / camera.zoom
            const wy = (sy - camera.y) / camera.zoom
            const slack = 10 / camera.zoom
            let best = null
            let bestDist = Infinity
            for (const node of nodes) {
                const d = Math.hypot(node.x - wx, node.y - wy)
                if (d < node.r / camera.zoom + slack && d < bestDist) {
                    best = node
                    bestDist = d
                }
            }
            return best
        }

        function zoomAt(factor, sx, sy) {
            const next = Math.max(0.15, Math.min(6, camera.zoom * factor))
            const wx = (sx - camera.x) / camera.zoom
            const wy = (sy - camera.y) / camera.zoom
            camera.zoom = next
            camera.x = sx - wx * next
            camera.y = sy - wy * next
            surface.request()
        }

        function fit() {
            if (!nodes.length || !surface.width) return
            let minX = Infinity
            let minY = Infinity
            let maxX = -Infinity
            let maxY = -Infinity
            const pool = state.visible ? nodes.filter((n) => state.visible.has(n.id)) : nodes
            for (const node of pool.length ? pool : nodes) {
                minX = Math.min(minX, node.x)
                maxX = Math.max(maxX, node.x)
                minY = Math.min(minY, node.y)
                maxY = Math.max(maxY, node.y)
            }
            const pad = 70
            const zoom = Math.max(
                0.15,
                Math.min(3, Math.min((surface.width - pad * 2) / (maxX - minX || 1), (surface.height - pad * 2) / (maxY - minY || 1)))
            )
            camera.zoom = zoom
            camera.x = surface.width / 2 - ((minX + maxX) / 2) * zoom
            camera.y = surface.height / 2 - ((minY + maxY) / 2) * zoom
            surface.request()
        }

        function init() {
            surface = createSurface(els.netCanvas, draw)
            buildNodes()
            buildLinks()

            // Warm the layout up off-screen so the first paint is already readable.
            alpha = 1
            for (let i = 0; i < 120; i++) step()
            alpha = 0.35

            surface.resize()
            camera.x = surface.width / 2
            camera.y = surface.height / 2
            if (surface.width) {
                fit()
                fitted = true
            }

            renderLegend()

            els.netMode.addEventListener("change", () => {
                els.netThreshold.value = els.netMode.value === "all" ? String(DEFAULTS.min) : "1"
                buildLinks()
                writeLocation()
            })
            els.netThreshold.addEventListener("input", () => {
                els.netThresholdOut.textContent = els.netThreshold.value
            })
            els.netThreshold.addEventListener("change", () => {
                buildLinks()
                writeLocation()
            })
            els.netLabels.addEventListener("change", () => surface.request())

            els.netCanvas.addEventListener(
                "wheel",
                (e) => {
                    e.preventDefault()
                    const rect = els.netCanvas.getBoundingClientRect()
                    zoomAt(e.deltaY > 0 ? 0.9 : 1.1, e.clientX - rect.left, e.clientY - rect.top)
                },
                { passive: false }
            )

            document.querySelectorAll("[data-zoom]").forEach((btn) => {
                btn.addEventListener("click", () => {
                    const action = btn.dataset.zoom
                    if (action === "fit") fit()
                    else zoomAt(action === "in" ? 1.25 : 0.8, surface.width / 2, surface.height / 2)
                })
            })

            let panning = false
            attachPointer(els.netCanvas, {
                down(point) {
                    const node = nodeAt(point.x, point.y)
                    if (node) {
                        dragged = node
                        heat(0.35)
                    } else {
                        panning = true
                    }
                },
                move(point, delta) {
                    if (dragged) {
                        dragged.x = (point.x - camera.x) / camera.zoom
                        dragged.y = (point.y - camera.y) / camera.zoom
                        dragged.vx = dragged.vy = 0
                        heat(0.3)
                    } else if (panning) {
                        camera.x += delta.x
                        camera.y += delta.y
                        surface.request()
                    }
                },
                pinch(scale, mid, delta) {
                    camera.x += delta.x
                    camera.y += delta.y
                    zoomAt(scale, mid.x, mid.y)
                },
                up(point, moved) {
                    const wasDragging = dragged
                    dragged = null
                    panning = false
                    if (moved < 6 && point) {
                        const node = wasDragging || nodeAt(point.x, point.y)
                        if (node) select(node.id, { push: true, reveal: mqPhone.matches })
                    }
                    hideTooltip()
                },
                leave: hideTooltip,
            })

            // Hover is mouse-only; pointermove with no buttons down never enters attachPointer.
            els.netCanvas.addEventListener("mousemove", (e) => {
                if (e.buttons) return
                const rect = els.netCanvas.getBoundingClientRect()
                const node = nodeAt(e.clientX - rect.left, e.clientY - rect.top)
                if (node !== hover) {
                    hover = node
                    surface.request()
                }
                if (node) {
                    els.netTooltip.hidden = false
                    els.netTooltip.textContent = entries[node.id].name
                    const tw = els.netTooltip.offsetWidth
                    els.netTooltip.style.left = `${Math.min(e.clientX + 14, window.innerWidth - tw - 10)}px`
                    els.netTooltip.style.top = `${e.clientY + 16}px`
                    els.netCanvas.style.cursor = "pointer"
                } else {
                    els.netTooltip.hidden = true
                    els.netCanvas.style.cursor = "grab"
                }
            })
        }

        function hideTooltip() {
            els.netTooltip.hidden = true
            if (hover) {
                hover = null
                surface?.request()
            }
        }

        function renderLegend() {
            els.netLegend.innerHTML = Object.entries(ERA_LABELS)
                .map(
                    ([key, label]) =>
                        `<span class="legend__item"><span class="legend__dot" style="background:${ERA_COLORS[key]}"></span>${label}</span>`
                )
                .join("")
        }

        return {
            init,
            resize() {
                surface?.resize()
            },
            invalidate() {
                surface?.request()
            },
            activate() {
                surface?.resize()
                if (!fitted && surface?.width) {
                    fit()
                    fitted = true
                }
                start()
            },
            fit,
        }
    })()

    // =========================================================================
    //  Timeline view
    //  -----------------------------------------------------------------------
    //  Time runs top-to-bottom on a logarithmic "years ago" scale, so the
    //  crowded recent centuries get as much room as the sparse ancient ones.
    //  Below the "today" line sits the fictional band: a hatched strip holding
    //  the invented orders that never had a date, scattered beyond history.
    //  Each entry keeps one fixed horizontal position for the life of the page,
    //  so the lines of influence stay readable; names are then placed against a
    //  collision map (right of the dot, or left when there is no room) and the
    //  ones that cannot fit are left as dots until you zoom in.
    // =========================================================================
    const timeline = (() => {
        const UNIT = 100 // world px per natural-log unit, at zoom 1
        const BAND_GAP = 26 // world px between "today" and the fictional band
        const BAND_H = 220 // world px of fictional band
        const PAD_TOP = 40 // world px of air above the oldest entry
        const PAD_BOTTOM = 110 // ...and below the band, so the overlays sit on empty canvas
        const MAX_ZOOM = 60
        const HIT = 16 // px radius for hit-testing a marker
        const START_ZOOM = 2.4 // opening zoom, as a multiple of fit-the-whole-scale
        const MIN_LABEL = 54 // px: narrower than this and a name is not worth drawing

        let items = []
        let linksT = []
        let surface = null
        let camera = { y: 0, zoom: 1, ready: false }
        let hover = null
        let maxLog = 0
        let wyPresent = 0
        let bandTop = 0
        let bandBottom = 0
        let worldTop = 0
        let worldH = 1
        let ticks = []
        let hatch = null
        let hatchKey = ""
        let metrics = new Map()
        let metricsFont = ""
        let labelRows = new Map()
        let railDrag = null
        let hintFaded = false

        const SOFTEN = 8 // years added before taking the log, to tame the present
        const yearsAgoOf = (year) => Math.max(1, PRESENT - year + SOFTEN)
        const wyOfYear = (year) => (maxLog - Math.log(yearsAgoOf(year))) * UNIT

        function isVisibleView() {
            return state.view === "timeline" && !document.hidden && (!mqPhone.matches || body.dataset.pane === "canvas") && body.dataset.read !== "on"
        }

        /** #rgb / #rrggbb -> rgba() with the given alpha. */
        function withAlpha(hex, alpha) {
            const h = String(hex || "").trim().replace("#", "")
            const full = h.length === 3 ? h.replace(/./g, (c) => c + c) : h
            const n = Number.parseInt(full.slice(0, 6) || "888888", 16)
            return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
        }

        const hashOf = (text) => {
            let h = 0
            for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0
            return Math.abs(h)
        }

        // ------------------------------------------------------------- layout --
        /** Everything that depends on how wide the canvas currently is. */
        function geom(w) {
            const phone = w < 620
            const tight = w < 440
            const gutter = phone ? 48 : 64
            const rail = tight ? 26 : 48
            const left = gutter + 10
            const right = Math.max(left + 60, w - rail - 6)
            return {
                phone,
                tight,
                gutter,
                rail,
                left,
                right,
                span: right - left,
                rowH: phone ? 14 : 15,
                font: phone ? 10.5 : 11.5,
                labelMax: phone ? 132 : 194,
                tickGap: phone ? 26 : 30,
            }
        }

        // --------------------------------------------------------------- data --
        function build() {
            const dated = []
            const undated = []
            for (const key of orderedKeys) {
                const start = entries[key].startDate
                ;(start === null || start === undefined ? undated : dated).push(key)
            }
            if (!dated.length) return

            maxLog = Math.log(Math.max(...dated.map((k) => yearsAgoOf(entries[k].startDate))))
            wyPresent = wyOfYear(PRESENT)
            bandTop = wyPresent + BAND_GAP
            bandBottom = bandTop + BAND_H
            worldTop = -PAD_TOP
            worldH = bandBottom + PAD_BOTTOM - worldTop

            // Golden-angle jitter over the entry order: a fixed, evenly spread
            // column per entry, stable across reloads and across zoom levels.
            const order = new Map(orderedKeys.map((key, i) => [key, i]))
            const columnOf = (key) => 0.045 + ((order.get(key) * 0.6180339887) % 1) * 0.91

            items = []
            for (const key of dated) {
                const e = entries[key]
                items.push({
                    key,
                    band: false,
                    fictional: getEraTag(e.tags) === "era_fictional",
                    wy: wyOfYear(e.startDate),
                    color: getEraColor(e.tags),
                    x: columnOf(key),
                    sx: 0,
                    sy: 0,
                    label: null,
                    side: 1,
                    live: false,
                    dimmed: false,
                })
            }

            // Everything without a start date — the invented orders, plus the
            // entries still waiting on a tags.js record. Scatter them through the
            // band instead of stacking them on one arbitrary line past the present.
            undated.sort()
            undated.forEach((key, i) => {
                const t = undated.length > 1 ? i / (undated.length - 1) : 0.5
                const wobble = ((hashOf(key) % 100) / 100 - 0.5) * 18
                items.push({
                    key,
                    band: true,
                    fictional: getEraTag(entries[key].tags) === "era_fictional",
                    wy: bandTop + 30 + t * (BAND_H - 62) + wobble,
                    color: getEraColor(entries[key].tags),
                    x: columnOf(key),
                    sx: 0,
                    sy: 0,
                    label: null,
                    side: 1,
                    live: false,
                    dimmed: false,
                })
            })

            items.sort((a, b) => a.wy - b.wy)

            const byKey = new Map(items.map((n) => [n.key, n]))
            linksT = []
            for (const item of items) {
                for (const parent of entries[item.key].inspiredBy) {
                    const target = byKey.get(parent)
                    if (target) linksT.push({ source: item, target })
                }
            }

            buildTicks()
        }

        /** Candidate year gridlines, ordered by importance; culled per frame. */
        function buildTicks() {
            const seen = new Set()
            ticks = []
            const push = (year, level) => {
                if (year > PRESENT || seen.has(year)) return
                seen.add(year)
                ticks.push({ year, level })
            }
            push(PRESENT, 0)
            push(0, 0)
            for (let y = -6000; y <= 2000; y += 1000) push(y, 1)
            for (let y = -6000; y <= 2000; y += 500) push(y, 2)
            for (let y = -2000; y <= 2100; y += 100) push(y, 3)
            for (let y = 1000; y <= 2100; y += 50) push(y, 4)
            for (let y = 1600; y <= 2100; y += 10) push(y, 5)
            for (let y = 1900; y <= 2100; y += 5) push(y, 6)
            for (let y = 1960; y <= PRESENT; y += 1) push(y, 7)
            ticks.sort((a, b) => a.level - b.level || a.year - b.year)
        }

        const tickLabel = (year) =>
            year === PRESENT ? "today" : year < 0 ? `${-year} BCE` : year === 0 ? "0" : year < 1000 ? `${year} CE` : String(year)

        // ------------------------------------------------------------- camera --
        const fitZoom = (h) => (h > 0 ? h / worldH : 1)

        function clampCamera(h) {
            const span = worldH * camera.zoom
            const min = worldTop * camera.zoom
            camera.y = span <= h ? min - (h - span) / 2 : Math.max(min, Math.min(min + span - h, camera.y))
        }

        function zoomAt(factor, anchorY) {
            const h = surface?.height || 0
            if (!h) return
            const next = Math.max(fitZoom(h), Math.min(MAX_ZOOM, camera.zoom * factor))
            if (Math.abs(next - camera.zoom) < 1e-6) return
            const world = (camera.y + anchorY) / camera.zoom
            camera.zoom = next
            camera.y = world * next - anchorY
            clampCamera(h)
            surface.request()
        }

        /** Fit the whole scale, oldest to fiction, into the viewport. */
        function resetView(h) {
            camera.zoom = fitZoom(h)
            camera.y = worldTop * camera.zoom
            clampCamera(h)
        }

        /** The opening view: zoomed in enough to read, parked at the oldest end. */
        function openingView(h) {
            camera.zoom = Math.min(MAX_ZOOM, fitZoom(h) * START_ZOOM)
            camera.y = worldTop * camera.zoom
            clampCamera(h)
        }

        // --------------------------------------------------------------- text --
        function widthOf(ctx, text) {
            let width = metrics.get(text)
            if (width === undefined) {
                width = ctx.measureText(text).width
                metrics.set(text, width)
            }
            return width
        }

        /** The longest prefix of `text` that fits `max`, ellipsised if trimmed. */
        function fitLabel(ctx, text, max) {
            if (widthOf(ctx, text) <= max) return text
            let n = Math.max(1, Math.floor((text.length * max) / widthOf(ctx, text)))
            while (n > 1 && widthOf(ctx, text.slice(0, n) + "…") > max) n--
            while (n < text.length - 1 && widthOf(ctx, text.slice(0, n + 1) + "…") <= max) n++
            return text.slice(0, n) + "…"
        }

        function getHatch(color) {
            if (hatch && hatchKey === color) return hatch
            const size = 9
            const tile = document.createElement("canvas")
            tile.width = size
            tile.height = size
            const tx = tile.getContext("2d")
            tx.strokeStyle = color
            tx.lineWidth = 1
            tx.beginPath()
            tx.moveTo(-1, size + 1)
            tx.lineTo(size + 1, -1)
            tx.moveTo(-1, 1)
            tx.lineTo(1, -1)
            tx.moveTo(size - 1, size + 1)
            tx.lineTo(size + 1, size - 1)
            tx.stroke()
            hatch = tx.createPattern(tile, "repeat")
            hatchKey = color
            return hatch
        }

        // --------------------------------------------------------------- draw --
        function draw(ctx, w, h) {
            const g = geom(w)
            // Keep the DOM overlays (ruler width, legend size) in step with the
            // canvas geometry rather than with the viewport width.
            els.tlView.classList.toggle("is-narrow", g.phone)
            els.tlView.classList.toggle("is-tight", g.tight)
            if (!camera.ready && h > 0) {
                openingView(h)
                camera.ready = true
            }
            clampCamera(h)

            const font = `${g.font}px ${canvasFont}`
            if (font !== metricsFont) {
                metrics = new Map()
                metricsFont = font
            }

            const bg = palette["canvas-bg"] || "#08080b"
            const grid = palette["canvas-grid"] || "#2a2a33"
            const axis = palette["canvas-axis"] || "#7b7688"
            const ink = palette["canvas-label"] || "#d8d6de"
            const accent = palette["accent"] || "#bb86fc"
            const band = palette["canvas-band"] || "#16131f"

            ctx.fillStyle = bg
            ctx.fillRect(0, 0, w, h)
            ctx.textBaseline = "middle"
            ctx.lineCap = "butt"

            const sy = (wy) => wy * camera.zoom - camera.y

            // ---- fictional band ----
            const bandY = sy(bandTop)
            const bandY2 = sy(bandBottom)
            if (bandY2 > -40 && bandY < h + 40) {
                const top = Math.max(-2, bandY)
                const bottom = Math.min(h + 2, bandY2)
                ctx.fillStyle = band
                ctx.fillRect(0, top, w, bottom - top)
                ctx.save()
                ctx.fillStyle = getHatch(withAlpha(axis, 0.3))
                ctx.fillRect(0, top, w, bottom - top)
                ctx.restore()
                for (const y of [bandY, bandY2]) {
                    if (y < -2 || y > h + 2) continue
                    ctx.save()
                    ctx.setLineDash([4, 4])
                    ctx.strokeStyle = withAlpha(axis, 0.7)
                    ctx.lineWidth = 1
                    ctx.beginPath()
                    ctx.moveTo(0, y)
                    ctx.lineTo(w, y)
                    ctx.stroke()
                    ctx.restore()
                }
                if (bandY > -30 && bandY < h - 6) {
                    ctx.font = `600 ${g.phone ? 9 : 9.5}px ${canvasFont}`
                    ctx.textAlign = "left"
                    ctx.fillStyle = axis
                    ctx.fillText(g.phone ? "UNDATED" : "BEYOND THE SCALE — UNDATED & FICTIONAL", g.gutter + 9, bandY + 12)
                }
            }

            // ---- year gridlines (importance-ordered, spaced out) ----
            const accepted = []
            for (const tick of ticks) {
                const y = sy(wyOfYear(tick.year))
                if (y < 12 || y > h - 6) continue
                let clear = true
                for (const other of accepted) {
                    if (Math.abs(other.y - y) < g.tickGap) {
                        clear = false
                        break
                    }
                }
                if (clear) accepted.push({ ...tick, y })
            }

            for (const tick of accepted) {
                const major = tick.level <= 1 || tick.year === PRESENT
                const today = tick.year === PRESENT
                ctx.strokeStyle = today ? withAlpha(accent, 0.75) : major ? grid : withAlpha(grid, 0.55)
                ctx.lineWidth = today ? 1.4 : 1
                ctx.beginPath()
                ctx.moveTo(today ? 0 : g.gutter, tick.y)
                ctx.lineTo(w - g.rail, tick.y)
                ctx.stroke()
            }

            // ---- who is on screen, and what is in focus ----
            const dim = state.visible
            const related = new Set()
            if (state.selected) {
                related.add(state.selected)
                for (const link of linksT) {
                    if (link.source.key === state.selected) related.add(link.target.key)
                    if (link.target.key === state.selected) related.add(link.source.key)
                }
            }

            const live = []
            const margin = 260
            for (const item of items) {
                item.sx = g.left + item.x * g.span
                item.sy = sy(item.wy)
                item.label = null
                item.live = item.sy > -margin && item.sy < h + margin
                if (!item.live) continue
                item.dimmed = !!(dim && !dim.has(item.key))
                live.push(item)
            }

            // ---- name placement against a collision map ----
            // Columns are fixed, so a name can only be fitted where nothing else
            // has already been drawn. Rows are bucketed by height, which keeps
            // the overlap test to a handful of comparisons per entry.
            labelRows.clear()
            const claim = (box) => {
                for (let row = Math.floor(box.y0 / g.rowH); row <= Math.floor(box.y1 / g.rowH); row++) {
                    let bucket = labelRows.get(row)
                    if (!bucket) labelRows.set(row, (bucket = []))
                    bucket.push(box)
                }
            }
            const isFree = (box) => {
                for (let row = Math.floor(box.y0 / g.rowH); row <= Math.floor(box.y1 / g.rowH); row++) {
                    const bucket = labelRows.get(row)
                    if (!bucket) continue
                    for (const other of bucket) {
                        if (box.y0 < other.y1 && other.y0 < box.y1 && box.x0 < other.x1 && other.x0 < box.x1) return false
                    }
                }
                return true
            }

            // The floating overlays are part of the collision map too, so names
            // are never tucked under the era key, the hint or the zoom buttons.
            const canvasBox = els.tlCanvas.getBoundingClientRect()
            for (const el of [els.tlLegend, els.tlHint, els.tlZoom]) {
                if (!el || el.hidden || !el.offsetWidth || Number(getComputedStyle(el).opacity) < 0.05) continue
                const box = el.getBoundingClientRect()
                claim({
                    x0: box.left - canvasBox.left - 4,
                    x1: box.right - canvasBox.left + 4,
                    y0: box.top - canvasBox.top - 3,
                    y1: box.bottom - canvasBox.top + 3,
                })
            }

            ctx.textAlign = "left"
            ctx.lineJoin = "round"

            /** Try right of the dot, then left; give up rather than overlap. */
            function placeLabel(item, forced) {
                const strong = item.key === state.selected || item === hover
                ctx.font = `${strong ? 700 : 400} ${font}`
                const name = entries[item.key].name
                const cap = strong ? g.labelMax + 40 : g.labelMax
                const sides = [
                    { dir: 1, room: g.right - item.sx - 9 },
                    { dir: -1, room: item.sx - 9 - g.left + 4 },
                ]
                for (const { dir, room } of sides) {
                    if (room < MIN_LABEL && !forced) continue
                    const text = fitLabel(ctx, name, Math.max(MIN_LABEL, Math.min(cap, room)))
                    const width = widthOf(ctx, text)
                    const x0 = dir > 0 ? item.sx + 7 : item.sx - 9 - width
                    const box = { x0, x1: x0 + width + 2, y0: item.sy - g.rowH / 2, y1: item.sy + g.rowH / 2 }
                    if (!forced && !isFree(box)) continue
                    claim(box)
                    item.label = text
                    item.side = dir
                    return true
                }
                return false
            }

            // The selected entry, its lineage and whatever is under the cursor
            // get first refusal on the space around them.
            for (const item of live) if (related.has(item.key) || item === hover) placeLabel(item, false)
            for (const item of live) if (!item.label && !item.dimmed) placeLabel(item, false)
            for (const item of live) {
                if (!item.label && (item.key === state.selected || item === hover)) placeLabel(item, true)
            }

            // ---- lines of influence ----
            for (const link of linksT) {
                if (!link.source.live && !link.target.live) continue
                const active = state.selected && (link.source.key === state.selected || link.target.key === state.selected)
                ctx.globalAlpha = active ? 0.92 : state.selected ? 0.07 : 0.2
                ctx.strokeStyle = active ? palette["canvas-link"] : axis
                ctx.lineWidth = active ? 1.8 : 1
                const sx1 = link.source.sx
                const sy1 = link.source.sy
                const tx = link.target.sx
                const ty = link.target.sy
                ctx.beginPath()
                ctx.moveTo(sx1, sy1)
                ctx.bezierCurveTo(sx1, (sy1 + ty) / 2, tx, (sy1 + ty) / 2, tx, ty)
                ctx.stroke()
            }
            ctx.globalAlpha = 1

            // ---- markers ----
            for (const item of live) {
                if (item.sy < -20 || item.sy > h + 20) continue
                const selected = item.key === state.selected
                const hovered = item === hover
                let alpha = item.label ? 0.95 : 0.6
                if (item.dimmed) alpha = 0.09
                else if (state.selected) alpha = related.has(item.key) ? 1 : item.label ? 0.5 : 0.34

                const r = selected ? 7.5 : hovered ? 6.5 : item.label ? 4.6 : 3.4

                ctx.globalAlpha = alpha
                ctx.fillStyle = item.color
                ctx.beginPath()
                if (item.fictional) {
                    // Invented orders get a diamond so they read apart from history.
                    ctx.moveTo(item.sx, item.sy - r * 1.15)
                    ctx.lineTo(item.sx + r * 1.15, item.sy)
                    ctx.lineTo(item.sx, item.sy + r * 1.15)
                    ctx.lineTo(item.sx - r * 1.15, item.sy)
                    ctx.closePath()
                } else {
                    ctx.arc(item.sx, item.sy, r, 0, Math.PI * 2)
                }
                ctx.fill()
                if (selected || hovered) {
                    ctx.strokeStyle = selected ? ink : withAlpha(ink, 0.6)
                    ctx.lineWidth = selected ? 2 : 1.4
                    ctx.stroke()
                }
                ctx.globalAlpha = 1
            }

            // ---- labels, haloed so they stay readable over the grid ----
            const drawLabel = (item) => {
                const selected = item.key === state.selected
                const strong = selected || item === hover
                ctx.font = `${strong ? 700 : 400} ${font}`
                ctx.textAlign = item.side > 0 ? "left" : "right"
                const x = item.sx + item.side * (selected ? 12 : 9)
                ctx.globalAlpha = item.dimmed ? 0.2 : state.selected && !related.has(item.key) ? 0.62 : 1
                ctx.strokeStyle = bg
                ctx.lineWidth = 3.2
                ctx.strokeText(item.label, x, item.sy)
                ctx.fillStyle = selected ? accent : ink
                ctx.fillText(item.label, x, item.sy)
                ctx.globalAlpha = 1
            }
            for (const item of live) if (item.label && item.key !== state.selected && item !== hover) drawLabel(item)
            for (const item of live) if (item.label && (item.key === state.selected || item === hover)) drawLabel(item)

            // ---- left gutter: year scale on top of everything ----
            const fade = ctx.createLinearGradient(0, 0, g.gutter + 12, 0)
            fade.addColorStop(0, withAlpha(bg, 0.97))
            fade.addColorStop(0.75, withAlpha(bg, 0.94))
            fade.addColorStop(1, withAlpha(bg, 0))
            ctx.fillStyle = fade
            ctx.fillRect(0, 0, g.gutter + 12, h)

            ctx.strokeStyle = withAlpha(axis, 0.45)
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(g.gutter, 0)
            ctx.lineTo(g.gutter, h)
            ctx.stroke()

            ctx.textAlign = "right"
            for (const tick of accepted) {
                const today = tick.year === PRESENT
                ctx.font = `${today || tick.level <= 1 ? 600 : 400} ${g.phone ? 9.5 : 10.5}px ${canvasFont}`
                ctx.fillStyle = today ? accent : tick.level <= 2 ? axis : withAlpha(axis, 0.75)
                ctx.fillText(tickLabel(tick.year), g.gutter - 7, tick.y)
                ctx.strokeStyle = today ? accent : withAlpha(axis, 0.6)
                ctx.beginPath()
                ctx.moveTo(g.gutter - 4, tick.y)
                ctx.lineTo(g.gutter, tick.y)
                ctx.stroke()
            }

            syncRail(h)
        }

        // --------------------------------------------------------------- rail --
        function railGeometry() {
            const rect = els.tlRail.getBoundingClientRect()
            return { top: rect.top, height: rect.height || 1 }
        }

        function syncRail(h) {
            if (!els.tlThumb) return
            const railH = els.tlRail.clientHeight || 1
            const topFrac = Math.max(0, Math.min(1, (camera.y / camera.zoom - worldTop) / worldH))
            const sizeFrac = Math.max(0.02, Math.min(1, h / camera.zoom / worldH))
            const thumbH = Math.max(26, sizeFrac * railH)
            const thumbTop = Math.min(railH - thumbH, topFrac * railH)
            els.tlThumb.style.height = `${thumbH}px`
            els.tlThumb.style.transform = `translateY(${Math.max(0, thumbTop)}px)`
            els.tlRail.setAttribute("aria-valuenow", String(Math.round(topFrac * 100)))
        }

        /** Put the world fraction `frac` at the top of the viewport. */
        function scrollToFraction(frac) {
            camera.y = (worldTop + Math.max(0, Math.min(1, frac)) * worldH) * camera.zoom
            clampCamera(surface?.height || 0)
            surface?.request()
        }

        function buildRailTicks() {
            const marks = [
                { year: -4000, minor: false },
                { year: -2000, minor: true },
                { year: -500, minor: true },
                { year: 0, minor: false },
                { year: 1000, minor: true },
                { year: 1500, minor: false },
                { year: 1800, minor: true },
                { year: 1900, minor: false },
                { year: 1960, minor: true },
                { year: 2000, minor: false },
            ]
            const frag = document.createDocumentFragment()
            const add = (label, wy, cls) => {
                const el = document.createElement("span")
                el.className = `timerail__tick${cls}`
                el.style.top = `${(((wy - worldTop) / worldH) * 100).toFixed(3)}%`
                el.innerHTML = `<b>${label}</b>`
                frag.appendChild(el)
            }
            for (const mark of marks) {
                if (mark.year > PRESENT) continue
                add(mark.year < 0 ? `${-mark.year} BC` : String(mark.year), wyOfYear(mark.year), mark.minor ? " is-minor" : "")
            }
            add("today", wyPresent, " is-now")
            add("fiction", (bandTop + bandBottom) / 2, " is-fiction")
            els.tlRail.appendChild(frag)
        }

        function initRail() {
            buildRailTicks()

            function move(e) {
                if (!railDrag) return
                const rail = railGeometry()
                scrollToFraction((e.clientY - rail.top - railDrag.grab) / rail.height)
            }
            function end() {
                railDrag = null
                els.tlRail.classList.remove("is-dragging")
            }

            els.tlThumb.addEventListener("pointerdown", (e) => {
                e.preventDefault()
                e.stopPropagation()
                els.tlThumb.setPointerCapture(e.pointerId)
                railDrag = { grab: e.clientY - els.tlThumb.getBoundingClientRect().top }
                els.tlRail.classList.add("is-dragging")
            })
            els.tlThumb.addEventListener("pointermove", move)
            els.tlThumb.addEventListener("pointerup", end)
            els.tlThumb.addEventListener("pointercancel", end)

            // A press on the track centres the view there, then keeps following.
            els.tlRail.addEventListener("pointerdown", (e) => {
                if (e.target === els.tlThumb) return
                els.tlRail.setPointerCapture(e.pointerId)
                railDrag = { grab: els.tlThumb.offsetHeight / 2 }
                els.tlRail.classList.add("is-dragging")
                move(e)
            })
            els.tlRail.addEventListener("pointermove", move)
            els.tlRail.addEventListener("pointerup", end)
            els.tlRail.addEventListener("pointercancel", end)

            els.tlRail.addEventListener("keydown", (e) => {
                const h = surface?.height || 0
                const step = h * 0.12
                const map = {
                    ArrowDown: step,
                    ArrowUp: -step,
                    PageDown: h * 0.85,
                    PageUp: -h * 0.85,
                }
                if (e.key in map) {
                    e.preventDefault()
                    camera.y += map[e.key]
                    clampCamera(h)
                    surface?.request()
                } else if (e.key === "Home" || e.key === "End") {
                    e.preventDefault()
                    scrollToFraction(e.key === "Home" ? 0 : 1)
                }
            })

            els.tlRail.addEventListener(
                "wheel",
                (e) => {
                    e.preventDefault()
                    camera.y += normaliseDelta(e.deltaY, e.deltaMode)
                    clampCamera(surface?.height || 0)
                    surface?.request()
                },
                { passive: false }
            )
        }

        const normaliseDelta = (delta, mode) => delta * (mode === 1 ? 16 : mode === 2 ? 400 : 1)

        // ------------------------------------------------------------ hit test --
        function itemAt(px, py) {
            let best = null
            let bestDist = HIT
            for (const item of items) {
                if (!item.live) continue
                const d = Math.hypot(item.sx - px, item.sy - py)
                if (d < bestDist) {
                    best = item
                    bestDist = d
                }
            }
            return best
        }

        function fadeHint() {
            if (hintFaded || !els.tlHint) return
            hintFaded = true
            els.tlHint.classList.add("is-faded")
            // Redraw once it is gone so names can reclaim the space it held.
            setTimeout(() => surface?.request(), 700)
        }

        function showTooltip(item, e) {
            const entry = entries[item.key]
            const span = item.band
                ? item.fictional
                    ? "Fictional · undated"
                    : "Undated"
                : formatSpan(entry.startDate, entry.endDate) || "—"
            els.tlTooltip.innerHTML = `<strong>${escapeHtml(entry.name)}</strong><span>${escapeHtml(span)}</span>`
            els.tlTooltip.hidden = false
            const tw = els.tlTooltip.offsetWidth
            els.tlTooltip.style.left = `${Math.max(8, Math.min(e.clientX + 14, window.innerWidth - tw - 10))}px`
            els.tlTooltip.style.top = `${e.clientY + 18}px`
        }

        // --------------------------------------------------------------- init --
        function init() {
            surface = createSurface(els.tlCanvas, draw)
            build()
            initRail()

            els.tlCanvas.addEventListener(
                "wheel",
                (e) => {
                    e.preventDefault()
                    fadeHint()
                    const dy = normaliseDelta(e.deltaY, e.deltaMode)
                    // Only a deliberate pinch (which arrives as ctrl+wheel) zooms;
                    // a plain wheel scrolls through time, as a wheel should.
                    if (e.ctrlKey) {
                        const rect = els.tlCanvas.getBoundingClientRect()
                        zoomAt(Math.exp(-dy * 0.0022), e.clientY - rect.top)
                    } else {
                        camera.y += dy
                        clampCamera(surface.height)
                        surface.request()
                    }
                },
                { passive: false }
            )

            document.querySelectorAll("[data-tzoom]").forEach((btn) => {
                btn.addEventListener("click", () => {
                    const action = btn.dataset.tzoom
                    fadeHint()
                    if (action === "reset") {
                        resetView(surface.height)
                        surface.request()
                    } else zoomAt(action === "in" ? 1.45 : 1 / 1.45, surface.height / 2)
                })
            })

            let panning = false
            attachPointer(els.tlCanvas, {
                down() {
                    panning = true
                    els.tlTooltip.hidden = true
                },
                move(point, delta) {
                    if (!panning) return
                    fadeHint()
                    camera.y -= delta.y
                    clampCamera(surface.height)
                    surface.request()
                },
                pinch(scale, mid, delta) {
                    fadeHint()
                    camera.y -= delta.y
                    zoomAt(scale, mid.y)
                },
                up(point, moved) {
                    panning = false
                    if (moved < 8 && point) {
                        const item = itemAt(point.x, point.y)
                        if (item) select(item.key, { push: true, reveal: mqPhone.matches })
                    }
                },
            })

            els.tlCanvas.addEventListener("mousemove", (e) => {
                if (e.buttons) return
                const rect = els.tlCanvas.getBoundingClientRect()
                const item = itemAt(e.clientX - rect.left, e.clientY - rect.top)
                if (item !== hover) {
                    hover = item
                    surface.request()
                }
                if (item) showTooltip(item, e)
                else els.tlTooltip.hidden = true
                els.tlCanvas.style.cursor = item ? "pointer" : "grab"
            })

            els.tlCanvas.addEventListener("pointerleave", () => {
                els.tlTooltip.hidden = true
                if (hover) {
                    hover = null
                    surface.request()
                }
            })

            setTimeout(fadeHint, 9000)

            els.tlLegend.innerHTML = Object.entries(ERA_LABELS)
                .map(([key, label]) => `<span class="legend__item"><span class="legend__dot" style="background:${ERA_COLORS[key]}"></span>${label}</span>`)
                .join("")
        }

        /** Scroll the selected entry into view, if it is not comfortably in it. */
        function focusOn(key) {
            if (!surface || !items.length) return
            const item = items.find((n) => n.key === key)
            if (!item) return surface.request()
            const h = surface.height
            if (isVisibleView() && h) {
                const y = item.wy * camera.zoom - camera.y
                const edge = Math.min(120, h * 0.2)
                if (y < edge || y > h - edge) {
                    camera.y = item.wy * camera.zoom - h / 2
                    clampCamera(h)
                }
            }
            surface.request()
        }

        return {
            init,
            resize() {
                surface?.resize()
            },
            invalidate() {
                surface?.request()
            },
            activate() {
                surface?.resize()
                if (!camera.ready && surface?.height) {
                    openingView(surface.height)
                    camera.ready = true
                }
                if (state.selected) focusOn(state.selected)
                surface?.request()
            },
            focusOn,
        }
    })()

    // ----------------------------------------------------------------- views --
    function setView(view, { push = false } = {}) {
        state.view = view
        document.querySelectorAll(".viewtab").forEach((btn) => {
            const on = btn.dataset.view === view
            btn.classList.toggle("is-active", on)
            btn.setAttribute("aria-pressed", String(on))
        })
        $("view-network").classList.toggle("view--active", view === "network")
        $("view-timeline").classList.toggle("view--active", view === "timeline")
        if (mqPhone.matches) setPane("canvas")
        els.netTooltip.hidden = true
        els.tlTooltip.hidden = true
        requestAnimationFrame(() => (view === "network" ? network.activate() : timeline.activate()))
        writeLocation({ push })
    }

    // ------------------------------------------------------------------ boot --
    function init() {
        if (!buildData()) {
            els.detail.innerHTML = '<p class="empty-state">The database could not be loaded.</p>'
            return
        }

        readCanvasPalette()
        initLayout()
        initIndex()
        initEntryDelegation()
        initLightbox()

        const initial = readLocation()
        if (initial.mode) els.netMode.value = initial.mode
        els.netThreshold.value = String(initial.min)
        els.netThresholdOut.textContent = String(initial.min)

        network.init()
        timeline.init()

        document.querySelectorAll(".viewtab").forEach((btn) => {
            btn.addEventListener("click", () => setView(btn.dataset.view, { push: false }))
        })

        setView(initial.view)

        if (initial.key) {
            select(initial.key)
            if (!mqPhone.matches && mqDrawer.matches) setDrawer(false)
        } else {
            syncDocumentMeta()
        }

        window.addEventListener("popstate", () => {
            const next = readLocation()
            if (next.view !== state.view) setView(next.view)
            if (next.key && next.key !== state.selected) select(next.key)
        })

        window.addEventListener(
            "resize",
            debounce(() => {
                network.resize()
                timeline.resize()
            }, 120)
        )

        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) (state.view === "network" ? network : timeline).activate()
        })

        // Keyboard: "/" focuses search, arrows walk the index.
        document.addEventListener("keydown", (e) => {
            const typing = /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)
            if (e.key === "/" && !typing) {
                e.preventDefault()
                if (mqPhone.matches) setPane("index")
                else if (mqDrawer.matches) setDrawer(true)
                els.search.focus()
            }
            if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !typing && state.selected) {
                const keys = state.visible ? orderedKeys.filter((k) => state.visible.has(k)) : orderedKeys
                const i = keys.indexOf(state.selected)
                if (i === -1) return
                const next = keys[i + (e.key === "ArrowDown" ? 1 : -1)]
                if (next) {
                    e.preventDefault()
                    select(next)
                }
            }
        })
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init)
    else init()
})()
