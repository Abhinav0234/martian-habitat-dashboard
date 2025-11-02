# CS Project: Centralized Smart Dashboard for Martian/Lunar Habitat Management

## Project Overview

This project aims to develop a web-based centralized smart dashboard for monitoring and managing critical systems in a Martian or Lunar habitat. Inspired by NASA's Artemis program and Mars exploration concepts, the dashboard will simulate real-time data from habitat systems such as life support (air quality, temperature, pressure), power generation, communication, radiation levels, and emergency alerts. The goal is to provide an intuitive interface for habitat operators to visualize data, receive notifications, and make adjustments, demonstrating key principles of space habitat management. The project draws from Mars habitat research, including challenges like radiation shielding, in-situ resource utilization, and biodome technologies.

## Features Breakdown

- **Real-Time Monitoring**: Display live data feeds for habitat vitals, including air composition (O2, CO2 levels), temperature, pressure, power consumption, and radiation exposure.
- **Alert System**: Automated alerts for anomalies (e.g., low oxygen, high radiation, power failures) with visual and audio cues.
- **Data Visualization**: Interactive charts, gauges, and graphs using libraries like Chart.js for trends and historical data.
- **Control Interfaces**: Simulated controls for adjusting systems, such as ventilation, heating, or power allocation.
- **Simulation Mode**: Generate mock data to mimic habitat operations, including random events like dust storms or system failures.
- **Responsive Design**: Adaptable UI for different screen sizes, simulating use on tablets or control panels in a habitat.
- **Historical Logs**: Record and display past events for analysis.

## Technology Stack

- **HTML**: Structure the dashboard layout with semantic elements for accessibility.
- **CSS**: Styling for a futuristic, space-themed UI (dark backgrounds, glowing elements, responsive grids). Use CSS animations for smooth transitions.
- **JavaScript**: Core logic for data simulation, real-time updates, and interactivity. Leverage vanilla JS or libraries like Chart.js for visualizations.
- **No Backend**: Fully client-side for simplicity, with data stored in local storage or simulated in-memory.

## Data Simulation Plan

- **Data Sources**: Use JavaScript to generate synthetic data mimicking sensor inputs. For example:
  - Air quality: Random O2 levels between 19-21%, CO2 0.03-0.05%.
  - Temperature: Fluctuate between -80°C to 20°C based on "day/night" cycles.
  - Power: Simulate solar panel output affected by "dust storms" (random reductions).
  - Radiation: Baseline levels with spikes for "solar flares."
- **Update Frequency**: Refresh data every 1-5 seconds using setInterval for real-time feel.
- **Anomaly Injection**: Randomly trigger alerts (e.g., 10% chance per minute) to test response systems.
- **Persistence**: Store simulated historical data in arrays or localStorage for trend analysis.
- **Inspiration**: Based on Mars habitat studies, such as NASA's Mars Ice Home and biodome concepts, ensuring simulations reflect real challenges like temperature extremes and resource constraints.

## UI Design Ideas

- **Theme**: Dark, minimalist design with Martian red/orange accents (e.g., #8B0000 for alerts). Use glass-like effects with subtle shadows and transparencies for a modern, sci-fi aesthetic.
- **Layout**: Grid-based dashboard with sections for monitoring panels, alerts sidebar, and control panel. Central gauge cluster for key metrics.
- **Visual Elements**: Circular gauges for levels (e.g., pressure, power), line charts for trends, status icons (green/yellow/red for normal/warning/critical).
- **Interactivity**: Hover effects, clickable controls, and modal popups for detailed views. Smooth animations for data updates.
- **Accessibility**: High contrast, keyboard navigation, and screen reader support.
- **Inspiration**: Draw from NASA's 3D Printed Habitat Challenge winners (e.g., Mars Ice Home) and space UI concepts, emphasizing clarity for high-stress environments.

## Development Roadmap

1. **Setup and Planning (Week 1)**: Create project directory, initialize HTML/CSS/JS files, and outline component structure. Research and incorporate Mars habitat inspirations.
2. **Basic UI Structure (Week 2)**: Build HTML skeleton and apply initial CSS styling. Implement responsive layout and basic navigation.
3. **Data Simulation Core (Week 3)**: Develop JS functions for generating and updating mock data. Add basic display elements (e.g., text readouts).
4. **Visualization and Alerts (Week 4)**: Integrate Chart.js for graphs and gauges. Implement alert logic with visual/audio feedback.
5. **Controls and Interactivity (Week 5)**: Add simulated control interfaces and user interactions. Refine animations and transitions.
6. **Testing and Refinement (Week 6)**: Test across devices, fix bugs, and polish UI. Add documentation and demo scenarios.
7. **Finalization**: Ensure code is clean, add comments, and prepare for presentation. Optional: Extend with advanced features like multi-user simulation.

This roadmap allows for iterative development, starting simple and building complexity. Total estimated time: 6-8 weeks for a functional prototype.