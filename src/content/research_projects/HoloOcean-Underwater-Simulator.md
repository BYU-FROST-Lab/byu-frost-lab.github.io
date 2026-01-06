---
project_name: "HoloOcean Underwater Simulator"
subtext: "Built on Unreal Engine 5, our simulator accurately models sonar, buoyancy, acoustic communications and more."
group: "current_research"
photo: "/src/assets/images/research_projects/holo_ocean.jpg"
start_date: "2025-08-01"
---

### Why Develop a Simulator?
Robotic algorithms tend to be difficult to develop, requiring multiple iterations and attempts to perfect an implementation. These problems are exacerbated when doing underwater robotics due to the high cost of failure, time and expense required to conduct field trials, and complex and noisy sensor modalities available in the underwater domain. This makes an accurate simulator a must for underwater robotics.

### HoloOcean
We are currently developing HoloOcean for this purpose. It is an open-source underwater simulator built on Unreal 5 and based upon HoloDeck. Unreal Engine 5 gives us the flexibility to leverage community-made underwater environments, while still being able to implement sensors models in C++ for fast execution.

HoloOcean is open-source, has a simple python interface, and implements all of the following features out of the box:

* Multi-agent systems
* Acoustic and Optical Communications
* Realistic Sonar Implementations for:
  * Imaging (or Forward-looking) Sonar
  * Side Scan Sonar
  * Multibeam Profiling Sonar
  * Echo Sounders
* High-fidelity Camera Imagery
* Common Underwater Navigational Sensors, including:
  * Doppler Velocity Log
  * Depth Sensors
  * Inertial Measurement Units
  * Magnetometer
  * Pose Sensors
* Various Underwater Agents
* Various Realistic Testing Environments/Worlds
Check out our documentation and get started here.

Check out our documentation and get started [here](https://holoocean.readthedocs.io/en/master/).
