# GradToPro React Application

This is a React conversion of the code.html file. Every section has been converted to React components exactly as they were in the original HTML.

## Project Structure

```
industryready-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── HeroSection.js
│   │   ├── ProblemSection.js
│   │   ├── PlatformEcosystem.js
│   │   ├── IndustrialCertification.js
│   │   ├── TrainingPrograms.js
│   │   ├── Mentors.js
│   │   ├── MockInterviews.js
│   │   ├── PlacementPortal.js
│   │   ├── CareerJourney.js
│   │   ├── EarlyAccess.js
│   │   └── Footer.js
│   ├── App.js
│   ├── index.js
│   └── index.css
└── package.json
```

## Installation

1. Navigate to the project directory:
```bash
cd industryready-react
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Build for Production

Create a production build:
```bash
npm run build
```

## Components

All sections from the original HTML have been converted to React components:

- **Header**: Fixed navigation bar with logo and menu
- **HeroSection**: Main hero section with floating cards and animations
- **ProblemSection**: The gap between education and industry
- **PlatformEcosystem**: The GradToPro Ecosystem cards
- **IndustrialCertification**: Industrial Certification Programs section
- **TrainingPrograms**: Comprehensive Training Programs grid
- **Mentors**: Learn From Industry Experts section
- **MockInterviews**: On-Demand Mock Interviews section
- **PlacementPortal**: Exclusive Placement Portal section
- **CareerJourney**: Your Path to Industry Readiness
- **EarlyAccess**: Join the GradToPro Ecosystem form
- **Footer**: Footer with links and social media

## Styling

The project uses Tailwind CSS (loaded via CDN in index.html) with custom animations defined in index.css.

## Notes

- All HTML classes have been converted to React className
- All inline styles and animations are preserved
- SVG icons and images are maintained exactly as in the original
- Form handling is set up in the EarlyAccess component
- All sections maintain the same structure and styling as the original HTML
