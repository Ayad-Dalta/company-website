# ApexBridge | Heavy Civil & Structural Engineering Platform

![ApexBridge Banner](https://img.shields.io/badge/ApexBridge-Structural%20%26%20Civil%20Engineering-1e293b?style=for-the-badge&logo=bridge&logoColor=f97316)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**ApexBridge** is a web application designed for structural engineering consultancy, certified heavy construction material procurement, real-time FEA load calculation, and interactive bridge physics simulation. It also features dedicated technical case studies detailing major mega-infrastructure projects, including the **Mosul Dam Geotechnical Stabilization** and the reconstruction of **Mosul's 5 Strategic Tigris River Fixed Bridges**.

---

## 🌟 Key Features

### 🌉 1. Real-Time Bridge Physics Simulator
- **Canvas 2D Physics Engine**: Solves truss element compression and tension under dynamic vehicle loads (semi-truck load testing).
- **Live Stress Visualization**: Elements update color in real time based on strain percentage (Blue: Normal, Orange: High Stress, Red: Critical/Failure).
- **Preset Configurations**: Test standard Howe Truss, Pratt Truss, Warren Truss, and Cable-Stayed bridge designs.
- **Customization & Controls**: Adjust vehicle speed, axle load weight (tons), and material strength class on the fly.

### 🛒 2. Certified Heavy Bridge Materials Shop
- **Procurement Catalog**: Browse certified structural steel beams (ASTM A572 Grade 50), high-performance prestressed concrete girders, elastomeric seismic bearings, high-tensile stay cables, and modular expansion joints.
- **Product Filtering & Specs**: Filter by material category, view detailed technical specification sheets (yield strength, fatigue limits, corrosion resistance) in a modal window.
- **Interactive Shopping Cart**: Full drawer cart system with real-time total calculations, quantity adjustments, and simulated purchase checkout flow.

### 🧮 3. Structural Engineering Estimator & Calculator
- **Instant Engineering Math**: Computes Maximum Bending Moment ($M_{max}$), Maximum Shear Force ($V_{max}$), Deflection ($\delta$), and Required Steel Tonnage.
- **Custom Parameter Inputs**: Supports span lengths (10m - 500m), target vehicle load limits (10t - 200t), and structural material grades.

### 🏛️ 4. Mega-Project Infrastructure Case Studies
- **Mosul Dam Geotechnical Stabilization**: Detailed breakdown of the deep curtain grouting operation, karstic limestone remediation, and continuous structural health monitoring.
- **Mosul 5 Fixed Tigris River Bridges**: Dedicated case study page (`mosul-bridges.html`) documenting post-conflict reconstruction of the Old Bridge (Iron Bridge), Al-Hurriya Bridge, Al-Muthanna Bridge, Al-Jamhouriya Bridge, and the Fifth Bridge.

### 🌙 5. Modern Glassmorphism UI & Theme Engine
- **Dark/Light Mode**: One-click theme toggle using HSL color tokens stored in CSS variables.
- **Responsive Layout**: Designed for seamless accessibility across mobile devices, tablets, and desktop displays.
- **RFQ Modal**: Integrated Request for Quotation and consultation booking system.

---

## 📁 Project Structure

```
bridge-material-website/
│
├── index.html            # Main portal (Hero, Services, Shop, Calculator, Simulator, Mosul Dam)
├── mosul-bridges.html    # Dedicated Case Study: Mosul's 5 Strategic Tigris River Bridges
│
├── css/
│   └── styles.css        # CSS Design system, HSL color tokens, dark/light themes, UI layout
│
├── js/
│   ├── app.js            # Core application controller, theme switcher, modal management, RFQ
   ├── calculator.js     # Structural load, bending moment & material estimator logic
   ├── data.js           # Central dataset (materials, services, presets, case studies)
   ├── shop.js           # E-commerce store logic, product tech specs modal, shopping cart
   └── simulator.js      # HTML5 Canvas 2D physics solver & bridge stress engine
│
└── .gitignore            # Git ignore rules
```

---

## 🚀 Getting Started

No build tools or server setup are required. You can run the platform natively in any modern browser:

### Option 1: Direct File Launch
Simply double-click `index.html` or open it in your preferred web browser (Chrome, Firefox, Edge, Safari).

### Option 2: Local Development Server
Using Python's built-in HTTP server:
```bash
# Python 3
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

Using VS Code Live Server extension:
- Right-click `index.html` and select **"Open with Live Server"**.

---

## 🛠️ Technical Stack

- **Frontend**: Standard HTML5 & Semantic Elements
- **Styling**: Vanilla CSS3 (Custom Properties, Flexbox, CSS Grid, Backdrop Blur Glassmorphism)
- **Scripting**: Vanilla JavaScript (ES6 Modules & Event-driven Architecture)
- **Graphics**: HTML5 Canvas 2D Rendering Context
- **Icons**: FontAwesome 6.5.1

---

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
