### Things that could be improved
- I don't know the best practices in Vue yet(but I am eager to learn) so there are most likely some architecture/stylistic mistakes. I tried to adhere to Vue 3 style guide from the official docs
  
- Self hosting fonts to avoid a request to google-fonts
  
- Extracting VueX store into modules
    
- Accesibility - implementing all of the accesibility features from scratch would take too much time in a sample recruitment app. Component libraries usually have it built-in.
  
- We could add debouncing on the search input. Currently it only triggers on enter and blur but I did not want to complicate/over-engineer it.
  
- It would be better to have skeletons instead of a loader in BusLineSelect
-  the API should be modularized into:
  - bus lines
  - bus stops (based on provided lineId)
  - bus arrival hours (based on provided stopId)
  
- if the api was modularized, we could do dependent queries (preferably using something like tanstack-query(vue-query) to get cache management, refetching, better handling of loading and error states). We would add loading and error states inside BusStopCard and BusTimeCard in that case (currently they aren't really needed)

- We could use a tool like Zod to validate API response
  
- adding MockServiceWorker for API testing


### Some notes:
- I could have installed vue-svg-loader[https://vue-svg-loader.js.org/] to configure webpack but it said not to install anything so I made wrappers on SVG myself. However I did install a couple of devDependencies(plugins) that were necessary to run component unit tests.
  
- I kept global scss variables(like colors) in main.scss and more specific inside scoped components.
  
- BusTimeCard and BusStopCard could probably be merged into one component but I think it would be harder to maintain because they have a couple of small differences. I'd rather duplicate some code and have better readability.
  
- I am not sure what is the best way to achieve the border around bus line and bus stop cards. I based my solution on: https://stackoverflow.com/a/26858151. I tried https://kovart.github.io/dashed-border-generator/ but I couldn't get it to work with the rounded corners.
  
- The hardest part was getting the VueX tests to work. I had to find a lot of workarounds and docs/articles are usually written in plain js so typing it was difficult