
# yet-another-discord-bot-template
![Repo Size](https://img.shields.io/github/languages/code-size/Ruin9999/discord-bot-template?logo=github&style=for-the-badge)

A typescript template for building simple discord bots.
## Why 🤔

While building my discord bot, I realized that I had crazy spaghetti code and while 
refactoring my code, I realized that I had made an easy to use template for anyone to
make discord bots with. 🤖
## Usage/Examples

#### Creating a command

**Commands** should be created in the ./src/***commands*** folder.

```javascript
import ICommand from "../interfaces/ICommand";

const command : ICommand = {
    name : "command",
    description : "This is a test command",
    ...
}

export default command;
```

#### Creating an event

**Events** should be created in the ./src/***events*** folder.

```javascript
import IEvent from "../interfaces/IEvent";

const event : IEvent = {
    name: "ready",
    run() {
        console.log("The bot is ready!");
    }
}

export default event;
```


## Environment Variables
To run this project, you will need to add the following environment variables to your .env file

Required :`DISCORD_TOKEN`  
Optional : `GUILD_ID`
## License

[MIT](https://choosealicense.com/licenses/mit/)

