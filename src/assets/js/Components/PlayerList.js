import React from "react";
import AppContext from "../Decorators/AppContext";
import SubscriptionComponent from "./SubscriptionComponent";

@AppContext
export default class PlayerList extends SubscriptionComponent {
    state = {
        players: [],
    };

    componentDidMount() {
        this.openSubscriptions({
            'players': this.setPlayers,
            'player.update': this.updatePlayer,
        });
    }

    setPlayers = players => {
        this.setState({players});
    };

    updatePlayer = player => {
        const players = this.state.players.map(p => p.id === player.id ? player : p);
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
