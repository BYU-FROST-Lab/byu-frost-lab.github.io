---
project_name: "Efficient Search and Track of Multiple Targets"
subtext: "Long-rage search and track of multiple targets in uncertain and dynamic environments leveraging machine learning and informative path planning methods."
group: "current_research"
photo: "/src/assets/images/research_projects/fastrack.jpeg"
start_date: "2026-02-01"
---

### Long-Horizon Planning for Multi-Target Tracking
This project develops a belief-space planning framework for long-horizon search and tracking of multiple targets using UAV-based sensors. Rather than planning over fully observed target states, the planner reasons directly over probabilistic tracking outputs—such as target existence and state uncertainty—to decide where and when to sense next. Online decision-making is performed using a shallow lookahead planner guided by learned policy and value models, enabling efficient long-term reasoning under uncertainty while meeting real-time constraints.

### Learning Under Uncertainty and Practical Integration
Training is carried out in simulation using a surrogate LMB-style multi-target tracker and realistic sensor models that capture missed detections, clutter, and track loss. Reinforcement learning optimizes sensing strategies using rewards that reflect information gain, tracking accuracy, continuity, and resource cost. By operating on tracker-agnostic belief summaries, the approach decouples planning from any specific tracking implementation, allowing seamless integration with existing industrial tracking systems and supporting robust, explainable autonomous sensing in complex environments.
