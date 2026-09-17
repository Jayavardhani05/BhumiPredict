# BhumiPredict

## AI-Enabled Decision Support & Geospatial System for Land Acquisition Delay Prevention

BhumiPredict is an AI-enabled decision support and geospatial platform designed to help identify, monitor, and prevent delays in land acquisition projects.

The platform provides a centralized dashboard for monitoring acquisition projects, assessing project risks, visualizing geographic information, and supporting decision-making through data-driven insights.

## 🚀 Live Demo

🌐 **Live Website:**  
https://bhumi-predict.vercel.app/

## 🎯 Problem Statement

Land acquisition projects can experience significant delays due to multiple factors such as:

- Documentation and verification issues
- Compensation-related delays
- Legal and ownership disputes
- Administrative bottlenecks
- Geographic and location-based challenges
- Delayed coordination between stakeholders

BhumiPredict aims to provide an early-warning and decision-support mechanism to help authorities identify potential delays and take preventive action.

## 💡 Solution

BhumiPredict combines:

- 📊 Project monitoring
- 🤖 Predictive risk analysis
- 🗺️ Geospatial visualization
- ⚠️ Risk identification
- 📋 Task and workflow management
- 👤 Officer and stakeholder management
- 📈 Decision-support dashboards

The system provides a unified interface for monitoring land acquisition projects and identifying projects that may require early intervention.

## ✨ Key Features

### 📊 Dashboard

Provides an overview of:

- Total projects
- Active projects
- High-risk projects
- Project progress
- Risk distribution
- Recent project activities

### 🗺️ Risk Map

Provides a geographic visualization of land acquisition projects and their associated risk information.

The map interface helps users understand the spatial distribution of projects and identify areas that may require attention.

### ⚠️ Risk Assessment

Projects can be monitored based on different risk indicators such as:

- Documentation status
- Legal issues
- Compensation status
- Administrative delays
- Overall project progress

### 📁 Project Management

Users can view project information including:

- Project name
- Location
- Project status
- Progress
- Risk level
- Assigned officers
- Important project details

### 👨‍💼 Officer Management

The prototype provides officer-related information and supports the assignment and monitoring of responsibilities.

### 📋 Task Management

Tasks can be monitored to help track pending activities and improve coordination between stakeholders.

## 🏗️ System Architecture

```text
                 ┌─────────────────────┐
                 │      User / Officer │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │  BhumiPredict UI    │
                 │   React + Vite      │
                 └──────────┬──────────┘
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
      ┌────────────┐ ┌────────────┐ ┌─────────────┐
      │ Dashboard  │ │ Risk Map   │ │  Projects   │
      └────────────┘ └────────────┘ └─────────────┘
             │              │              │
             └──────────────┼──────────────┘
                            ▼
                 ┌─────────────────────┐
                 │ Decision Support &  │
                 │ Risk Analysis Layer │
                 └─────────────────────┘
