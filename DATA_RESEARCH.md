# Martian Habitat Sensor Data Research

## Overview
This document compiles research on realistic sensor data ranges for a Martian habitat, including oxygen levels, temperature, food inventory, power usage, sleep cycles, and mental wellness. It also includes sample datasets and generation methods.

## Oxygen Levels
- **Atmospheric Composition**: Mars' atmosphere is primarily CO2 (95%), with trace oxygen (0.174%).
- **Habitat Range**: Maintained at Earth-like levels, e.g., 20% oxygen, 40% argon, 40% nitrogen to avoid fire risks.
- **Realistic Sensor Range**: 19-23% O2 for safety, with alerts below 19% or above 23%.
- **Sources**: Wikipedia - Atmosphere of Mars, Mars Habitat.

## Temperature
- **Surface Range**: Average -80°F (-62°C), equator summer high 70°F (21°C), winter low -195°F (-126°C).
- **Habitat Range**: Maintained at 20-25°C (68-77°F) for comfort, similar to Earth.
- **Realistic Sensor Range**: 15-30°C, with alerts outside 18-27°C.
- **Sources**: NASA Mars Facts, Mars Habitat Wikipedia.

## Food Inventory
- **Mission Planning**: Food supplies planned for years, using dehydrated, freeze-dried items.
- **Habitat Features**: Potential for in-situ production via plants like duckweed (Lemna minor) or water fern (Azolla filiculoides), which grow rapidly and provide nutrition.
- **Realistic Sensor Range**: Inventory in calories or days of supply, e.g., 2000-3000 calories/day per person, monitored for depletion.
- **Sources**: Wikipedia - Mars Habitat, Food for Mars Missions (404, inferred from habitat).

## Power Usage
- **Sources**: Solar panels, nuclear (RTG or fission), beamed power.
- **Challenges**: Dust accumulation, dust storms reducing efficiency by 25-50%.
- **Realistic Sensor Range**: 1-10 kW for habitat, depending on size; solar output 0.5-5 kW/m².
- **Sources**: Wikipedia - Solar Power on Mars, Mars Habitat.

## Sleep Cycles
- **Astronaut Experience**: Average 6 hours/night in space, reduced from Earth norms.
- **Factors**: Circadian desynchronization due to 16 sunrises/day, noise, discomfort.
- **Realistic Sensor Range**: 4-8 hours sleep, with monitoring for fatigue via actigraphy or EEG.
- **Sources**: Wikipedia - Sleep in Space.

## Mental Wellness
- **Effects**: Isolation, confinement, radiation, circadian disruption lead to stress, depression.
- **Assessment**: Scales like PHQ-9 for depression, GAD-7 for anxiety.
- **Realistic Sensor Range**: Subjective, but monitored via self-reports or physiological proxies (heart rate variability).
- **Sources**: Psychology of Spaceflight (404), inferred from sleep and habitat articles.

## Sample Datasets
- **Kaggle Datasets**: 
  - Mars Weather Data (from InSight lander): Temperature, pressure, wind.
  - Mars Rover Logs: Operational data.
  - Synthetic Mars Sensor Data: Generated datasets for simulation.
- **NASA Open Data**: Mars mission telemetry, e.g., Curiosity rover data.
- **Generation Methods**: Use Python libraries like NumPy, Pandas to create synthetic time-series data.
  - Example: `import numpy as np; oxygen = np.random.normal(21, 0.5, 1000)` for O2 levels.
  - For time-series: Use `pd.date_range` for timestamps, add noise for realism.

## Generation Methods
- **Synthetic Data**: Use statistical models (e.g., Gaussian for stable ranges, Poisson for events).
- **Simulation Tools**: MATLAB/Simulink or Python (SciPy) for habitat models.
- **Machine Learning**: Generate via GANs for complex patterns.
- **Realistic Constraints**: Incorporate diurnal cycles, dust storms, etc., based on Mars data.