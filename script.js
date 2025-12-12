const navList = document.getElementById("nav-list")
const detailContainer = document.getElementById("detail-container")
// const exploreList = document.getElementById("explore-list") // Removed
const searchInput = document.getElementById("search-input")
const tagFilter = document.getElementById("tag-filter")
const activeTagsContainer = document.getElementById("active-tags")

let manifestData = {}
let allTags = new Set()
let selectedTags = new Set()
let selectedNodeId = null // Track selected node for highlighting
let nodes = []
let links = []
let networkInitialized = false
let networkSimulation = null
let camera = { x: 0, y: 0, zoom: 1 } // Global camera state

const TAG_COLORS = {
    aesthetic: "#ff4081", // Pink
    location: "#7c4dff", // Purple
    practice: "#00e676", // Green
    era: "#ffab00", // Amber
    nature: "#2979ff", // Blue (reusing source color for nature)
    other: "#9e9e9e", // Grey
    all: "#9b59b6", // Purple for all tags mode
}

const ERA_COLORS = {
    era_ancient: "#FF3333", // Red
    era_medieval: "#FF8833", // Orange
    era_preindustrial: "#FFDD33", // Golden
    era_industrial: "#BBDD33", // Yellow-Green
    era_modern: "#33DD88", // Teal-ish
    era_digital: "#3388FF", // Blue
    era_fictional: "#9e9e9e", // Grey
}

function getEraColor(tags) {
    const eraTag = tags.find((t) => t.startsWith("era_"))
    if (eraTag && ERA_COLORS[eraTag]) {
        return ERA_COLORS[eraTag]
    }
    if (eraTag) {
        // Generate color for unknown era
        let hash = 0
        for (let i = 0; i < eraTag.length; i++) {
            hash = eraTag.charCodeAt(i) + ((hash << 5) - hash)
        }
        const c = (hash & 0x00ffffff).toString(16).toUpperCase()
        return "#" + "00000".substring(0, 6 - c.length) + c
    }
    return "#bb86fc" // Default
}

// --- Helper Functions ---
function formatKey(key) {
    return key.replace(/_/g, " ")
}

function getTagInfo(tag) {
    let type = "other"
    let label = tag

    if (tag.startsWith("aesthetic_")) {
        type = "aesthetic"
        label = tag.replace("aesthetic_", "")
    } else if (tag.startsWith("location_")) {
        type = "location"
        label = tag.replace("location_", "")
    } else if (tag.startsWith("practice_")) {
        type = "practice"
        label = tag.replace("practice_", "")
    } else if (tag.startsWith("era_")) {
        type = "era"
        label = tag.replace("era_", "")
    } else if (tag.startsWith("nature_")) {
        type = "nature"
        label = tag.replace("nature_", "")
    }

    return {
        label: label,
        color: TAG_COLORS[type],
        type: type,
        original: tag,
    }
}

function renderObject(obj) {
    let html = "<ul>"
    for (const [key, value] of Object.entries(obj)) {
        html += `<li><strong>${formatKey(key)}:</strong> ${value}</li>`
    }
    html += "</ul>"
    return html
}

function switchTab(tabName) {
    // Update Tabs
    document.querySelectorAll(".nav-tab").forEach((btn) => {
        btn.classList.remove("active")
        if (btn.textContent.toLowerCase().includes(tabName)) {
            btn.classList.add("active")
        }
    })

    // Update Views
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"))
    document.getElementById(`view-${tabName}`).classList.add("active")

    if (tabName === "societies") {
        initNetwork() // Ensure network is running when switching back
    }
}

// --- Data Loading ---
async function loadManifest() {
    if (typeof imagesManifest !== "undefined") {
        return imagesManifest
    }
    return {}
}

// --- Render Logic: Societies ---
function renderDetail(key, society) {
    // document.getElementById("main-content").scrollTop = 0 // Removed
    const detailContainer = document.getElementById("detail-container")
    detailContainer.parentElement.scrollTop = 0 // Scroll sidebar-right to top

    let tagsHtml = ""
    if (society.tags && Array.isArray(society.tags)) {
        tagsHtml = '<div class="tags">'
        society.tags.forEach((tag) => {
            const info = getTagInfo(tag)
            // Use inline style for background color, ensure text is readable (white usually works on these bright colors)
            // Add a slight text shadow for better contrast if needed, but let's try simple white text first.
            tagsHtml += `<span class="tag" style="background-color: ${info.color}; color: #000; font-weight: 600;" onclick="filterByTag('${tag}')">${info.label}</span>`
        })
        tagsHtml += "</div>"
    }

    let contentHtml = ""
    if (society.Origins) {
        contentHtml += `<span class="section-title">Origins</span><p class="content-text">${society.Origins}</p>`
    }
    if (society.Beliefs) {
        contentHtml += `<span class="section-title">Beliefs</span>${renderObject(society.Beliefs)}`
    }
    if (society.Rituals) {
        contentHtml += `<span class="section-title">Rituals</span>${renderObject(society.Rituals)}`
    }
    if (society.Structure) {
        contentHtml += `<span class="section-title">Structure</span>${renderObject(society.Structure)}`
    }

    // Images
    let mainImageSrc = `img/${key}.jpg`
    let galleryHtml = ""

    if (manifestData[key] && manifestData[key].length > 0) {
        mainImageSrc = `img/${manifestData[key][0]}`

        if (manifestData[key].length > 1) {
            galleryHtml = '<div class="gallery">'
            manifestData[key].forEach((imgFile) => {
                galleryHtml += `<img src="img/${imgFile}" onclick="window.open(this.src, '_blank')" title="Click to enlarge">`
            })
            galleryHtml += "</div>"
        }
    }

    const html = `
    <div class="society-detail">
        <img src="${mainImageSrc}" class="main-image" onerror="this.style.display='none'" alt="${formatKey(key)}">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2>${formatKey(key)}</h2>
            <a href="https://github.com/DominiqueMakowski/Occultopedia/blob/main/database.js" target="_blank" style="color: #666; text-decoration: none; font-size: 0.9em; border: 1px solid #444; padding: 2px 8px; border-radius: 4px;">Suggest change</a>
        </div>
        ${tagsHtml}
        ${contentHtml}
        ${galleryHtml}
    </div>
`

    detailContainer.innerHTML = html

    // Update Explore with related items - REMOVED
    // renderExplore(Object.keys(dataSocieties), key)

    // Update Network Selection
    selectedNodeId = key
    if (typeof restartSimulation === "function") {
        restartSimulation() // Trigger redraw to show highlight
    }
    updateUrlState()
}

function addTagFilter(tag) {
    if (!tag) return
    selectedTags.add(tag)
    renderActiveTags()
    filterSocieties()
    tagFilter.value = "" // Reset dropdown
}

function removeTagFilter(tag) {
    selectedTags.delete(tag)
    renderActiveTags()
    filterSocieties()
}

function renderActiveTags() {
    activeTagsContainer.innerHTML = ""
    selectedTags.forEach((tag) => {
        const info = getTagInfo(tag)
        const chip = document.createElement("div")
        chip.className = "tag-chip"
        chip.style.backgroundColor = info.color
        chip.style.color = "#000" // Ensure text is readable
        chip.style.fontWeight = "600"
        chip.innerHTML = `
            <span>${info.label}</span>
            <span class="remove-tag" onclick="removeTagFilter('${tag}')" style="color: #000">&times;</span>
        `
        activeTagsContainer.appendChild(chip)
    })
    renderTagFilterOptions()
}

function renderTagFilterOptions() {
    // Save current selection if any (though usually it resets)
    const current = tagFilter.value

    tagFilter.innerHTML = '<option value="">Add Tag Filter...</option>'

    const sortedTags = Array.from(allTags).sort()
    sortedTags.forEach((tag) => {
        if (!selectedTags.has(tag)) {
            const info = getTagInfo(tag)
            const option = document.createElement("option")
            option.value = tag
            option.textContent = info.label // Show clean label
            tagFilter.appendChild(option)
        }
    })

    tagFilter.value = ""
}

function filterByTag(tag) {
    addTagFilter(tag)
}

function renderNavList(keys) {
    navList.innerHTML = ""
    keys.forEach((key) => {
        const society = dataSocieties[key]
        const li = document.createElement("li")
        li.className = "nav-item"

        let thumbSrc = `img/${key}.jpg`
        if (manifestData[key] && manifestData[key].length > 0) {
            thumbSrc = `img/${manifestData[key][0]}`
        }

        li.innerHTML = `
        <img src="${thumbSrc}" onerror="this.onerror=null;this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiMzMzMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY2NiIgZm9udC1zaXplPSIxNCI+PzwvdGV4dD48L3N2Zz4='" alt="icon">
        <span>${formatKey(key)}</span>
    `

        li.addEventListener("click", () => {
            document.querySelectorAll(".nav-item").forEach((el) => el.classList.remove("active"))
            li.classList.add("active")
            renderDetail(key, society)

            // Center camera on node?
            // For now just highlight
            if (typeof restartSimulation === "function") {
                restartSimulation()
            }
        })

        navList.appendChild(li)
    })
}

function filterSocieties() {
    const query = searchInput.value.toLowerCase()

    const keys = Object.keys(dataSocieties).filter((key) => {
        const society = dataSocieties[key]
        const matchesSearch =
            formatKey(key).toLowerCase().includes(query) || (society.tags && society.tags.some((t) => t.toLowerCase().includes(query)))

        // Check if society has ALL selected tags
        const matchesTags = selectedTags.size === 0 || (society.tags && Array.from(selectedTags).every((t) => society.tags.includes(t)))

        return matchesSearch && matchesTags
    })

    renderNavList(keys)
}

// --- Network View ---
// (Variables moved to top of file)

function initNetwork() {
    if (networkInitialized) return
    networkInitialized = true

    const canvas = document.getElementById("network-canvas")
    const ctx = canvas.getContext("2d")
    const tooltip = document.getElementById("network-tooltip")
    const showLabelsCheckbox = document.getElementById("show-labels")
    const connectionModeSelect = document.getElementById("network-connection-mode")
    const connectionThresholdSlider = document.getElementById("connection-threshold")
    const thresholdValueDisplay = document.getElementById("threshold-value")
    const legendContainer = document.getElementById("network-legend")

    // Render Legend
    function renderLegend() {
        legendContainer.innerHTML = ""
        const eras = [
            { key: "era_ancient", label: "Ancient" },
            { key: "era_medieval", label: "Medieval" },
            { key: "era_preindustrial", label: "Pre-Industrial" },
            { key: "era_industrial", label: "Industrial" },
            { key: "era_modern", label: "Modern" },
            { key: "era_digital", label: "Digital" },
            { key: "era_fictional", label: "Fictional" },
        ]

        eras.forEach((era) => {
            const item = document.createElement("div")
            item.style.display = "flex"
            item.style.alignItems = "center"
            item.style.gap = "5px"

            const colorBox = document.createElement("div")
            colorBox.style.width = "10px"
            colorBox.style.height = "10px"
            colorBox.style.borderRadius = "50%"
            colorBox.style.backgroundColor = ERA_COLORS[era.key] || "#999"

            const label = document.createElement("span")
            label.textContent = era.label

            item.appendChild(colorBox)
            item.appendChild(label)
            legendContainer.appendChild(item)
        })
    }
    renderLegend()

    // Resize canvas
    function resize() {
        canvas.width = canvas.parentElement.clientWidth
        canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener("resize", resize)
    resize()

    // Prepare Nodes (Global)
    nodes = Object.keys(dataSocieties).map((key) => ({
        id: key,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        radius: 5 + (dataSocieties[key].tags ? dataSocieties[key].tags.length : 0) * 0.5, // Size based on tag count
        tags: dataSocieties[key].tags || [],
    }))

    // Simulation State
    let dragging = false
    let draggedNode = null
    let hoverNode = null
    let alpha = 1.0 // Simulation temperature
    let animationFrameId = null

    // Camera State (Global camera object is used)
    let panning = false
    let lastMouseX = 0
    let lastMouseY = 0

    // Simulation Loop
    function tick() {
        if (alpha < 0.005 && !panning && !dragging) {
            animationFrameId = null
            return // Stop simulation when cooled down
        }

        // Forces
        // Repulsion
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i]
                const b = nodes[j]
                const dx = b.x - a.x
                const dy = b.y - a.y
                const dist = Math.sqrt(dx * dx + dy * dy) || 1

                // Limit repulsion range to improve stability
                if (dist > 300) continue

                const force = (2000 / (dist * dist)) * alpha // Scale by alpha
                const fx = (dx / dist) * force
                const fy = (dy / dist) * force
                a.vx -= fx
                a.vy -= fy
                b.vx += fx
                b.vy += fy
            }
        }

        // Spring (Links)
        for (const link of links) {
            const a = link.source
            const b = link.target
            const dx = b.x - a.x
            const dy = b.y - a.y
            const dist = Math.sqrt(dx * dx + dy * dy) || 1

            // Weighted target distance: Stronger links pull closer
            // Base 150, reduce by 20 for each strength point, min 50
            const targetDist = Math.max(50, 150 - link.strength * 20)

            // Weighted force: Stronger links have stiffer springs
            const force = (dist - targetDist) * 0.005 * alpha * (1 + link.strength * 0.5)

            const fx = (dx / dist) * force
            const fy = (dy / dist) * force
            a.vx += fx
            a.vy += fy
            b.vx -= fx
            b.vy -= fy
        }

        // Center Gravity
        const cx = canvas.width / 2
        const cy = canvas.height / 2
        for (const node of nodes) {
            const dx = cx - node.x
            const dy = cy - node.y
            node.vx += dx * 0.0005 * alpha
            node.vy += dy * 0.0005 * alpha
        }

        // Update positions
        for (const node of nodes) {
            if (node === draggedNode) continue

            // Limit velocity
            const maxVel = 10 * alpha
            const vel = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
            if (vel > maxVel) {
                node.vx = (node.vx / vel) * maxVel
                node.vy = (node.vy / vel) * maxVel
            }

            node.vx *= 0.9 // Damping
            node.vy *= 0.9
            node.x += node.vx
            node.y += node.vy

            // Bounds
            node.x = Math.max(node.radius, Math.min(canvas.width - node.radius, node.x))
            node.y = Math.max(node.radius, Math.min(canvas.height - node.radius, node.y))
        }

        // Draw
        ctx.save()
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Apply Camera
        ctx.translate(camera.x, camera.y)
        ctx.scale(camera.zoom, camera.zoom)

        // Draw Links
        ctx.globalAlpha = 0.3
        const currentThreshold = parseInt(connectionThresholdSlider.value, 10) || 1
        for (const link of links) {
            ctx.beginPath()
            ctx.moveTo(link.source.x, link.source.y)
            ctx.lineTo(link.target.x, link.target.y)
            ctx.strokeStyle = TAG_COLORS[link.type] || TAG_COLORS.other

            // Weighted line width relative to threshold
            // Min width (0.5) at threshold, increasing by 1.5 per extra strength point
            const relativeStrength = Math.max(0, link.strength - currentThreshold)
            ctx.lineWidth = (0.5 + relativeStrength * 1.5) / camera.zoom

            ctx.stroke()
        }
        ctx.globalAlpha = 1

        // Draw Nodes
        for (const node of nodes) {
            ctx.beginPath()
            // Scale radius inversely with zoom to keep constant screen size
            const screenRadius = node.radius / camera.zoom
            ctx.arc(node.x, node.y, screenRadius, 0, Math.PI * 2)

            // Era Color Logic
            ctx.fillStyle = getEraColor(node.tags)

            // Highlight logic (Transparency)
            let isConnected = false
            let isSelected = node.id === selectedNodeId
            let isHovered = node === hoverNode

            if (selectedNodeId) {
                if (!isSelected) {
                    // Check connection
                    const isNeighbor = links.some(
                        (l) =>
                            (l.source.id === selectedNodeId && l.target.id === node.id) ||
                            (l.target.id === selectedNodeId && l.source.id === node.id)
                    )
                    if (isNeighbor) {
                        isConnected = true
                    }
                }
            }

            // Transparency Control
            let alpha = 0.7 // Default transparency
            if (selectedNodeId) {
                if (isSelected || isConnected) {
                    alpha = 1.0 // Fully opaque for selected and connected
                } else {
                    alpha = 0.2 // Dim others significantly
                }
            } else if (isHovered) {
                alpha = 1.0
            }

            ctx.globalAlpha = alpha
            ctx.fill()

            // Outline Logic (Optional now, but good for selection feedback)
            if (isSelected || isHovered) {
                ctx.strokeStyle = "#fff"
                ctx.lineWidth = (isSelected ? 3 : 2) / camera.zoom
                ctx.stroke()
            } else {
                ctx.strokeStyle = "#333"
                ctx.lineWidth = 1 / camera.zoom
                ctx.stroke()
            }

            // Labels
            if (showLabelsCheckbox.checked || isHovered || isSelected || isConnected) {
                ctx.fillStyle = "#fff"
                ctx.font = `${10 / camera.zoom}px Arial` // Scale font
                ctx.textAlign = "center"
                // Adjust offset for scaled radius
                ctx.fillText(formatKey(node.id), node.x, node.y + screenRadius + 12 / camera.zoom)
            }

            ctx.globalAlpha = 1.0 // Reset alpha for next iteration/drawing
        }

        ctx.restore()
        alpha *= 0.99 // Cool down
        animationFrameId = requestAnimationFrame(tick)
    }

    // Assign global simulation function
    networkSimulation = tick

    function restartSimulation() {
        alpha = 1.0
        if (!animationFrameId) {
            tick()
        }
    }

    // Function to update links based on selected mode
    function updateLinks() {
        const mode = connectionModeSelect.value
        const threshold = parseInt(connectionThresholdSlider.value, 10)
        thresholdValueDisplay.textContent = threshold

        links = [] // Reset global links

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i]
                const b = nodes[j]

                // Initial shared tags calculation
                let shared = a.tags.filter((t) => b.tags.includes(t))

                // Special handling for "all" mode: Exclude era_ tags
                if (mode === "all") {
                    shared = shared.filter((t) => !t.startsWith("era_"))
                }

                if (shared.length > 0) {
                    let type = "other"
                    const firstShared = shared[0]

                    // Determine type for coloring
                    if (firstShared.startsWith("aesthetic")) type = "aesthetic"
                    else if (firstShared.startsWith("location")) type = "location"
                    else if (firstShared.startsWith("practice")) type = "practice"
                    else if (firstShared.startsWith("era")) type = "era"
                    else if (firstShared.startsWith("nature")) type = "nature"

                    // Filtering Logic
                    let shouldConnect = false
                    let strength = 0

                    if (mode === "all") {
                        shouldConnect = true
                        strength = shared.length
                        type = "all"
                    } else if (mode === "aesthetic") {
                        // Only connect if they share an aesthetic tag
                        const aestheticTags = shared.filter((t) => t.startsWith("aesthetic"))
                        if (aestheticTags.length > 0) {
                            shouldConnect = true
                            strength = aestheticTags.length
                            if (!type.startsWith("aesthetic")) type = "aesthetic"
                        }
                    } else if (mode === "era") {
                        // Only connect if they share an era tag
                        const eraTags = shared.filter((t) => t.startsWith("era"))
                        if (eraTags.length > 0) {
                            shouldConnect = true
                            strength = eraTags.length
                            type = "era"
                        }
                    } else {
                        // Specific tag category (practice_, source_, etc.)
                        const categoryTags = shared.filter((t) => t.startsWith(mode))
                        if (categoryTags.length > 0) {
                            shouldConnect = true
                            strength = categoryTags.length
                            // Update type to match the mode for coloring consistency
                            if (mode.startsWith("practice")) type = "practice"
                            else if (mode.startsWith("nature")) type = "nature"
                            else if (mode.startsWith("location")) type = "location"
                        }
                    }

                    // Apply Threshold
                    if (shouldConnect && strength < threshold) {
                        shouldConnect = false
                    }

                    if (shouldConnect) {
                        links.push({ source: a, target: b, tags: shared, type: type, strength: strength })
                    }
                }
            }
        }
        restartSimulation()
        updateUrlState()
    }

    // Initial link generation
    updateLinks()

    // Event Listener for Dropdown
    connectionModeSelect.addEventListener("change", () => {
        const mode = connectionModeSelect.value
        if (mode === "all") {
            connectionThresholdSlider.value = 5
        } else {
            connectionThresholdSlider.value = 1
        }
        updateLinks()
    })
    connectionThresholdSlider.addEventListener("input", updateLinks)

    // Pre-calculate layout (Warmup)
    for (let k = 0; k < 100; k++) {
        // Simple repulsion
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i]
                const b = nodes[j]
                const dx = b.x - a.x
                const dy = b.y - a.y
                const dist = Math.sqrt(dx * dx + dy * dy) || 1
                if (dist > 300) continue
                const force = 100 / (dist * dist) // Weaker force for warmup
                const fx = (dx / dist) * force
                const fy = (dy / dist) * force
                a.vx -= fx
                a.vy -= fy
                b.vx += fx
                b.vy += fy
            }
        }
        // Simple attraction
        for (const link of links) {
            const a = link.source
            const b = link.target
            const dx = b.x - a.x
            const dy = b.y - a.y
            const dist = Math.sqrt(dx * dx + dy * dy) || 1
            const force = (dist - 100) * 0.01
            const fx = (dx / dist) * force
            const fy = (dy / dist) * force
            a.vx += fx
            a.vy += fy
            b.vx -= fx
            b.vy -= fy
        }
        // Move
        for (const node of nodes) {
            node.x += node.vx
            node.y += node.vy
            node.vx *= 0.5
            node.vy *= 0.5
        }
    }

    // Mouse Events
    canvas.addEventListener("mousedown", (e) => {
        const rect = canvas.getBoundingClientRect()
        const screenX = e.clientX - rect.left
        const screenY = e.clientY - rect.top

        // Transform to world coordinates
        const worldX = (screenX - camera.x) / camera.zoom
        const worldY = (screenY - camera.y) / camera.zoom

        // Find clicked node
        let hit = false
        for (const node of nodes) {
            const dx = worldX - node.x
            const dy = worldY - node.y
            // Adjust hit detection for scaled radius
            const screenRadius = node.radius / camera.zoom
            if (dx * dx + dy * dy < screenRadius * screenRadius * 4) {
                dragging = true
                draggedNode = node
                restartSimulation()
                hit = true
                break
            }
        }

        if (!hit) {
            panning = true
            lastMouseX = screenX
            lastMouseY = screenY
            canvas.style.cursor = "grabbing"
        }
    })

    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect()
        const screenX = e.clientX - rect.left
        const screenY = e.clientY - rect.top
        const worldX = (screenX - camera.x) / camera.zoom
        const worldY = (screenY - camera.y) / camera.zoom

        if (dragging && draggedNode) {
            draggedNode.x = worldX
            draggedNode.y = worldY
            draggedNode.vx = 0
            draggedNode.vy = 0
            restartSimulation()
        } else if (panning) {
            const dx = screenX - lastMouseX
            const dy = screenY - lastMouseY
            camera.x += dx
            camera.y += dy
            lastMouseX = screenX
            lastMouseY = screenY
            restartSimulation() // Redraw
        }

        // Hover check
        hoverNode = null
        for (const node of nodes) {
            const dx = worldX - node.x
            const dy = worldY - node.y
            // Adjust hover detection for scaled radius
            const screenRadius = node.radius / camera.zoom
            if (dx * dx + dy * dy < screenRadius * screenRadius * 4) {
                hoverNode = node
                break
            }
        }

        if (hoverNode) {
            tooltip.style.display = "block"
            tooltip.style.left = e.clientX + 10 + "px"
            tooltip.style.top = e.clientY + 10 + "px"
            tooltip.textContent = formatKey(hoverNode.id)
            canvas.style.cursor = "pointer"
        } else {
            tooltip.style.display = "none"
            if (!panning) canvas.style.cursor = "default"
        }
    })

    canvas.addEventListener("mouseup", () => {
        dragging = false
        draggedNode = null
        panning = false
        canvas.style.cursor = "default"
        updateUrlState()
    })

    canvas.addEventListener("wheel", (e) => {
        e.preventDefault()
        const zoomIntensity = 0.1
        const delta = e.deltaY > 0 ? -zoomIntensity : zoomIntensity
        const newZoom = Math.max(0.1, Math.min(5, camera.zoom * (1 + delta)))

        // Zoom towards mouse pointer
        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const worldX = (mouseX - camera.x) / camera.zoom
        const worldY = (mouseY - camera.y) / camera.zoom

        camera.x = mouseX - worldX * newZoom
        camera.y = mouseY - worldY * newZoom
        camera.zoom = newZoom

        restartSimulation() // Redraw
        updateUrlState()
    })

    canvas.addEventListener("click", (e) => {
        if (hoverNode && !dragging) {
            // Simple click
            // Render detail directly
            renderDetail(hoverNode.id, dataSocieties[hoverNode.id])

            // Highlight in list
            document.querySelectorAll(".nav-item").forEach((item) => {
                item.classList.remove("active")
                if (item.querySelector("span").textContent === formatKey(hoverNode.id)) {
                    item.classList.add("active")
                    item.scrollIntoView({ behavior: "smooth", block: "center" })
                }
            })
        }
    })

    // Start the loop
    networkSimulation()
}

// --- URL State Management ---
function updateUrlState() {
    const params = new URLSearchParams(window.location.search)
    if (selectedNodeId) params.set("society", selectedNodeId)

    const connectionModeSelect = document.getElementById("network-connection-mode")
    if (connectionModeSelect) params.set("mode", connectionModeSelect.value)

    const connectionThresholdSlider = document.getElementById("connection-threshold")
    if (connectionThresholdSlider) params.set("threshold", connectionThresholdSlider.value)

    params.set("x", Math.round(camera.x))
    params.set("y", Math.round(camera.y))
    params.set("zoom", camera.zoom.toFixed(2))

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, "", newUrl)
}

function loadStateFromUrl() {
    const params = new URLSearchParams(window.location.search)
    return {
        society: params.get("society"),
        mode: params.get("mode"),
        threshold: params.get("threshold"),
        x: params.get("x"),
        y: params.get("y"),
        zoom: params.get("zoom"),
    }
}

// --- Initialization ---
async function init() {
    manifestData = await loadManifest()

    if (typeof dataSocieties !== "undefined") {
        const keys = Object.keys(dataSocieties)

        // Collect Tags
        keys.forEach((key) => {
            const tags = dataSocieties[key].tags || []
            tags.forEach((tag) => allTags.add(tag))
        })

        // Populate Filter
        renderTagFilterOptions()

        // Event Listeners
        searchInput.addEventListener("input", filterSocieties)
        tagFilter.addEventListener("change", (e) => addTagFilter(e.target.value))

        // Initial Render
        renderNavList(keys)

        // Render Explore Column (Random initially) - REMOVED
        // renderExplore(keys)

        // Load State
        const urlState = loadStateFromUrl()

        // Apply Camera State
        if (urlState.x) camera.x = parseFloat(urlState.x)
        if (urlState.y) camera.y = parseFloat(urlState.y)
        if (urlState.zoom) camera.zoom = parseFloat(urlState.zoom)

        // Apply Network Settings (before initNetwork)
        if (urlState.mode) {
            const modeSelect = document.getElementById("network-connection-mode")
            if (modeSelect) modeSelect.value = urlState.mode
        }
        if (urlState.threshold) {
            const thresholdSlider = document.getElementById("connection-threshold")
            if (thresholdSlider) thresholdSlider.value = urlState.threshold
        }

        // Select item
        let initialKey = keys.length > 0 ? keys[0] : null
        if (urlState.society && dataSocieties[urlState.society]) {
            initialKey = urlState.society
        }

        if (initialKey) {
            renderDetail(initialKey, dataSocieties[initialKey])
            // Highlight
            document.querySelectorAll(".nav-item").forEach((item) => {
                if (item.querySelector("span").textContent === formatKey(initialKey)) {
                    item.classList.add("active")
                    item.scrollIntoView({ behavior: "smooth", block: "center" })
                }
            })
        }

        // Initialize Network immediately
        initNetwork()
    } else {
        detailContainer.innerHTML = '<p style="color:red; text-align:center;">Error: dataSocieties not found.</p>'
    }
}

init()
