---
project_name: "Active Data Collection"
subtext: "We are developing novel semi-supervised machine learning algorithms that will allow AUVs to more efficiently plan their own paths based on actively inferred environmental patterns in combination with pre-embedded scientific knowledge."
group: "current_research"
photo: "/src/assets/images/research_projects/active-data-collection.jpg"
start_date: "2025-06-01"
---

### What is Active Data Collection?
Active data collection occurs when an autonomous underwater vehicle (AUV) actively seeks out items of interest in an environment in order to optimize its path of travel and collect as much useful data as possible. It contrasts with passive data collection, where data is simply collected as the vehicle travels along a pre-prescribed path.


### Why Active Data Collection?
The resources required to design, launch, and operate AUVs can cost up to millions of dollars per day. Once data has been collected by an AUV, additional time and assistance is also often required to hand-label and sort the data according to the focus of that particular project. These needs dictate the need for greater efficiency in terms of both operational time and information filtering. Thus, if an AUV can identify and explore only the most pertinent areas of a given environment, both the operational and analytical costs can be greatly reduced.

### Our Goal
We aim to develop algorithms through which AUVs can more efficiently plan their own paths for optimized data collection. Our concept combines the idea of spatiotemporal topic modeling presented by [Girdhar at al. (2014)](https://journals.sagepub.com/doi/abs/10.1177/0278364913507325) and multi-modal scientific information gathering presented by [Arora et al. (2019)](https://link.springer.com/article/10.1007/s10514-019-09836-5). This algorithm will be a semi-supervised machine learning algorithm that recognizes data correlated to scientific knowledge given to the robot a priori. Once recognized, the AUV will collect much more data of interest. With this improved algorithm, our AUVs will be able to plan their paths based both on updated correlations inferred from online sensor data as well as on scientific knowledge encoded on board. The beginnings of this work has been published in the ICRA 2024 Conference in a method known as "Guided-Gaussian Dirichlet Random Fields for Scientist-in-the-Loop Inference in Underwater Robotics."
