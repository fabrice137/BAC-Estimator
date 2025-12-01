# BAC Estimator

A modern, responsive web application designed to estimate Blood Alcohol Content (BAC) based on individual factors and alcohol consumption. Built with React and Vite.

🔗 **Live Demo:** [https://bac.haguma.com/](https://bac.haguma.com/)

## 📋 Overview

The BAC Estimator provides users with a quick way to estimate their Blood Alcohol Content. By inputting personal details like weight and gender, along with the number and type of drinks consumed, the application calculates an estimated BAC percentage and provides a rough estimate of the time required to sober up.

**Note:** This tool uses standard formulas (like the Widmark Formula) for estimation. It is **not** a substitute for a professional breathalyzer or medical advice.

## ✨ Features

*   **Personalized Estimation:** Calculates BAC based on weight, gender, and time elapsed since the first drink.
*   **Flexible Drink Input:**
    *   **Presets:** Quickly add common drinks like Beer, Wine, Spirits, and Cocktails.
    *   **Manual Entry:** Add custom drinks by specifying volume (ml) and Alcohol By Volume (ABV %).
*   **Real-time Results:** Instantly updates estimates as you modify inputs.
*   **Sobering Time:** Estimates the time required for BAC to return to 0.00%.
*   **Data Persistence:** Remembers your weight and gender settings using local storage for convenience on return visits.
*   **Responsive Design:** Works seamlessly on desktop and mobile devices.
*   **Safety Warnings:** Includes visual cues and warnings based on the estimated BAC level.

## 🛠️ Tech Stack

*   **Frontend Framework:** [React](https://react.dev/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** CSS3 (Custom properties for theming)
*   **State Management:** React Hooks (`useState`, `useEffect`)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v14 or higher recommended)
*   npm (Node Package Manager)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/FabHaguma/BAC-Estimator.git
    cd BAC-Estimator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## ⚠️ Disclaimer

**PLEASE READ CAREFULLY:**

This application is for **informational and educational purposes only**. The results provided are rough estimates based on general formulas and averages. They **cannot** account for individual metabolic rates, food consumption, medication, genetic factors, or other variables that significantly affect Blood Alcohol Content.

*   **DO NOT** use this tool to determine if you are fit to drive or operate machinery.
*   **DO NOT** rely on this tool for legal purposes.
*   The only safe BAC for driving is **0.00%**.
*   Never drink and drive.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
