# Intelligent-Registration-Form-Frugal-Testing


# 📝 Intelligent Registration System

## Project Overview

This project implements an **Intelligent Registration System** as a single-page web application using HTML, CSS, pure JavaScript and Playwright Automation testing. The goal is to provide a robust, responsive, and highly validated client-side form, demonstrating complex front-end logic without relying on any backend services.

The project was created to fulfill a Web Portal Development prompt, focusing heavily on client-side validation, dynamic interactions, and submission simulation.

## ✨ Features

The form incorporates several "intelligent" features to enhance user experience and data quality:

* **Responsive Design:** Ensures the form is accessible and usable across various screen sizes (mobile and desktop).
* **Dynamic Location Dropdowns:** State and City options update in real-time based on the Country selection.
* **Comprehensive Client-Side Validation:** All required fields are validated using JavaScript before submission.
* **Submit Control:** The submit button is disabled until **all** required fields meet validation criteria.
* **Real-time Visual Feedback:** Invalid fields are highlighted in red with inline error messages.
* **Smart Validation Rules:**
    * **Disposable Email Blocklist:** Rejects emails from temporary/disposable domains (e.g., `mailinator.com`).
    * **Country-Code Phone Check:** Validates the phone number format based on the selected country's simulated code (e.g., requires "1" for USA/Canada).
    * **Password Strength Meter:** Provides dynamic, visual feedback (Weak, Medium, Strong) as the user types.
    * **Password Matching:** Requires the Confirm Password field to exactly match the Password field.
* **Submission Simulation:** Displays a success message and resets the form upon successful validation.

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Form structure and semantics. |
| **CSS3** | Styling and responsive layout. |
| **Vanilla JavaScript** | All client-side validation, dynamic logic, and form submission handling. |
| **PlayWright** | Automation testing for all validations. |


## 🚀 Getting Started

This project is a single-page solution and requires no build steps or dependencies.

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/Bhanu8199/Intelligent-Registration-Form-Frugal-Testing.git](https://github.com/Bhanu8199/Intelligent-Registration-Form-Frugal-Testing.git)
    ```
2.  **Navigate to the Project Directory:**
    ```bash
    cd Intelligent-Registration-Form-Frugal-Testing
    ```
3.  **Open the File:**
    Open the primary HTML file (usually `index.html` or similar) directly in any modern web browser.

### Usage

1.  Fill out the required fields.
2.  Observe the real-time validation and the status of the Submit button.
3.  Once all fields are valid, click **Register** to trigger the submission simulation and success alert.

## 🔗 Repository Link

[https://github.com/Bhanu8199/Intelligent-Registration-Form-Frugal-Testing](https://github.com/Bhanu8199/Intelligent-Registration-Form-Frugal-Testing)
