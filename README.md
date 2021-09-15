# Blue Billywig - Programming Challenge

![placeholdd](static/logo.png)

Our new client `placeholdd` has just started integrating with our platform, but due to technical reasons they can't make a direct link between their platform and ours. They've provided us with a reference for their API and some static data for the initial integration. The static data contains a mapping from post IDs in their API to mediaclip IDs in their Blue Billywig platform ([https://demo.bbvms.com](https://demo.bbvms.com/)). They've asked us for help building a solution that lets them place their videos and track user interaction.


## References

- placeholdd API Reference: https://jsonplaceholder.typicode.com/
- Blue Billywig Player API Reference:
  - Embedding: https://support.bluebillywig.com/advanced-player-settings/advanced-embedding/#2-0-embedding
  - Events: https://support.bluebillywig.com/player-api/events-modes-and-phases/
  - Methods: https://support.bluebillywig.com/player-api/methods/
- Static Data: See the `static` directory.

## Challenge

Using any language(s) you prefer, build an application that:

- Can display a placeholdd post as a web page by ID
- Can embed the correct video on that page. All videos may be embedded with the `default` playout.
- Can identify a user through either a query parameter (`user=123`) or a Local Storage value (use the key `user_id`), though neither is guaranteed to be specified.
- Keeps track of which videos a user has watched at least 40% of, by updating the user using the placeholdd API
- Keeps track of which videos a user has finished watching, by updating the user using the placeholdd API

## Notes

- You're allowed to host the application in whatever way you prefer: CodePen? Docker container? Local HTTP server? On your own website? Anything goes, but make sure you also submit your solution through a Git repository.
- Make a fork of this Git repository before you start working on the task.
- Commit early, commit often: Let us see how you solve the challenge step-by-step. Frequent commits and clear commit messages are a good way for us to get an idea of your thought process.
- Try to not spend more than 4 hours solving this at most. Write down what your solution would be if you had more time, or where you ended up taking shortcuts to save time.
- It's more important to have done parts of the challenge fully, than to have everything barely working. It's alright if you don't finish everything!
- JSONPlaceholder does not actually store any write operations, you can validate correctness by directly checking the response to your requests. Subsequently fetching an "updated" item will not show whatever updates you did through POST, PUT or PATCH.

Good luck!
