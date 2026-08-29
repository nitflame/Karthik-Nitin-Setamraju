import { useState, useEffect, useRef } from 'react';
import { skills, projects, flagshipProject, experience } from '../content';

const LABELS = {
  languages: 'Languages',
  frameworks: 'Frameworks & SDKs',
  aiml: 'AI / ML',
  databases: 'Databases',
  tools: 'Developer Tools',
  coreCS: 'Core CS',
};

const CATEGORY_DISPLAY = {
  languages: 'Languages',
  frameworks: 'Frameworks',
  aiml: 'AI & ML',
  databases: 'Databases',
  tools: 'Tools',
  coreCS: 'Core CS',
};

const ROOT_NODE = {
  id: 'core-cluster',
  label: 'CORE SKILLS',
  cat: 'Cluster',
  catKey: 'cluster',
  usedIn: [],
  x: 0,
  y: 0,
  z: 0,
};

function buildCategoryNodes() {
  const keys = Object.keys(skills);
  const radius = 180;

  return keys.map((catKey, idx) => {
    const angle = (idx / keys.length) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = idx % 2 === 0 ? -26 : 26;

    return {
      id: `category-${catKey}`,
      label: CATEGORY_DISPLAY[catKey],
      cat: 'Category',
      catKey,
      usedIn: [],
      x,
      y,
      z,
    };
  });
}

// Every source that could confirm "where a skill was actually used" —
// scanned at render time so the connection is real, not asserted.
function findUsage(skillName) {
  const hits = [];
  const norm = skillName.toLowerCase();
  projects.forEach((p) => {
    if (p.stack.some((s) => s.toLowerCase().includes(norm) || norm.includes(s.toLowerCase()))) {
      hits.push(p.title);
    }
  });
  if (flagshipProject.stack.some((s) => s.toLowerCase().includes(norm) || norm.includes(s.toLowerCase()))) {
    hits.push(flagshipProject.title);
  }
  experience.forEach((e) => {
    if (e.bullets.some((b) => b.toLowerCase().includes(norm))) {
      hits.push(e.org);
    }
  });
  return [...new Set(hits)];
}

// Even distribution on a sphere (golden-angle spiral) — positions are
// computed, not hand-placed, so the graph scales cleanly if skills change.
function buildNodes() {
  const flat = [];
  Object.entries(skills).forEach(([catKey, items]) => {
    items.forEach((label) => flat.push({ catKey, label }));
  });

  const n = flat.length;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const categoryRadius = {
    languages: 160,
    frameworks: 180,
    aiml: 200,
    databases: 175,
    tools: 190,
    coreCS: 170,
  };

  return flat.map((item, i) => {
    const y = 1 - (i / (n - 1)) * 2; // -1..1
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    const spread = Math.abs(Math.sin(i * 1.9 + item.label.length * 0.4));
    const jitter = (spread - 0.5) * 24;
    const radius = (categoryRadius[item.catKey] ?? 180) + jitter;

    const usedIn = findUsage(item.label);

    return {
      id: item.label.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      label: item.label,
      cat: CATEGORY_DISPLAY[item.catKey],
      catKey: item.catKey,
      usedIn,
      x: x * radius,
      y: y * radius,
      z: z * radius,
    };
  });
}

const SKILL_NODES = buildNodes();
const CATEGORY_NODES = buildCategoryNodes();
const CATEGORY_CONNECTIONS = buildConnections([ROOT_NODE, ...CATEGORY_NODES], ROOT_NODE.id);

// Connect every node to the center hub, plus a light ring between
// consecutive nodes in the same category so related skills cluster
// visually — generated from real category membership, not hand-picked.
function buildConnections(nodes, centerId = 'center') {
  const conns = nodes
    .filter((n) => n.id !== centerId)
    .map((n) => ({ from: centerId, to: n.id }));

  const byCategory = {};
  nodes.forEach((n) => {
    byCategory[n.catKey] = byCategory[n.catKey] || [];
    byCategory[n.catKey].push(n.id);
  });
  Object.values(byCategory).forEach((ids) => {
    for (let i = 0; i < ids.length - 1; i++) {
      conns.push({ from: ids[i], to: ids[i + 1] });
    }
  });
  return conns;
}

export default function Skills() {
  const [view, setView] = useState('constellation');
  const [selectedNode, setSelectedNode] = useState(ROOT_NODE);
  const [expandLevel, setExpandLevel] = useState(0); // 0: root only, 1: categories, 2: skills
  const [activeFilter, setActiveFilter] = useState(null);
  const [hasBeenNear, setHasBeenNear] = useState(false);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const stateRef = useRef({
    angleX: 0.1,
    angleY: 0.2,
    isDragging: false,
    startX: 0,
    startY: 0,
    downX: 0,
    downY: 0,
    mouseX: 0,
    mouseY: 0,
    hoveredId: null
  });

  // Don't even start the canvas engine — the heaviest JS on this page —
  // until the Skills section has actually scrolled near the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Automatically default to list view on small screens for better readability
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 850) {
        setView('list');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (view !== 'constellation' || !hasBeenNear) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Progressive disclosure: level 0 = root only, 1 = root + categories, 2 = root + categories + skills
    const displayNodes = expandLevel === 0 ? [ROOT_NODE] : expandLevel === 1 ? [ROOT_NODE, ...CATEGORY_NODES] : [ROOT_NODE, ...CATEGORY_NODES, ...SKILL_NODES];
    const displayConnections = expandLevel === 0 ? [] : expandLevel === 1 ? CATEGORY_CONNECTIONS : buildConnections([ROOT_NODE, ...CATEGORY_NODES, ...SKILL_NODES], ROOT_NODE.id);

    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      canvas.width = container.clientWidth * window.devicePixelRatio;
      canvas.height = container.clientHeight * window.devicePixelRatio;
      canvas.style.width = `${container.clientWidth}px`;
      canvas.style.height = `${container.clientHeight}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const state = stateRef.current;

    const getRotatedCoords = (node, aX, aY) => {
      // Rotation around X axis
      const y1 = node.y * Math.cos(aX) - node.z * Math.sin(aX);
      const z1 = node.y * Math.sin(aX) + node.z * Math.cos(aX);
      // Rotation around Y axis
      const x2 = node.x * Math.cos(aY) + z1 * Math.sin(aY);
      const z2 = -node.x * Math.sin(aY) + z1 * Math.cos(aY);
      return { x: x2, y: y1, z: z2 };
    };

    function drawRoundedRect(c, x, y, width, height, radius) {
      c.beginPath();
      c.moveTo(x + radius, y);
      c.lineTo(x + width - radius, y);
      c.quadraticCurveTo(x + width, y, x + width, y + radius);
      c.lineTo(x + width, y + height - radius);
      c.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      c.lineTo(x + radius, y + height);
      c.quadraticCurveTo(x, y + height, x, y + height - radius);
      c.lineTo(x, y + radius);
      c.quadraticCurveTo(x, y, x + radius, y);
      c.closePath();
    }

    const render = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      const centerX = w / 2;
      const centerY = h / 2;
      const focalLength = 300;

      // Slow idle rotation if not dragging and not currently reading a node
      if (!state.isDragging && !state.hoveredId) {
        state.angleY += 0.0014;
        state.angleX += 0.0004;
      }

      ctx.clearRect(0, 0, w, h);

      // Project Nodes
      const projected = displayNodes.map(node => {
        const rotated = getRotatedCoords(node, state.angleX, state.angleY);
        const scale = focalLength / (focalLength + rotated.z);
        const projX = centerX + rotated.x * scale;
        const projY = centerY + rotated.y * scale;
        return {
          ...node,
          projX,
          projY,
          scale,
          depth: rotated.z
        };
      });

      // Draw Orbit Paths (Static in 2D space behind nodes)
      ctx.strokeStyle = 'rgba(77, 255, 154, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 210, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Center core pulse glow
      const time = Date.now() * 0.002;
      const pulseRadius = 14 + Math.sin(time) * 3;
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(77, 255, 154, 0.4)';
      ctx.fillStyle = 'rgba(77, 255, 154, 0.15)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset shadow

      // Draw Connections (sort by average depth of the endpoints)
      const projectedMap = projected.reduce((acc, p) => {
        acc[p.id] = p;
        return acc;
      }, {});

      const processedConnections = displayConnections.map(conn => {
        const from = conn.from === ROOT_NODE.id ? { projX: centerX, projY: centerY, depth: 0, id: ROOT_NODE.id, cat: '' } : projectedMap[conn.from];
        const to = projectedMap[conn.to];
        return { from, to, avgDepth: (from.depth + to.depth) / 2 };
      }).sort((a, b) => b.avgDepth - a.avgDepth);

      processedConnections.forEach(conn => {
        const isHoveredConn = state.hoveredId && (state.hoveredId === conn.from.id || state.hoveredId === conn.to.id);
        const isFilterMatch = !activeFilter || (conn.from.cat === activeFilter || conn.to.cat === activeFilter);
        
        ctx.beginPath();
        ctx.moveTo(conn.from.projX, conn.from.projY);
        ctx.lineTo(conn.to.projX, conn.to.projY);
        
        if (isHoveredConn && isFilterMatch) {
          ctx.strokeStyle = 'rgba(77, 255, 154, 0.65)';
          ctx.lineWidth = 1.6;
        } else if (activeFilter && !isFilterMatch) {
          ctx.strokeStyle = 'rgba(77, 255, 154, 0.08)';
          ctx.lineWidth = 0.8;
        } else {
          ctx.strokeStyle = 'rgba(77, 255, 154, 0.35)';
          ctx.lineWidth = 1.0;
        }
        ctx.stroke();
      });

      // Render Nodes (sort back-to-front by depth)
      const sortedNodes = [...projected].sort((a, b) => b.depth - a.depth);
      let nextHovered = null;

      sortedNodes.forEach(node => {
        // Floor the display scale so nodes on the far side of the sphere
        // never shrink past legibility — depth is still conveyed via the
        // capsule's fill opacity, just not via unreadable text size.
        const dispScale = Math.max(node.scale, 0.72);
        const fontSize = Math.round(12 * dispScale);
        const fontFamily = 'JetBrains Mono, ui-monospace, monospace';
        ctx.font = `${fontSize}px ${fontFamily}`;
        const text = node.label;
        const textWidth = ctx.measureText(text).width;
        const nodeW = Math.max(128 * dispScale, textWidth + 18);
        const nodeH = Math.max(26 * dispScale, fontSize + 12);
        const padX = node.projX - nodeW / 2;
        const padY = node.projY - nodeH / 2;

        // Hover detection
        const isInside = state.mouseX >= padX && state.mouseX <= padX + nodeW &&
                        state.mouseY >= padY && state.mouseY <= padY + nodeH;
        if (isInside) {
          nextHovered = node;
        }

        const isHovered = state.hoveredId === node.id;
        const isSelected = selectedNode && selectedNode.id === node.id;
        const isFilterMatch = !activeFilter || node.cat === activeFilter;

        // Apply depth styling — capsule fades with depth, text does not
        ctx.save();
        const bgAlpha = activeFilter && !isFilterMatch ? 0.25 : Math.max(0.45, node.scale);
        ctx.globalAlpha = bgAlpha;

        // Capsule background
        drawRoundedRect(ctx, padX, padY, nodeW, nodeH, 13 * dispScale);
        
        if (isSelected) {
          ctx.fillStyle = 'rgba(77, 255, 154, 0.22)';
          ctx.strokeStyle = 'rgba(77, 255, 154, 0.92)';
          ctx.lineWidth = 1.8;
        } else if (isHovered && isFilterMatch) {
          ctx.fillStyle = 'rgba(77, 255, 154, 0.18)';
          ctx.strokeStyle = 'rgba(77, 255, 154, 0.65)';
          ctx.lineWidth = 1.4;
        } else {
          ctx.fillStyle = 'rgba(15, 18, 20, 0.95)';
          ctx.strokeStyle = 'rgba(52, 57, 61, 0.9)';
          ctx.lineWidth = 1.0;
        }
        
        ctx.fill();
        ctx.stroke();

        // Node Label text — always at full opacity and a readable size.
        ctx.globalAlpha = activeFilter && !isFilterMatch ? 0.25 : 1;
        ctx.fillStyle = isSelected ? '#4dff9a' : '#e7ebe9';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
        ctx.shadowBlur = 2;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, node.projX, node.projY);
        ctx.shadowBlur = 0;

        ctx.restore();
      });

      state.hoveredId = nextHovered ? nextHovered.id : null;
      canvas.style.cursor = nextHovered ? 'pointer' : 'grab';

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [view, activeFilter, hasBeenNear, expandLevel]);

  // Update selected node when hovering over a capsule in constellation view
  useEffect(() => {
    if (view !== 'constellation' || !hasBeenNear) return;

    let prevHoveredId = null;

    const checkHovered = () => {
      const currentHoveredId = stateRef.current.hoveredId;
      if (currentHoveredId !== prevHoveredId) {
        prevHoveredId = currentHoveredId;
        if (currentHoveredId) {
          const displayNodes = expandLevel === 0 ? [ROOT_NODE] : expandLevel === 1 ? [ROOT_NODE, ...CATEGORY_NODES] : [ROOT_NODE, ...CATEGORY_NODES, ...SKILL_NODES];
          const found = displayNodes.find(n => n.id === currentHoveredId);
          if (found) {
            setSelectedNode(found);
          }
        }
      }
      requestAnimationFrame(checkHovered);
    };

    const frameId = requestAnimationFrame(checkHovered);
    return () => cancelAnimationFrame(frameId);
  }, [view, hasBeenNear, expandLevel]);

  // Drag interaction handlers
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const state = stateRef.current;
    state.isDragging = true;
    state.startX = e.clientX - rect.left;
    state.startY = e.clientY - rect.top;
    state.downX = e.clientX - rect.left;
    state.downY = e.clientY - rect.top;
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const state = stateRef.current;
    
    state.mouseX = e.clientX - rect.left;
    state.mouseY = e.clientY - rect.top;

    if (state.isDragging) {
      const dx = e.clientX - rect.left - state.startX;
      const dy = e.clientY - rect.top - state.startY;
      state.angleY += dx * 0.006;
      state.angleX += dy * 0.006;
      state.startX = e.clientX - rect.left;
      state.startY = e.clientY - rect.top;
    }
  };

  const handleMouseUp = () => {
    const state = stateRef.current;
    const dx = state.mouseX - state.downX;
    const dy = state.mouseY - state.downY;
    const clickDistance = Math.hypot(dx, dy);
    if (clickDistance < 8 && state.hoveredId === ROOT_NODE.id) {
      setExpandLevel((prev) => (prev === 2 ? 0 : prev + 1));
    }
    state.isDragging = false;
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const state = stateRef.current;
      state.isDragging = true;
      state.startX = e.touches[0].clientX;
      state.startY = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && stateRef.current.isDragging) {
      const state = stateRef.current;
      const dx = e.touches[0].clientX - state.startX;
      const dy = e.touches[0].clientY - state.startY;
      state.angleY += dx * 0.008;
      state.angleX += dy * 0.008;
      state.startX = e.touches[0].clientX;
      state.startY = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = () => {
    stateRef.current.isDragging = false;
  };

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="eyebrow">CHART 05</div>
      
      <div className="skills-header-row">
        <h2>Skills & Tech Stack</h2>
        <div className="skills-toggle-row">
          <button
            onClick={() => setView('constellation')}
            className={`skills-toggle-btn ${view === 'constellation' ? 'active' : ''}`}
            title="Interactive Constellation Graph"
          >
            3D MAP
          </button>
          <button
            onClick={() => setView('list')}
            className={`skills-toggle-btn ${view === 'list' ? 'active' : ''}`}
            title="Categorized List View"
          >
            LIST VIEW
          </button>
        </div>
      </div>

      {view === 'constellation' ? (
        <div className="skills-3d-layout">
          
          {/* Left Side: 3D Node Web Canvas */}
          <div className="canvas-column">
            <div className="canvas-container" ref={containerRef}>
              {!hasBeenNear && (
                <div className="canvas-pending">
                  <span className="canvas-pending-dot" />
                  INITIALIZING SIGNAL MAP…
                </div>
              )}
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                role="button"
                aria-label="Skills graph, click core cluster to expand categories"
              />
            </div>
            
            {/* Category Filter Legend */}
            <div className="legend-row">
              {Object.entries(CATEGORY_DISPLAY).map(([key, name]) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(activeFilter === name ? null : name)}
                  className={`legend-btn ${activeFilter === name ? 'active' : ''}`}
                >
                  <span className="legend-dot-indicator" />
                  {name.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Skill Capability Dossier Card */}
          <div className="dossier-column">
            <div className="panel capability-dossier-card">
              <div className="corner-bracket top-left" />
              <div className="corner-bracket top-right" />
              <div className="corner-bracket bottom-left" />
              <div className="corner-bracket bottom-right" />
              
              <div className="panel-label">CAPABILITY DOSSIER</div>
              
              {selectedNode ? (
                <div className="dossier-inner animate-fade-in">
                  <div className="dossier-head">
                    <div>
                      <h4 className="dossier-name">{selectedNode.label}</h4>
                      <span className="dossier-cat">{selectedNode.cat.toUpperCase()}</span>
                    </div>
                  </div>

                  {selectedNode.usedIn.length > 0 ? (
                    <>
                      <div className="panel-label" style={{ marginTop: 4 }}>Confirmed in</div>
                      <div className="chip-row">
                        {selectedNode.usedIn.map((u) => (
                          <span className="chip" key={u}>{u}</span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="dossier-desc">Listed core skill — not yet tied to a specific shipped project on this site.</p>
                  )}
                </div>
              ) : (
                <div className="dossier-placeholder">
                  <div className="scanner-line" />
                  <p className="placeholder-text">// NEURAL INTERFACE ONLINE //</p>
                  <p className="placeholder-sub">SELECT A NODE TO SCAN CAPABILITIES</p>
                </div>
              )}
            </div>
          </div>

        </div>
      ) : (
        /* Categorized List Grid (fallback for mobile & print) */
        <div className="skills-grid">
          {Object.entries(skills).map(([key, items]) => (
            <div key={key} className="skill-group panel">
              <div className="panel-label">{LABELS[key]}</div>
              <div className="chip-row">
                {items.map((i) => (
                  <span className="chip" key={i}>{i}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .skills-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .skills-header-row h2 { margin: 0; }
        .skills-toggle-row { display: flex; gap: 8px; }
        
        .skills-toggle-btn {
          background: var(--panel);
          border: 1px solid var(--line);
          color: var(--ink-dim);
          font-family: var(--font-data);
          font-size: 11px;
          padding: 6px 14px;
          border-radius: 4px;
          transition: all 0.15s ease;
          letter-spacing: 0.05em;
        }
        .skills-toggle-btn:hover {
          border-color: var(--line-strong);
          color: var(--ink);
        }
        .skills-toggle-btn.active {
          border-color: var(--signal);
          color: var(--signal);
          background: rgba(77, 255, 154, 0.06);
          box-shadow: 0 0 10px rgba(77, 255, 154, 0.15);
        }

        /* 3D Layout structure */
        .skills-3d-layout {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 24px;
          align-items: stretch;
        }

        /* Left canvas block */
        .canvas-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
        }
        .canvas-container {
          background: #0d1012;
          border: 1px solid var(--line);
          border-radius: 4px;
          height: 480px;
          position: relative;
          overflow: hidden;
        }
        .canvas-container canvas {
          display: block;
        }
        .canvas-pending {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: var(--font-data);
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--ink-faint);
        }
        .canvas-pending-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--signal-dim);
          animation: railBlink 1.6s ease-in-out infinite;
        }
        @keyframes railBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        /* Legend Toggles */
        .legend-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .legend-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--panel);
          border: 1px solid var(--line);
          font-family: var(--font-data);
          font-size: 10px;
          color: var(--ink-dim);
          padding: 6px 14px;
          border-radius: 20px;
          transition: all 0.15s ease;
          letter-spacing: 0.05em;
        }
        .legend-btn:hover {
          border-color: var(--line-strong);
          color: var(--ink);
        }
        .legend-btn.active {
          border-color: var(--signal);
          color: var(--signal);
          background: rgba(77, 255, 154, 0.05);
        }
        .legend-dot-indicator {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--ink-dim);
          transition: all 0.2s ease;
        }
        .legend-btn.active .legend-dot-indicator {
          background: var(--signal);
          box-shadow: 0 0 6px var(--signal);
        }

        /* Dossier Card on the right */
        .dossier-column {
          display: flex;
        }
        .capability-dossier-card {
          flex: 1;
          position: relative;
          background: linear-gradient(135deg, rgba(16, 19, 21, 0.95) 0%, rgba(10, 12, 13, 0.98) 100%);
          border: 1px solid var(--line-strong);
          border-radius: 4px;
          padding: 24px 20px;
          min-height: 400px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
        }
        
        .corner-bracket {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: var(--line-strong);
          opacity: 0.5;
        }
        .corner-bracket.top-left { top: 6px; left: 6px; border-left: 1.5px solid; border-top: 1.5px solid; }
        .corner-bracket.top-right { top: 6px; right: 6px; border-right: 1.5px solid; border-top: 1.5px solid; }
        .corner-bracket.bottom-left { bottom: 6px; left: 6px; border-left: 1.5px solid; border-bottom: 1.5px solid; }
        .corner-bracket.bottom-right { bottom: 6px; right: 6px; border-right: 1.5px solid; border-bottom: 1.5px solid; }

        .dossier-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          animation: dFadeIn 0.3s ease-out;
        }
        @keyframes dFadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dossier-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
          border-bottom: 1px solid var(--line);
          padding-bottom: 14px;
        }
        .dossier-icon { font-size: 24px; }
        .dossier-name { font-size: 16px; font-weight: 600; color: var(--ink); margin-bottom: 2px; }
        .dossier-cat { font-family: var(--font-data); font-size: 9.5px; color: var(--cyan); letter-spacing: 0.08em; }
        
        .dossier-desc { font-size: 13px; color: var(--ink-dim); line-height: 1.6; margin-bottom: auto; }

        /* Progress Bar */
        .dossier-progress-section {
          margin-top: 24px;
        }
        .dossier-level-row {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-data);
          font-size: 10px;
          margin-bottom: 6px;
        }
        .level-label { color: var(--ink-faint); }
        .level-percentage { color: var(--signal); }
        .progress-track {
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: var(--signal);
          box-shadow: 0 0 8px var(--signal);
          border-radius: 2px;
          transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Placeholder state */
        .dossier-placeholder {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
        }
        .placeholder-text { font-family: var(--font-data); font-size: 11px; color: var(--ink-dim); letter-spacing: 0.05em; margin-bottom: 4px; }
        .placeholder-sub { font-size: 11px; color: var(--ink-faint); }
        .scanner-line {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: var(--signal);
          opacity: 0.25;
          animation: scanSweeper 4s linear infinite;
        }
        @keyframes scanSweeper {
          0% { top: 10%; }
          50% { top: 90%; }
          100% { top: 10%; }
        }

        /* Categorized List Grid */
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .skill-group { padding: 20px; display: flex; flex-direction: column; }
        
        @media (max-width: 850px) {
          .skills-3d-layout { display: none; }
          .skills-toggle-row { display: none; }
          .skills-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
