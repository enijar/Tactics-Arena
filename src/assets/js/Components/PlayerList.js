import React from "react";
import AppContext from "../Decorators/AppContext";
import SubscriptionComponent from "./SubscriptionComponent";

@AppContext
export default class PlayerList extends SubscriptionComponent {
    state = {
        players: [],
    };

    componentDidMount() {
        this.openEvents({
            'players': this.setPlayers,
        });
        this.openSubscriptions({
            'player.connect': this.playerConnect,
            'player.activity': this.playerActivity,
            'player.disconnect': this.playerDisconnect,
        });
    }

    setPlayers = players => {
        this.setState({players});
    };

    playerConnect = player => {
        console.log('player.connect -> player', player);
        const {players} = this.state;
        players.push(player);
        this.setState({players});
    };

    playerActivity = player => {
        console.log('player.activity -> player', player);
        const players = this.state.players.map(p => p.id === player.id ? player : p);
        this.setState({players});
    };

    playerDisconnect = player => {
        console.log('player.disconnect -> player', player);
        const players = this.state.players.filter(p => p.id !== player.id);
        this.setState({players});
    };

    render() {
        return (
            <div className="PlayerList">
                <div className="PlayerList__inner">
                    {this.state.players.map(player => (
                        <div className="PlayerList__player" key={player.id}>
                            <span className={`PlayerList__player-status PlayerList__player-status--${player.status}`}>
                            </span>

                            <span className="PlayerList__player-username" title={player.name}>
                                {player.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
