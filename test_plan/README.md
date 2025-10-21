# Test Plan

## Overview
This test plan outlines the necessary details to ensure that the checkers game has been tested.

## Objectives
- Validate that all functional and non-functional requirements are met.
- Identify and address defects early in the development lifecycle.
- Ensure that the system performs reliably, securely, and efficiently.

### In Scope
- Checkers General (Landing Page)
  - Title
  - Rules link redirect
  - Restart link
- Checkers Gameplay
  - Checkers gameplay is suitable for online players
    - Valid moves
    - Invalid moves are not registered
    - Opponent updates board
    - Checkers gameplay restart functionality

### Out of Scope
- Reloading page during gameplay
- Rules page details
- Performance 
- Security
- Ads
- External links with exception of Rules link

## Test Strategy

| Type | Tools |
|------|-------|
| **Unit Testing** | None |
| **Integration Testing** | None |
| **Functional/UI Testing** | Playwright |
| **API Testing** | Sadly doesnt look like much to add here |
| **Performance Testing** | None - outside of scope |
| **Security Testing** | None - outside of scope |
| **Regression Testing** | None - outside of scope |
| **UAT (User Acceptance)** | Playwright |

## Test Environment
- **Environment:** Production because yolo? 

## Test Execution Plan
| Phase | Description | Owner | Status |
|-------|--------------|--------|--------|
| **Pre Release** | Pre-interview Review, manual and automation | Scott | Complete |
| **Post Release** | During-interview Review, manual and automation | Scott | To-do |

## Test Artifacts
- N/A

### Start Criteria
- All dependencies available
- Test environment is ready
- Requirements approved

### Release Criteria
- All tests executed
- All P0 and P1 defects resolved
- Test report approved

## Metrics & Reporting
- N/A

## CI/CD Integration
- N/A

## Risks
- N/A

## Approval
| Role | Name | Signature | Date |
|------|------|------------|------|
| QA Lead |  |  |  |
| Dev Lead |  |  |  |
| Product Owner |  |  |  |

## References
- TBA
