---
project_name: "Trochoidal Path Planning"
subtext: "Wind-aware, time-optimal path planning for fixed-wing uncrewed aerial vehicles."
group: "current_research"
photo: "/src/assets/images/research_projects/trochoidal-path-planning.png"
start_date: "2024-06-01"
# links:
#   - label: "Project site"
#     url: "https://bradymoon.com/trochoids/"
#   - label: "Paper"
#     url: "https://arxiv.org/pdf/2306.11845.pdf"
#   - label: "Code"
#     url: "https://github.com/castacks/trochoids"
---

### Time-Optimal Paths in Wind

Fixed-wing aircraft cannot simply follow the geometric shortest path when wind is present. Their motion through the air is constrained by a minimum turning radius, while wind continuously changes their motion over the ground. Trochoidal path planning provides an analytical way to find time-optimal paths for an uncrewed aerial vehicle traveling through a constant wind field.

### Fast Planning with Motion Constraints

Our previous work uses Dubins set classification to efficiently identify candidate trochoidal paths and select the best feasible solution. This gives a planner the speed and reliability needed for autonomous flight while respecting fixed-wing motion constraints and the effects of wind.

### Toward Onboard Deployment

We are currently improving this work for more capable planning and working toward onboard deployment on fixed-wing aircraft. Our ongoing efforts focus on making the planner more robust and practical for real flight missions, where fast replanning, vehicle limits, and changing operating conditions all matter.
