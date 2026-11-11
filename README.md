# SAJFarm — Agro E-Commerce Web Platform

Welcome to **SAJFarm**, a dedicated e-commerce web platform for farm-raised broilers, livestock, and fresh meat delivery across South-West Nigeria (**Lagos State**, **Ogun State**, and **Ibadan**).

---

## 🌟 Key Features Built

### 1. Interactive Broiler Customizer & Dynamic Pricing
- **Weight-Based Dynamic Pricing**:
  - *Standard Broiler (1.8kg – 2.0kg)*: ₦6,500
  - *Medium Premium Broiler (2.1kg – 2.4kg)*: ₦7,800 *(Most Popular)*
  - *Large Family Broiler (2.5kg – 2.8kg)*: ₦9,200
  - *Super Jumbo Broiler (3.0kg – 3.4kg)*: ₦10,800
- **Preparation & Dressing Preferences**:
  - **Live Bird**: Delivered alive in sanitized, ventilated crates.
  - **Kill & Defeather**: Halal-slaughtered, scalded, defeathered spotless, gutted, and rinsed with clean treated water (+₦500).
  - **Kill, Defeather & Cut into Pieces**: Slaughtered, dressed, and portioned into **4**, **8**, **12**, or **16 pieces** for your cooking convenience (+₦800).
- **Offals & Gizzard Option**:
  - Option to clean, degrease, and package gizzard, liver, and heart separately.
- **Quantity & Live Weight Calculation**: Real-time estimated weight and total price in Nigerian Naira (₦).

---

### 2. South-West Regional Delivery & Smart Van Accessibility Check
- **Strictly Limited Coverage**: Delivery is restricted to:
  - **Lagos State**: Mainland & Island LGAs/Zones (Ikeja, Lekki, Surulere, Yaba, Gbagada, Magodo, Ajah, etc.)
  - **Ogun State**: Abeokuta, Sagamu, Mowe/Ibafo corridor, Sango-Ota, Ijebu-Ode.
  - **Ibadan (Oyo State)**: Bodija, Ring Road, Oluyole, Jericho, Akobo, UI, Dugbe.
- **Doorstep Address + Mandatory Van Fallback Landmark**:
  - Customers provide their exact primary doorstep address.
  - **Mandatory Requirement**: If the delivery van cannot drive into narrow streets, closed estate gates, or unpaved muddy roads, the customer **must** provide a van-accessible fallback landmark (e.g., Estate Main Gate, nearest Filling Station, Junction, or School) for handover.

---

### 3. Live Real-Time Order Tracking
- Track any order using **Tracking ID** (e.g., `SAJ-8942-LG`) or customer phone number.
- **Live 6-Step Timeline**:
  1. *Order Confirmed & Logged*
  2. *Bird Selection & Weight Certification*
  3. *Slaughter, Defeathering & Portioning (or Crating)*
  4. *Chilled Box Packaging & Loading*
  5. *Out for Delivery in Refrigerated Van*
  6. *Delivered to Doorstep / Landmark*
- **Van Driver Profile Card**: Shows driver name, contact phone, delivery van plate number, and estimated arrival time.
- **Fallback Landmark Highlight**: Reminds the driver and customer where to meet if street access is restricted.
- **WhatsApp Integration**: One-click WhatsApp button to message farm logistics directly.

---

### 4. Upcoming Catalog & Waitlist Showroom
- **Frozen Meats**: Blast-frozen whole chicken, prime turkey wings/drumsticks, farm pork chops & ribs.
- **Farm Livestock**: Ileya / festive rams (Balami/Uda), full-grown cattle/cows (White Fulani), meat rabbits (Flemish Giant), meat goats (Boer/Sahel), and market pigs.
- **Pre-Order / Waitlist Modal**: Allows customers to register interest, preferred state, and quantity.

---

### 5. Farm Dispatch Admin Dashboard
- Switch to the **Farm Dispatch Hub** view to manage active orders.
- Advance any order through the lifecycle stages (`Order Confirmed` ➔ `Weighed` ➔ `Dressed & Cut` ➔ `Van Dispatched` ➔ `Delivered`) to see the live customer tracking update in real time.
- Filter by state (All, Lagos, Ogun, Ibadan) and search by customer name or phone.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Running Locally
```bash
# Navigate to the project directory
cd c:\Users\SAJ\SAJFarm

# Start the Vite development server
npm run dev
```

Open your browser at:
```
http://localhost:3000
```

### Production Build
```bash
npm run build
```
The compiled, optimized production files are generated in the `dist/` directory, ready to deploy to Vercel, Netlify, or any static hosting service.
