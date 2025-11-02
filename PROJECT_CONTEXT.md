# Martian Habitat Dashboard Project Context

## Overview
This is a CS track submission for the Divergent Teams DC Hackathon: a centralized smart dashboard for managing life-support systems in a Martian/Lunar habitat. Features real-time monitoring of oxygen, temperature, food, power, sleep, wellness, with alerts, user profiles, and a terminal for commands.

## Key Features
- **Real-time Charts**: Line charts for oxygen, interior/exterior temperature, sleep with time-based x-axes, scrolling trails.
- **Alerts System**: Dynamic alerts for anomalies including extreme exterior temperatures.
- **User Authentication**: Linux-inspired terminal with login, privileges (read/write/admin).
- **Terminal Commands**: Status, metrics, set values (privileged), alerts, users, diagnose, override, eject.
- **Decentralized Chat**: Gun.js-powered instant messaging for crew communication.
- **Documentation & Uplink**: Built-in system docs and Earth communication interface.
- **Dark Theme**: Pure black for OLED/E-INK power saving.
- **Glassmorphism**: Backdrop blur effects for futuristic UI.
- **Responsive Layout**: Logical sections: Alerts, Life Support, Resources, Crew Health, Profiles, Terminal.

## Technologies
- HTML5, CSS3 (Inter/Atkinson Hyperlegible fonts), JavaScript
- Chart.js with date adapter for time scales
- Gun.js for decentralized peer-to-peer chat
- No backend; simulated data with sine waves for smooth sliding

## File Structure
- `index.html`: Main dashboard HTML
- `styles.css`: Styling with dark theme, glass effects
- `script.js`: Logic for charts, data, terminal, users
- `about.html`: Aesthetic choices and implementation details
- `BRUTAL_FULL.md`: Full critique from judge agent
- `SENSOR_RATES.md`: Research on sensor update frequencies
- Other MD files: Guidance, research outputs

## Data Simulation
Uses sine waves with noise for realistic, clamped data:
- Oxygen: 20 + 0.5*sin(t*0.1) + noise (18-22%)
- Interior Temp: 10 + 5*sin(t*0.05) + noise (0-25°C)
- Exterior Temp: -10 + 30*sin(t*0.02) + noise (-60-40°C)
- Slower changes for stability

## Terminal Privileges
- Read: Basic metrics
- Write: Modify oxygen/temperature (Engineer+)
- Admin: Override, eject (Commander)

## History of Changes
1. Initial basic dashboard
2. Added terminal with commands
3. Switched to Atkinson font for accessibility
4. Added about page
5. Implemented authentication and privileges
6. Enhanced graphs with streaming, then reverted to time scales
7. Added smooth animations, trails with fill
8. Optimized for spacecraft: 1s updates, low power
9. Logical layout reorganization
10. Added terminal tabs: Commands, Documentation, Uplink
11. Implemented Gun.js decentralized chat system
12. Added interior and exterior temperature graphs
13. Improved data realism: clamped ranges, slower changes, added noise

## Aesthetic Choices
- Dark theme for power saving
- Glassmorphism for HUD adaptability
- Color palette: Blues, reds, greens
- Fonts: Atkinson for readability in visors

## Implementation Notes
- Charts update every 1s for efficiency
- Data points limited to 100 for memory
- Terminal supports multi-line output, history
- Responsive grid layout

## Future Enhancements
- NASA API integration
- WebSockets for real-time
- VR/AR support
- Sound alerts

This context allows another Grok to continue development seamlessly.</content>
</xai:function_call ><xai:function_call name="read">
<parameter name="filePath">/Users/tarushv.kosgi/Desktop/opencodegrokhakz/SENSOR_RATES.md