# Tactics Arena

Put your tactics to the test against other players in a 1v1, chess-like arena!

### Quick Start

To get a local instance of the game up-and-running, follow the setups outlined below.

Create the env/* files from the examples.

```bash
cp env/server.example.json env/server.json
cp env/common.example.json env/common.json
```

Create a MySQL database, then update the details inside the env.json file.

Finally run the following commands.

```bash
brew install memcached
npm install
npm run assets:build
npm run start
```

This will install all the game dependencies, build the assets and server, serve the game,
and run the migrations to setup the database.

Start a memcached server by running the following.

```bash
memcached
```

Download the model files using this command.

```bash
./bin/download_models.sh
```

This might take a while, depending on your Internet speed.

Open [http://localhost:3000](http://localhost:3000) to see the game.

### Contributing

You won't want to keep running the commands to manually build the assets and server, so run 
the following commands to set listeners for changes on the assets and server files.

```bash
npm run assets:watch
npm run server:watch
```
