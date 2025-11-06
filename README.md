# 🎰 Lucky Draw Slot Machine

A sleek mobile slot machine for lucky draws featuring Apple iOS glassmorphism design, haptic feedback simulation, confetti effects, and a prize history panel.

![iOS Glassmorphism Design](https://img.shields.io/badge/Design-iOS%20Glassmorphism-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## ✨ Features

### Core Functionality
- 🎲 **Probability-based Prize Distribution**
  - 58獎金: 80%
  - 168獎金: 10%
  - 馬逼簽名: 8%
  - 666獎金: 2%
- 📱 **Mobile-responsive Design**
- 📊 **Spin Counter Tracking**

### Visual Design
- 🎨 **Apple iOS Glassmorphism**
  - Frosted glass backdrop blur effects
  - Translucent backgrounds
  - Subtle white borders
  - Layered shadows with inset highlights
  - Light reflection gradients
- 🌈 **Red & Black Gradient Background**
- ⭐ **Animated Sparkle Background** with rotating stars

### Advanced Features
- 📳 **Haptic Feedback Simulation**
  - Shake animation on button press
  - Subtle pulse during spinning
  - Feedback on winning
- 🎊 **Confetti Explosion Effects**
  - 20-50 particles based on prize rarity
  - Color-matched to prize type
  - Smooth falling animation
- 🌓 **Dynamic Glass Tint Transitions**
  - Light mode (default)
  - Dark mode (during spin)
  - Winning mode (celebration)
  - Smooth 500ms transitions
- 📜 **Prize History Panel**
  - Glass card design
  - Shows last 10 results
  - Timestamp for each draw
  - Slide-in animations
  - Toggle show/hide button
  - Scrollable list

### Animations
- 🎬 Spinning slot animations with blur effects
- 💫 Indicator lights during spinning
- ✨ Slot-stop animations with dramatic timing
- 🌟 Result display with shimmer effect
- 🎭 Smooth hover and transition effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/devme3me-cell/lucky-draw-slot-ios.git
cd lucky-draw-slot-ios

# Install dependencies
bun install

# Run the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Build Tool**: Turbopack
- **Package Manager**: Bun

## 📁 Project Structure

```
lucky-draw-slot/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── SlotMachine.tsx      # Main slot machine component
│   │   └── ui/
│   │       └── button.tsx       # Reusable button component
│   └── lib/
│       └── utils.ts             # Utility functions
├── public/                       # Static assets
├── .same/                        # Project documentation
└── ...config files
```

## 🎮 How to Use

1. Click the **"開始抽獎"** (Start Draw) button
2. Watch the slots spin with haptic feedback
3. Enjoy the confetti explosion when you win
4. Check your prize in the result display
5. View your draw history by clicking **"查看紀錄"** (View History)

## 🎨 Design Philosophy

This project showcases modern web design principles:

- **Glassmorphism**: Inspired by Apple's iOS design language
- **Micro-interactions**: Subtle animations enhance user experience
- **Accessibility**: Smooth transitions and clear visual feedback
- **Performance**: Optimized animations with CSS and React

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with [Same](https://same.new)

---

⭐ Star this repository if you found it helpful!
