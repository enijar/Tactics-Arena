import React from "react";
import AppContext from "../Decorators/AppContext";
import Request from "../app/Request";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";
import GameList from "../Components/GameList";
import PlayerList from "../Components/PlayerList";
import Chat from "../Components/Chat";
import LoadingOverlay from "../Components/LoadingOverlay";

@AppContext
export default class LobbyScreen extends BaseScreen {
    state = {
        loading: true,
        floor: 1,
        games: [],
        players: []
    };

    async componentDidMount() {
        await Promise.all([
            this.setGames(),
            this.setPlayers()
        ]);
        this.setState({loading: false});
    }

    async setGames() {
        const games = await Request.get('api/game-list');
        await this.setState({games: games.body});
    }

    async setPlayers() {
        const players = await Request.get('api/player-list');
        await this.setState({players: players.body});
    }

    render() {
        return (
            <Screen>
                <LoadingOverlay loading={this.state.loading}/>

                <GameList floor={this.state.floor} games={this.state.games}/>

                <div className="LobbyScreen__chat">
                    <Chat/>
                    <PlayerList players={this.state.players}/>
                </div>
            </Screen>
        );
    }
}
