import React from "react";
import AppContext from "../Decorators/AppContext";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";
import GameList from "../Components/GameList";
import PlayerList from "../Components/PlayerList";
import Chat from "../Components/Chat/index";

@AppContext
export default class LobbyScreen extends BaseScreen {
    render() {
        return (
            <Screen name="LobbyScreen">
                <GameList/>

                <div className="LobbyScreen__chat">
                    <Chat/>
                    <PlayerList/>
                </div>
            </Screen>
        );
    }
}
