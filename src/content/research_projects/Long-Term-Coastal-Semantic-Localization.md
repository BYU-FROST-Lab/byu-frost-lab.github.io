---
project_name: "Long-Term Coastal Semantic Localization"
subtext: "Comparing current observations of coastline environments to previously made predictions in order to achieve localization with respect to semantically labeled maps that may be outdated, expanding the possibilities of coastal monitoring in GPS-denied situations."
group: "current_research"
photo: "/src/assets/images/research_projects/semantic-localization.jpeg"
start_date: "2024-12-01"
---

Coastlines present a new long-term dynamic localization challenge with natural features in contrast to the well-studied dynamic SLAM problem applied to indoor environments. Recent works regarding indoor localization implement the use of semantically annotated features to reduce computational load and improve information transfer when multiple agents are present. However, localization in coastal environments specifically can prove difficult due to long-term changes along coastlines such as varying tides, seasonal changes in vegetation, and new construction of buildings. While several studies explore methods for coastline prediction, few apply coastline prediction to robot localization.

Our goal is to compare current observations of coastline environments to previously made predictions in order to perform localization with respect to semantically labeled maps that may be outdated. For example, a robot would create a map during low tide, predict which features would be lost during high tide, then correctly localize itself with respect to the old map using the predicted map and observed features. As a result, accurate localization would expand the possibilities of coastal monitoring in GPS-denied situations.

<!-- TODO: ADD IMAGES!! -->
