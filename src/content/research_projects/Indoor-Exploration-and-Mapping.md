---
project_name: "Exploration and Mapping"
subtext: "Single- and multi-agent exploration that uses predicted structure and semantic context to gather useful information efficiently in unfamiliar environments."
group: "current_research"
photo: "/src/assets/images/research_projects/indoor-exploration-mapping.png"
start_date: "2026-02-15"
# links:
#   - label: "MapEx project"
#     url: "https://mapex-explorer.github.io"
#   - label: "MapEx paper"
#     url: "https://arxiv.org/pdf/2409.15590"
#   - label: "MapExRL paper"
#     url: "https://arxiv.org/abs/2503.01548"
---

### Exploration with Predicted Structure

Robots exploring unfamiliar spaces must decide where to look next while building a map, avoiding obstacles, and operating with limited sensing and compute. Our work develops planning methods that use predictions of global structure and semantic context to prioritize observations that are likely to be informative. This lets a robot move beyond purely local frontier selection toward purposeful, long-horizon exploration.

### From Individual Robots to Teams

We study these problems for both single-robot and multi-robot systems. In a team, agents can divide work, share their observations, and coordinate their paths to cover environments more quickly while avoiding redundant sensing. We are interested in planning, map prediction, semantic representations, and communication strategies that make this coordination reliable in real environments.

### Dataset and Benchmark Development

We are currently building a large dataset and benchmark for indoor exploration. The benchmark will support systematic study of questions such as how agents should use predicted structure, how to evaluate the quality of information gathered, and when collaboration provides the greatest benefit. It will provide a common foundation for developing and comparing new approaches to long-horizon exploration and semantic mapping.
