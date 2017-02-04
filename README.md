# Mock Presenter

Generates a single page navigable slideshow for sequential image presentation.
Created to show static mockup exported as images.

- The generated page centers the image in body cropping non visible rxtra width area without showing scrollbars
- A small navigator with "prev", "next" and a summary is generated from the available pages
- Arrow keys can be used to navigate
- Pages are generated through a summary json file.
- Auto hide of the navigation bar

    yarn install
    .. edit desc.json.dist ..
    node build.js
