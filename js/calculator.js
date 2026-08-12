/**
 * ApexBridge Real-Time Structural Engineering & Material Estimator
 */

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
});

function initCalculator() {
  const calcInputs = ['calcSpanLength', 'calcLoadClass', 'calcBridgeType', 'calcSteelGrade'];
  calcInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', calculateBridgeSpecs);
      el.addEventListener('change', calculateBridgeSpecs);
    }
  });

  calculateBridgeSpecs();
}

function calculateBridgeSpecs() {
  const spanEl = document.getElementById('calcSpanLength');
  const loadEl = document.getElementById('calcLoadClass');
  const typeEl = document.getElementById('calcBridgeType');
  const gradeEl = document.getElementById('calcSteelGrade');

  if (!spanEl || !loadEl || !typeEl || !gradeEl) return;

  const span = parseFloat(spanEl.value) || 50; // meters
  const loadClass = loadEl.value; // hl93, cooper, urban
  const bridgeType = typeEl.value; // plate-girder, warren-truss, cable-stayed, box-girder
  const steelGrade = gradeEl.value;

  // Load multiplier factors based on AASHTO LRFD
  let loadFactor = 1.0;
  if (loadClass === 'cooper') loadFactor = 1.65; // Heavy Rail
  if (loadClass === 'urban') loadFactor = 0.75; // Light Urban

  // Depth-to-Span ratio multipliers per structural type
  let depthFactor = 0.055; // default plate girder L/18
  if (bridgeType === 'warren-truss') depthFactor = 0.08; // L/12.5
  if (bridgeType === 'cable-stayed') depthFactor = 0.035; // Deck depth
  if (bridgeType === 'box-girder') depthFactor = 0.045; // L/22

  // Steel Weight per meter calculation (empirical AASHTO formula curve)
  const requiredDepthMeters = span * depthFactor;
  const momentOfInertia = Math.pow(span, 3) * loadFactor * 14500; // cm^4 approx
  const steelWeightTons = Math.round((Math.pow(span, 1.45) * 1.85 * loadFactor));
  const concreteVolumeM3 = Math.round(span * 8.5 * (bridgeType === 'box-girder' ? 1.4 : 1.0));

  // Steel Price per ton base $2,450
  let steelCostPerTon = 2450;
  if (steelGrade === 'hps70w') steelCostPerTon = 3100;
  if (steelGrade === 'a572') steelCostPerTon = 2100;

  const estimatedSteelCost = steelWeightTons * steelCostPerTon;
  const estimatedConcreteCost = concreteVolumeM3 * 220; // $220/m3
  const totalCost = estimatedSteelCost + estimatedConcreteCost;

  // Render to UI
  setCalcMetric('resGirderDepth', `${requiredDepthMeters.toFixed(2)} meters (${(requiredDepthMeters * 3.28084).toFixed(1)} ft)`);
  setCalcMetric('resInertia', `${(momentOfInertia / 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })} x 10³ cm⁴`);
  setCalcMetric('resSteelWeight', `${steelWeightTons.toLocaleString()} Metric Tons`);
  setCalcMetric('resConcreteVol', `${concreteVolumeM3.toLocaleString()} m³`);
  setCalcMetric('resTotalCost', `$${totalCost.toLocaleString('en-US', { minimumFractionDigits: 0 })}`);

  // Store active estimate for one-click add to cart
  window.lastCalcEstimate = {
    span,
    steelWeightTons,
    steelGrade,
    estimatedSteelCost
  };
}

function setCalcMetric(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function addCalculatedSteelToCart() {
  if (!window.lastCalcEstimate) return;

  const { steelWeightTons, steelGrade } = window.lastCalcEstimate;
  
  // Find matching product in catalog or default to mat-001
  const product = APEX_DATA.products.find(p => p.id === 'mat-001') || APEX_DATA.products[0];
  
  addToCart(product.id, steelWeightTons);
  showToast(`Added ${steelWeightTons} Metric Tons of ${product.materialGrade} to your cart!`, 'success');
}
