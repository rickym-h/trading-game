## A Space Trading Game

Live demo: https://rickym-h.github.io/trading-game/

Built using ReactJS, a frontend webpage to simulate a trading game with a spatial inventory.

Makes use of React components and state to render the UI to the user.

# Features

- ReactJS to render UI and handle storage state
- Spatial inventory system which supports items of arbitrary sizes - and allows rotation of items
- Atomic transactional system using React states - so if a transaction fails, the data is unchanged
- Use of browser localstorage to persist data even when closed down

# Major takeaways

- I struggled to manage all of my data within my React classes - ending up with ugly callback functions going up and down my React hierarchy. I suppose this is one of the reasons React is a UI framework rather than a game development framework.
  - To resolve this, I ended up having most of the main data about items stored in my top level Game component, instead of lower down in the hierarchy with my actual Cargo and Stronghold storage (which seems more intuitive from an object-oriented standpoint)
  - If I were to do it again, I would separate the data manipulation and storage from the React interface entirely, and simply use the buttons created in my React hierarchy to interact with an API layer to manipulate the game state. This would result in much cleaner code - less callback functions, less passing data up and down trees. (there are also a few cases where I have passed a number of helper functions down to child components which could have been avoided if I seperated my data and UI, or simply just imported static helper functions from a separate file)
- I could have managed my time better - and working towards specific goals or to implement specific features instead of just blindly working on whatever I felt would necessary to do next.
  - This also led to me writing less comments as I wrote the code because I was just writing code to work for whatever I was working on at that moment, without thinking about any future issues or readability. This meant that for some parts I have to go back afterwards to comment some functions.