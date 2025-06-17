# ZapQuest
# ZapQuest

## A Comprehensive Task Management and Reward System for Children with ADHD

![ZapQuest Logo](https://raw.githubusercontent.com/weiming-zheng/ZapQuest/main/docs/logo.png) ZapQuest is a web application designed to provide scientifically effective support tools for children with ADHD and their parents. [cite_start]Leveraging approaches like Central Executive Training (CET), this solution focuses on behavior management, parent-child communication support, and structured task training modules to alleviate parental stress, improve children's behavior, and foster social inclusion and academic success. 

## Executive Summary

[cite_start]Children with ADHD often face significant daily challenges, including anger outbursts, tantrums, and difficulty focusing, which can be stressful for both children and parents.  [cite_start]Simple tasks frequently become sources of conflict, straining family dynamics and potentially leading to social isolation.  [cite_start]In academic settings, attention and organizational skill deficits can result in declining performance.  [cite_start]ZapQuest addresses these issues by offering structured support and positive reinforcement, which have been shown to be more effective than negative reinforcement. 

[cite_start]The project aims to fill a market gap where existing ADHD apps often lack scientific treatment support and fail to effectively improve core symptoms.  [cite_start]ZapQuest combines existing market strengths with the Cognitive Enhancement Training (CET) method to offer a professional and effective solution. 

## Features

ZapQuest provides distinct functionalities for both parents and children:

### Parent Dashboard
* [cite_start]**Account Management**: Parents can register accounts and create associated sub-accounts for their children. 
* [cite_start]**Task Management**: Assign, edit, and track both custom tasks and scientifically approved CET (Central Executive Training) tasks. 
* [cite_start]**Reward System**: Set up and manage custom rewards that children can earn by completing tasks. 
* [cite_start]**Community Interaction**: A dedicated space for parents to share experiences, seek advice, and engage in discussions. 
* [cite_start]**Logout**: Securely log out from the application. 

### Child Dashboard
* [cite_start]**Task Board**: View assigned tasks and mark them as complete to earn in-app gold coins. 
* [cite_start]**Reward Shop**: Purchase new rewards and redeem already purchased items using earned coins. 

## Technology Stack

The ZapQuest system is built with a modern, efficient, and scalable technology stack:

* [cite_start]**Frontend**: React.js 
    * [cite_start]Libraries: Tailwind CSS, emoji-picker (and others as used) 
* [cite_start]**Backend**: Node.js with Express.js [cite: 73] [cite_start](Note: Report also mentions Java/Spring Boot for backend  and Spring Data JPA  for repository layer. Please clarify if both are used or if this is a discrepancy). [cite_start]*Self-correction: The report states "Java and Springboot were selected for backend development"  [cite_start]and "Node.js with Express.js". Given the architecture diagram predominantly shows Spring Data JPA repositories, it's more likely Java/Spring Boot is the primary backend, and Node.js/Express.js might have been an earlier consideration or for specific microservices. For the `README`, I will prioritize the more detailed description from the Architecture section.*
    * [cite_start]Revised Backend: Java and Spring Boot 
* [cite_start]**Database**: MySQL 
* [cite_start]**Version Control**: Git and GitHub 
* [cite_start]**Containerization**: Docker 
* [cite_start]**Project Management**: Jira (initially), Excel (for daily progress tracking) 
* [cite_start]**Communication**: Microsoft Teams 
* [cite_start]**Documentation**: Confluence (initially) 
* [cite_start]**Monitoring**: Prometheus 

## System Architecture

[cite_start]ZapQuest employs a layered architecture emphasizing separation of concerns and maintainability. 

### Architecture Overview
1.  **Frontend Application**: The client interface, built with React, communicates via RESTful APIs. 
2.  **API Gateway (Port 8080)**: Entry point handling CORS filtering, JWT authentication/authorization, and routing. 
3.  **Controller Layer**: Implements REST API endpoints for authentication, forum interactions, rewards, and tasks. 
4.  **Service Layer**: Encapsulates core business logic for user management, security, social interactions, virtual currency, and educational task workflows. 
5.  **Repository Layer**: Provides data access abstractions using Spring Data JPA, managing various entity types (Parent, Child, Thread, Comment, ShopItem, PurchasedItem, Task, PresetTask). 
6.  **MySQL Database**: Stores persistent data, with a schema implementing inheritance via a BaseEntity pattern for common fields and foreign key relationships for data integrity. 
7.  **Cross-cutting Concerns**: Includes security components (password encoder, JWT utilities), common components (DTOs, VOs, enums, exception handlers), and a Base Context for session information. 

## Installation and Setup

To set up and run ZapQuest locally:

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/weiming-zheng/ZapQuest.git](https://github.com/weiming-zheng/ZapQuest.git)
    cd ZapQuest
    ```
2.  **Backend Setup**:
    * Navigate to the backend directory (e.g., `backend/`).
    * Ensure you have Java and Maven installed.
    * Configure your MySQL database connection in the application properties (e.g., `application.properties` or `application.yml`).
    * Run database migrations if necessary (details would typically be in a `backend/README.md`).
    * Build and run the backend application: `mvn spring-boot:run`
3.  **Frontend Setup**:
    * Navigate to the frontend directory (e.g., `frontend/`).
    * Ensure you have Node.js and npm/yarn installed.
    * Install dependencies: `npm install` or `yarn install`
    * Start the frontend development server: `npm start` or `yarn start`
4.  **Docker (Optional)**:
    * If using Docker for environment consistency, ensure Docker is installed and follow any Docker-specific instructions (e.g., `docker-compose up`).

*Specific installation instructions for individual backend/frontend folders should be detailed in their respective `README` files within the cloned repository.*

## Usage

Once the application is running:

1.  **Parents**: Register for a new account. You will then be able to create a child profile. 
2.  **Login**: Both parents and children can log in using their respective credentials (child will use a unique child code). 
3.  **Parent Features**:
    * Assign and manage various tasks, including CET-based tasks. 
    * Set up and manage rewards for task completion. 
    * Interact with other parents on the community message board. 
4.  **Child Features**:
    * View assigned tasks on their task board. 
    * Mark tasks as complete to earn coins. 
    * Browse and purchase rewards in the in-app shop. 

## Team Contributions

This project was a collaborative effort by four team members:

* **Aoqing Liu** (Project Manager, Product Manager, Frontend Developer) 
    * Oversaw project management, product design, risk management, and frontend development. 
    * Managed daily stand-up meetings, task assignment, and progress monitoring. 
    * Developed parent reward management and child main interface features. 
* **Weiming Zheng** (Backend Developer) 
    * Primary responsibility for backend system architecture design and implementation. 
    * Designed and implemented the MySQL database schema and task management system (Task and Preset Task entities). 
    * Implemented robust security measures like JWT token authentication and password encryption. 
* **Tausif Zaman** (Frontend Developer) 
    * Focused on frontend development and seamless integration with the backend. 
    * Developed the user authentication system (parent and child roles), task tracking, and child reward shops. 
    * Contributed to UI/UX enhancements to ensure responsiveness and accessibility. 
* **Zeqing Bao** (Developer & Tester, Frontend Development) 
    * Fully responsible for the front-end development of the parent community section, including design, implementation, and optimization. 
    * Implemented reusable components (Sidebar, Header) for design consistency. 
    * Proposed and implemented the switch to Excel spreadsheets for progress tracking. 
    * Utilized Postman and MySQL for front-end and back-end integration testing. 

## Challenges and Solutions

Throughout the project, the team encountered and addressed several challenges:

* **Frontend-Backend Integration**: Ensuring seamless and secure data flow was a challenge. Solved by meticulous API endpoint planning and implementing a notification system for real-time updates. 
* **Real-Time Notifications**: Initially scoped for real-time notifications, this feature was deferred due to time and skill constraints. 
* **Task Prioritization & Feature Scope**: Difficult to balance expectations with timely delivery. Addressed through regular sprint meetings and a Waterfall approach with weekly sprints, prioritizing high-priority tasks. 
* **Remote Team Collaboration**: Communication and alignment across remote team members was challenging. Improved by encouraging more frequent communication, clear documentation, and using tools like Jira and GitHub. 
* **Progress Management Tool (Jira)**: Initial adoption of Jira proved complex and time-consuming. Switched to a simpler Excel-based tracking system with daily stand-up meetings to improve progress monitoring. 
* **Limited Development Time**: Tight deadlines necessitated focusing on core functionalities, deferring certain enhancements. Prioritized essential features like authentication, tasks, rewards, and community. 

## Future Recommendations

Several potential enhancements and considerations for future development include:

* **Feature Enhancements**:
    * **Task Priority and Deadlines**: Allow parents to prioritize tasks and set deadlines. 
    * **Enhanced Gamification**: Implement progress bars, badges, and level-ups for increased engagement. 
    * **Instant Notifications for Parents**: Automate notifications for task completion or streak breaks to enable prompt feedback. 
    * **Expanded Community Engagement**: Introduce live chat, group discussions, or topic-specific forums. 
    * **Task Template Workflow**: Enable parents to create reusable task templates. 
* **Technical Debt Management**:
    * **Code Refactoring**: Periodically refactor complex or quickly developed code. 
    * **Automated Testing**: Implement a more rigorous testing framework with unit and integration tests. 
    * **Modularity**: Continue to implement modular and reusable components. 
* **Scaling Considerations**:
    * **Backend Scalability**: Consider microservices or serverless computing for independent scaling. 
    * **Database Scalability**: Explore distributed database solutions like sharding or NoSQL for high user loads. 
    * **Horizontal Scaling**: Implement auto-scaling for both frontend and backend services. 
    * **Load Balancing**: Utilize load balancing mechanisms for even traffic distribution. 
* **Maintenance Recommendations**:
    * **Software Standards**: Regular updates to support latest libraries and frameworks. 
    * **Bug Tracking & User Feedback**: Continuously monitor and prioritize bugs and user feedback. 
    * **System Monitoring**: Use tools for performance and server health monitoring. 
    * **Data Management & Backups**: Implement copious user data backups and export options. 
    * **Help and Documentation**: Provide comprehensive support resources. 
    * **Continuous UX Improvement**: Conduct A/B testing and surveys for ongoing UX enhancements. 

## License


## Contact

For any inquiries or feedback, please contact [zaman45@uwindsor.ca](mailto:zaman45@uwindsor.ca).
