/**
 * ApexBridge Real-Time Canvas 2D Physics & Stress Simulator / Bridge Mini-Game
 */

class BridgeSimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    // Canvas sizing
    this.width = this.canvas.width = 800;
    this.height = this.canvas.height = 480;

    // Simulation state
    this.activePreset = 'warren-truss';
    this.nodes = [];
    this.members = [];
    this.waterY = 410;
    
    // Vehicle State
    this.vehicle = {
      x: 20,
      y: 280 - 25,
      vx: 0,
      vy: 0,
      width: 70,
      height: 35,
      weight: 35, // tons
      isDriving: false,
      isCollapsed: false,
      hasCrossed: false
    };

    // Game Metrics
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('apex_sim_highscore') || '0', 10);
    this.maxStressPercent = 0;
    this.selectedNode = null;
    this.editMode = 'test'; // 'test' or 'draw'

    // Water particles FX
    this.particles = [];

    // Bindings
    this.animId = null;
    this.init();
  }

  init() {
    this.loadPreset(this.activePreset);
    this.setupEventListeners();
    this.updateHUD();
    this.startLoop();
  }

  loadPreset(presetId) {
    const preset = APEX_DATA.simulatorPresets.find(p => p.id === presetId) || APEX_DATA.simulatorPresets[0];
    this.activePreset = presetId;

    // Deep clone nodes & members
    this.nodes = preset.nodes.map(n => ({ ...n, vx: 0, vy: 0, forceY: 0 }));
    this.members = preset.members.map(m => ({ ...m, stress: 0, broken: false }));

    this.resetVehicle();
  }

  resetVehicle() {
    const startNode = this.nodes[0] || { x: 50, y: 280 };
    this.vehicle = {
      x: startNode.x - 60,
      y: startNode.y - 30,
      vx: 0,
      vy: 0,
      width: 75,
      height: 38,
      weight: parseFloat(document.getElementById('simVehicleWeight')?.value || '35'),
      isDriving: false,
      isCollapsed: false,
      hasCrossed: false
    };

    this.members.forEach(m => {
      m.broken = false;
      m.stress = 0;
    });

    this.nodes.forEach(n => {
      n.vx = 0;
      n.vy = 0;
      n.forceY = 0;
    });

    this.maxStressPercent = 0;
    this.updateHUD();
  }

  setupEventListeners() {
    // Keyboard controls for driving/jumping vehicle
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        this.accelerateVehicle(1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        this.accelerateVehicle(-1);
      }
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        this.jumpVehicle();
      }
      if (e.key === 'r' || e.key === 'R') {
        this.resetVehicle();
      }
    });

    // Preset Selector
    const selectEl = document.getElementById('simPresetSelect');
    if (selectEl) {
      selectEl.addEventListener('change', (e) => {
        this.loadPreset(e.target.value);
        showToast(`Loaded ${e.target.options[e.target.selectedIndex].text}`, 'info');
      });
    }

    // Vehicle Weight Selector
    const weightEl = document.getElementById('simVehicleWeight');
    if (weightEl) {
      weightEl.addEventListener('input', (e) => {
        this.vehicle.weight = parseFloat(e.target.value);
        this.updateHUD();
      });
    }

    // Canvas click to select/add nodes in edit mode
    this.canvas.addEventListener('mousedown', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Find if clicked existing node
      const clicked = this.nodes.find(n => Math.hypot(n.x - clickX, n.y - clickY) < 15);
      if (clicked) {
        if (this.selectedNode && this.selectedNode.id !== clicked.id) {
          // Add member between selected and clicked
          const exists = this.members.some(m => 
            (m.n1 === this.selectedNode.id && m.n2 === clicked.id) ||
            (m.n1 === clicked.id && m.n2 === this.selectedNode.id)
          );
          if (!exists) {
            this.members.push({ n1: this.selectedNode.id, n2: clicked.id, stress: 0, broken: false });
            showToast('Structural member added!', 'success');
          }
          this.selectedNode = null;
        } else {
          this.selectedNode = clicked;
        }
      }
    });
  }

  accelerateVehicle(direction) {
    if (this.vehicle.isCollapsed) return;
    this.vehicle.isDriving = true;
    this.vehicle.vx += direction * 0.85;
    this.vehicle.vx = Math.max(-3, Math.min(6, this.vehicle.vx));
  }

  jumpVehicle() {
    if (this.vehicle.isCollapsed) return;
    // Jump only if near deck level
    if (this.vehicle.y >= 230 && this.vehicle.y <= 270) {
      this.vehicle.vy = -6.5;
      this.spawnWaterSplash(this.vehicle.x + 30, this.vehicle.y + 35, '#00f0ff');
    }
  }

  startLoop() {
    const loop = () => {
      this.updatePhysics();
      this.render();
      this.animId = requestAnimationFrame(loop);
    };
    loop();
  }

  updatePhysics() {
    // 1. Vehicle Physics
    if (this.vehicle.isDriving && !this.vehicle.isCollapsed) {
      this.vehicle.x += this.vehicle.vx;
      this.vehicle.y += this.vehicle.vy;

      // Gravity on vehicle
      this.vehicle.vy += 0.25;

      // Find deck interaction
      const deckNodes = this.nodes.filter(n => Math.abs(n.y - 280) < 50).sort((a,b) => a.x - b.x);
      
      let onBridge = false;
      for (let i = 0; i < deckNodes.length - 1; i++) {
        const n1 = deckNodes[i];
        const n2 = deckNodes[i + 1];

        // Check if vehicle center is over this deck segment
        const vehicleCenterX = this.vehicle.x + this.vehicle.width / 2;
        if (vehicleCenterX >= n1.x && vehicleCenterX <= n2.x) {
          // Linear interpolation of deck Y
          const t = (vehicleCenterX - n1.x) / (n2.x - n1.x);
          const targetY = n1.y + t * (n2.y - n1.y) - this.vehicle.height;

          if (this.vehicle.y >= targetY - 10 && this.vehicle.y <= targetY + 15) {
            this.vehicle.y = targetY;
            this.vehicle.vy = 0;
            onBridge = true;

            // Apply vehicle load force onto nodes n1 and n2
            const loadFactor = this.vehicle.weight * 0.15;
            n1.forceY = (1 - t) * loadFactor;
            n2.forceY = t * loadFactor;
          }
        }
      }

      // Check bridge failure collapse
      if (!onBridge && this.vehicle.x > 80 && this.vehicle.x < 520 && this.vehicle.y > 320) {
        if (!this.vehicle.isCollapsed) {
          this.vehicle.isCollapsed = true;
          this.spawnWaterSplash(this.vehicle.x, this.waterY, '#ef4444');
          showToast('CRITICAL FAILURE: Bridge collapsed under load!', 'danger');
        }
      }

      // Check successful crossing
      if (this.vehicle.x > 560 && !this.vehicle.hasCrossed) {
        this.vehicle.hasCrossed = true;
        const efficiencyScore = Math.round((this.vehicle.weight * 100) / (this.members.length * 2));
        this.score += efficiencyScore + 500;
        if (this.score > this.highScore) {
          this.highScore = this.score;
          localStorage.setItem('apex_sim_highscore', this.highScore.toString());
        }
        showToast(`SUCCESSFUL CROSSING! Earned +${efficiencyScore + 500} pts`, 'success');
        this.updateHUD();
      }
    }

    // 2. Structural Solver Physics (Finite Element / Spring Relaxation)
    this.maxStressPercent = 0;

    this.members.forEach(m => {
      if (m.broken) return;

      const n1 = this.nodes.find(n => n.id === m.n1);
      const n2 = this.nodes.find(n => n.id === m.n2);
      if (!n1 || !n2) return;

      const dx = n2.x - n1.x;
      const dy = n2.y - n1.y;
      const currentLen = Math.hypot(dx, dy);

      // Store initial nominal length
      if (!m.nominalLen) m.nominalLen = currentLen;

      // Tensile / Compressive Strain delta
      const strain = Math.abs(currentLen - m.nominalLen) / m.nominalLen;
      
      // Calculate member stress based on node load forces
      const loadOnMember = (n1.forceY || 0) + (n2.forceY || 0);
      m.stress = Math.min(1.0, (loadOnMember * 0.18) + strain * 5);

      if (m.stress > this.maxStressPercent) {
        this.maxStressPercent = m.stress;
      }

      // Break member if overstress limit > 0.95
      if (m.stress >= 0.95 && Math.random() < 0.08) {
        m.broken = true;
        this.spawnWaterSplash((n1.x + n2.x)/2, (n1.y + n2.y)/2, '#ff6b00');
      }

      // Restore forces onto non-fixed nodes
      if (!n1.fixed) n1.y += (n1.forceY || 0) * 0.1;
      if (!n2.fixed) n2.y += (n2.forceY || 0) * 0.1;

      // Dampening force back to original Y position
      if (!n1.fixed && n1.y > 280) n1.y -= 0.5;
      if (!n2.fixed && n2.y > 280) n2.y -= 0.5;
    });

    // 3. Update Water Splash Particles
    this.particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;
      if (p.alpha <= 0) this.particles.splice(idx, 1);
    });

    this.updateHUD();
  }

  spawnWaterSplash(x, y, color = '#00f0ff') {
    for (let i = 0; i < 24; i++) {
      this.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 8,
        vy: -Math.random() * 6 - 2,
        radius: Math.random() * 4 + 2,
        color: color,
        alpha: 1.0
      });
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Render Sky & River Bank Terrain
    this.ctx.fillStyle = '#060911';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Abutment Concrete Piers
    this.ctx.fillStyle = '#1e293b';
    this.ctx.strokeStyle = '#334155';
    this.ctx.lineWidth = 2;

    // Left Abutment
    this.ctx.fillRect(0, 280, 70, 200);
    this.ctx.strokeRect(0, 280, 70, 200);

    // Right Abutment
    this.ctx.fillRect(530, 280, 270, 200);
    this.ctx.strokeRect(530, 280, 270, 200);

    // Water River
    const gradient = this.ctx.createLinearGradient(0, this.waterY, 0, this.height);
    gradient.addColorStop(0, 'rgba(0, 136, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 40, 90, 0.9)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(70, this.waterY, 460, this.height - this.waterY);

    // 2. Render Structural Members
    this.members.forEach(m => {
      if (m.broken) return;

      const n1 = this.nodes.find(n => n.id === m.n1);
      const n2 = this.nodes.find(n => n.id === m.n2);
      if (!n1 || !n2) return;

      this.ctx.beginPath();
      this.ctx.moveTo(n1.x, n1.y);
      this.ctx.lineTo(n2.x, n2.y);
      this.ctx.lineWidth = 5;

      // Color mapping based on stress
      if (m.stress < 0.35) {
        this.ctx.strokeStyle = '#00d294'; // Green - Low stress
      } else if (m.stress < 0.75) {
        this.ctx.strokeStyle = '#f59e0b'; // Yellow - Moderate tension
      } else {
        this.ctx.strokeStyle = '#ef4444'; // Red - Near failure!
      }

      this.ctx.stroke();
    });

    // 3. Render Nodes
    this.nodes.forEach(n => {
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, n.fixed ? 8 : 6, 0, Math.PI * 2);
      this.ctx.fillStyle = n.fixed ? '#ff6b00' : (this.selectedNode === n ? '#00f0ff' : '#ffffff');
      this.ctx.fill();
      this.ctx.strokeStyle = '#000000';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });

    // 4. Render Heavy Vehicle (Semi-Truck)
    const v = this.vehicle;
    this.ctx.save();
    this.ctx.translate(v.x, v.y);

    // Truck Body Frame
    this.ctx.fillStyle = v.isCollapsed ? '#ef4444' : '#ff6b00';
    this.ctx.fillRect(0, 0, v.width - 20, v.height - 10);
    this.ctx.strokeRect(0, 0, v.width - 20, v.height - 10);

    // Truck Cab
    this.ctx.fillStyle = '#0088ff';
    this.ctx.fillRect(v.width - 20, 8, 20, v.height - 18);

    // Wheels
    this.ctx.fillStyle = '#000000';
    this.ctx.beginPath();
    this.ctx.arc(15, v.height - 5, 8, 0, Math.PI * 2);
    this.ctx.arc(v.width - 15, v.height - 5, 8, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();

    // 5. Render Water Particles
    this.particles.forEach(p => {
      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  updateHUD() {
    const stressEl = document.getElementById('simMaxStress');
    const scoreEl = document.getElementById('simScore');
    const highScoreEl = document.getElementById('simHighScore');

    if (stressEl) {
      const pct = Math.round(this.maxStressPercent * 100);
      stressEl.textContent = `${pct}%`;
      stressEl.style.color = pct > 75 ? '#ef4444' : (pct > 40 ? '#f59e0b' : '#00d294');
    }

    if (scoreEl) scoreEl.textContent = this.score.toLocaleString();
    if (highScoreEl) highScoreEl.textContent = this.highScore.toLocaleString();
  }
}

// Global instance launcher
let globalSimulator = null;

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bridgeCanvas');
  if (canvas) {
    globalSimulator = new BridgeSimulator('bridgeCanvas');
  }
});

function simAccelerate(dir) {
  if (globalSimulator) globalSimulator.accelerateVehicle(dir);
}

function simJump() {
  if (globalSimulator) globalSimulator.jumpVehicle();
}

function simReset() {
  if (globalSimulator) globalSimulator.resetVehicle();
}
