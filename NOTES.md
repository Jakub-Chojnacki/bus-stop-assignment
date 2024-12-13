### Things that could be improved in a real (or bigger) app

1. I don't know the best practices in Vue yet(but I am eager to learn) so there are most likely some architecture/stylistic mistakes. I tried to adhere to Vue 3 style guide from the official docs

2. Accesibility - implementing all of the accesibility features from scratch would take too much time in a sample recruitment app. Component libraries usually have it built-in.

3. Self hosting fonts to avoid a request to google-fonts

4. Extracting VueX store into modules

5. We could add debouncing on the search input. Currently it only triggers on enter and blur but I did not want to complicate/over-engineer it.

6. the API should be modularized into:

- bus lines
- bus stops (based on provided lineId)
- bus arrival hours (based on provided stopId)
  If the api was modularized, we could do dependent queries (preferably using something like tanstack-query(vue-query) to get cache management, refetching, better handling of loading and error states). We would add loading and error states inside BusStopCard and BusTimeCard in that case (currently they aren't really needed)

7. We could use a tool like Zod to validate API response

8. MockServiceWorker for API testing

### Some notes:

1.  I could have installed vue-svg-loader[https://vue-svg-loader.js.org/] to configure webpack but it said not to install anything so I made wrappers on SVG myself. However I did install a couple of devDependencies(plugins) that were necessary to run component unit tests.

2.  I kept global css variables(like colors and things related to spacing/height) in main.scss and more specific inside scoped components.
    I did not use stuff like scss mixins because the app is too small to get any benefits out of it.

3.  The layout is static and should always have the same paddings and height(100dvh) so I heavily relied on calc to get the desired effect of scrollable containers and dimensions from figma. I don't like building pixel-perfect stuff in real apps but I tried to get it as close as possible in this case. Most of the values are in REMs for accesibility purposes (so the layout scales with zoom/user settings)

4.  BusTimeCard and BusStopCard could probably be merged into one component but I think it would be harder to maintain because they have a couple of small differences. I'd rather duplicate some code and have better readability.

5.  I am not sure what is the best way to achieve the border around bus line and bus stop cards. I based my solution on: https://stackoverflow.com/a/26858151. I tried https://kovart.github.io/dashed-border-generator/ but I couldn't get it to work with the rounded corners.

6.  The hardest part was getting the VueX tests to work. I had to find a lot of workarounds and docs/articles are usually written in plain js so typing it was difficult

7. I have written some basic unit tests for the more complicated components. I mostly tested the data-layer not UI but I tried to sneak-in some bits of UI testing as well just to show I can do it :) Though, I would prefer to use something like cypress for UI integration/e2e testing.

