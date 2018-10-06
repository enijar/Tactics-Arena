import React, {Component} from "react";
import AppContext from "../Decorators/AppContext";

@AppContext
export default class PlayerList extends Component {
    state = {
        players: []
    };

    componentDidMount() {
        this.props.context.emit('players.get');
        this.props.context.socket.on('players.update', this.updatePlayers);
    }

    componentWillUnmount() {
        this.props.context.socket.off('players.update', this.updatePlayers);
    }

    updatePlayers = players => {
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
