# Tactics Arena

Put your tactics to the test against other players in a 1v1, chess-like arena!

### Quick Start

To get a local instance of the game up-and-running, follow the setups outlines below.

Create the env.json file from the example.

```bash
cp env.example.json env.json
```

Create a MySQL database, then update the details inside the env.json file.

Finally run the following commands.

```bash
brew install memcached
npm install
npm run assets:build
npm run start
```

Start a memcached server by running the following.

```bash
memcached
```

This will install all the game dependencies, build the assets and server, serve the game,
and run the migrations to setup the database.

Open [http://localhost:3000](http://localhost:3000) to see the game.

### Contributing

You won't want to keep running the commands to manually build the assets and server, so run 
the following commands to set listeners for changes on the assets and server files.

```bash
npm run assets:watch
npm run server:watch
```
